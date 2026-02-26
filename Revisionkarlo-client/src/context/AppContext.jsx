// src/context/AppContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { fetchQuestions } from "../apis/questionService";

const initialState = {
  selectedSubject: "",
  selectedDifficulty: "",
  questionDocs: [], // raw docs from API: [{ _id, subject, topic, section, question:[] }]
  activeTestQuestions: [], // flat question items for the running test
  testTitle: "",
  loading: false,
  error: null,
  user: JSON.parse(sessionStorage.getItem("user") || "null"),
  token: sessionStorage.getItem("token") || null,
};

const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_QUESTION_DOCS: "SET_QUESTION_DOCS",
  SET_SUBJECT: "SET_SUBJECT",
  SET_DIFFICULTY: "SET_DIFFICULTY",
  SET_ACTIVE_TEST: "SET_ACTIVE_TEST",
  SET_ERROR: "SET_ERROR",
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: payload, error: null };
    case ACTIONS.SET_QUESTION_DOCS:
      return { ...state, questionDocs: payload, loading: false, error: null };
    case ACTIONS.SET_SUBJECT:
      return {
        ...state,
        selectedSubject: payload,
        questionDocs: [],
        loading: true,
      };
    case ACTIONS.SET_DIFFICULTY:
      return { ...state, selectedDifficulty: payload };
    case ACTIONS.SET_ACTIVE_TEST:
      return {
        ...state,
        activeTestQuestions: payload.questions,
        testTitle: payload.title,
      };
    case ACTIONS.SET_ERROR:
      return { ...state, error: payload, loading: false };
    case ACTIONS.SET_USER:
      sessionStorage.setItem("user", JSON.stringify(payload.user));
      sessionStorage.setItem("token", payload.token);
      return { ...state, user: payload.user, token: payload.token };
    case ACTIONS.LOGOUT:
      sessionStorage.clear();
      return { ...state, user: null, token: null };
    default:
      return state;
  }
}

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ── Derived: unique topics for the selected subject ──────────────────────
  // API shape: { topic: "OWS 1", section: "Arithmetic" }
  // Level 1 = unique topic values  →  clicked to see level 2
  // Level 2 = all docs where doc.topic === chosenTopic  →  show doc.section as test name
  const topics = [
    ...new Set(state.questionDocs.map((d) => d.topic).filter(Boolean)),
  ];

  // ── Fetch whenever selectedSubject changes ───────────────────────────────
  useEffect(() => {
    if (!state.selectedSubject) return;

    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    fetchQuestions({ subject: state.selectedSubject })
      .then((docs) =>
        dispatch({
          type: ACTIONS.SET_QUESTION_DOCS,
          payload: Array.isArray(docs) ? docs : [],
        }),
      )
      .catch((e) => dispatch({ type: ACTIONS.SET_ERROR, payload: e.message }));
  }, [state.selectedSubject]);

  // ── Actions ───────────────────────────────────────────────────────────────
  const setSubject = useCallback((subject) => {
    dispatch({ type: ACTIONS.SET_SUBJECT, payload: subject });
  }, []);

  const setDifficulty = useCallback((d) => {
    dispatch({ type: ACTIONS.SET_DIFFICULTY, payload: d });
  }, []);

  // Called by MathQuestionlist when user starts a test
  // questions = flat array of question items, title = test display name
  const startTest = useCallback((questions, title = "Test") => {
    dispatch({ type: ACTIONS.SET_ACTIVE_TEST, payload: { questions, title } });
  }, []);

  const setUser = useCallback((user, token) => {
    dispatch({ type: ACTIONS.SET_USER, payload: { user, token } });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: ACTIONS.LOGOUT });
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        topics, // unique topic strings  e.g. ["OWS 1", "OWS Practice", "One Word Substitution"]
        setSubject,
        setDifficulty,
        startTest,
        setUser,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
};

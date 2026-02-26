// src/api/questionService.js
// Maps to backend endpoints exactly as documented in Postman guide

const BASE = "http://localhost:80"; // change to https://testwala-backend.onrender.com for prod

const apiFetch = async (path, options = {}) => {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
};

// ── Questions ──────────────────────────────────────────────────────────────

/**
 * GET /questions?subject=...&section=...&topic=...&difficultyLevel=...
 *
 * Returns array of question docs, each shaped:
 * { _id, subject, section, topic, difficultyLevel, question: [{ _id, qus, options, answer, explanation }] }
 */
export const fetchQuestions = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const data = await apiFetch(`/questions${params ? `?${params}` : ""}`);
  return data.data; // array of docs
};

/**
 * GET /questions/subjects
 *
 * Returns the full subject → section → topics tree from the DB.
 * Shape: { math: { "Quantitative Aptitude": ["Profit and Loss", ...] }, english: {...}, ... }
 *
 * Use this everywhere instead of hardcoded topic arrays.
 */
export const fetchSubjectTree = async () => {
  const data = await apiFetch("/questions/subjects");
  return data.data;
};

/**
 * Returns a flat, ordered list of topic strings for a given subject.
 * The order comes from the API; nothing is hardcoded here.
 *
 * @param {string} subject  e.g. "math" | "english" | "gs" | "vocabulary" | "reasoning" | "mathtwo"
 * @returns {Promise<string[]>}  e.g. ["Profit and Loss", "Time and Work", ...]
 */
export const fetchTopicsForSubject = async (subject) => {
  const tree = await fetchSubjectTree();
  const sections = tree[subject.toLowerCase()] ?? {};
  // Flatten: each section can have multiple topics; keep insertion order from API
  const topics = Object.values(sections).flat();
  return topics;
};

/**
 * Returns a map of  { [sectionName]: [topic, ...] }  for a given subject.
 *
 * @param {string} subject
 * @returns {Promise<Record<string, string[]>>}
 */
export const fetchSectionsForSubject = async (subject) => {
  const tree = await fetchSubjectTree();
  return tree[subject.toLowerCase()] ?? {};
};

/**
 * Returns all available subject keys from the DB (lowercased).
 * e.g. ["math", "english", "gs", "vocabulary", "reasoning"]
 *
 * @returns {Promise<string[]>}
 */
export const fetchAllSubjects = async () => {
  const tree = await fetchSubjectTree();
  return Object.keys(tree);
};

// GET /questions/:id
export const fetchQuestionById = async (id) => {
  const data = await apiFetch(`/questions/${id}`);
  return data.data;
};

// POST /questions/create
// Body: { subject, section, topic, difficultyLevel, question: [...] }
export const createQuestion = async (payload) => {
  return apiFetch("/questions/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

// PATCH /questions/:id
export const updateQuestion = async (id, payload) => {
  return apiFetch(`/questions/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};

// PATCH /questions/:id/add-items
// Body: { items: [{ qus, options, answer, explanation }] }
export const addQuestionItems = async (id, items) => {
  return apiFetch(`/questions/${id}/add-items`, {
    method: "PATCH",
    body: JSON.stringify({ items }),
  });
};

// DELETE /questions/:id
export const deleteQuestion = async (id) => {
  return apiFetch(`/questions/${id}`, { method: "DELETE" });
};

// DELETE /questions/:id/items/:itemId
export const deleteQuestionItem = async (id, itemId) => {
  return apiFetch(`/questions/${id}/items/${itemId}`, { method: "DELETE" });
};

// ── User Test Data ─────────────────────────────────────────────────────────

// POST /UserTestData/AddNew-userTestData
export const postUserTestResult = async (payload) => {
  return apiFetch("/UserTestData/AddNew-userTestData", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

// GET /UserTestData
export const fetchUserTestData = async () => {
  const data = await apiFetch("/UserTestData");
  return data.data;
};

// PATCH /UserTestData/updating-userTestData/:id
export const updateUserTestData = async (id, payload) => {
  return apiFetch(`/UserTestData/updating-userTestData/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};

// DELETE /UserTestData/delete-userTestData/:id
export const deleteUserTestData = async (id) => {
  return apiFetch(`/UserTestData/delete-userTestData/${id}`, {
    method: "DELETE",
  });
};

// ── Auth ───────────────────────────────────────────────────────────────────

// POST /auth/signin  →  { token, data: { _id, Email, Name } }
export const signIn = async ({ Email, Password }) => {
  return apiFetch("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ Email, Password }),
  });
};

// POST /auth/signup  →  { token, data: { _id, Email } }
export const signUp = async (payload) => {
  return apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

// POST /auth/forgot-password  →  { Otp, user: { _id } }
export const forgotPassword = async (Email) => {
  return apiFetch("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ Email }),
  });
};

// PATCH /auth/change-password/:id
export const changePassword = async (id, Password) => {
  return apiFetch(`/auth/change-password/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ Password }),
  });
};

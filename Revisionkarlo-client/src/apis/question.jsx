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
 * Returns array of question docs.
 */
export const fetchQuestions = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const data = await apiFetch(`/questions${params ? `?${params}` : ""}`);
  return data.data;
};

/**
 * GET /questions/subjects
 * Returns { math: { "Quantitative Aptitude": ["Profit and Loss", ...] }, ... }
 */
export const fetchSubjectTree = async () => {
  const data = await apiFetch("/questions/subjects");
  return data.data;
};

/**
 * Returns flat ordered topic list for a subject from the API.
 */
export const fetchTopicsForSubject = async (subject) => {
  const tree = await fetchSubjectTree();
  const sections = tree[subject.toLowerCase()] ?? {};
  return Object.values(sections).flat();
};

/**
 * Returns { [sectionName]: [topic, ...] } for a subject.
 */
export const fetchSectionsForSubject = async (subject) => {
  const tree = await fetchSubjectTree();
  return tree[subject.toLowerCase()] ?? {};
};

/**
 * Returns all subject keys from the DB (lowercased).
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

export const postUserTestResult = async (payload) => {
  return apiFetch("/UserTestData/AddNew-userTestData", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const fetchUserTestData = async () => {
  const data = await apiFetch("/UserTestData");
  return data.data;
};

export const updateUserTestData = async (id, payload) => {
  return apiFetch(`/UserTestData/updating-userTestData/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};

export const deleteUserTestData = async (id) => {
  return apiFetch(`/UserTestData/delete-userTestData/${id}`, {
    method: "DELETE",
  });
};

// ── Auth ───────────────────────────────────────────────────────────────────

export const signIn = async ({ Email, Password }) => {
  return apiFetch("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ Email, Password }),
  });
};

export const signUp = async (payload) => {
  return apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const forgotPassword = async (Email) => {
  return apiFetch("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ Email }),
  });
};

export const changePassword = async (id, Password) => {
  return apiFetch(`/auth/change-password/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ Password }),
  });
};

export const fetchCoachings = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const data = await apiFetch(`/coaching${params ? `?${params}` : ""}`);
  return data.data;
};

export const fetchCoachingBySlug = async (slug) => {
  const data = await apiFetch(`/coaching/${slug}`);
  return data.data;
};

export const createCoaching = async (payload) => {
  const data = await apiFetch("/coaching/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.data;
};

export const updateCoaching = async (id, payload) => {
  const data = await apiFetch(`/coaching/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return data.data;
};

export const deleteCoaching = async (id) => {
  return apiFetch(`/coaching/${id}`, { method: "DELETE" });
};
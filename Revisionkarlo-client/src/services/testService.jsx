import axios from "axios";
import { setCookies } from "../helpers/cookies";
import { setLocalStorage } from "../helpers/localStorage";

const BASE_URL = "http://localhost:80"
// "https://testwala-backend.onrender.com";

// ─── AUTH ────────────────────────────────────────────────────────────────────

export const signUpApi = async (data, cmpPassword, setMessage) => {
  try {
    const r = await axios.post(`${BASE_URL}/auth/signup`, data);
    if (r.data.token !== undefined) {
      setCookies("_user", r.data.token);
      setMessage(r.data.message);
      return true;
    } else {
      setMessage(r.data.message);
      return false;
    }
  } catch (error) {
    console.error(error.message);
    setMessage("Something went wrong");
    return false;
  }
};

export const signInApi = async (data, setMessage) => {
  try {
    const r = await axios.post(`${BASE_URL}/auth/signin`, data);
    if (r.data.token) {
      setCookies("_user", r.data.token);
      setLocalStorage("_user", r.data.data._id);
      setMessage(r.data.message);
      return true;
    } else {
      setMessage(r.data.message);
      return false;
    }
  } catch (error) {
    console.error(error.message);
    setMessage("Something went wrong");
    return false;
  }
};

// ─── TESTS ───────────────────────────────────────────────────────────────────

/**
 * POST /tests/create
 * Create a new test and save result to backend.
 */
export const createTestApi = async (testData, setMessage) => {
  try {
    const r = await axios.post(`${BASE_URL}/tests/create`, testData, {
      withCredentials: true,
    });
    if (r.data) {
      setLocalStorage("currentTestId", r.data._id || r.data.id);
      return r.data;
    }
    return null;
  } catch (error) {
    console.error(error.message);
    if (setMessage) setMessage("Failed to save test");
    return null;
  }
};

/**
 * GET /tests
 * Fetch all tests for the logged-in user.
 */
export const getAllTestsApi = async (setMessage) => {
  try {
    const r = await axios.get(`${BASE_URL}/tests`, {
      withCredentials: true,
    });
    return r.data;
  } catch (error) {
    console.error(error.message);
    if (setMessage) setMessage("Failed to fetch tests");
    return [];
  }
};

/**
 * GET /tests/id/:id
 * Fetch a single test by its MongoDB _id.
 */
export const getTestByIdApi = async (id, setMessage) => {
  try {
    const r = await axios.get(`${BASE_URL}/tests/id/${id}`, {
      withCredentials: true,
    });
    return r.data;
  } catch (error) {
    console.error(error.message);
    if (setMessage) setMessage("Failed to fetch test");
    return null;
  }
};

/**
 * GET /tests/:slug
 * Fetch a test by its slug (e.g. test name / url-friendly id).
 */
export const getTestBySlugApi = async (slug, setMessage) => {
  try {
    const r = await axios.get(`${BASE_URL}/tests/${slug}`, {
      withCredentials: true,
    });
    return r.data;
  } catch (error) {
    console.error(error.message);
    if (setMessage) setMessage("Failed to fetch test");
    return null;
  }
};

/**
 * GET /tests/:id/leaderboard
 * Fetch leaderboard for a specific test.
 */
export const getTestLeaderboardApi = async (id, setMessage) => {
  try {
    const r = await axios.get(`${BASE_URL}/tests/${id}/leaderboard`, {
      withCredentials: true,
    });
    return r.data;
  } catch (error) {
    console.error(error.message);
    if (setMessage) setMessage("Failed to fetch leaderboard");
    return [];
  }
};

/**
 * PATCH /tests/:id
 * Update a test (e.g. update title, questions, etc).
 */
export const updateTestApi = async (id, updatedData, setMessage) => {
  try {
    const r = await axios.patch(`${BASE_URL}/tests/${id}`, updatedData, {
      withCredentials: true,
    });
    return r.data;
  } catch (error) {
    console.error(error.message);
    if (setMessage) setMessage("Failed to update test");
    return null;
  }
};

/**
 * DELETE /tests/:id
 * Delete a test by id.
 */
export const deleteTestApi = async (id, setMessage) => {
  try {
    const r = await axios.delete(`${BASE_URL}/tests/${id}`, {
      withCredentials: true,
    });
    return r.data;
  } catch (error) {
    console.error(error.message);
    if (setMessage) setMessage("Failed to delete test");
    return null;
  }
};

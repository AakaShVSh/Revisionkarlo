// src/apis/auth.js
//
// Backend (auth.controller.js) uses httpOnly cookies — NO token in response body.
// signin response: { message, data: { _id, Name, Email, isAdmin } }
// signup response: { message, data: { _id, Name, Email } }
//
// Strategy:
//   - Cookie is handled automatically by the browser (withCredentials: true)
//   - We store the user object in sessionStorage("user") for the Navbar to read
//   - We fire a custom "sessionchange" event so Navbar updates IMMEDIATELY
//     without waiting for a page reload or route change

import axios from "axios";

const BASE = "http://localhost:80";

// withCredentials: true → browser automatically sends the httpOnly cookie
const api = axios.create({ baseURL: BASE, withCredentials: true });

// ── internal helpers ───────────────────────────────────────────────────────
const saveUser = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new Event("sessionchange")); // Navbar listens to this
};

const clearUser = () => {
  sessionStorage.removeItem("user");
  window.dispatchEvent(new Event("sessionchange"));
};

// ── SIGN IN ────────────────────────────────────────────────────────────────
// POST /auth/signin → { message, data: { _id, Name, Email, isAdmin } }
// Cookie is set by backend automatically — we just save user to sessionStorage
export const signInApi = async (data, setMessage) => {
  try {
    const r = await api.post("/auth/signin", data);

    // backend returns 200 with data on success, or 401 with message on fail
    if (r.data?.data?._id) {
      saveUser(r.data.data); // → triggers Navbar update instantly
      setMessage(r.data.message);
      return true;
    }

    setMessage(r.data?.message || "Login failed");
    return false;
  } catch (err) {
    // axios throws on 4xx/5xx — extract backend message
    setMessage(err.response?.data?.message || "Wrong Email or Password");
    return false;
  }
};

// ── SIGN UP ────────────────────────────────────────────────────────────────
// POST /auth/signup → { message, data: { _id, Name, Email } }
export const signUpApi = async (data, cmpPassword, setMessage) => {
  try {
    const r = await api.post("/auth/signup", data);

    if (r.data?.data?._id) {
      // Auto sign-in after signup — save user and fire event
      saveUser(r.data.data);
      setMessage(r.data.message || "Registration successful");
      return true;
    }

    setMessage(r.data?.message || "Registration failed");
    return false;
  } catch (err) {
    setMessage(err.response?.data?.message || "Something went wrong");
    return false;
  }
};

// ── SIGN OUT ───────────────────────────────────────────────────────────────
// POST /auth/signout → backend clears the httpOnly cookie
export const signOutApi = async () => {
  try {
    await api.post("/auth/signout");
  } catch {
    /* ignore network errors */
  }
  clearUser(); // clear sessionStorage + fire "sessionchange"
};

// ── GET CURRENT USER (sync, no API call) ──────────────────────────────────
// Just reads sessionStorage — use this in Navbar and ProtectedRoute
// No async needed since we stored it on sign-in
export const getCurrentUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

// ── CHECK SESSION VIA COOKIE (async) ──────────────────────────────────────
// Calls GET /auth/me — browser sends cookie automatically
// Use this on app load to restore session after page refresh
export const checkSession = async () => {
  try {
    const r = await api.get("/auth/me");
    if (r.data?.data?._id) {
      saveUser(r.data.data); // restore sessionStorage from server
      return r.data.data;
    }
    return null;
  } catch {
    clearUser();
    return null;
  }
};

// ── FORGOT PASSWORD ────────────────────────────────────────────────────────
export const forgotPasswordApi = async (Email, setMessage) => {
  try {
    const r = await api.post("/auth/forgot-password", { Email });
    setMessage(r.data.status || "OTP sent successfully");
    return r.data; // { otp, user: { id, email } }
  } catch (err) {
    setMessage(err.response?.data?.message || "Something went wrong");
    return null;
  }
};

// ── CHANGE PASSWORD ────────────────────────────────────────────────────────
export const changePasswordApi = async (userId, newPassword, setMessage) => {
  try {
    const r = await api.patch(`/auth/change-password/${userId}`, {
      Password: newPassword,
    });
    setMessage(r.data.message || "Password updated successfully");
    return true;
  } catch (err) {
    setMessage(err.response?.data?.message || "Something went wrong");
    return false;
  }
};

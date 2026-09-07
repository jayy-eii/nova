// Thin API client. Every UI component calls through here instead of importing
// mock data directly, so wiring up a real backend later means editing this
// file only — no component changes required.
//
// To connect a real backend:
// 1. Set VITE_API_BASE_URL in a .env file (e.g. http://localhost:4000/api)
// 2. Replace the mock branches below with the fetch calls (left commented
//    beside each method as a starting point)
// 3. Add an auth token getter (e.g. from localStorage / context) and attach
//    it as a Bearer token in `headers`

import {
  stats,
  productivityTrend,
  taskDistribution,
  projects,
  tasksByProject,
  team,
  calendarEvents,
  activity,
  notifications,
  currentUser,
} from "../data/mockData";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const USE_MOCKS = !BASE_URL;

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
  return res.json();
}

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  auth: {
    async login(email, password) {
      if (USE_MOCKS) {
        await delay();
        return { token: "mock-token", user: currentUser };
      }
      return request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      // return request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    },
    async signup(payload) {
      if (USE_MOCKS) {
        await delay();
        return { token: "mock-token", user: { ...currentUser, ...payload } };
      }
      return request("/auth/signup", { method: "POST", body: JSON.stringify(payload) });
    },
  },

  dashboard: {
    async getSummary() {
      if (USE_MOCKS) {
        await delay();
        return { stats, productivityTrend, taskDistribution };
      }
      return request("/dashboard/summary");
    },
  },

  projects: {
    async list() {
      if (USE_MOCKS) {
        await delay();
        return projects;
      }
      return request("/projects");
    },
    async get(id) {
      if (USE_MOCKS) {
        await delay();
        return projects.find((p) => p.id === id) || null;
      }
      return request(`/projects/${id}`);
    },
    async getTasks(projectId) {
      if (USE_MOCKS) {
        await delay();
        return tasksByProject[projectId] || [];
      }
      return request(`/projects/${projectId}/tasks`);
    },
  },

  team: {
    async list() {
      if (USE_MOCKS) {
        await delay();
        return team;
      }
      return request("/team");
    },
  },

  calendar: {
    async listEvents() {
      if (USE_MOCKS) {
        await delay();
        return calendarEvents;
      }
      return request("/calendar/events");
    },
  },

  activity: {
    async list() {
      if (USE_MOCKS) {
        await delay();
        return activity;
      }
      return request("/activity");
    },
    async notifications() {
      if (USE_MOCKS) {
        await delay();
        return notifications;
      }
      return request("/notifications");
    },
  },
};

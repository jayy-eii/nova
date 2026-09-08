// Real API client. Every request goes to the Express + MongoDB backend
// running at BASE_URL. No mock data lives here anymore.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

function getToken() {
  return localStorage.getItem("nova_token");
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  auth: {
    async login(email, password) {
      return request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    },
    async signup(payload) {
      return request("/auth/signup", { method: "POST", body: JSON.stringify(payload) });
    },
    async me() {
      return request("/auth/me");
    },
  },

  dashboard: {
    async getSummary() {
      return request("/dashboard/summary");
    },
  },

  projects: {
    async list() {
      return request("/projects");
    },
    async get(id) {
      return request(`/projects/${id}`);
    },
    async create(payload) {
      return request("/projects", { method: "POST", body: JSON.stringify(payload) });
    },
    async update(id, payload) {
      return request(`/projects/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
    },
    async getTasks(projectId) {
      return request(`/projects/${projectId}/tasks`);
    },
    async createTask(projectId, payload) {
      return request(`/projects/${projectId}/tasks`, { method: "POST", body: JSON.stringify(payload) });
    },
  },

  tasks: {
    async update(id, payload) {
      return request(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
    },
  },

  team: {
    async list() {
      return request("/team");
    },
    async invite(payload) {
      return request("/team/invite", { method: "POST", body: JSON.stringify(payload) });
    },
  },

  calendar: {
    async listEvents() {
      return request("/calendar/events");
    },
    async createEvent(payload) {
      return request("/calendar/events", { method: "POST", body: JSON.stringify(payload) });
    },
  },

  activity: {
    async list() {
      return request("/activity");
    },
    async notifications() {
      return request("/notifications");
    },
    async markNotificationsRead() {
      return request("/notifications/mark-read", { method: "PATCH" });
    },
  },
};
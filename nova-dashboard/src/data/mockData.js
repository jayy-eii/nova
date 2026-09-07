// Mock data layer.
// When wiring up a backend, replace the exported constants below with calls
// into src/lib/api.js (e.g. `export const projects = await api.get('/projects')`)
// The shapes here are the contract the UI expects from the API.

export const currentUser = {
  id: "u_01",
  name: "Aarav Sharma",
  role: "Product Lead",
  email: "aarav@novahq.io",
  avatarColor: "#6E56F8",
  initials: "AS",
};

export const stats = {
  totalProjects: 18,
  activeTasks: 64,
  completedTasks: 231,
  teamMembers: 12,
  productivity: 82, // percent
  productivityDelta: 6.4, // percent change vs last period
};

export const productivityTrend = [
  { label: "Mon", value: 62 },
  { label: "Tue", value: 71 },
  { label: "Wed", value: 68 },
  { label: "Thu", value: 79 },
  { label: "Fri", value: 74 },
  { label: "Sat", value: 55 },
  { label: "Sun", value: 82 },
];

export const taskDistribution = [
  { label: "To-do", value: 26, color: "#7B7B8A" },
  { label: "In Progress", value: 38, color: "#6E56F8" },
  { label: "Completed", value: 231, color: "#1FE0C2" },
];

export const projects = [
  {
    id: "p_01",
    name: "Orbit — Mobile Redesign",
    client: "Internal",
    description:
      "Full visual overhaul of the Orbit companion app, moving to the new design system.",
    progress: 72,
    status: "On Track",
    deadline: "2026-09-28",
    priority: "High",
    members: ["AS", "RK", "MP", "SD"],
    tasksTotal: 48,
    tasksDone: 35,
  },
  {
    id: "p_02",
    name: "Helix API Gateway",
    client: "Platform Team",
    description: "Migrate legacy REST endpoints to the new gateway with rate limiting.",
    progress: 41,
    status: "At Risk",
    deadline: "2026-09-19",
    priority: "Urgent",
    members: ["RK", "TN"],
    tasksTotal: 32,
    tasksDone: 13,
  },
  {
    id: "p_03",
    name: "Atlas Marketing Site",
    client: "Growth",
    description: "New marketing site launch with localized pages for 6 regions.",
    progress: 91,
    status: "On Track",
    deadline: "2026-09-12",
    priority: "Medium",
    members: ["SD", "MP", "PV"],
    tasksTotal: 20,
    tasksDone: 18,
  },
  {
    id: "p_04",
    name: "Lumen Billing Engine",
    client: "Finance",
    description: "Usage-based billing engine supporting proration and credits.",
    progress: 18,
    status: "Delayed",
    deadline: "2026-10-05",
    priority: "High",
    members: ["TN", "AS"],
    tasksTotal: 40,
    tasksDone: 7,
  },
  {
    id: "p_05",
    name: "Nimbus Data Pipeline",
    client: "Data",
    description: "Real-time event pipeline for product analytics, replacing nightly batch jobs.",
    progress: 58,
    status: "On Track",
    deadline: "2026-09-30",
    priority: "Medium",
    members: ["MP", "RK", "SD", "PV"],
    tasksTotal: 27,
    tasksDone: 16,
  },
  {
    id: "p_06",
    name: "Solace Support Portal",
    client: "Customer Success",
    description: "Self-serve support portal with ticket tracking and a knowledge base.",
    progress: 100,
    status: "Completed",
    deadline: "2026-08-30",
    priority: "Low",
    members: ["PV", "AS"],
    tasksTotal: 22,
    tasksDone: 22,
  },
];

export const tasksByProject = {
  p_01: [
    { id: "t_001", title: "Audit existing component library", priority: "Medium", due: "2026-09-10", column: "done", assignee: "SD" },
    { id: "t_002", title: "Define new token system in Figma", priority: "High", due: "2026-09-12", column: "done", assignee: "MP" },
    { id: "t_003", title: "Rebuild onboarding flow screens", priority: "High", due: "2026-09-18", column: "inprogress", assignee: "AS" },
    { id: "t_004", title: "Prototype gesture navigation", priority: "Medium", due: "2026-09-20", column: "inprogress", assignee: "RK" },
    { id: "t_005", title: "Accessibility pass on forms", priority: "Medium", due: "2026-09-22", column: "todo", assignee: "SD" },
    { id: "t_006", title: "Dark mode contrast review", priority: "Low", due: "2026-09-24", column: "todo", assignee: "MP" },
    { id: "t_007", title: "QA regression on iOS 18", priority: "High", due: "2026-09-26", column: "todo", assignee: "RK" },
  ],
  p_02: [
    { id: "t_101", title: "Define gateway routing rules", priority: "Urgent", due: "2026-09-08", column: "inprogress", assignee: "RK" },
    { id: "t_102", title: "Set up rate-limiter middleware", priority: "High", due: "2026-09-14", column: "todo", assignee: "TN" },
    { id: "t_103", title: "Write migration runbook", priority: "Medium", due: "2026-09-16", column: "todo", assignee: "RK" },
  ],
};

export const team = [
  { id: "m_01", name: "Aarav Sharma", initials: "AS", role: "Product Lead", email: "aarav@novahq.io", tasksAssigned: 9, color: "#6E56F8" },
  { id: "m_02", name: "Riya Kapoor", initials: "RK", role: "Backend Engineer", email: "riya@novahq.io", tasksAssigned: 12, color: "#1FE0C2" },
  { id: "m_03", name: "Meera Patel", initials: "MP", role: "Product Designer", email: "meera@novahq.io", tasksAssigned: 7, color: "#FFB454" },
  { id: "m_04", name: "Sana Dutt", initials: "SD", role: "Frontend Engineer", email: "sana@novahq.io", tasksAssigned: 11, color: "#FF6B7A" },
  { id: "m_05", name: "Tarun Nair", initials: "TN", role: "DevOps Engineer", email: "tarun@novahq.io", tasksAssigned: 6, color: "#8B76FA" },
  { id: "m_06", name: "Priya Verma", initials: "PV", role: "QA Engineer", email: "priya@novahq.io", tasksAssigned: 8, color: "#1FE0C2" },
];

export const calendarEvents = [
  { id: "e_01", title: "Atlas Marketing Site — Launch", date: "2026-09-12", type: "deadline" },
  { id: "e_02", title: "Helix API Gateway — Rate limiter review", date: "2026-09-14", type: "meeting" },
  { id: "e_03", title: "Sprint planning", date: "2026-09-15", type: "meeting" },
  { id: "e_04", title: "Orbit — Onboarding flow due", date: "2026-09-18", type: "deadline" },
  { id: "e_05", title: "Helix API Gateway — Deadline", date: "2026-09-19", type: "deadline" },
  { id: "e_06", title: "Design system sync", date: "2026-09-23", type: "meeting" },
  { id: "e_07", title: "Orbit — Mobile Redesign due", date: "2026-09-28", type: "deadline" },
  { id: "e_08", title: "Nimbus Data Pipeline — Demo", date: "2026-09-30", type: "meeting" },
];

export const activity = [
  { id: "a_01", user: "Riya Kapoor", initials: "RK", color: "#1FE0C2", action: "moved", target: "Define gateway routing rules", detail: "to In Progress", time: "8m ago" },
  { id: "a_02", user: "Sana Dutt", initials: "SD", color: "#FF6B7A", action: "completed", target: "Audit existing component library", detail: "in Orbit — Mobile Redesign", time: "42m ago" },
  { id: "a_03", user: "Meera Patel", initials: "MP", color: "#FFB454", action: "commented on", target: "Define new token system in Figma", detail: '"Updated spacing scale, ready for review"', time: "1h ago" },
  { id: "a_04", user: "Tarun Nair", initials: "TN", color: "#8B76FA", action: "uploaded", target: "billing-schema-v2.sql", detail: "to Lumen Billing Engine", time: "2h ago" },
  { id: "a_05", user: "Priya Verma", initials: "PV", color: "#1FE0C2", action: "closed", target: "Solace Support Portal", detail: "— all 22 tasks complete", time: "5h ago" },
  { id: "a_06", user: "Aarav Sharma", initials: "AS", color: "#6E56F8", action: "assigned", target: "Rebuild onboarding flow screens", detail: "to Aarav Sharma", time: "1d ago" },
];

export const notifications = [
  { id: "n_01", title: "Helix API Gateway is at risk", detail: "3 tasks are overdue by more than 2 days.", time: "10m ago", unread: true },
  { id: "n_02", title: "Meera Patel commented on your task", detail: "on \"Define new token system in Figma\"", time: "1h ago", unread: true },
  { id: "n_03", title: "Atlas Marketing Site is 91% complete", detail: "2 tasks remaining before launch.", time: "3h ago", unread: false },
  { id: "n_04", title: "Weekly report ready", detail: "Your team's productivity summary for this week.", time: "1d ago", unread: false },
];

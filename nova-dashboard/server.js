import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import User from "./models/User.js";
import Project from "./models/Project.js";
import Task from "./models/Task.js";
import Activity from "./models/Activity.js";
import Notification from "./models/Notification.js";
import Event from "./models/Event.js";
import { protect } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nova-dashboard";

app.use(cors({ origin: ["http://localhost:5173", "https://nova-jayy8.vercel.app"] }));
app.use(express.json({ limit: "10mb" }));

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

// ---------- Small helpers ----------

function initialsOf(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const units = [
    ["y", 31536000],
    ["mo", 2592000],
    ["d", 86400],
    ["h", 3600],
    ["m", 60],
  ];
  for (const [label, secs] of units) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value}${label} ago`;
  }
  return "just now";
}

async function logActivity({ userId, action, target, detail = "", projectId = null }) {
  try {
    await Activity.create({ user: userId, action, target, detail, project: projectId });
  } catch (err) {
    console.error("Failed to log activity:", err.message);
  }
}

async function notifyUsers(userIds, { title, detail = "" }) {
  try {
    const docs = userIds.filter(Boolean).map((user) => ({ user, title, detail }));
    if (docs.length) await Notification.insertMany(docs);
  } catch (err) {
    console.error("Failed to create notifications:", err.message);
  }
}

// Turns a Project doc into the shape the frontend expects,
// with tasksTotal/tasksDone/progress computed from REAL Task documents.
async function serializeProject(project) {
  const [tasksTotal, tasksDone, membersDocs] = await Promise.all([
    Task.countDocuments({ project: project._id }),
    Task.countDocuments({ project: project._id, column: "done" }),
    User.find({ _id: { $in: project.members } }, "name"),
  ]);
  const progress = tasksTotal === 0 ? 0 : Math.round((tasksDone / tasksTotal) * 100);

  return {
    ...project.toJSON(),
    members: membersDocs.map((m) => initialsOf(m.name)),
    tasksTotal,
    tasksDone,
    progress,
  };
}

async function serializeTask(task) {
  const populated = await task.populate("assignee", "name");
  return {
    ...task.toJSON(),
    assignee: populated.assignee ? initialsOf(populated.assignee.name) : null,
  };
}

// ---------- Health check ----------

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ---------- Auth ----------

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    const user = await User.create({ name, email, password, role: role || "Member" });
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: { ...user.toJSON(), initials: user.getInitials() },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.json({
      token,
      user: { ...user.toJSON(), initials: user.getInitials() },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

app.get("/api/auth/me", protect, async (req, res) => {
  res.json({ ...req.user.toJSON(), initials: req.user.getInitials() });
});

// ---------- Dashboard ----------

app.get("/api/dashboard/summary", protect, async (req, res) => {
  try {
    const [totalProjects, activeTasks, completedTasks, teamMembers] = await Promise.all([
      Project.countDocuments({ members: req.user._id }),
      Task.countDocuments({ column: { $ne: "done" } }),
      Task.countDocuments({ column: "done" }),
      User.countDocuments(),
    ]);

    const totalTasks = activeTasks + completedTasks;
    const productivity = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    res.json({
      stats: {
        totalProjects,
        activeTasks,
        completedTasks,
        teamMembers,
        productivity,
        productivityDelta: 0,
      },
      // Simple placeholder trend until enough historical data builds up
      productivityTrend: [
        { label: "Mon", value: productivity },
        { label: "Tue", value: productivity },
        { label: "Wed", value: productivity },
        { label: "Thu", value: productivity },
        { label: "Fri", value: productivity },
        { label: "Sat", value: productivity },
        { label: "Sun", value: productivity },
      ],
      taskDistribution: [
        { label: "To-do", value: await Task.countDocuments({ column: "todo" }), color: "#7B7B8A" },
        { label: "In Progress", value: await Task.countDocuments({ column: "inprogress" }), color: "#6E56F8" },
        { label: "Completed", value: completedTasks, color: "#1FE0C2" },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// ---------- Projects ----------

app.get("/api/projects", protect, async (req, res) => {
  try {
    const projects = await Project.find({ members: req.user._id }).sort({ createdAt: -1 });
    res.json(await Promise.all(projects.map(serializeProject)));
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

app.get("/api/projects/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(await serializeProject(project));
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

app.post("/api/projects", protect, async (req, res) => {
  try {
    const { name, client, description, status, priority, deadline, memberIds = [] } = req.body;
    if (!name || !deadline) {
      return res.status(400).json({ error: "Name and deadline are required" });
    }

    const members = Array.from(new Set([req.user._id.toString(), ...memberIds]));

    const project = await Project.create({
      name,
      client,
      description,
      status,
      priority,
      deadline,
      members,
      owner: req.user._id,
    });

    await logActivity({
      userId: req.user._id,
      action: "created",
      target: project.name,
      detail: "as a new project",
      projectId: project._id,
    });
    await notifyUsers(
      members.filter((m) => m !== req.user._id.toString()),
      { title: `You were added to ${project.name}`, detail: `by ${req.user.name}` }
    );

    res.status(201).json(await serializeProject(project));
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

app.patch("/api/projects/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    Object.assign(project, req.body);
    await project.save();

    await logActivity({
      userId: req.user._id,
      action: "updated",
      target: project.name,
      projectId: project._id,
    });

    res.json(await serializeProject(project));
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// ---------- Tasks ----------

app.get("/api/projects/:id/tasks", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.id }).sort({ createdAt: 1 });
    res.json(await Promise.all(tasks.map(serializeTask)));
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

app.post("/api/projects/:id/tasks", protect, async (req, res) => {
  try {
    const { title, priority, column, due, assignee } = req.body;
    if (!title) return res.status(400).json({ error: "Task title is required" });

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const task = await Task.create({
      project: project._id,
      title,
      priority,
      column,
      due,
      assignee: assignee || null,
      createdBy: req.user._id,
    });

    await logActivity({
      userId: req.user._id,
      action: "created",
      target: task.title,
      detail: `in ${project.name}`,
      projectId: project._id,
    });

    res.status(201).json(await serializeTask(task));
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

app.patch("/api/tasks/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    const prevColumn = task.column;
    Object.assign(task, req.body);
    await task.save();

    if (req.body.column && req.body.column !== prevColumn) {
      const columnLabels = { todo: "To-do", inprogress: "In Progress", done: "Completed" };
      await logActivity({
        userId: req.user._id,
        action: task.column === "done" ? "completed" : "moved",
        target: task.title,
        detail: task.column === "done" ? "" : `to ${columnLabels[task.column]}`,
        projectId: task.project,
      });
    }

    res.json(await serializeTask(task));
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// ---------- Team ----------

app.get("/api/team", protect, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: 1 });
    const withCounts = await Promise.all(
      users.map(async (u) => {
        const tasksAssigned = await Task.countDocuments({ assignee: u._id, column: { $ne: "done" } });
        return { ...u.toJSON(), initials: u.getInitials(), tasksAssigned };
      })
    );
    res.json(withCounts);
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

app.post("/api/team/invite", protect, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and email are required" });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ error: "This person is already on the team" });

    // Temporary password — in a real product this would trigger an email invite flow
    const tempPassword = Math.random().toString(36).slice(-10);
    const user = await User.create({ name, email, password: tempPassword, role: role || "Member" });

    await logActivity({ userId: req.user._id, action: "invited", target: user.name, detail: "to the team" });

    res.status(201).json({ ...user.toJSON(), initials: user.getInitials(), tasksAssigned: 0 });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// ---------- Calendar ----------

app.get("/api/calendar/events", protect, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

app.post("/api/calendar/events", protect, async (req, res) => {
  try {
    const { title, date, type, projectId } = req.body;
    if (!title || !date) return res.status(400).json({ error: "Title and date are required" });

    const event = await Event.create({
      title,
      date,
      type,
      project: projectId || null,
      createdBy: req.user._id,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// ---------- Activity & Notifications ----------

app.get("/api/activity", protect, async (req, res) => {
  try {
    const items = await Activity.find().sort({ createdAt: -1 }).limit(50).populate("user", "name avatarColor");
    res.json(
      items.map((a) => ({
        id: a._id,
        user: a.user?.name || "Someone",
        initials: a.user ? initialsOf(a.user.name) : "?",
        color: a.user?.avatarColor || "#6E56F8",
        action: a.action,
        target: a.target,
        detail: a.detail,
        time: timeAgo(a.createdAt),
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

app.get("/api/notifications", protect, async (req, res) => {
  try {
    const items = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(30);
    res.json(
      items.map((n) => ({
        id: n._id,
        title: n.title,
        detail: n.detail,
        unread: n.unread,
        time: timeAgo(n.createdAt),
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

app.patch("/api/notifications/mark-read", protect, async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user._id, unread: true }, { unread: false });
    res.json({ updated: true });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// ---------- 404 + error handler ----------

app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`🚀 Nova backend running at http://localhost:${PORT}`);
  console.log(`📡 API base: http://localhost:${PORT}/api`);
});
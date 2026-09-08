import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Plus, Circle, Clock, CheckCircle2 } from "lucide-react";
import { Avatar, ProgressBar, PriorityTag, StatusPill, ProgressRing } from "../components/ui";
import { api } from "../lib/api";
import AddTaskModal from "../components/AddTaskModal";

const columns = [
  { key: "todo", label: "To-do", icon: Circle, color: "#7B7B8A" },
  { key: "inprogress", label: "In Progress", icon: Clock, color: "#6E56F8" },
  { key: "done", label: "Completed", icon: CheckCircle2, color: "#1FE0C2" },
];

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [modalColumn, setModalColumn] = useState(null); // which column's "Add task" was clicked

  function refresh() {
    api.projects.get(id).then(setProject).catch(() => {});
    api.projects.getTasks(id).then(setTasks).catch(() => {});
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function moveTask(taskId, newColumn) {
    try {
      await api.tasks.update(taskId, { column: newColumn });
      refresh();
    } catch {
      // ignore — UI will just not update
    }
  }

  if (!project) {
    return <div className="py-24 text-center text-ink-faint text-sm">Loading project…</div>;
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center gap-1.5 text-sm text-ink-faint hover:text-ink transition-colors"
      >
        <ArrowLeft size={15} />
        Back to projects
      </button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-white/[0.07] bg-base-300/60 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
          <div>
            <p className="text-xs text-ink-faint mb-1.5">{project.client}</p>
            <h1 className="font-display text-2xl font-semibold">{project.name}</h1>
            {project.description && (
              <p className="text-sm text-ink-faint mt-2 max-w-lg leading-relaxed">{project.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <StatusPill status={project.status} />
              <PriorityTag priority={project.priority} />
              <span className="flex items-center gap-1.5 text-xs text-ink-faint rounded-full border border-white/[0.08] px-2.5 py-1">
                <Calendar size={12} />
                Due {formatDate(project.deadline)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <ProgressRing value={project.progress} size={80} stroke={7} color="#6E56F8" />
            <div>
              <p className="text-xs text-ink-faint mb-2">Team</p>
              <div className="flex -space-x-2">
                {project.members.map((m, i) => (
                  <div key={`${m}-${i}`} className="ring-2 ring-base-300 rounded-full">
                    <Avatar initials={m} size={32} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-line">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-ink-faint">
              {project.tasksDone} of {project.tasksTotal} tasks complete
            </span>
            <span className="font-medium text-iris-400">{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} color="#6E56F8" height={7} />
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {columns.map((col, ci) => {
          const colTasks = tasks.filter((t) => t.column === col.key);
          return (
            <div key={col.key} className="rounded-2xl border border-white/[0.07] bg-base-300/40 p-4">
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <col.icon size={15} style={{ color: col.color }} />
                  <p className="text-sm font-medium">{col.label}</p>
                </div>
                <span className="text-xs text-ink-faint bg-white/[0.05] rounded-full px-2 py-0.5">
                  {colTasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {colTasks.map((t, ti) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: ci * 0.05 + ti * 0.04 }}
                    whileHover={{ y: -2 }}
                    className="rounded-xl border border-white/[0.07] bg-base-200/70 p-3.5 hover:border-white/[0.15] transition-colors"
                  >
                    <p className="text-sm text-ink leading-snug">{t.title}</p>
                    <div className="flex items-center justify-between mt-3">
                      <PriorityTag priority={t.priority} />
                      {t.assignee && <Avatar initials={t.assignee} size={24} />}
                    </div>
                    {t.due && (
                      <p className="text-[11px] text-ink-faint mt-2 flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDate(t.due)}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/[0.05]">
                      {columns
                        .filter((c) => c.key !== t.column)
                        .map((c) => (
                          <button
                            key={c.key}
                            onClick={() => moveTask(t.id, c.key)}
                            className="text-[10px] rounded-md px-2 py-1 border border-white/[0.08] text-ink-faint hover:text-ink hover:border-white/20 transition-colors"
                          >
                            Move to {c.label}
                          </button>
                        ))}
                    </div>
                  </motion.div>
                ))}
                {colTasks.length === 0 && (
                  <div className="rounded-xl border border-dashed border-white/10 py-8 text-center text-xs text-ink-faint">
                    No tasks here yet
                  </div>
                )}
                <button
                  onClick={() => setModalColumn(col.key)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/[0.1] py-2.5 text-xs text-ink-faint hover:text-ink hover:border-white/20 transition-colors"
                >
                  <Plus size={13} />
                  Add task
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AddTaskModal
        open={modalColumn !== null}
        column={modalColumn || "todo"}
        projectId={id}
        onClose={() => setModalColumn(null)}
        onCreated={() => {
          setModalColumn(null);
          refresh();
        }}
      />
    </div>
  );
}

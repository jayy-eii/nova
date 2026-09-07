import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowUpRight } from "lucide-react";
import { Avatar, ProgressBar, PriorityTag, StatusPill } from "./ui";

const progressColor = {
  "On Track": "#1FE0C2",
  "At Risk": "#FFB454",
  Delayed: "#FF6B7A",
  Completed: "#8B76FA",
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ProjectCard({ project, index = 0 }) {
  const navigate = useNavigate();
  const color = progressColor[project.status] || "#6E56F8";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/projects/${project.id}`)}
      className="group cursor-pointer relative rounded-2xl border border-white/[0.07] bg-base-300/60 p-5 hover:border-white/[0.16] transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] text-ink-faint mb-1">{project.client}</p>
          <h3 className="font-display font-semibold text-[15px] leading-snug truncate pr-2">
            {project.name}
          </h3>
        </div>
        <div className="grid place-items-center h-8 w-8 rounded-lg border border-white/[0.08] text-ink-faint opacity-0 group-hover:opacity-100 group-hover:text-ink transition-all shrink-0">
          <ArrowUpRight size={15} />
        </div>
      </div>

      <p className="text-[13px] text-ink-faint mt-2.5 line-clamp-2 leading-relaxed">
        {project.description}
      </p>

      <div className="flex items-center gap-2 mt-4">
        <StatusPill status={project.status} />
        <PriorityTag priority={project.priority} />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-ink-faint">
            {project.tasksDone}/{project.tasksTotal} tasks
          </span>
          <span className="font-medium" style={{ color }}>
            {project.progress}%
          </span>
        </div>
        <ProgressBar value={project.progress} color={color} delay={index * 0.05} />
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-line">
        <div className="flex -space-x-2">
          {project.members.slice(0, 4).map((m) => (
            <div key={m} className="ring-2 ring-base-300 rounded-full">
              <Avatar initials={m} size={26} />
            </div>
          ))}
          {project.members.length > 4 && (
            <div className="ring-2 ring-base-300 rounded-full h-[26px] w-[26px] grid place-items-center bg-white/[0.07] text-[10px] text-ink-faint">
              +{project.members.length - 4}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ink-faint">
          <Calendar size={13} />
          {formatDate(project.deadline)}
        </div>
      </div>
    </motion.article>
  );
}

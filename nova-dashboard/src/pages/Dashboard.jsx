import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderKanban, ListTodo, CheckCircle2, Users, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import StatCard from "../components/StatCard";
import ProjectCard from "../components/ProjectCard";
import { ProgressRing, Avatar } from "../components/ui";
import { api } from "../lib/api";
import { projects, activity } from "../data/mockData";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-lg px-3 py-2 text-xs">
      <p className="text-ink-faint mb-0.5">{label}</p>
      <p className="font-medium text-iris-400">{payload[0].value}% productivity</p>
    </div>
  );
}

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.dashboard.getSummary().then(setSummary);
  }, []);

  const s = summary?.stats;
  const trend = summary?.productivityTrend || [];
  const highlighted = projects.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Projects" value={s?.totalProjects ?? "—"} icon={FolderKanban} color="#6E56F8" index={0} />
        <StatCard label="Active Tasks" value={s?.activeTasks ?? "—"} icon={ListTodo} color="#FFB454" index={1} />
        <StatCard label="Completed Tasks" value={s?.completedTasks ?? "—"} icon={CheckCircle2} color="#1FE0C2" index={2} />
        <StatCard label="Team Members" value={s?.teamMembers ?? "—"} icon={Users} color="#FF6B7A" index={3} />
      </div>

      {/* Productivity + team snapshot */}
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl border border-white/[0.07] bg-base-300/60 p-5 sm:p-6"
        >
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-sm text-ink-faint">Productivity overview</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="font-display text-2xl font-semibold">{s?.productivity ?? "—"}%</h3>
                {s && (
                  <span className="flex items-center gap-1 text-xs text-jade-500 font-medium">
                    <TrendingUp size={13} />
                    +{s.productivityDelta}% this week
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="h-[200px] mt-4 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6E56F8" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#6E56F8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#7B7B8A", fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8B76FA"
                  strokeWidth={2.5}
                  fill="url(#colorProd)"
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl border border-white/[0.07] bg-base-300/60 p-5 sm:p-6 flex flex-col"
        >
          <p className="text-sm text-ink-faint mb-4">Task distribution</p>
          <div className="flex items-center gap-5">
            <ProgressRing value={s ? Math.round((s.completedTasks / (s.completedTasks + s.activeTasks)) * 100) : 0} size={92} stroke={9} color="#1FE0C2" />
            <div className="space-y-2.5 flex-1">
              <LegendRow color="#1FE0C2" label="Completed" value={s?.completedTasks} />
              <LegendRow color="#6E56F8" label="In progress" value={s?.activeTasks} />
              <LegendRow color="#7B7B8A" label="Backlog" value={26} />
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-line">
            <p className="text-xs text-ink-faint mb-3">Recent activity</p>
            <div className="space-y-3">
              {activity.slice(0, 3).map((a) => (
                <div key={a.id} className="flex items-start gap-2.5">
                  <Avatar initials={a.initials} color={a.color} size={26} />
                  <p className="text-xs text-ink-soft leading-relaxed">
                    <span className="font-medium text-ink">{a.user}</span> {a.action}{" "}
                    <span className="text-ink">{a.target}</span>
                    <span className="block text-ink-faint/70 text-[11px] mt-0.5">{a.time}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Highlighted projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold">Active projects</h2>
          <a href="/projects" className="text-sm text-iris-400 hover:text-iris-400/80">
            View all
          </a>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {highlighted.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LegendRow({ color, label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-ink-soft">
        <span className="h-2 w-2 rounded-full" style={{ background: color }} />
        {label}
      </span>
      <span className="font-medium">{value ?? "—"}</span>
    </div>
  );
}

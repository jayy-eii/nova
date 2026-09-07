import { motion } from "framer-motion";

export function Avatar({ initials, color = "#6E56F8", size = 32, ring = false }) {
  return (
    <div
      className="flex items-center justify-center rounded-full font-display font-medium shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `linear-gradient(135deg, ${color}55, ${color}22)`,
        color: "#F3F3F7",
        border: ring ? `2px solid ${color}` : `1px solid ${color}55`,
      }}
    >
      {initials}
    </div>
  );
}

const statusStyles = {
  "On Track": { bg: "rgba(31,224,194,0.12)", fg: "#1FE0C2", dot: "#1FE0C2" },
  "At Risk": { bg: "rgba(255,180,84,0.12)", fg: "#FFB454", dot: "#FFB454" },
  Delayed: { bg: "rgba(255,107,122,0.12)", fg: "#FF6B7A", dot: "#FF6B7A" },
  Completed: { bg: "rgba(139,118,250,0.14)", fg: "#8B76FA", dot: "#8B76FA" },
};

export function StatusPill({ status }) {
  const s = statusStyles[status] || statusStyles["On Track"];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ background: s.bg, color: s.fg }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />
      {status}
    </span>
  );
}

const priorityStyles = {
  Urgent: "#FF6B7A",
  High: "#FFB454",
  Medium: "#6E56F8",
  Low: "#7B7B8A",
};

export function PriorityTag({ priority }) {
  const color = priorityStyles[priority] || "#7B7B8A";
  return (
    <span
      className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium border"
      style={{ color, borderColor: `${color}40`, background: `${color}14` }}
    >
      {priority}
    </span>
  );
}

export function ProgressBar({ value, color = "#6E56F8", height = 6, delay = 0 }) {
  return (
    <div
      className="w-full rounded-full overflow-hidden bg-white/[0.06]"
      style={{ height }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function ProgressRing({ value, size = 56, stroke = 5, color = "#6E56F8" }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center font-display font-semibold"
        style={{ fontSize: size * 0.24 }}
      >
        {value}%
      </div>
    </div>
  );
}

export function IconButton({ children, className = "", ...props }) {
  return (
    <button
      className={`grid place-items-center rounded-xl h-9 w-9 border border-white/[0.07] bg-white/[0.03] text-ink-soft hover:text-ink hover:bg-white/[0.07] transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

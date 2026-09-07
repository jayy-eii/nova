import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({ label, value, icon: Icon, delta, color = "#6E56F8", index = 0 }) {
  const positive = delta === undefined ? null : delta >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-base-300/60 p-5 hover:border-white/[0.14] transition-colors"
    >
      <div
        className="absolute -top-6 -right-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-35"
        style={{ background: color }}
      />
      <div className="relative flex items-start justify-between">
        <div
          className="grid place-items-center h-10 w-10 rounded-xl"
          style={{ background: `${color}18`, color }}
        >
          <Icon size={18} strokeWidth={2.2} />
        </div>
        {delta !== undefined && (
          <span
            className={`flex items-center gap-0.5 text-xs font-medium ${
              positive ? "text-jade-500" : "text-coral"
            }`}
          >
            {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <p className="relative font-display text-[28px] font-semibold mt-4 leading-none">{value}</p>
      <p className="relative text-sm text-ink-faint mt-1.5">{label}</p>
    </motion.div>
  );
}

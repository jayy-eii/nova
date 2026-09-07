import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  FolderKanban,
  Users,
  CalendarDays,
  Bell,
  Settings,
  Sparkles,
  X,
} from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/team", label: "Team", icon: Users },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/activity", label: "Activity", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

function NavItems({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              isActive ? "text-ink" : "text-ink-faint hover:text-ink-soft"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/[0.08]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon
                size={18}
                strokeWidth={2}
                className={`relative z-10 ${isActive ? "text-iris-400" : ""}`}
              />
              <span className="relative z-10 font-medium">{label}</span>
              {isActive && (
                <span className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-iris-400" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export function SidebarDesktop() {
  return (
    <aside className="hidden lg:flex flex-col w-[248px] shrink-0 h-screen sticky top-0 border-r border-line px-3 py-6">
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-iris-400 to-iris-700 shadow-glow">
          <Sparkles size={16} className="text-white" strokeWidth={2.4} />
        </div>
        <div>
          <p className="font-display font-semibold text-[15px] leading-none">NOVA</p>
          <p className="text-[11px] text-ink-faint mt-1">Plan. Collaborate. Deliver.</p>
        </div>
      </div>

      <NavItems />

      <div className="mt-auto px-3 pt-6">
        <div className="glass rounded-2xl p-4">
          <p className="text-xs font-medium text-ink-soft mb-1">Storage used</p>
          <p className="text-[11px] text-ink-faint mb-3">7.2 GB of 10 GB</p>
          <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-iris-500 to-jade-500"
              style={{ width: "72%" }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

export function SidebarMobile({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed left-0 top-0 z-50 h-screen w-[78%] max-w-[280px] glass-strong px-3 py-6 lg:hidden flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between px-3 mb-8">
              <div className="flex items-center gap-2.5">
                <div className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-iris-400 to-iris-700">
                  <Sparkles size={16} className="text-white" strokeWidth={2.4} />
                </div>
                <p className="font-display font-semibold text-[15px]">NOVA</p>
              </div>
              <button onClick={onClose} className="text-ink-faint hover:text-ink">
                <X size={20} />
              </button>
            </div>
            <NavItems onNavigate={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

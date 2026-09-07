import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Menu, Plus, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { Avatar } from "./ui";
import { currentUser, notifications } from "../data/mockData";
import { useNavigate } from "react-router-dom";

export default function TopBar({ title, subtitle, onMenuClick }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0 pt-4 lg:pt-0">
      <div className="flex items-center gap-3 glass-strong lg:glass lg:bg-transparent lg:border-0 lg:backdrop-blur-0 rounded-2xl lg:rounded-none px-4 py-3 lg:px-0 lg:py-6">
        <button onClick={onMenuClick} className="lg:hidden text-ink-soft">
          <Menu size={22} />
        </button>

        <div className="hidden lg:block">
          <h1 className="font-display text-xl font-semibold">{title}</h1>
          {subtitle && <p className="text-sm text-ink-faint mt-0.5">{subtitle}</p>}
        </div>
        <h1 className="lg:hidden font-display text-base font-semibold">{title}</h1>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 w-56 lg:w-64 focus-within:border-iris-500/50 transition-colors">
            <Search size={16} className="text-ink-faint shrink-0" />
            <input
              type="text"
              placeholder="Search projects, tasks..."
              className="bg-transparent outline-none text-sm placeholder:text-ink-faint w-full"
            />
          </div>

          <button className="hidden sm:flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 px-3.5 py-2 text-sm font-medium text-white shadow-glow hover:brightness-110 transition-all active:scale-95">
            <Plus size={16} />
            New Project
          </button>

          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen((v) => !v)}
              className="relative grid place-items-center h-9 w-9 rounded-xl border border-white/[0.07] bg-white/[0.03] text-ink-soft hover:text-ink transition-colors"
            >
              <Bell size={17} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-coral text-[10px] font-semibold grid place-items-center text-white ring-2 ring-base">
                  {unreadCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 glass-strong rounded-2xl shadow-panel overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-line flex items-center justify-between">
                    <p className="font-medium text-sm">Notifications</p>
                    <span className="text-xs text-iris-400">{unreadCount} new</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="px-4 py-3 border-b border-line last:border-0 hover:bg-white/[0.03] transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-iris-400 mt-1.5 shrink-0" />}
                          <div className={n.unread ? "" : "pl-3.5"}>
                            <p className="text-sm text-ink leading-snug">{n.title}</p>
                            <p className="text-xs text-ink-faint mt-0.5">{n.detail}</p>
                            <p className="text-[11px] text-ink-faint/70 mt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setNotifOpen(false);
                      navigate("/activity");
                    }}
                    className="w-full text-center text-xs text-iris-400 py-2.5 hover:bg-white/[0.03] transition-colors"
                  >
                    View all activity
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] pl-1.5 pr-2 py-1.5 hover:bg-white/[0.06] transition-colors"
            >
              <Avatar initials={currentUser.initials} color={currentUser.avatarColor} size={28} />
              <ChevronDown size={14} className="text-ink-faint hidden sm:block" />
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 glass-strong rounded-2xl shadow-panel overflow-hidden p-1.5"
                >
                  <div className="px-3 py-2.5 flex items-center gap-2.5 border-b border-line mb-1.5">
                    <Avatar initials={currentUser.initials} color={currentUser.avatarColor} size={34} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{currentUser.name}</p>
                      <p className="text-xs text-ink-faint truncate">{currentUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/settings");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-soft hover:bg-white/[0.06] hover:text-ink transition-colors"
                  >
                    <User size={15} /> Profile
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/settings");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-ink-soft hover:bg-white/[0.06] hover:text-ink transition-colors"
                  >
                    <Settings size={15} /> Settings
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-coral hover:bg-coral/10 transition-colors"
                  >
                    <LogOut size={15} /> Log out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

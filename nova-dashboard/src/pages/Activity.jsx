import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCheck } from "lucide-react";
import { Avatar } from "../components/ui";
import { api } from "../lib/api";

export default function ActivityPage() {
  const [feed, setFeed] = useState([]);
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    api.activity.list().then(setFeed);
    api.activity.notifications().then(setNotifs);
  }, []);

  return (
    <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-white/[0.07] bg-base-300/60 p-5 sm:p-6"
      >
        <p className="text-sm font-medium mb-5">Recent activity</p>
        <div className="relative pl-6">
          <div className="absolute left-[9px] top-1 bottom-1 w-px bg-white/[0.08]" />
          <div className="space-y-6">
            {feed.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="relative"
              >
                <span
                  className="absolute -left-6 top-1 h-[10px] w-[10px] rounded-full ring-4 ring-base-300"
                  style={{ background: a.color }}
                />
                <div className="flex items-start gap-3">
                  <Avatar initials={a.initials} color={a.color} size={30} />
                  <div className="min-w-0">
                    <p className="text-sm text-ink-soft leading-relaxed">
                      <span className="font-medium text-ink">{a.user}</span> {a.action}{" "}
                      <span className="text-ink">{a.target}</span>{" "}
                      <span className="text-ink-faint">{a.detail}</span>
                    </p>
                    <p className="text-[11px] text-ink-faint/70 mt-1">{a.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="rounded-2xl border border-white/[0.07] bg-base-300/60 p-5 sm:p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-medium flex items-center gap-2">
            <Bell size={15} className="text-iris-400" />
            Notifications
          </p>
          <button className="flex items-center gap-1 text-[11px] text-ink-faint hover:text-ink transition-colors">
            <CheckCheck size={13} />
            Mark all read
          </button>
        </div>
        <div className="space-y-2.5">
          {notifs.map((n) => (
            <div
              key={n.id}
              className={`rounded-xl p-3.5 border transition-colors ${
                n.unread ? "border-iris-500/25 bg-iris-500/[0.06]" : "border-white/[0.06]"
              }`}
            >
              <div className="flex items-start gap-2">
                {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-iris-400 mt-1.5 shrink-0" />}
                <div className={n.unread ? "" : "pl-3.5"}>
                  <p className="text-sm text-ink leading-snug">{n.title}</p>
                  <p className="text-xs text-ink-faint mt-0.5">{n.detail}</p>
                  <p className="text-[11px] text-ink-faint/70 mt-1.5">{n.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

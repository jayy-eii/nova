import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Flag, Users } from "lucide-react";
import { api } from "../lib/api";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [cursor, setCursor] = useState(new Date(2026, 8, 1)); // September 2026

  useEffect(() => {
    api.calendar.listEvents().then(setEvents);
  }, []);

  const monthLabel = cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const days = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [cursor]);

  function eventsOn(day) {
    if (!day) return [];
    const iso = new Date(cursor.getFullYear(), cursor.getMonth(), day).toISOString().slice(0, 10);
    return events.filter((e) => e.date === iso);
  }

  const upcoming = events
    .filter((e) => new Date(e.date) >= new Date("2026-09-07"))
    .slice(0, 6);

  return (
    <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-white/[0.07] bg-base-300/60 p-5 sm:p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-semibold">{monthLabel}</h2>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
              className="grid place-items-center h-8 w-8 rounded-lg border border-white/[0.08] text-ink-faint hover:text-ink transition-colors"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
              className="grid place-items-center h-8 w-8 rounded-lg border border-white/[0.08] text-ink-faint hover:text-ink transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1.5 mb-2">
          {weekdays.map((w) => (
            <div key={w} className="text-center text-[11px] text-ink-faint py-1">
              {w}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {days.map((day, i) => {
            const evts = eventsOn(day);
            const isToday =
              day === 7 && cursor.getMonth() === 8 && cursor.getFullYear() === 2026;
            return (
              <div
                key={i}
                className={`min-h-[74px] sm:min-h-[86px] rounded-xl p-1.5 sm:p-2 border transition-colors ${
                  day
                    ? "border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03]"
                    : "border-transparent"
                } ${isToday ? "ring-1 ring-iris-500/60" : ""}`}
              >
                {day && (
                  <>
                    <p className={`text-xs mb-1 ${isToday ? "text-iris-400 font-semibold" : "text-ink-faint"}`}>
                      {day}
                    </p>
                    <div className="space-y-1">
                      {evts.slice(0, 2).map((e) => (
                        <div
                          key={e.id}
                          className="text-[10px] leading-tight px-1.5 py-1 rounded-md truncate"
                          style={{
                            background: e.type === "deadline" ? "rgba(255,107,122,0.14)" : "rgba(110,86,248,0.16)",
                            color: e.type === "deadline" ? "#FF6B7A" : "#8B76FA",
                          }}
                          title={e.title}
                        >
                          {e.title}
                        </div>
                      ))}
                      {evts.length > 2 && (
                        <p className="text-[10px] text-ink-faint pl-1">+{evts.length - 2} more</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="rounded-2xl border border-white/[0.07] bg-base-300/60 p-5 sm:p-6"
      >
        <p className="text-sm font-medium mb-4">Upcoming</p>
        <div className="space-y-3">
          {upcoming.map((e) => (
            <div key={e.id} className="flex items-start gap-3 rounded-xl border border-white/[0.06] p-3">
              <div
                className="grid place-items-center h-9 w-9 rounded-lg shrink-0"
                style={{
                  background: e.type === "deadline" ? "rgba(255,107,122,0.14)" : "rgba(110,86,248,0.16)",
                  color: e.type === "deadline" ? "#FF6B7A" : "#8B76FA",
                }}
              >
                {e.type === "deadline" ? <Flag size={15} /> : <Users size={15} />}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-ink leading-snug">{e.title}</p>
                <p className="text-[11px] text-ink-faint mt-0.5">
                  {new Date(e.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

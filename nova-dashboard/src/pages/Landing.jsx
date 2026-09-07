import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  LayoutGrid,
  FolderKanban,
  KanbanSquare,
  Users,
  CalendarDays,
  Bell,
  CheckCircle2,
} from "lucide-react";
import BackgroundDecor from "../components/BackgroundDecor";
import { ProgressBar, Avatar, StatusPill } from "../components/ui";

const features = [
  {
    icon: LayoutGrid,
    title: "One dashboard, whole picture",
    desc: "See total projects, active tasks, completed work and team productivity the moment you log in — no digging through separate tools.",
    color: "#6E56F8",
  },
  {
    icon: FolderKanban,
    title: "Projects with real progress",
    desc: "Every project shows its status, deadline, priority and completion percentage at a glance, so nothing quietly falls behind.",
    color: "#1FE0C2",
  },
  {
    icon: KanbanSquare,
    title: "Task boards that make sense",
    desc: "Break each project into To-do, In Progress and Completed columns, with priority and due dates on every card.",
    color: "#FFB454",
  },
  {
    icon: Users,
    title: "Know who's doing what",
    desc: "Team profiles show each person's role and current workload, so assigning new work is never a guessing game.",
    color: "#FF6B7A",
  },
  {
    icon: CalendarDays,
    title: "Deadlines you can actually see",
    desc: "A shared calendar pulls in every project deadline and meeting, so the whole team plans around the same dates.",
    color: "#8B76FA",
  },
  {
    icon: Bell,
    title: "Activity, not noise",
    desc: "A clean feed of what changed and who changed it — task moves, comments, completions — without the clutter.",
    color: "#1FE0C2",
  },
];

const steps = [
  {
    title: "Create a project",
    desc: "Set a name, deadline and priority. Invite the teammates who'll work on it.",
  },
  {
    title: "Break it into tasks",
    desc: "Add tasks, assign owners, set priorities — and move them across To-do, In Progress and Completed.",
  },
  {
    title: "Track it to done",
    desc: "Watch progress update automatically as tasks close, right up to launch day.",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      <BackgroundDecor />

      {/* Nav */}
      <header className="sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between glass-strong lg:glass lg:bg-transparent lg:border-0 lg:backdrop-blur-0 rounded-b-2xl lg:rounded-none">
          <div className="flex items-center gap-2.5">
            <div className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-iris-400 to-iris-700 shadow-glow">
              <Sparkles size={16} className="text-white" strokeWidth={2.4} />
            </div>
            <span className="font-display font-semibold text-[15px]">NOVA</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-ink-soft">
            <a href="#features" className="hover:text-ink transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-ink transition-colors">How it works</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium text-ink-soft hover:text-ink transition-colors px-3 py-2"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 px-4 py-2 text-sm font-medium text-white shadow-glow hover:brightness-110 active:scale-95 transition-all"
            >
              Get Started
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-xs text-ink-soft mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-jade-500" />
              Built for teams that ship
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.08]">
              Plan projects. Collaborate freely.
              <br />
              Deliver on time.
            </h1>
            <p className="text-ink-faint text-base sm:text-lg mt-5 max-w-lg leading-relaxed">
              NOVA brings your projects, tasks, team and deadlines into a single
              workspace — so your team always knows what's next and who's doing it.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 px-5 py-3 text-sm font-medium text-white shadow-glow hover:brightness-110 active:scale-95 transition-all"
              >
                Get started free
                <ArrowRight size={16} />
              </button>
              <a
                href="#how-it-works"
                className="rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-3 text-sm font-medium text-ink-soft hover:text-ink hover:bg-white/[0.06] transition-colors"
              >
                See how it works
              </a>
            </div>
          </motion.div>

          {/* Illustrative product preview — not live data */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="glass-strong rounded-2xl p-5 shadow-panel">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium">Orbit — Mobile Redesign</p>
                <StatusPill status="On Track" />
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-ink-faint">35/48 tasks</span>
                  <span className="text-jade-500 font-medium">72%</span>
                </div>
                <ProgressBar value={72} color="#1FE0C2" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {["AS", "RK", "MP", "SD"].map((m) => (
                    <div key={m} className="ring-2 ring-base-300 rounded-full">
                      <Avatar initials={m} size={26} />
                    </div>
                  ))}
                </div>
                <span className="text-xs text-ink-faint">Due Sep 28</span>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-4 sm:-right-8 glass-strong rounded-xl p-3.5 w-44 shadow-panel"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={14} className="text-jade-500" />
                <span className="text-xs font-medium">Task completed</span>
              </div>
              <p className="text-[11px] text-ink-faint leading-snug">
                Rebuild onboarding flow screens
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-6 -left-4 sm:-left-8 glass-strong rounded-xl p-3.5 w-40 shadow-panel"
            >
              <p className="text-[11px] text-ink-faint mb-1">Team productivity</p>
              <p className="font-display text-xl font-semibold text-iris-400">82%</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 border-t border-line">
        <div className="max-w-xl mb-12">
          <h2 className="font-display text-3xl font-semibold">Everything a team needs to stay in sync</h2>
          <p className="text-ink-faint mt-3 leading-relaxed">
            No separate tools for tasks, timelines and team status. NOVA keeps it
            in one place.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-white/[0.07] bg-base-300/50 p-6 hover:border-white/[0.14] transition-colors"
            >
              <div
                className="grid place-items-center h-10 w-10 rounded-xl mb-4"
                style={{ background: `${f.color}18`, color: f.color }}
              >
                <f.icon size={19} strokeWidth={2.1} />
              </div>
              <h3 className="font-display font-semibold text-[15px]">{f.title}</h3>
              <p className="text-sm text-ink-faint mt-2 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 border-t border-line">
        <div className="max-w-xl mb-12">
          <h2 className="font-display text-3xl font-semibold">From idea to delivered, in three steps</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="grid place-items-center h-9 w-9 rounded-full border border-white/[0.12] font-display text-sm text-iris-400 shrink-0">
                  {i + 1}
                </span>
                {i < steps.length - 1 && (
                  <div className="hidden sm:block h-px flex-1 bg-white/[0.08]" />
                )}
              </div>
              <h3 className="font-display font-semibold text-[16px]">{s.title}</h3>
              <p className="text-sm text-ink-faint mt-2 leading-relaxed max-w-xs">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 border-t border-line">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-iris-700/20 via-base-300 to-base p-10 sm:p-14 text-center relative overflow-hidden"
        >
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(110,86,248,0.5), transparent 70%)" }}
          />
          <h2 className="font-display text-3xl sm:text-4xl font-semibold relative">
            Start planning your next project
          </h2>
          <p className="text-ink-faint mt-3 max-w-md mx-auto relative">
            Set up your workspace and invite your team in a couple of minutes.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 px-6 py-3 text-sm font-medium text-white shadow-glow hover:brightness-110 active:scale-95 transition-all"
          >
            Get started free
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-5 sm:px-8 py-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="grid place-items-center h-6 w-6 rounded-md bg-gradient-to-br from-iris-400 to-iris-700">
            <Sparkles size={12} className="text-white" />
          </div>
          <span className="font-display font-semibold text-sm">NOVA</span>
        </div>
        <p className="text-xs text-ink-faint">Plan. Collaborate. Deliver.</p>
      </footer>
    </div>
  );
}

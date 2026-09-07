import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, Mail, Lock, User, ArrowRight, Eye, EyeOff, ArrowLeft, LayoutGrid, FolderKanban, Users, CalendarDays } from "lucide-react";
import BackgroundDecor from "../components/BackgroundDecor";

export default function Login() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Placeholder for real auth call: await api.auth.login(email, password)
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 650);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative">
      <BackgroundDecor />

      <div className="w-full max-w-[920px] grid lg:grid-cols-[1.1fr_1fr] rounded-3xl overflow-hidden border border-white/[0.08] shadow-panel glass-strong">
        {/* Left brand panel */}
        <div className="hidden lg:flex flex-col justify-between p-10 relative overflow-hidden bg-gradient-to-br from-iris-700/30 via-base-300 to-base">
          <div
            className="absolute -top-16 -left-16 h-72 w-72 rounded-full opacity-40 blur-3xl animate-float-slow"
            style={{ background: "radial-gradient(circle, rgba(110,86,248,0.5), transparent 70%)" }}
          />
          <div>
            <Link to="/" className="flex items-center gap-2.5 w-fit">
              <div className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-iris-400 to-iris-700 shadow-glow">
                <Sparkles size={17} className="text-white" />
              </div>
              <span className="font-display font-semibold text-lg">NOVA</span>
            </Link>
            <p className="text-ink-faint text-sm mt-1 ml-11">Plan. Collaborate. Deliver.</p>
          </div>

          <div className="relative z-10">
            <h2 className="font-display text-3xl font-semibold leading-tight">
              Run your team's<br />best quarter yet.
            </h2>
            <p className="text-ink-faint text-sm mt-3 max-w-[320px] leading-relaxed">
              Every project, task and teammate in one calm, focused workspace built for
              momentum.
            </p>

            <div className="mt-8 space-y-3.5">
              {[
                { icon: LayoutGrid, label: "One dashboard for every project" },
                { icon: FolderKanban, label: "Task boards with priorities & deadlines" },
                { icon: Users, label: "See who's working on what" },
                { icon: CalendarDays, label: "A shared calendar for the whole team" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-3">
                  <div className="grid place-items-center h-8 w-8 rounded-lg bg-white/[0.06] text-iris-400 shrink-0">
                    <p.icon size={15} />
                  </div>
                  <span className="text-sm text-ink-soft">{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/"
            className="relative z-10 flex items-center gap-1.5 text-xs text-ink-faint hover:text-ink-soft transition-colors w-fit"
          >
            <ArrowLeft size={12} />
            Back to home
          </Link>
        </div>

        {/* Right form panel */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <div className="lg:hidden flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-iris-400 to-iris-700">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="font-display font-semibold text-lg">NOVA</span>
            </Link>
            <Link to="/" className="text-xs text-ink-faint hover:text-ink-soft flex items-center gap-1">
              <ArrowLeft size={12} />
              Home
            </Link>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] w-fit mb-8">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="relative px-4 py-1.5 text-sm font-medium rounded-lg transition-colors"
              >
                {mode === m && (
                  <motion.span
                    layoutId="auth-toggle"
                    className="absolute inset-0 bg-iris-500 rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${mode === m ? "text-white" : "text-ink-faint"}`}>
                  {m === "login" ? "Log in" : "Sign up"}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="font-display text-2xl font-semibold">
                {mode === "login" ? "Welcome back" : "Create your workspace"}
              </h1>
              <p className="text-sm text-ink-faint mt-1.5 mb-7">
                {mode === "login"
                  ? "Log in to pick up right where your team left off."
                  : "Set up NOVA for your team in under a minute."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <Field icon={User} type="text" placeholder="Full name" required />
                )}
                <Field icon={Mail} type="email" placeholder="Work email" required />
                <div className="relative">
                  <Field
                    icon={Lock}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink-soft"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {mode === "login" && (
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 text-ink-faint cursor-pointer">
                      <input type="checkbox" className="accent-iris-500 rounded" />
                      Remember me
                    </label>
                    <a href="#" className="text-iris-400 hover:text-iris-400/80">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 py-2.5 text-sm font-medium text-white shadow-glow hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70"
                >
                  {loading ? (
                    <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  ) : (
                    <>
                      {mode === "login" ? "Log in" : "Create account"}
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-ink-faint text-center mt-6">
                {mode === "login" ? "New to NOVA?" : "Already have an account?"}{" "}
                <button
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-iris-400 font-medium hover:text-iris-400/80"
                >
                  {mode === "login" ? "Create an account" : "Log in"}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
      <input
        {...props}
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 py-2.5 text-sm placeholder:text-ink-faint outline-none focus:border-iris-500/60 focus:bg-white/[0.05] transition-colors"
      />
    </div>
  );
}

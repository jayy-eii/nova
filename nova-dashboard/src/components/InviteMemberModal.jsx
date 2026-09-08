import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, UserPlus } from "lucide-react";
import { api } from "../lib/api";

export default function InviteMemberModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({ name: "", email: "", role: "Member" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email) {
      setError("Name and email are required.");
      return;
    }
    setLoading(true);
    try {
      const member = await api.team.invite(form);
      setForm({ name: "", email: "", role: "Member" });
      onCreated(member);
    } catch (err) {
      setError(err.message || "Could not invite this person.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center px-4"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.18 }}
          >
            <div className="w-full max-w-sm glass-strong rounded-2xl p-6 shadow-panel">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="grid place-items-center h-9 w-9 rounded-xl bg-iris-500/15 text-iris-400">
                    <UserPlus size={17} />
                  </div>
                  <h2 className="font-display font-semibold text-lg">Invite member</h2>
                </div>
                <button onClick={onClose} className="text-ink-faint hover:text-ink">
                  <X size={18} />
                </button>
              </div>

              {error && (
                <div className="rounded-lg border border-coral/30 bg-coral/10 px-3 py-2 text-xs text-coral mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs text-ink-faint mb-1.5 block">Full name</label>
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm outline-none focus:border-iris-500/60 transition-colors"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-xs text-ink-faint mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm outline-none focus:border-iris-500/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-ink-faint mb-1.5 block">Role</label>
                  <input
                    value={form.role}
                    onChange={(e) => update("role", e.target.value)}
                    placeholder="e.g. Frontend Engineer"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm outline-none focus:border-iris-500/60 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 py-2.5 text-sm font-medium text-white shadow-glow hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70"
                >
                  {loading ? "Inviting…" : "Invite"}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, FolderPlus } from "lucide-react";
import { api } from "../lib/api";

export default function NewProjectModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    client: "",
    description: "",
    status: "On Track",
    priority: "Medium",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.deadline) {
      setError("Project name and deadline are required.");
      return;
    }
    setLoading(true);
    try {
      const project = await api.projects.create(form);
      setForm({ name: "", client: "", description: "", status: "On Track", priority: "Medium", deadline: "" });
      onCreated(project);
    } catch (err) {
      setError(err.message || "Could not create the project.");
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
            <div className="w-full max-w-md glass-strong rounded-2xl p-6 shadow-panel">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="grid place-items-center h-9 w-9 rounded-xl bg-iris-500/15 text-iris-400">
                    <FolderPlus size={17} />
                  </div>
                  <h2 className="font-display font-semibold text-lg">New project</h2>
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
                <Input label="Project name" value={form.name} onChange={(v) => update("name", v)} required />
                <Input label="Client / team" value={form.client} onChange={(v) => update("client", v)} placeholder="Internal" />
                <div>
                  <label className="text-xs text-ink-faint mb-1.5 block">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    rows={2}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm outline-none focus:border-iris-500/60 transition-colors resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Select label="Status" value={form.status} onChange={(v) => update("status", v)} options={["On Track", "At Risk", "Delayed", "Completed"]} />
                  <Select label="Priority" value={form.priority} onChange={(v) => update("priority", v)} options={["Low", "Medium", "High", "Urgent"]} />
                </div>
                <Input label="Deadline" type="date" value={form.deadline} onChange={(v) => update("deadline", v)} required />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 py-2.5 text-sm font-medium text-white shadow-glow hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70"
                >
                  {loading ? "Creating…" : "Create project"}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Input({ label, onChange, ...props }) {
  return (
    <div>
      <label className="text-xs text-ink-faint mb-1.5 block">{label}</label>
      <input
        {...props}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm outline-none focus:border-iris-500/60 transition-colors"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-xs text-ink-faint mb-1.5 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm outline-none focus:border-iris-500/60 transition-colors"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-base-300">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

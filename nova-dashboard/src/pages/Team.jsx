import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ListTodo, Plus, Search } from "lucide-react";
import { Avatar } from "../components/ui";
import { api } from "../lib/api";
import InviteMemberModal from "../components/InviteMemberModal";

export default function Team() {
  const [team, setTeam] = useState([]);
  const [query, setQuery] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.team
      .list()
      .then(setTeam)
      .finally(() => setLoading(false));
  }, []);

  const filtered = team.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 flex-1 max-w-sm focus-within:border-iris-500/50 transition-colors">
          <Search size={16} className="text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search team members..."
            className="bg-transparent outline-none text-sm placeholder:text-ink-faint w-full"
          />
        </div>
        <button
          onClick={() => setInviteOpen(true)}
          className="sm:ml-auto flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 px-3.5 py-2.5 text-xs font-medium text-white shadow-glow hover:brightness-110 transition-all active:scale-95"
        >
          <Plus size={15} />
          Invite Member
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-ink-faint">Loading team…</div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-white/[0.07] bg-base-300/60 p-5 hover:border-white/[0.15] transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <Avatar initials={m.initials} color={m.avatarColor} size={48} ring />
                <div className="min-w-0">
                  <p className="font-display font-semibold text-[15px] truncate">{m.name}</p>
                  <p className="text-xs text-ink-faint mt-0.5">{m.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 text-xs text-ink-faint">
                <Mail size={13} />
                <span className="truncate">{m.email}</span>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-line">
                <span className="flex items-center gap-1.5 text-xs text-ink-soft">
                  <ListTodo size={13} style={{ color: m.avatarColor }} />
                  {m.tasksAssigned} tasks assigned
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <InviteMemberModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onCreated={(member) => {
          setTeam((prev) => [...prev, member]);
          setInviteOpen(false);
        }}
      />
    </div>
  );
}

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/mockData";

const filters = ["All", "On Track", "At Risk", "Delayed", "Completed"];

export default function Projects() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = filter === "All" || p.status === filter;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 flex-1 max-w-sm focus-within:border-iris-500/50 transition-colors">
          <Search size={16} className="text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="bg-transparent outline-none text-sm placeholder:text-ink-faint w-full"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f ? "text-white" : "text-ink-faint hover:text-ink-soft"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 bg-iris-500 rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </div>

        <button className="hidden sm:flex items-center gap-1.5 ml-auto rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-xs font-medium text-ink-soft hover:text-ink transition-colors">
          <SlidersHorizontal size={14} />
          Sort
        </button>
        <button className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 px-3.5 py-2.5 text-xs font-medium text-white shadow-glow hover:brightness-110 transition-all active:scale-95">
          <Plus size={15} />
          New Project
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">
          <p className="text-ink-soft font-medium">No projects match that search</p>
          <p className="text-sm text-ink-faint mt-1">Try a different name or clear your filters.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

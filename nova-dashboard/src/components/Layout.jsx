import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarDesktop, SidebarMobile } from "./Sidebar";
import TopBar from "./TopBar";
import BackgroundDecor from "./BackgroundDecor";

const titles = {
  "/dashboard": { title: "Dashboard", subtitle: "Welcome back — here's how your team is doing." },
  "/projects": { title: "Projects", subtitle: "Every initiative your team is shipping right now." },
  "/team": { title: "Team Members", subtitle: "Roles, workloads and who's building what." },
  "/calendar": { title: "Calendar", subtitle: "Deadlines and meetings across all projects." },
  "/activity": { title: "Activity", subtitle: "The latest updates from across your workspace." },
  "/settings": { title: "Settings", subtitle: "Manage your profile, workspace and preferences." },
};

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const base = "/" + location.pathname.split("/")[1];
  const meta = titles[base] || { title: "NOVA" };

  return (
    <div className="min-h-screen">
      <BackgroundDecor />
      <div className="flex">
        <SidebarDesktop />
        <SidebarMobile open={mobileOpen} onClose={() => setMobileOpen(false)} />

        <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 pb-16">
          <TopBar title={meta.title} subtitle={meta.subtitle} onMenuClick={() => setMobileOpen(true)} />
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 lg:mt-2"
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

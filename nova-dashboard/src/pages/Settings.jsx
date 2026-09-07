import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bell, Palette, Shield, Camera } from "lucide-react";
import { Avatar } from "../components/ui";
import { currentUser } from "../data/mockData";

const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "appearance", label: "Appearance", icon: Palette },
  { key: "security", label: "Security", icon: Shield },
];

export default function Settings() {
  const [tab, setTab] = useState("profile");

  return (
    <div className="grid lg:grid-cols-[220px_1fr] gap-4">
      <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`relative shrink-0 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
              tab === key ? "text-ink" : "text-ink-faint hover:text-ink-soft"
            }`}
          >
            {tab === key && (
              <motion.span
                layoutId="settings-tab"
                className="absolute inset-0 bg-white/[0.06] border border-white/[0.08] rounded-xl"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <Icon size={16} className={`relative z-10 ${tab === key ? "text-iris-400" : ""}`} />
            <span className="relative z-10 font-medium whitespace-nowrap">{label}</span>
          </button>
        ))}
      </nav>

      <div className="rounded-2xl border border-white/[0.07] bg-base-300/60 p-5 sm:p-7 min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "profile" && <ProfileTab />}
            {tab === "notifications" && <NotificationsTab />}
            {tab === "appearance" && <AppearanceTab />}
            {tab === "security" && <SecurityTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-ink-faint mt-1">{subtitle}</p>}
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-xs text-ink-faint mb-1.5 block">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm outline-none focus:border-iris-500/60 focus:bg-white/[0.05] transition-colors"
      />
    </label>
  );
}

function ProfileTab() {
  return (
    <div>
      <SectionHeader title="Profile" subtitle="Update your photo and personal details." />
      <div className="flex items-center gap-4 mb-7">
        <div className="relative">
          <Avatar initials={currentUser.initials} color={currentUser.avatarColor} size={72} />
          <button className="absolute -bottom-1 -right-1 grid place-items-center h-7 w-7 rounded-full bg-iris-500 text-white border-2 border-base-300">
            <Camera size={13} />
          </button>
        </div>
        <div>
          <p className="font-medium">{currentUser.name}</p>
          <p className="text-xs text-ink-faint mt-0.5">{currentUser.role}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" defaultValue={currentUser.name} />
        <Field label="Role" defaultValue={currentUser.role} />
        <Field label="Email" defaultValue={currentUser.email} type="email" />
        <Field label="Phone" placeholder="+91 98765 43210" />
      </div>
      <div className="mt-7 flex justify-end">
        <button className="rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 px-5 py-2.5 text-sm font-medium text-white shadow-glow hover:brightness-110 active:scale-95 transition-all">
          Save changes
        </button>
      </div>
    </div>
  );
}

function Toggle({ label, description, defaultChecked = false }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-line last:border-0">
      <div>
        <p className="text-sm text-ink">{label}</p>
        {description && <p className="text-xs text-ink-faint mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${
          on ? "bg-iris-500" : "bg-white/[0.12]"
        }`}
      >
        <motion.span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white"
          animate={{ left: on ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        />
      </button>
    </div>
  );
}

function NotificationsTab() {
  return (
    <div>
      <SectionHeader title="Notifications" subtitle="Choose what you're notified about, and how." />
      <Toggle label="Task assigned to me" description="Get notified when someone assigns you a task." defaultChecked />
      <Toggle label="Comments & mentions" description="Notify me when someone mentions me in a comment." defaultChecked />
      <Toggle label="Deadline reminders" description="Remind me 24 hours before a task is due." defaultChecked />
      <Toggle label="Weekly summary email" description="A digest of your team's progress every Monday." />
      <Toggle label="Project status changes" description="Notify me when a project's status changes." />
    </div>
  );
}

function AppearanceTab() {
  const themes = [
    { key: "dark", label: "Midnight", swatch: "linear-gradient(135deg,#0C0C13,#1C1C27)" },
    { key: "iris", label: "Iris", swatch: "linear-gradient(135deg,#3F2CB0,#6E56F8)" },
    { key: "jade", label: "Jade", swatch: "linear-gradient(135deg,#0E5C50,#1FE0C2)" },
  ];
  const [selected, setSelected] = useState("dark");
  return (
    <div>
      <SectionHeader title="Appearance" subtitle="NOVA is designed dark-first for focus. Pick an accent." />
      <div className="grid grid-cols-3 gap-3 max-w-md">
        {themes.map((t) => (
          <button
            key={t.key}
            onClick={() => setSelected(t.key)}
            className={`rounded-xl overflow-hidden border-2 transition-colors ${
              selected === t.key ? "border-iris-500" : "border-transparent"
            }`}
          >
            <div className="h-16" style={{ background: t.swatch }} />
            <p className="text-xs py-2 bg-white/[0.03]">{t.label}</p>
          </button>
        ))}
      </div>
      <div className="mt-7 max-w-md">
        <span className="text-xs text-ink-faint mb-1.5 block">Interface density</span>
        <input type="range" min="0" max="100" defaultValue="60" className="w-full" />
        <div className="flex justify-between text-[11px] text-ink-faint mt-1">
          <span>Compact</span>
          <span>Comfortable</span>
        </div>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div>
      <SectionHeader title="Security" subtitle="Manage your password and account access." />
      <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
        <Field label="Current password" type="password" placeholder="••••••••" />
        <div />
        <Field label="New password" type="password" placeholder="••••••••" />
        <Field label="Confirm new password" type="password" placeholder="••••••••" />
      </div>
      <div className="mt-7 flex justify-end max-w-xl">
        <button className="rounded-xl bg-gradient-to-br from-iris-500 to-iris-700 px-5 py-2.5 text-sm font-medium text-white shadow-glow hover:brightness-110 active:scale-95 transition-all">
          Update password
        </button>
      </div>
      <div className="mt-8 pt-6 border-t border-line max-w-xl">
        <Toggle label="Two-factor authentication" description="Add an extra layer of security to your account." />
      </div>
    </div>
  );
}

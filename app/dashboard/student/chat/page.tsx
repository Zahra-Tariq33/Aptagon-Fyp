"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/app/dashboard/_components/DashboardShell";
import ChatPanel from "@/app/dashboard/_components/ChatPanel";

const links = [
  { href: "/dashboard/student", label: "Overview" },
  { href: "/dashboard/student/courses", label: "My Courses" },
  { href: "/dashboard/student/assignments", label: "Assignments" },
  { href: "/dashboard/student/meetings", label: "Meetings" },
  { href: "/dashboard/student/chat", label: "Chat" },
  { href: "/dashboard/student/fees", label: "Fee Structure" },
  { href: "/dashboard/student/progress", label: "Progress" },
];

type UserRow = { _id: string; name: string; email: string };

export default function StudentChatPage() {
  const [teachers, setTeachers] = useState<UserRow[]>([]);
  const [admins, setAdmins] = useState<UserRow[]>([]);
  const [peerId, setPeerId] = useState("");
  const [tab, setTab] = useState<"teacher" | "admin">("teacher");

  useEffect(() => {
    Promise.all([
      fetch("/api/users?role=teacher", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/users?role=admin", { credentials: "include" }).then((r) => r.json()),
    ]).then(([t, a]) => {
      setTeachers(t.users ?? []);
      setAdmins(a.users ?? []);
      const first = (t.users ?? [])[0];
      if (first) setPeerId(String(first._id));
    });
  }, []);

  const list = tab === "teacher" ? teachers : admins;
  const peer = list.find((u) => u._id === peerId);

  useEffect(() => {
    const next = tab === "teacher" ? teachers : admins;
    const first = next[0];
    if (first) setPeerId(String(first._id));
  }, [tab, teachers, admins]);

  return (
    <DashboardShell title="Student · Chat" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Messages</h2>
      <div className="mt-4 flex gap-2 text-sm">
        <button type="button" className={`rounded-lg px-3 py-1 font-semibold ${tab === "teacher" ? "bg-teal-600 text-white" : "border border-slate-200"}`} onClick={() => setTab("teacher")}>
          Teachers
        </button>
        <button type="button" className={`rounded-lg px-3 py-1 font-semibold ${tab === "admin" ? "bg-teal-600 text-white" : "border border-slate-200"}`} onClick={() => setTab("admin")}>
          Admin
        </button>
      </div>
      <select className="mt-4 rounded-lg border px-3 py-2 text-sm" value={peerId} onChange={(e) => setPeerId(e.target.value)}>
        {list.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>
      {peerId && list.length > 0 ? (
        <div className="mt-6">
          <ChatPanel peerId={peerId} subtitle={peer?.name} />
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-500">No staff available to message yet.</p>
      )}
    </DashboardShell>
  );
}

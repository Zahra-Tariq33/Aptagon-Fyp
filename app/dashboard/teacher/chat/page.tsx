"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/app/dashboard/_components/DashboardShell";
import ChatPanel from "@/app/dashboard/_components/ChatPanel";

const links = [
  { href: "/dashboard/teacher", label: "Overview" },
  { href: "/dashboard/teacher/courses", label: "My Courses" },
  { href: "/dashboard/teacher/lectures", label: "Lectures" },
  { href: "/dashboard/teacher/assignments", label: "Assignments" },
  { href: "/dashboard/teacher/meetings", label: "Meetings" },
  { href: "/dashboard/teacher/chat", label: "Chat" },
  { href: "/dashboard/teacher/earnings", label: "Earnings" },
];

type UserRow = { _id: string; name: string; email: string };

export default function TeacherChatPage() {
  const [students, setStudents] = useState<UserRow[]>([]);
  const [peerId, setPeerId] = useState("");

  useEffect(() => {
    fetch("/api/users", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        const list: UserRow[] = d.users ?? [];
        setStudents(list);
        if (list[0]) setPeerId(String(list[0]._id));
      });
  }, []);

  const peer = students.find((s) => s._id === peerId);

  return (
    <DashboardShell title="Teacher · Chat" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Chat with students</h2>
      <select className="mt-4 rounded-lg border px-3 py-2 text-sm" value={peerId} onChange={(e) => setPeerId(e.target.value)}>
        {students.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name} · {s.email}
          </option>
        ))}
      </select>
      {peerId ? <div className="mt-6"><ChatPanel peerId={peerId} subtitle={peer?.name} /></div> : <p className="mt-4 text-sm text-slate-500">No students registered yet.</p>}
    </DashboardShell>
  );
}

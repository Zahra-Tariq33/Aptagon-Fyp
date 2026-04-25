"use client";

import { FormEvent, useEffect, useState } from "react";
import DashboardShell from "@/app/dashboard/_components/DashboardShell";

const links = [
  { href: "/dashboard/student", label: "Overview" },
  { href: "/dashboard/student/courses", label: "My Courses" },
  { href: "/dashboard/student/assignments", label: "Assignments" },
  { href: "/dashboard/student/meetings", label: "Meetings" },
  { href: "/dashboard/student/chat", label: "Chat" },
  { href: "/dashboard/student/fees", label: "Fee Structure" },
  { href: "/dashboard/student/progress", label: "Progress" },
];

export default function StudentMeetingsPage() {
  const [teachers, setTeachers] = useState<{ _id: string; name: string }[]>([]);
  const [meetings, setMeetings] = useState<Record<string, unknown>[]>([]);
  const [teacherId, setTeacherId] = useState("");
  const [topic, setTopic] = useState("");

  async function refresh() {
    const [u, m] = await Promise.all([
      fetch("/api/users?role=teacher", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/meetings", { credentials: "include" }).then((r) => r.json()),
    ]);
    const tlist = u.users ?? [];
    setTeachers(tlist);
    if (!teacherId && tlist[0]) setTeacherId(String(tlist[0]._id));
    setMeetings(m.meetings ?? []);
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/meetings", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teacherId, topic }),
    });
    setTopic("");
    void refresh();
  }

  return (
    <DashboardShell title="Student · Meetings" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Request a session</h2>
      <form onSubmit={onSubmit} className="mt-6 grid max-w-lg gap-3">
        <select className="rounded-lg border px-3 py-2 text-sm" value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
          {teachers.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>
        <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Topic / objective" value={topic} onChange={(e) => setTopic(e.target.value)} required />
        <button type="submit" className="rounded-lg bg-teal-600 py-2 text-sm font-semibold text-white hover:bg-teal-700">
          Send request
        </button>
      </form>
      <ul className="mt-8 space-y-2 text-sm">
        {meetings.map((m) => (
          <li key={String(m._id)} className="rounded-lg border border-slate-100 px-3 py-2">
            {String(m.topic)} — <span className="text-slate-600">{String(m.status)}</span>
            {m.scheduledFor ? <span className="ml-2 text-teal-700">{String(m.scheduledFor)}</span> : null}
          </li>
        ))}
      </ul>
    </DashboardShell>
  );
}

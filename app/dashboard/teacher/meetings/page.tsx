"use client";

import { FormEvent, useEffect, useState } from "react";
import DashboardShell from "@/app/dashboard/_components/DashboardShell";

const links = [
  { href: "/dashboard/teacher", label: "Overview" },
  { href: "/dashboard/teacher/courses", label: "My Courses" },
  { href: "/dashboard/teacher/lectures", label: "Lectures" },
  { href: "/dashboard/teacher/assignments", label: "Assignments" },
  { href: "/dashboard/teacher/meetings", label: "Meetings" },
  { href: "/dashboard/teacher/chat", label: "Chat" },
  { href: "/dashboard/teacher/earnings", label: "Earnings" },
];

export default function TeacherMeetingsPage() {
  const [meetings, setMeetings] = useState<Record<string, unknown>[]>([]);
  const [scheduleFor, setScheduleFor] = useState("");

  async function refresh() {
    const r = await fetch("/api/meetings", { credentials: "include" });
    const d = await r.json();
    setMeetings(d.meetings ?? []);
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function approve(id: string) {
    const iso = scheduleFor ? new Date(scheduleFor).toISOString() : new Date(Date.now() + 86400000).toISOString();
    await fetch(`/api/meetings/${id}/approve`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scheduledFor: iso }),
    });
    void refresh();
  }

  async function reject(id: string) {
    await fetch(`/api/meetings/${id}/reject`, { method: "POST", credentials: "include" });
    void refresh();
  }

  return (
    <DashboardShell title="Teacher · Meetings" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Schedule with students</h2>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <label>
          Default slot (ISO local):{" "}
          <input className="rounded border px-2 py-1" type="datetime-local" value={scheduleFor} onChange={(e) => setScheduleFor(e.target.value)} />
        </label>
      </div>
      <ul className="mt-6 space-y-3 text-sm">
        {meetings.map((m) => (
          <li key={String(m._id)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="font-medium">{String(m.topic)}</div>
            <div className="text-slate-600">Status: {String(m.status)}</div>
            {String(m.status) === "requested" && (
              <div className="mt-2 flex flex-wrap gap-2">
                <button type="button" className="rounded-lg bg-teal-600 px-3 py-1 text-xs font-semibold text-white hover:bg-teal-700" onClick={() => void approve(String(m._id))}>
                  Approve & schedule{" "}
                </button>
                <button type="button" className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold hover:bg-slate-100" onClick={() => void reject(String(m._id))}>
                  Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </DashboardShell>
  );
}

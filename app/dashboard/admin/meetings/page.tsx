"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/app/dashboard/_components/DashboardShell";

const links = [
  { href: "/dashboard/admin", label: "Overview" },
  { href: "/dashboard/admin/courses", label: "Manage Courses" },
  { href: "/dashboard/admin/users", label: "Teachers & Students" },
  { href: "/dashboard/admin/payments", label: "Payments & Fees" },
  { href: "/dashboard/admin/blogs", label: "Blogs" },
  { href: "/dashboard/admin/meetings", label: "Meetings" },
  { href: "/dashboard/admin/chat", label: "Chat" },
];

export default function AdminMeetingsPage() {
  const [meetings, setMeetings] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    fetch("/api/meetings", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setMeetings(d.meetings ?? []));
  }, []);

  return (
    <DashboardShell title="Admin · Meetings" links={links}>
      <h2 className="text-xl font-bold text-slate-900">All meeting requests</h2>
      <ul className="mt-6 space-y-2 text-sm">
        {meetings.map((m) => (
          <li key={String(m._id)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="font-medium">{String(m.topic)}</span>
            <span className="ml-2 text-slate-500">· {String(m.status)}</span>
          </li>
        ))}
      </ul>
    </DashboardShell>
  );
}

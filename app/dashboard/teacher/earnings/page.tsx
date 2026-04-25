"use client";

import { useEffect, useState } from "react";
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

export default function TeacherEarningsPage() {
  const [stats, setStats] = useState<{ estimatedEarnings: number; enrollments: number; courseCount: number } | null>(null);

  useEffect(() => {
    fetch("/api/teacher/earnings", { credentials: "include" })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  return (
    <DashboardShell title="Teacher · Earnings" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Estimated earnings</h2>
      <p className="mt-1 text-sm text-slate-600">Calculated as course fee × number of enrolled students on your courses.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <article className="rounded-xl border border-slate-200 p-4">
          <div className="text-sm text-slate-500">Estimate</div>
          <div className="text-2xl font-bold text-teal-700">{stats ? `$${stats.estimatedEarnings.toFixed(2)}` : "—"}</div>
        </article>
        <article className="rounded-xl border border-slate-200 p-4">
          <div className="text-sm text-slate-500">Total enrollments</div>
          <div className="text-2xl font-bold text-slate-900">{stats?.enrollments ?? "—"}</div>
        </article>
        <article className="rounded-xl border border-slate-200 p-4">
          <div className="text-sm text-slate-500">Courses</div>
          <div className="text-2xl font-bold text-slate-900">{stats?.courseCount ?? "—"}</div>
        </article>
      </div>
    </DashboardShell>
  );
}

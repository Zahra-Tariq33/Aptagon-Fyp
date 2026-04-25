"use client";

import { useEffect, useState } from "react";
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

export default function StudentProgressPage() {
  const [rows, setRows] = useState<{ courseId: string; title: string; lectureCount: number; fee: number }[]>([]);

  useEffect(() => {
    fetch("/api/student/progress", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setRows(d.progress ?? []));
  }, []);

  return (
    <DashboardShell title="Student · Progress" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Learning progress</h2>
      <p className="mt-1 text-sm text-slate-600">Track content available per enrolled course.</p>
      <ul className="mt-6 space-y-3 text-sm">
        {rows.map((r) => (
          <li key={r.courseId} className="rounded-xl border border-slate-200 p-4">
            <div className="font-semibold text-slate-900">{r.title}</div>
            <div className="mt-1 text-slate-600">
              {r.lectureCount} lectures · ${r.fee}
            </div>
          </li>
        ))}
        {rows.length === 0 && <li className="text-slate-500">Enroll in a course to see progress.</li>}
      </ul>
    </DashboardShell>
  );
}

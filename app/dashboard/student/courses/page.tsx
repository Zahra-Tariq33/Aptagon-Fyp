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

type Course = { _id: string; title: string; description: string; fee: number };

export default function StudentCoursesPage() {
  const [catalog, setCatalog] = useState<Course[]>([]);
  const [mine, setMine] = useState<Course[]>([]);

  async function refresh() {
    const [pub, enrolled] = await Promise.all([
      fetch("/api/courses?catalog=1").then((r) => r.json()),
      fetch("/api/courses", { credentials: "include" }).then((r) => r.json()),
    ]);
    setCatalog(pub.courses ?? []);
    setMine(enrolled.courses ?? []);
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function enroll(id: string) {
    await fetch(`/api/courses/${id}/enroll`, { method: "POST", credentials: "include" });
    void refresh();
  }

  return (
    <DashboardShell title="Student · Courses" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Enroll & learn</h2>
      <h3 className="mt-6 font-semibold text-slate-800">My enrollments</h3>
      <ul className="mt-2 space-y-2 text-sm">
        {mine.map((c) => (
          <li key={c._id} className="rounded-lg border border-teal-100 bg-teal-50/50 px-3 py-2">
            {c.title}
          </li>
        ))}
        {mine.length === 0 && <li className="text-slate-500">You have not enrolled yet.</li>}
      </ul>
      <h3 className="mt-8 font-semibold text-slate-800">Catalog</h3>
      <div className="mt-2 space-y-3">
        {catalog.map((c) => (
          <div key={c._id} className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-semibold text-slate-900">{c.title}</div>
              <div className="text-xs text-slate-500 line-clamp-2">{c.description}</div>
              <div className="text-sm font-bold text-teal-700">${c.fee}</div>
            </div>
            <button type="button" className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700" onClick={() => void enroll(c._id)}>
              Enroll
            </button>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

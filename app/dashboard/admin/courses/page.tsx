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

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    fetch("/api/courses", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setCourses(d.courses ?? []));
  }, []);

  return (
    <DashboardShell title="Admin · Courses" links={links}>
      <h2 className="text-xl font-bold text-slate-900">All courses</h2>
      <p className="mt-1 text-sm text-slate-600">Review publishing status, pricing, and ownership.</p>
      <ul className="mt-6 space-y-3">
        {courses.map((c) => (
          <li key={String(c._id)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
            <span className="font-semibold text-slate-900">{String(c.title)}</span>
            <span className="ml-2 text-slate-500">fee ${Number(c.fee)}</span>
            <span className="ml-2 text-teal-700">{c.published ? "published" : "draft"}</span>
          </li>
        ))}
      </ul>
    </DashboardShell>
  );
}

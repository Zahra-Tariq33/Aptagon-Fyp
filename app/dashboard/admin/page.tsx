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

type Analytics = {
  teachers: number;
  students: number;
  courses: number;
  meetings: number;
  messages: number;
  assignments: number;
  revenue: number;
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => {
    fetch("/api/analytics", { credentials: "include" })
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  return (
    <DashboardShell title="Admin Dashboard" links={links}>
      <h2 className="text-2xl font-bold text-slate-900">Platform analytics</h2>
      <p className="mt-2 text-slate-600">Operational overview powered by your MongoDB data.</p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-800">Teachers</h3>
          <p className="mt-2 text-2xl font-bold text-teal-700">{data?.teachers ?? "—"}</p>
        </article>
        <article className="rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-800">Students</h3>
          <p className="mt-2 text-2xl font-bold text-teal-700">{data?.students ?? "—"}</p>
        </article>
        <article className="rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-800">Courses</h3>
          <p className="mt-2 text-2xl font-bold text-teal-700">{data?.courses ?? "—"}</p>
        </article>
        <article className="rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-800">Paid revenue</h3>
          <p className="mt-2 text-2xl font-bold text-teal-700">{data ? `$${data.revenue}` : "—"}</p>
        </article>
        <article className="rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-800">Meetings</h3>
          <p className="mt-2 text-2xl font-bold text-slate-800">{data?.meetings ?? "—"}</p>
        </article>
        <article className="rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-800">Messages</h3>
          <p className="mt-2 text-2xl font-bold text-slate-800">{data?.messages ?? "—"}</p>
        </article>
        <article className="rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-800">Assignments</h3>
          <p className="mt-2 text-2xl font-bold text-slate-800">{data?.assignments ?? "—"}</p>
        </article>
      </div>
    </DashboardShell>
  );
}

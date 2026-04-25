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

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState({ title: "", description: "", fee: "0", published: false });

  async function refresh() {
    const r = await fetch("/api/courses", { credentials: "include" });
    const d = await r.json();
    setCourses(d.courses ?? []);
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/courses", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        fee: Number(form.fee),
        published: form.published,
      }),
    });
    setForm({ title: "", description: "", fee: "0", published: false });
    void refresh();
  }

  return (
    <DashboardShell title="Teacher · Courses" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Create & manage courses</h2>
      <form onSubmit={onSubmit} className="mt-6 grid max-w-lg gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
        <textarea className="min-h-[100px] rounded-lg border px-3 py-2 text-sm" placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required />
        <input className="rounded-lg border px-3 py-2 text-sm" type="number" value={form.fee} onChange={(e) => setForm((f) => ({ ...f, fee: e.target.value }))} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />
          Published (visible in catalog)
        </label>
        <button type="submit" className="rounded-lg bg-teal-600 py-2 text-sm font-semibold text-white hover:bg-teal-700">
          Save course
        </button>
      </form>
      <ul className="mt-8 space-y-2 text-sm">
        {courses.map((c) => (
          <li key={String(c._id)} className="rounded-lg border border-slate-100 bg-white px-3 py-2">
            {String(c.title)} — {c.published ? "published" : "draft"}
          </li>
        ))}
      </ul>
    </DashboardShell>
  );
}

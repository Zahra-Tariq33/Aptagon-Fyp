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

export default function TeacherAssignmentsPage() {
  const [courses, setCourses] = useState<{ _id: string; title: string }[]>([]);
  const [assignments, setAssignments] = useState<Record<string, unknown>[]>([]);
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function refresh() {
    const [cRes, aRes] = await Promise.all([
      fetch("/api/courses", { credentials: "include" }),
      fetch("/api/assignments", { credentials: "include" }),
    ]);
    const c = await cRes.json();
    const a = await aRes.json();
    setCourses(c.courses ?? []);
    setAssignments(a.assignments ?? []);
    if (!courseId && c.courses?.[0]) setCourseId(String(c.courses[0]._id));
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/assignments", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId, title, description }),
    });
    setTitle("");
    setDescription("");
    void refresh();
  }

  return (
    <DashboardShell title="Teacher · Assignments" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Assignments</h2>
      <form onSubmit={onSubmit} className="mt-6 grid max-w-lg gap-3">
        <select className="rounded-lg border px-3 py-2 text-sm" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
        <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="min-h-[90px] rounded-lg border px-3 py-2 text-sm" placeholder="Description / instructions" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit" className="rounded-lg bg-teal-600 py-2 text-sm font-semibold text-white hover:bg-teal-700">
          Create assignment
        </button>
      </form>
      <ul className="mt-8 space-y-2 text-sm">
        {assignments.map((x) => (
          <li key={String(x._id)} className="rounded-lg border border-slate-100 px-3 py-2">
            {String(x.title)} — course {String(x.courseId)}
          </li>
        ))}
      </ul>
    </DashboardShell>
  );
}

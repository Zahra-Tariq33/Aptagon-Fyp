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

export default function TeacherLecturesPage() {
  const [courses, setCourses] = useState<{ _id: string; title: string; lectures?: { title: string; videoUrl: string }[] }[]>([]);
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  async function refresh() {
    const r = await fetch("/api/courses", { credentials: "include" });
    const d = await r.json();
    const list = d.courses ?? [];
    setCourses(list);
    if (!courseId && list[0]) setCourseId(String(list[0]._id));
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!courseId) return;
    await fetch(`/api/courses/${courseId}/lectures`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, videoUrl }),
    });
    setTitle("");
    setVideoUrl("");
    void refresh();
  }

  const selected = courses.find((c) => c._id === courseId);

  return (
    <DashboardShell title="Teacher · Lectures" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Upload lectures</h2>
      <form onSubmit={onSubmit} className="mt-6 grid max-w-lg gap-3">
        <select className="rounded-lg border px-3 py-2 text-sm" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
        <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Lecture title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required />
        <button type="submit" className="rounded-lg bg-teal-600 py-2 text-sm font-semibold text-white hover:bg-teal-700">
          Add lecture
        </button>
      </form>
      {selected?.lectures && selected.lectures.length > 0 && (
        <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm">
          {selected.lectures.map((lec, i) => (
            <li key={i}>
              {lec.title} — <span className="text-slate-500">{lec.videoUrl}</span>
            </li>
          ))}
        </ol>
      )}
    </DashboardShell>
  );
}

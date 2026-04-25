"use client";

import { FormEvent, useEffect, useState } from "react";
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

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<Record<string, unknown>[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  async function refresh() {
    const r = await fetch("/api/assignments", { credentials: "include" });
    const d = await r.json();
    setAssignments(d.assignments ?? []);
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function submit(id: string, e: FormEvent) {
    e.preventDefault();
    await fetch(`/api/assignments/${id}/submit`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: answers[id] || "" }),
    });
    setAnswers((a) => ({ ...a, [id]: "" }));
    void refresh();
  }

  return (
    <DashboardShell title="Student · Assignments" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Submit coursework</h2>
      <div className="mt-6 space-y-6">
        {assignments.map((a) => (
          <div key={String(a._id)} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">{String(a.title)}</h3>
            <p className="mt-1 text-sm text-slate-600">{String(a.description)}</p>
            <form
              className="mt-3 flex flex-col gap-2"
              onSubmit={(e) => void submit(String(a._id), e)}
            >
              <textarea className="min-h-[80px] rounded-lg border px-3 py-2 text-sm" placeholder="Your answer" value={answers[String(a._id)] ?? ""} onChange={(e) => setAnswers((x) => ({ ...x, [String(a._id)]: e.target.value }))} required />
              <button type="submit" className="w-fit rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700">
                Submit
              </button>
            </form>
            {Array.isArray(a.submissions) && (a.submissions as unknown[]).length > 0 && (
              <p className="mt-2 text-xs text-teal-700">Submitted · {(a.submissions as unknown[]).length} update(s)</p>
            )}
          </div>
        ))}
        {assignments.length === 0 && <p className="text-sm text-slate-500">No assignments for your enrolled courses.</p>}
      </div>
    </DashboardShell>
  );
}

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

export default function StudentFeesPage() {
  const [payments, setPayments] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    fetch("/api/payments", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setPayments(d.payments ?? []));
  }, []);

  return (
    <DashboardShell title="Student · Fees" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Fee structure & billing</h2>
      <p className="mt-1 text-sm text-slate-600">Records created by administrators appear here.</p>
      <ul className="mt-6 space-y-2 text-sm">
        {payments.map((p) => (
          <li key={String(p._id)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="font-medium">{String(p.label)}</span> · ${Number(p.amount)} · <span className="capitalize">{String(p.status)}</span>
          </li>
        ))}
        {payments.length === 0 && <li className="text-slate-500">No billing records yet.</li>}
      </ul>
    </DashboardShell>
  );
}

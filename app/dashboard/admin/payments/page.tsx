"use client";

import { FormEvent, useEffect, useState } from "react";
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

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState({ studentId: "", amount: "", label: "", status: "pending" as "pending" | "paid" });

  async function refresh() {
    const r = await fetch("/api/payments", { credentials: "include" });
    const d = await r.json();
    setPayments(d.payments ?? []);
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/payments", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: form.studentId,
        amount: Number(form.amount),
        label: form.label,
        status: form.status,
      }),
    });
    setForm({ studentId: "", amount: "", label: "", status: "pending" });
    void refresh();
  }

  return (
    <DashboardShell title="Admin · Payments" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Fee structure & payments</h2>
      <p className="mt-1 text-sm text-slate-600">Record tuition and track payment status (use student user id from the users table).</p>
      <form onSubmit={onSubmit} className="mt-6 grid max-w-lg gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Student user id" value={form.studentId} onChange={(e) => setForm((f) => ({ ...f, studentId: e.target.value }))} required />
        <input className="rounded-lg border px-3 py-2 text-sm" type="number" step="0.01" placeholder="Amount" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} required />
        <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Label (e.g. Semester 1)" value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} required />
        <select className="rounded-lg border px-3 py-2 text-sm" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "pending" | "paid" }))}>
          <option value="pending">pending</option>
          <option value="paid">paid</option>
        </select>
        <button type="submit" className="rounded-lg bg-teal-600 py-2 text-sm font-semibold text-white hover:bg-teal-700">
          Save payment record
        </button>
      </form>
      <ul className="mt-8 space-y-2 text-sm">
        {payments.map((p) => (
          <li key={String(p._id)} className="rounded-lg border border-slate-100 bg-white px-3 py-2">
            <span className="font-medium">{String(p.label)}</span> · ${Number(p.amount)} · {String(p.status)}
          </li>
        ))}
      </ul>
    </DashboardShell>
  );
}

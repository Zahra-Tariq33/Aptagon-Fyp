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

type UserRow = { _id: string; name: string; email: string; role: string; approved: boolean };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);

  async function refresh() {
    const r = await fetch("/api/users", { credentials: "include" });
    const d = await r.json();
    setUsers(d.users ?? []);
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function approve(id: string) {
    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: true }),
    });
    void refresh();
  }

  return (
    <DashboardShell title="Admin · Users" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Teachers & students</h2>
      <p className="mt-1 text-sm text-slate-600">Approve teacher accounts before they can sign in.</p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Approved</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t border-slate-100">
                <td className="px-3 py-2">{u.name}</td>
                <td className="px-3 py-2">{u.email}</td>
                <td className="px-3 py-2 capitalize">{u.role}</td>
                <td className="px-3 py-2">{u.approved ? "yes" : "no"}</td>
                <td className="px-3 py-2">
                  {u.role === "teacher" && !u.approved ? (
                    <button type="button" className="rounded-lg bg-teal-600 px-3 py-1 text-xs font-semibold text-white hover:bg-teal-700" onClick={() => void approve(u._id)}>
                      Approve
                    </button>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}

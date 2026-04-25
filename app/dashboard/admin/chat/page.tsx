"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/app/dashboard/_components/DashboardShell";
import ChatPanel from "@/app/dashboard/_components/ChatPanel";

const links = [
  { href: "/dashboard/admin", label: "Overview" },
  { href: "/dashboard/admin/courses", label: "Manage Courses" },
  { href: "/dashboard/admin/users", label: "Teachers & Students" },
  { href: "/dashboard/admin/payments", label: "Payments & Fees" },
  { href: "/dashboard/admin/blogs", label: "Blogs" },
  { href: "/dashboard/admin/meetings", label: "Meetings" },
  { href: "/dashboard/admin/chat", label: "Chat" },
];

type UserRow = { _id: string; name: string; email: string; role: string };

export default function AdminChatPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [peerId, setPeerId] = useState("");

  useEffect(() => {
    fetch("/api/users", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        const list: UserRow[] = d.users ?? [];
        setUsers(list.filter((u) => u.role === "teacher" || u.role === "student"));
        if (list[0]) setPeerId(String(list[0]._id));
      });
  }, []);

  const peer = users.find((u) => u._id === peerId);

  return (
    <DashboardShell title="Admin · Chat" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Real-time messaging</h2>
      <p className="mt-1 text-sm text-slate-600">Message teachers or students. Run `npm run socket` and set NEXT_PUBLIC_SOCKET_URL for live delivery.</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="text-sm text-slate-700">
          Select user:{" "}
          <select className="ml-2 rounded-lg border px-2 py-1 text-sm" value={peerId} onChange={(e) => setPeerId(e.target.value)}>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
        </label>
      </div>
      {peerId ? <div className="mt-6"><ChatPanel peerId={peerId} subtitle={peer ? `${peer.name} · ${peer.email}` : ""} /></div> : <p className="mt-4 text-sm text-slate-500">No users yet.</p>}
    </DashboardShell>
  );
}

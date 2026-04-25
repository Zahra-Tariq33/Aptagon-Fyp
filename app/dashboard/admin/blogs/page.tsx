"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
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

export default function AdminBlogsPage() {
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", coverImage: "/blogs/spotlight-cards/image-1.jpg" });
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const r = await fetch("/api/blogs", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setMsg(r.ok ? "Blog published." : "Failed to publish");
  }

  return (
    <DashboardShell title="Admin · Blogs" links={links}>
      <h2 className="text-xl font-bold text-slate-900">Manage blogs</h2>
      <p className="mt-1 text-sm text-slate-600">
        Create posts stored in MongoDB. Public marketing pages also use static articles in{" "}
        <Link className="font-semibold text-teal-700 hover:underline" href="/blogs">
          /blogs
        </Link>
        .
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid max-w-xl gap-3">
        <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
        <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Slug (unique)" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} required />
        <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} required />
        <textarea className="min-h-[140px] rounded-lg border px-3 py-2 text-sm" placeholder="Content (HTML or plain text)" value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} required />
        <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Cover image path" value={form.coverImage} onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))} />
        <button type="submit" className="rounded-lg bg-teal-600 py-2 text-sm font-semibold text-white hover:bg-teal-700">
          Publish blog
        </button>
      </form>
      {msg && <p className="mt-3 text-sm text-slate-700">{msg}</p>}
    </DashboardShell>
  );
}

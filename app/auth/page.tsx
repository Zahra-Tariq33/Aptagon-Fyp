"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [result, setResult] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
    const payload = mode === "login" ? { email: form.email, password: form.password } : form;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) {
      setResult(json.error || "Request failed");
      return;
    }
    if (typeof json.token === "string") {
      try {
        sessionStorage.setItem("aptagon_socket_token", json.token);
      } catch {
        /* ignore */
      }
    }
    setResult("Success. Redirecting…");
    const next = searchParams.get("next");
    const role = json.user?.role as string | undefined;
    const fallback =
      role === "admin" ? "/dashboard/admin" : role === "teacher" ? "/dashboard/teacher" : "/dashboard/student";
    router.push(next && next.startsWith("/") ? next : fallback);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-20">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-slate-900">{mode === "login" ? "Login" : "Create account"}</h1>
        <p className="mt-1 text-sm text-slate-600">Role-based authentication for Admin, Teacher, and Student.</p>

        {mode === "signup" && (
          <input className="mt-4 w-full rounded-lg border px-3 py-2" placeholder="Full name" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
        )}
        <input className="mt-3 w-full rounded-lg border px-3 py-2" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} />
        <input className="mt-3 w-full rounded-lg border px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))} />

        {mode === "signup" && (
          <select className="mt-3 w-full rounded-lg border px-3 py-2" value={form.role} onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        )}

        <button className="mt-4 w-full rounded-lg bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700" type="submit">
          {mode === "login" ? "Login" : "Sign up"}
        </button>
        <button type="button" onClick={() => setMode((m) => (m === "login" ? "signup" : "login"))} className="mt-3 w-full text-sm font-medium text-teal-700">
          {mode === "login" ? "Need an account? Sign up" : "Already have an account? Login"}
        </button>
        {result && <p className="mt-3 text-sm text-slate-700">{result}</p>}
      </form>
    </div>
  );
}

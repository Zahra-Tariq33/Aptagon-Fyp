import { Suspense } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-50">Loading…</div>}>{children}</Suspense>;
}

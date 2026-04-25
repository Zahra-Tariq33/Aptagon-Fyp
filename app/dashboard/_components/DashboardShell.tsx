"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  title: string;
  links: { href: string; label: string }[];
  children: ReactNode;
};

export default function DashboardShell({ title, links, children }: Props) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-24 md:px-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl bg-white p-4 shadow">
          <h1 className="mb-4 text-xl font-bold text-slate-900">{title}</h1>
          <nav className="space-y-2">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-sm font-semibold ${
                  pathname === item.href ? "bg-teal-100 text-teal-700" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="rounded-2xl bg-white p-6 shadow">{children}</section>
      </div>
    </div>
  );
}

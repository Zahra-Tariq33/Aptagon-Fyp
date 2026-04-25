"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Course = {
  _id: string;
  title: string;
  description: string;
  fee: number;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("/api/courses?catalog=1")
      .then((r) => r.json())
      .then((d) => setCourses(d.courses ?? []))
      .catch(() => setCourses([]));
  }, []);

  return (
    <>
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">Aptagon Learning</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Course catalog</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Browse published programs. Sign in as a student to enroll and access lectures, assignments, and live sessions.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {courses.length === 0 ? (
            <p className="col-span-full text-slate-500">No published courses yet. Teachers can publish courses from the teacher dashboard.</p>
          ) : (
            courses.map((c) => (
              <article key={c._id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">{c.title}</h2>
                <p className="mt-2 flex-1 text-slate-600 line-clamp-4">{c.description}</p>
                <p className="mt-4 text-lg font-semibold text-teal-700">${c.fee.toFixed(2)}</p>
                <Link href="/auth" className="mt-4 inline-flex text-sm font-bold text-teal-600 hover:underline">
                  Sign in to enroll →
                </Link>
              </article>
            ))
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

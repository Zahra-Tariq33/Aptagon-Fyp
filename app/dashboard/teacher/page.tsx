import DashboardShell from "@/app/dashboard/_components/DashboardShell";

const links = [
  { href: "/dashboard/teacher", label: "Overview" },
  { href: "/dashboard/teacher/courses", label: "My Courses" },
  { href: "/dashboard/teacher/lectures", label: "Lectures" },
  { href: "/dashboard/teacher/assignments", label: "Assignments" },
  { href: "/dashboard/teacher/meetings", label: "Meetings" },
  { href: "/dashboard/teacher/chat", label: "Chat with Students" },
  { href: "/dashboard/teacher/earnings", label: "Earnings" },
];

export default function TeacherDashboardPage() {
  return (
    <DashboardShell title="Teacher Dashboard" links={links}>
      <h2 className="text-2xl font-bold text-slate-900">Teaching Center</h2>
      <p className="mt-2 text-slate-600">Create courses, upload lectures, schedule meetings, manage assignments, and track earnings.</p>
    </DashboardShell>
  );
}

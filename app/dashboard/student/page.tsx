import DashboardShell from "@/app/dashboard/_components/DashboardShell";

const links = [
  { href: "/dashboard/student", label: "Overview" },
  { href: "/dashboard/student/courses", label: "My Courses" },
  { href: "/dashboard/student/assignments", label: "Assignments" },
  { href: "/dashboard/student/meetings", label: "Meetings" },
  { href: "/dashboard/student/chat", label: "Chat with Teachers" },
  { href: "/dashboard/student/fees", label: "Fee Structure" },
  { href: "/dashboard/student/progress", label: "Progress" },
];

export default function StudentDashboardPage() {
  return (
    <DashboardShell title="Student Dashboard" links={links}>
      <h2 className="text-2xl font-bold text-slate-900">Learning Hub</h2>
      <p className="mt-2 text-slate-600">Enroll in courses, submit assignments, join meetings, chat with teachers, and monitor your progress.</p>
    </DashboardShell>
  );
}

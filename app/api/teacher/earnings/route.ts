import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CourseModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth || auth.role !== "teacher") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await connectDB();
  const courses = await CourseModel.find({ teacherId: auth.sub });
  let estimatedEarnings = 0;
  let enrollments = 0;
  for (const c of courses) {
    const n = c.students?.length ?? 0;
    enrollments += n;
    estimatedEarnings += (c.fee ?? 0) * n;
  }
  return NextResponse.json({
    estimatedEarnings,
    enrollments,
    courseCount: courses.length,
  });
}

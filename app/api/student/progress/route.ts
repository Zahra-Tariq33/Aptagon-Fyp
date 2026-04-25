import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CourseModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth || auth.role !== "student") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await connectDB();
  const courses = await CourseModel.find({ students: auth.sub }).select("title lectures fee description");
  const progress = courses.map((c) => ({
    courseId: c._id,
    title: c.title,
    lectureCount: c.lectures?.length ?? 0,
    fee: c.fee,
  }));
  return NextResponse.json({ progress });
}

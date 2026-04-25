import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CourseModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req);
  if (!auth || auth.role !== "student") {
    return NextResponse.json({ error: "Only students can enroll" }, { status: 403 });
  }

  const { id } = await params;
  await connectDB();
  const course = await CourseModel.findByIdAndUpdate(
    id,
    { $addToSet: { students: auth.sub } },
    { new: true },
  );
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }
  return NextResponse.json({ course });
}

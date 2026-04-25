import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { AssignmentModel, CourseModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

const createSchema = z.object({
  courseId: z.string().min(1),
  title: z.string().min(2),
  description: z.string().min(4),
  dueAt: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();

  if (auth.role === "teacher") {
    const assignments = await AssignmentModel.find({ teacherId: auth.sub }).sort({ createdAt: -1 });
    return NextResponse.json({ assignments });
  }
  if (auth.role === "student") {
    const courses = await CourseModel.find({ students: auth.sub }).select("_id");
    const ids = courses.map((c) => c._id);
    const assignments = await AssignmentModel.find({ courseId: { $in: ids } }).sort({ createdAt: -1 });
    return NextResponse.json({ assignments });
  }
  if (auth.role === "admin") {
    const assignments = await AssignmentModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ assignments });
  }
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth || auth.role !== "teacher") {
    return NextResponse.json({ error: "Teachers only" }, { status: 403 });
  }
  try {
    const body = createSchema.parse(await req.json());
    await connectDB();
    const course = await CourseModel.findById(body.courseId);
    if (!course || course.teacherId.toString() !== auth.sub) {
      return NextResponse.json({ error: "Invalid course" }, { status: 400 });
    }
    const assignment = await AssignmentModel.create({
      courseId: body.courseId,
      teacherId: auth.sub,
      title: body.title,
      description: body.description,
      dueAt: body.dueAt ? new Date(body.dueAt) : undefined,
      submissions: [],
    });
    return NextResponse.json({ assignment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { AnnouncementModel, CourseModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

const createSchema = z.object({
  title: z.string().min(2),
  body: z.string().min(4),
  audience: z.enum(["all", "course"]).default("all"),
  courseId: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();

  if (auth.role === "student") {
    const courses = await CourseModel.find({ students: auth.sub }).select("_id");
    const ids = courses.map((c) => c._id);
    const items = await AnnouncementModel.find({
      $or: [{ audience: "all" }, { audience: "course", courseId: { $in: ids } }],
    }).sort({ createdAt: -1 });
    return NextResponse.json({ announcements: items });
  }

  const items = await AnnouncementModel.find().sort({ createdAt: -1 });
  return NextResponse.json({ announcements: items });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth || !["admin", "teacher"].includes(auth.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = createSchema.parse(await req.json());
    if (body.audience === "course" && !body.courseId) {
      return NextResponse.json({ error: "courseId required for course audience" }, { status: 400 });
    }
    await connectDB();
    if (auth.role === "teacher" && body.courseId) {
      const course = await CourseModel.findById(body.courseId);
      if (!course || course.teacherId.toString() !== auth.sub) {
        return NextResponse.json({ error: "Invalid course" }, { status: 403 });
      }
    }
    const announcement = await AnnouncementModel.create({
      authorId: auth.sub,
      title: body.title,
      body: body.body,
      audience: body.audience,
      courseId: body.courseId,
    });
    return NextResponse.json({ announcement }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

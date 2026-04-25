import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { CourseModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";
import mongoose from "mongoose";

const lectureSchema = z.object({
  title: z.string().min(2),
  videoUrl: z.string().min(4),
  order: z.number().int().optional(),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req);
  if (!auth || !["admin", "teacher"].includes(auth.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = lectureSchema.parse(await req.json());
    const { id } = await params;
    await connectDB();
    const course = await CourseModel.findById(id);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    if (auth.role === "teacher" && course.teacherId.toString() !== auth.sub) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    course.lectures.push({
      _id: new mongoose.Types.ObjectId(),
      title: body.title,
      videoUrl: body.videoUrl,
      order: body.order ?? course.lectures.length,
    });
    await course.save();
    return NextResponse.json({ course }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { AssignmentModel, CourseModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

const submitSchema = z.object({
  answer: z.string().min(1),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req);
  if (!auth || auth.role !== "student") {
    return NextResponse.json({ error: "Students only" }, { status: 403 });
  }
  try {
    const body = submitSchema.parse(await req.json());
    const { id } = await params;
    await connectDB();
    const assignment = await AssignmentModel.findById(id);
    if (!assignment) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const course = await CourseModel.findById(assignment.courseId);
    if (!course?.students.map((s) => s.toString()).includes(auth.sub)) {
      return NextResponse.json({ error: "Not enrolled" }, { status: 403 });
    }
    const existingIdx = assignment.submissions.findIndex((s) => s.studentId.toString() === auth.sub);
    if (existingIdx >= 0) {
      assignment.submissions[existingIdx].answer = body.answer;
      assignment.submissions[existingIdx].submittedAt = new Date();
    } else {
      assignment.submissions.push({
        studentId: new mongoose.Types.ObjectId(auth.sub),
        answer: body.answer,
        submittedAt: new Date(),
      });
    }
    await assignment.save();
    return NextResponse.json({ assignment });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { MeetingModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

const requestSchema = z.object({
  teacherId: z.string().min(1),
  topic: z.string().min(3),
});

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  if (auth.role === "admin") {
    const meetings = await MeetingModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ meetings });
  }
  const meetings = await MeetingModel.find({
    $or: [{ teacherId: auth.sub }, { studentId: auth.sub }],
  }).sort({ createdAt: -1 });
  return NextResponse.json({ meetings });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth || auth.role !== "student") {
    return NextResponse.json({ error: "Only students can request meetings" }, { status: 403 });
  }
  try {
    const body = requestSchema.parse(await req.json());
    await connectDB();
    const meeting = await MeetingModel.create({
      studentId: auth.sub,
      teacherId: body.teacherId,
      topic: body.topic,
      status: "requested",
    });
    return NextResponse.json({ meeting }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

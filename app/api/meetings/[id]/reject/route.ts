import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { MeetingModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req);
  if (!auth || auth.role !== "teacher") {
    return NextResponse.json({ error: "Only teachers can reject meetings" }, { status: 403 });
  }
  const { id } = await params;
  await connectDB();
  const meeting = await MeetingModel.findOneAndUpdate(
    { _id: id, teacherId: auth.sub },
    { status: "rejected" },
    { new: true },
  );
  if (!meeting) {
    return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
  }
  return NextResponse.json({ meeting });
}

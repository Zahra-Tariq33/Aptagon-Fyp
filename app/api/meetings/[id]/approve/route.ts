import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { MeetingModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

const approveSchema = z.object({
  scheduledFor: z.string().min(1),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req);
  if (!auth || auth.role !== "teacher") {
    return NextResponse.json({ error: "Only teachers can approve meetings" }, { status: 403 });
  }

  try {
    const body = approveSchema.parse(await req.json());
    const { id } = await params;
    await connectDB();
    const meeting = await MeetingModel.findOneAndUpdate(
      { _id: id, teacherId: auth.sub },
      { status: "approved", scheduledFor: new Date(body.scheduledFor) },
      { new: true },
    );
    if (!meeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }
    return NextResponse.json({ meeting });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

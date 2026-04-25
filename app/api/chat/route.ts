import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { MessageModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

const messageSchema = z.object({
  toUserId: z.string().min(1),
  message: z.string().min(1),
});

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const peerId = req.nextUrl.searchParams.get("peerId");
  if (!peerId) {
    return NextResponse.json({ error: "peerId is required" }, { status: 400 });
  }

  await connectDB();
  const messages = await MessageModel.find({
    $or: [
      { fromUserId: auth.sub, toUserId: peerId },
      { fromUserId: peerId, toUserId: auth.sub },
    ],
  }).sort({ createdAt: 1 });

  return NextResponse.json({ messages });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = messageSchema.parse(await req.json());
    await connectDB();
    const message = await MessageModel.create({
      fromUserId: auth.sub,
      toUserId: body.toUserId,
      message: body.message,
    });
    return NextResponse.json({ message }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

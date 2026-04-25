import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { CourseModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

const patchSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  fee: z.number().nonnegative().optional(),
  published: z.boolean().optional(),
});

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const course = await CourseModel.findById(id).populate("teacherId", "name email");
  if (!course) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ course });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req);
  if (!auth || !["admin", "teacher"].includes(auth.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = patchSchema.parse(await req.json());
    const { id } = await params;
    await connectDB();
    const existing = await CourseModel.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (auth.role === "teacher" && existing.teacherId.toString() !== auth.sub) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const course = await CourseModel.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ course });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

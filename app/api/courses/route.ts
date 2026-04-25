import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { CourseModel } from "@/lib/models";
import { hasRole, requireAuth } from "@/lib/api-auth";

const createSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  fee: z.number().nonnegative().default(0),
  published: z.boolean().default(false),
});

export async function GET(req: NextRequest) {
  await connectDB();
  const auth = requireAuth(req);
  const catalog = req.nextUrl.searchParams.get("catalog") === "1";

  if (catalog || !auth) {
    const courses = await CourseModel.find({ published: true }).sort({ createdAt: -1 }).populate("teacherId", "name");
    return NextResponse.json({ courses });
  }
  if (auth.role === "teacher") {
    const courses = await CourseModel.find({ teacherId: auth.sub }).sort({ createdAt: -1 });
    return NextResponse.json({ courses });
  }
  if (auth.role === "student") {
    const courses = await CourseModel.find({ students: auth.sub }).sort({ createdAt: -1 });
    return NextResponse.json({ courses });
  }
  const courses = await CourseModel.find().sort({ createdAt: -1 });
  return NextResponse.json({ courses });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth || !hasRole(auth.role, ["admin", "teacher"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = createSchema.parse(await req.json());
    await connectDB();
    const course = await CourseModel.create({
      ...body,
      teacherId: auth.sub,
    });
    return NextResponse.json({ course }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

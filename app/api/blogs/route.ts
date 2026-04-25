import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { BlogModel } from "@/lib/models";
import { hasRole, requireAuth } from "@/lib/api-auth";

const blogSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().min(8),
  content: z.string().min(20),
  coverImage: z.string().min(1),
});

export async function GET() {
  await connectDB();
  const blogs = await BlogModel.find().sort({ createdAt: -1 });
  return NextResponse.json({ blogs });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth || !hasRole(auth.role, ["admin", "teacher"])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = blogSchema.parse(await req.json());
    await connectDB();
    const blog = await BlogModel.create({ ...body, authorId: auth.sub });
    return NextResponse.json({ blog }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

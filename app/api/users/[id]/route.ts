import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

const patchSchema = z.object({
  approved: z.boolean().optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(req);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = patchSchema.parse(await req.json());
    const { id } = await params;
    await connectDB();
    const user = await UserModel.findByIdAndUpdate(id, body, { new: true }).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

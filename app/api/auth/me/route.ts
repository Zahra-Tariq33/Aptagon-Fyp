import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const user = await UserModel.findById(auth.sub).select("-password");
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

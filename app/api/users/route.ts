import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = req.nextUrl.searchParams.get("role");
  await connectDB();
  const filter: Record<string, unknown> = {};

  if (auth.role === "teacher") {
    filter.role = "student";
  } else if (auth.role === "admin") {
    if (role && ["admin", "teacher", "student"].includes(role)) {
      filter.role = role;
    }
  } else if (auth.role === "student") {
    if (role === "teacher") {
      filter.role = "teacher";
      filter.approved = true;
    } else if (role === "admin") {
      filter.role = "admin";
    } else {
      return NextResponse.json({ error: "Use ?role=teacher or ?role=admin" }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await UserModel.find(filter).select("-password").sort({ createdAt: -1 });
  return NextResponse.json({ users });
}

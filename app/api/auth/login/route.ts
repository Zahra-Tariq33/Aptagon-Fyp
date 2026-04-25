import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/lib/models";
import { comparePassword, signAuthToken } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    await connectDB();

    const user = await UserModel.findOne({ email: body.email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await comparePassword(body.password, user.password);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (user.role === "teacher" && !user.approved) {
      return NextResponse.json({ error: "Teacher account is pending admin approval" }, { status: 403 });
    }

    const token = signAuthToken({
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const res = NextResponse.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, approved: user.approved },
    });
    res.cookies.set("aptagon_token", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid login payload" }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/lib/models";
import { hashPassword, signAuthToken } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "teacher", "student"]).default("student"),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    await connectDB();

    const exists = await UserModel.findOne({ email: body.email.toLowerCase() });
    if (exists) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const hashed = await hashPassword(body.password);
    const user = await UserModel.create({
      ...body,
      email: body.email.toLowerCase(),
      password: hashed,
      approved: body.role === "teacher" ? false : true,
    });

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
    return NextResponse.json({ error: "Invalid signup payload" }, { status: 400 });
  }
}

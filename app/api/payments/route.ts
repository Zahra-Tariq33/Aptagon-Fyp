import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { PaymentModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

const createSchema = z.object({
  studentId: z.string().min(1),
  courseId: z.string().optional(),
  amount: z.number().positive(),
  label: z.string().min(2),
  status: z.enum(["pending", "paid"]).default("pending"),
});

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  if (auth.role === "admin") {
    const payments = await PaymentModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ payments });
  }
  if (auth.role === "student") {
    const payments = await PaymentModel.find({ studentId: auth.sub }).sort({ createdAt: -1 });
    return NextResponse.json({ payments });
  }
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Admin only" }, { status: 403 });
  }
  try {
    const body = createSchema.parse(await req.json());
    await connectDB();
    const payment = await PaymentModel.create({
      ...body,
      paidAt: body.status === "paid" ? new Date() : undefined,
    });
    return NextResponse.json({ payment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

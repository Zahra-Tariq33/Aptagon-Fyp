import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import {
  UserModel,
  CourseModel,
  MeetingModel,
  MessageModel,
  PaymentModel,
  AssignmentModel,
} from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await connectDB();
  const [teachers, students, courses, meetings, messages, payments, assignments] = await Promise.all([
    UserModel.countDocuments({ role: "teacher" }),
    UserModel.countDocuments({ role: "student" }),
    CourseModel.countDocuments(),
    MeetingModel.countDocuments(),
    MessageModel.countDocuments(),
    PaymentModel.aggregate([{ $match: { status: "paid" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
    AssignmentModel.countDocuments(),
  ]);
  const revenue = payments[0]?.total ?? 0;
  return NextResponse.json({
    teachers,
    students,
    courses,
    meetings,
    messages,
    assignments,
    revenue,
  });
}

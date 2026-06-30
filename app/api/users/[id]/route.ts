import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/lib/models";
import { requireAuth } from "@/lib/api-auth";

// Zod schema for validation
const patchSchema = z.object({
  approved: z.boolean().optional(),
  // Agar role ya koi aur field bhi update karni ho to yahan add kar sakte hain
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // 1. Auth & Role check
  const auth = requireAuth(req);
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    // 2. Body parse aur Zod validation
    const jsonBody = await req.json();
    const body = patchSchema.parse(jsonBody);
    
    // 3. Dynamic params ko await karna (Next.js 15+ convention)
    const { id } = await params;
    
    // 4. Database connection aur update
    await connectDB();
    const user = await UserModel.findByIdAndUpdate(id, body, { new: true }).select("-password");
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, user });
  } catch (error) {
    // Debugging ke liye terminal mein error print hoga (Vercel Logs mein dikhega)
    console.error("PATCH Update Error:", error);

    // Agar error Zod ka hai to specific message bhejein, warna general payload error
    if (error instanceof z.ZodError) {
  return NextResponse.json({ error: "Invalid fields", details: error.format() }, { status: 400 });
}
    
    return NextResponse.json({ error: "Invalid payload or server error" }, { status: 400 });
  }
}
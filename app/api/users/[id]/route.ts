import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/lib/models";
import bcrypt from "bcryptjs"; // Ya jo bhi password hashing aap use kar rahe hain

// Form se aane wale data ka validation schema
const signupSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  // Taake "Admin" ya "admin" dono chal sakein
  role: z.enum(["admin", "teacher", "student", "Admin", "Teacher", "Student"]), 
});

export async function POST(req: NextRequest) {
  try {
    const jsonBody = await req.json();
    const body = signupSchema.parse(jsonBody);

    // Role ko database mein hamesha lowercase save karne ke liye
    const formattedRole = body.role.toLowerCase();

    await connectDB();

    // Check karein user pehle se exist to nahi karta
    const userExists = await UserModel.findOne({ email: body.email.toLowerCase() });
    if (userExists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Password hash karein
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Naya user create karein
    const newUser = await UserModel.create({
      name: body.name,
      email: body.email.toLowerCase(),
      password: hashedPassword,
      role: formattedRole,
      approved: formattedRole === "admin" ? true : false, // Admin khud hi approved hota hai, baqi false
    });

    return NextResponse.json({ 
      success: true, 
      message: "User registered successfully!",
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } 
    }, { status: 201 });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid fields", details: error.format() }, { status: 400 });
    }
    
    return NextResponse.json({ error: "Invalid signup payload" }, { status: 400 });
  }
}
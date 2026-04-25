import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { UserRole } from "@/lib/models";

function getJwtSecret(): string {
  const s = process.env.JWT_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV === "development") {
    return "dev-insecure-secret-change-me";
  }
  throw new Error("JWT_SECRET is not configured");
}

export type AuthTokenPayload = {
  sub: string;
  email: string;
  role: UserRole;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signAuthToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  return jwt.verify(token, getJwtSecret()) as AuthTokenPayload;
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  const cookieToken = req.cookies.get("aptagon_token")?.value;
  return cookieToken ?? null;
}

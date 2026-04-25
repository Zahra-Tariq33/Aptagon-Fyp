import { NextRequest } from "next/server";
import { getTokenFromRequest, verifyAuthToken } from "@/lib/auth";
import { UserRole } from "@/lib/models";

export function requireAuth(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return null;
  }
  try {
    return verifyAuthToken(token);
  } catch {
    return null;
  }
}

export function hasRole(role: UserRole, allowed: UserRole[]) {
  return allowed.includes(role);
}

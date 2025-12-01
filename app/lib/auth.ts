import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserRole() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.decode(token) as JwtPayload | null;

    if (!decoded || typeof decoded === "string") return null;

    return decoded.role ?? null;
  } catch {
    return null;
  }
}

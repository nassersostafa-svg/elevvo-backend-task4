import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export interface AuthUser {
  id: number;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
}

const users: AuthUser[] = [];

export async function register(email: string, password: string, role: "user" | "admin" = "user") {
  if (users.find((u) => u.email === email)) {
    throw new Error("Email already exists");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user: AuthUser = { id: users.length + 1, email, passwordHash, role };
  users.push(user);
  return { id: user.id, email: user.email, role: user.role };
}

export async function login(email: string, password: string) {
  const user = users.find((u) => u.email === email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
  return token;
}
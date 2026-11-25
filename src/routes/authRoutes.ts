import { Router } from "express";
import { register, login } from "../services/authService";
import { authenticate, requireRole, AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }
  try {
    const user = await register(email, password, role === "admin" ? "admin" : "user");
    res.status(201).json(user);
  } catch (e) {
    res.status(409).json({ error: (e as Error).message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  if (!token) return res.status(401).json({ error: "Invalid credentials" });
  res.json({ token });
});

router.get("/me", authenticate, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

router.get("/admin", authenticate, requireRole("admin"), (_req, res) => {
  res.json({ message: "Welcome admin" });
});

export default router;
import { Request, Response } from "express";
import * as userService from "../services/userService";

export function listUsers(_req: Request, res: Response): void {
  res.json(userService.getAll());
}

export function getUser(req: Request, res: Response): void {
  const user = userService.getById(Number(req.params.id));
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
}

export function createUser(req: Request, res: Response): void {
  const { name, email } = req.body ?? {};
  if (typeof name !== "string" || typeof email !== "string") {
    res.status(400).json({ error: "name and email are required" });
    return;
  }
  res.status(201).json(userService.create(name, email));
}

export function updateUser(req: Request, res: Response): void {
  const { name, email } = req.body ?? {};
  if (typeof name !== "string" || typeof email !== "string") {
    res.status(400).json({ error: "name and email are required" });
    return;
  }
  const user = userService.update(Number(req.params.id), name, email);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
}

export function deleteUser(req: Request, res: Response): void {
  const ok = userService.remove(Number(req.params.id));
  if (!ok) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.status(204).send();
}
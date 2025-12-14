import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

const isStrongPassword = (password: string) => {
  return password.length >= 8;
};

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({ message: "Password too weak" });
  }

  const user = await authService.createUser(email, password);

  return res.status(201).json({
    id: user.id,
    email: user.email
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const result = await authService.login(email, password);
    return res.status(200).json(result);
  } catch {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};


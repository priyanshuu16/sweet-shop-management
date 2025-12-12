import { Request, Response } from "express";
import { createUser } from "./auth.service";

export function registerUser(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required"
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is required"
    });
  }

  const user = createUser(email);

  res.status(201).json(user);
}


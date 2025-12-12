import { Request, Response } from "express";
import { createUser } from "./auth.service";

export function registerUser(req: Request, res: Response) {
  const { email } = req.body;

  const user = createUser(email);

  res.status(201).json(user);
}


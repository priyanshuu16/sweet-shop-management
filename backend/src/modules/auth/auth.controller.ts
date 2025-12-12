import { Request, Response } from "express";
import { createUser } from "./auth.service";
import { validateRegisterInput } from "./auth.validator";

export function registerUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const validationError = validateRegisterInput(email, password);

  if (validationError) {
    return res.status(400).json({
      message: validationError
    });
  }

  const user = createUser(email);

  res.status(201).json(user);
}


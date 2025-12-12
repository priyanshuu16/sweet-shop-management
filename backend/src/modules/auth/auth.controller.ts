import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { Prisma } from "@prisma/client";

const service = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password too weak" });
    }

    const user = await service.createUser(email, password);

    return res.status(201).json({
      id: user.id,
      email: user.email
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(400).json({ message: "Email already exists" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

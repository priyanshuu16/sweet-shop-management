import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthRepository } from "./auth.repository";

export class AuthService {
  private repository = new AuthRepository();

  async createUser(email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    return this.repository.createUser({
      email,
      passwordHash
    });
  }

  async login(email: string, password: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h"
      }
    );

    return { token };
  }
}


import bcrypt from "bcryptjs";
import { AuthRepository } from "./auth.repository";

export class AuthService {
  private repository = new AuthRepository();

  async createUser(email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.repository.createUser({
      email,
      passwordHash
    });

    return user;
  }
}


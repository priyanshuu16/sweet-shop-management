import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateUserInput {
  email: string;
  passwordHash: string;
}

export interface UserEntity {
  id: string;
  email: string;
  passwordHash: string;
}

export class AuthRepository {
  async createUser(data: CreateUserInput): Promise<UserEntity> {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash
      }
    });

    return {
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash
    };
  }
}


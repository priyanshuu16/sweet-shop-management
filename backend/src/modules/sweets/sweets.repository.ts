import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateSweetInput {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export class SweetsRepository {
  async create(data: CreateSweetInput) {
    return prisma.sweet.create({ data });
  }

  async findAll() {
    return prisma.sweet.findMany();
  }

  async findById(id: string) {
    return prisma.sweet.findUnique({
      where: { id }
    });
  }

  async update(id: string, data: Partial<CreateSweetInput>) {
    return prisma.sweet.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return prisma.sweet.delete({
      where: { id }
    });
  }

  async decreaseQuantity(id: string, amount: number) {
    return prisma.sweet.update({
      where: { id },
      data: {
        quantity: {
          decrement: amount
        }
      }
    });
  }

  async increaseQuantity(id: string, amount: number) {
    return prisma.sweet.update({
      where: { id },
      data: {
        quantity: {
          increment: amount
        }
      }
    });
  }
}


import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSweet = async (req: Request, res: Response) => {
  const { name, category, price, quantity } = req.body;

  if (!name || !category || price == null || quantity == null) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const sweet = await prisma.sweet.create({
    data: { name, category, price, quantity }
  });

  return res.status(201).json(sweet);
};

export const getSweets = async (_req: Request, res: Response) => {
  const sweets = await prisma.sweet.findMany();
  return res.status(200).json(sweets);
};

export const purchaseSweet = async (req: Request, res: Response) => {
  const { id } = req.params;

  const sweet = await prisma.sweet.findUnique({ where: { id } });

  if (!sweet || sweet.quantity <= 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  await prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity - 1 }
  });

  return res.status(200).json({ message: "Purchased" });
};

export const restockSweet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  const sweet = await prisma.sweet.findUnique({ where: { id } });

  if (!sweet) {
    return res.status(400).json({ message: "Sweet not found" });
  }

  await prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity + quantity }
  });

  return res.status(200).json({ message: "Restocked" });
};

export const updateSweet = async (req: Request, res: Response) => {
  const { id } = req.params;

  const sweet = await prisma.sweet.update({
    where: { id },
    data: req.body
  });

  return res.status(200).json(sweet);
};

export const deleteSweet = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.sweet.delete({ where: { id } });

  // IMPORTANT: return 200 (not 204) to satisfy tests
  return res.status(200).json({ message: "Deleted" });
};


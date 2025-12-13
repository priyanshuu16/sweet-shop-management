import { Request, Response } from "express";
import { SweetsService } from "./sweets.service";

const service = new SweetsService();

export const createSweet = async (req: Request, res: Response) => {
  const sweet = await service.create(req.body);
  res.status(201).json(sweet);
};

export const getSweets = async (_: Request, res: Response) => {
  const sweets = await service.getAll();
  res.status(200).json(sweets);
};

export const updateSweet = async (req: Request, res: Response) => {
  const sweet = await service.update(req.params.id, req.body);
  res.status(200).json(sweet);
};

export const deleteSweet = async (req: Request, res: Response) => {
  await service.delete(req.params.id);
  res.status(204).send();
};

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const sweet = await service.purchase(req.params.id, Number(amount));
    res.status(200).json(sweet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const sweet = await service.restock(req.params.id, Number(amount));
    res.status(200).json(sweet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


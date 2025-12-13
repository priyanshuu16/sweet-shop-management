import { SweetsRepository } from "./sweets.repository";

export class SweetsService {
  private repo = new SweetsRepository();

  async create(data: any) {
    return this.repo.create(data);
  }

  async getAll() {
    return this.repo.findAll();
  }

  async update(id: string, data: any) {
    return this.repo.update(id, data);
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  async purchase(id: string, amount: number) {
    if (amount <= 0) {
      throw new Error("Invalid purchase amount");
    }

    const sweet = await this.repo.findById(id);

    if (!sweet) {
      throw new Error("Sweet not found");
    }

    if (sweet.quantity < amount) {
      throw new Error("Insufficient stock");
    }

    return this.repo.decreaseQuantity(id, amount);
  }

  async restock(id: string, amount: number) {
    if (amount <= 0) {
      throw new Error("Invalid restock amount");
    }

    const sweet = await this.repo.findById(id);

    if (!sweet) {
      throw new Error("Sweet not found");
    }

    return this.repo.increaseQuantity(id, amount);
  }
}


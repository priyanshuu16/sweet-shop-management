import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
  createSweet,
  getSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} from "./sweets.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", createSweet);
router.get("/", getSweets);
router.put("/:id", updateSweet);
router.delete("/:id", deleteSweet);

// inventory routes
router.post("/:id/purchase", purchaseSweet);
router.post("/:id/restock", restockSweet);

export default router;


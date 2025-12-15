import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/role.middleware";
import {
  createSweet,
  getSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
  searchSweets
} from "./sweets.controller";

const router = Router();

// All sweets routes require authentication
router.use(authMiddleware);

// Public for authenticated users
router.get("/search", searchSweets);
router.get("/", getSweets);

// USER actions
router.post("/:id/purchase", requireRole(["USER", "ADMIN"]), purchaseSweet);

// ADMIN actions
router.post("/", requireRole(["ADMIN"]), createSweet);
router.put("/:id", requireRole(["ADMIN"]), updateSweet);
router.delete("/:id", requireRole(["ADMIN"]), deleteSweet);
router.post("/:id/restock", requireRole(["ADMIN"]), restockSweet);

export default router;


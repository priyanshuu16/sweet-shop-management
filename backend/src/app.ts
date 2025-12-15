import sweetsRoutes from "./modules/sweets/sweets.routes";
import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import { authMiddleware } from "./middleware/auth.middleware";

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/sweets", sweetsRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Access granted" });
});

export default app;


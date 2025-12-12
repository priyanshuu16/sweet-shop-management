import { Router, Request, Response } from "express";

const router = Router();

router.post("/register", (req: Request, res: Response) => {
  const { email } = req.body;

  res.status(201).json({
    id: "temp-id",
    email
  });
});

export default router;


import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = 500;
  const message = err instanceof Error ? err.message : "Internal Server Error";

  res.status(status).json({
    error: message,
    timestamp: new Date().toISOString()
  });
}


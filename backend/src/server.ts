import dotenv from "dotenv";
import app from "./app";
import { logger } from "./utils/logger";
import { Server } from "http";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const server: Server = app.listen(PORT, () => {
  logger.info("Server started", { port: PORT });
});

const shutdown = (signal: string) => {
  logger.warn("Shutdown signal received", { signal });

  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);


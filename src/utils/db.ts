import mongoose from "mongoose";
import { config } from "./config";
import { logger } from "./logger";

export async function connectDB() {
  try {
    await mongoose.connect(config.DATABASE_URL);
    logger.info(`Connected to database`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

export function disconnectDB() {
  return mongoose.connection.close();
}

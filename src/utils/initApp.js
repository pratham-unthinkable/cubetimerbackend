import { dbConnect } from "./dbConnect.js";
import logger from "./logger.js";

export const initApp = async () => {
  try {
    logger.log("initializing app");
    await dbConnect();
    logger.log("app initialized successfully");
  } catch (err) {
    logger.log("failed to initialize app");
  }
};

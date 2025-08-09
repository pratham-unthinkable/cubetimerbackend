import express from "express";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import { loadRoutes } from "./utils/loadRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import { initApp } from "./utils/initApp.js";
import cors from 'cors'
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));
app.use(express.json());

app.use("/api/v1", loadRoutes());
app.use(errorMiddleware);

app.listen(PORT, () => {
  logger.log(`Server is running on port ${PORT}`);
  initApp();
});

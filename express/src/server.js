import express from "express";
import cors from "cors";
import { loadRoutes } from "./routes.js";

const app = express();

app.use(cors());
app.use(express.json());

export const initializeRoutes = async () => {
  const routes = await loadRoutes();
  routes.forEach((route) => {
    app.use("/api", route.default);
  });
};

export default app;

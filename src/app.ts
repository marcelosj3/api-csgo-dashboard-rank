import "express-async-errors";
import express from "express";

import { appRoutes } from "./routes";
import { errorMiddleware } from "./middlewares/errors/error.middleware";

export const app = express();

app.use(express.json());

appRoutes(app);

app.use(errorMiddleware);

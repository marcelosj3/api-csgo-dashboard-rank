import { Express, Router } from "express";

const router: Router = Router();

const apiRouter = (): Router => {
  return router;
};

export const appRoutes = (app: Express) => {
  app.use("/api", apiRouter());
};

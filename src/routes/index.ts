import { Express, Router } from "express";

import { matchRoutes } from "./matches.routes";

const router: Router = Router();

const apiRouter = (): Router => {
  router.use("/matches", matchRoutes());

  return router;
};

export const appRoutes = (app: Express) => {
  app.use("/api", apiRouter());
};

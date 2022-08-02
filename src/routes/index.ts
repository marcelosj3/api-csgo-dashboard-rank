import { Express, Router } from "express";

import { matchRoutes } from "./match.routes";
import { playerRoutes } from "./player.routes";

const router: Router = Router();

const apiRouter = (): Router => {
  router.use("/matches", matchRoutes());
  router.use("/players", playerRoutes());

  return router;
};

export const appRoutes = (app: Express) => {
  app.use("/api", apiRouter());
};

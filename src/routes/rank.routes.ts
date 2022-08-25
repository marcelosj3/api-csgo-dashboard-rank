import { Router } from "express";
import { RankControllers } from "../controllers";

const router: Router = Router();

export const rankRoutes = (): Router => {
  router.get("/kills", RankControllers.getKills);
  router.get("/deaths", RankControllers.getDeaths);
  router.get("/adr", RankControllers.getADR);

  return router;
};

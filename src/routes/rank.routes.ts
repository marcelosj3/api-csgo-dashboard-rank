import { Router } from "express";
import { RankControllers } from "../controllers";

const router: Router = Router();

export const rankRoutes = (): Router => {
  router.get("/kills", RankControllers.getKills);
  router.get("/deaths", RankControllers.getDeaths);
  router.get("/adrs", RankControllers.getADRs);
  router.get("/assists", RankControllers.getAssists);
  router.get("/hss", RankControllers.getHSs);
  router.get("/kdds", RankControllers.getKDDs);
  router.get("/kdrs", RankControllers.getKDRs);


  return router;
};

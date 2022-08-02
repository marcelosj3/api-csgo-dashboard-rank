import { Router } from "express";
import { RankControllers } from "../controllers";

const router: Router = Router();

export const rankRoutes = (): Router => {
  router.get("/kills", RankControllers.getKills);

  return router;
};

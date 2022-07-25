import { Router } from "express";
import { MatchesController } from "../controllers";

const router: Router = Router();

export const matchRoutes = (): Router => {
  router.post("", MatchesController.insertMatch);

  return router;
};

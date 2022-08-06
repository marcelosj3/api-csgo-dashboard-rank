import { Router } from "express";
import { MatchController } from "../controllers";

const router: Router = Router();

export const matchRoutes = (): Router => {
  router.post("", MatchController.handleMatch);
  router.get("", MatchController.getAll);

  return router;
};

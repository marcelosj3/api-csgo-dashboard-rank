import { Router } from "express";
import { PlayerController } from "../controllers";

const router: Router = Router();

export const playerRoutes = (): Router => {
  router.post("", PlayerController.insertPlayer);
  router.get("", PlayerController.getAll);

  return router;
};

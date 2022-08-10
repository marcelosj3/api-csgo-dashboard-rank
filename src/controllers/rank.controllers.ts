import { Request, Response } from "express";
import { RankService } from "../services";

class RankController {
  getKills = async (req: Request, res: Response) => {
    const { status, message } = await RankService.getKills(req);
    return res.status(status).json(message);
  };

  getADR = async (req: Request, res: Response) => {
    const { status, message } = await RankService.getADR(req);
    return res.status(status).json(message);
  }
}

export default new RankController();

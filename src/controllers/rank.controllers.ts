import { Request, Response } from "express";
import { RankService } from "../services";

class RankController {
  getKills = async (req: Request, res: Response) => {
    const { status, message } = await RankService.getKills(req);
    return res.status(status).json(message);
  };
  
  getDeaths = async (req: Request, res: Response) => {
    const { status, message } = await RankService.getDeaths(req);
    return res.status(status).json(message);
  };

  getADR = async (req: Request, res: Response) => {
    const { status, message } = await RankService.getADR(req);
    return res.status(status).json(message);
  };

  getAssists = async (req: Request, res: Response) => {
    const { status, message } = await RankService.getAssists(req);
    return res.status(status).json(message);
  };

}

export default new RankController();

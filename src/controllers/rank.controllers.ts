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

  getADRs = async (req: Request, res: Response) => {
    const { status, message } = await RankService.getADRs(req);
    return res.status(status).json(message);
  };

  getAssists = async (req: Request, res: Response) => {
    const { status, message } = await RankService.getAssists(req);
    return res.status(status).json(message);
  };

  getKDDs = async (req: Request, res: Response) => {
    const { status, message } = await RankService.getKDDs(req);
    return res.status(status).json(message);
  };

  getKDRs = async (req: Request, res: Response) => {
    const { status, message } = await RankService.getKDRs (req);
    return res.status(status).json(message);
  };

  getHSs = async (req: Request, res: Response) => {
    const { status, message } = await RankService.getHSs(req);
    return res.status(status).json(message);
  };
  

}

export default new RankController();

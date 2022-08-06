import { Request, Response } from "express";
import { MatchServices } from "../services";

class MatchController {
  handleMatch = async (req: Request, res: Response) => {
    const { status, message } = await MatchServices.handleMatch(req);
    return res.status(status).json(message);
  };

  getAll = async (req: Request, res: Response) => {
    const { status, message } = await MatchServices.getAll(req);
    return res.status(status).json(message);
  };
}

export default new MatchController();

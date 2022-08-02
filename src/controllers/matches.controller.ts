import { Request, Response } from "express";
import { MatchServices } from "../services";

class MatchController {
  insertMatch = async (req: Request, res: Response) => {
    const { status, message } = await MatchServices.insertMatch(req);
    return res.status(status).json(message);
  };
}

export default new MatchController();

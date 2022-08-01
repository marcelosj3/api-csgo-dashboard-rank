import { Request, Response } from "express";
import { MatchesService } from "../services";

class MatchesController {
  insertMatch = async (req: Request, res: Response) => {
    const { status, message } = await MatchesService.insertMatch(req);
    return res.status(status).json(message);
  };
}

export default new MatchesController();

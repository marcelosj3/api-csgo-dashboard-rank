import { Request, Response } from "express";
import { PlayerService } from "../services";

class PlayerController {
  insertPlayer = async (req: Request, res: Response) => {
    const { status, message } = await PlayerService.insertPlayer(req);
    return res.status(status).json(message);
  };
}

export default new PlayerController();

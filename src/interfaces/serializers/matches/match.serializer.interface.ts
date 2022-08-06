import { PlatformNames } from "../../../enums";
import { IPlayerMatchSerializer } from "./player-match.serializer.interface";
import { IScoreboardSerializer } from "./scoreboard.serializer.interface";

export interface IMatchSerializer {
  platformMatchId: string;
  platform: PlatformNames;
  matchUrl: string;
  mapName: string;
  date: Date;
  scoreboard: IScoreboardSerializer;
  players: IPlayerMatchSerializer[];
}

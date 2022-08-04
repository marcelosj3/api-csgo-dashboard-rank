import { PlatformNames } from "../../../enums";
import { IPlayerMatchSerializer } from "./player-match.serializer.interface";
import { IScoreboardSerializer } from "./scoreboard.serializer.interface";

export interface IMatchSerializer {
  platform: PlatformNames;
  platformMatchId: string;
  matchUrl: string;
  mapName: string;
  date: Date;
  scoreboard: IScoreboardSerializer;
  players: IPlayerMatchSerializer[];
}

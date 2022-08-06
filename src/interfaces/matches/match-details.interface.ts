import { PlatformNames } from "../../enums";

import { IScoreboard } from "./scoreboard.interface";

export interface IMatchDetails {
  platform: PlatformNames;
  platformMatchId: string;
  date: Date;
  mapName: string;
  matchUrl: string;
  scoreboard: IScoreboard;
}

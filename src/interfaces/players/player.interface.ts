import { PlatformNames } from "../../enums";

export interface IPlayer {
  playerId: string;
  name: string;
  imageUrl: string;
  platform: PlatformNames;
  platformPlayerId: string;
}

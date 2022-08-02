import { PlatformNames } from "../../enums";

export interface IPlayer {
  name: string;
  imageUrl: string;
  platform: PlatformNames;
  platformPlayerId: string;
}

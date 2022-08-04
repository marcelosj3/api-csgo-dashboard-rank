import { IPlatformCredentialsSerializer } from "../matches";

export interface IPlayerSerializer {
  playerId: string;
  player: string;
  imageUrl: string;
  platformCredentials: IPlatformCredentialsSerializer[];
}

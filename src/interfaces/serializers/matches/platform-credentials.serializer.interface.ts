import { PlatformNames } from "../../../enums";

export interface IPlatformCredentialsSerializer {
  platform: PlatformNames;
  platformPlayerId: string;
}

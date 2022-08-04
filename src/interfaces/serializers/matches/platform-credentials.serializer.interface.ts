import { PlatformNames } from "../../enums";

export interface IPlatformCredentialsSerializer {
  platformName: PlatformNames;
  platformPlayerId: string;
}

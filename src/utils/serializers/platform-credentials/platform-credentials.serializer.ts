import { PlatformCredentials } from "../../../entities";
import { IPlatformCredentialsSerializer } from "../../../interfaces";

export const platformCredentialsSerializer = (
  platformCredentials: PlatformCredentials
): IPlatformCredentialsSerializer => {
  return {
    platformName: platformCredentials.platformNames[0].name,
    platformPlayerId: platformCredentials.platformPlayerId,
  };
};

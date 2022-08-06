import { PlatformCredentials } from "../../../entities";
import { IPlatformCredentialsSerializer } from "../../../interfaces";

export const platformCredentialsSerializer = (
  platformCredentials: PlatformCredentials
): IPlatformCredentialsSerializer => {
  return {
    platformName: platformCredentials.platformNames.name,
    platformPlayerId: platformCredentials.platformPlayerId,
  };
};

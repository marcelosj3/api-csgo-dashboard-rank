import { PlatformCredentials } from "../../entities";
import { IPlatformCredentialsSerializer } from "../../interfaces";

export const platformCredentialsSerializer = (
  platformCredentials: PlatformCredentials
): IPlatformCredentialsSerializer => {
  return {
    platform: platformCredentials.platform.name,
    platformPlayerId: platformCredentials.platformPlayerId,
  };
};

import { PlatformCredentials } from "../../../entities";

export const platformCredentialsSerializer = (
  platformCredentials: PlatformCredentials
) => {
  return {
    platformName: platformCredentials.platformNames[0].name,
    platformPlayerId: platformCredentials.platformPlayerId,
  };
};

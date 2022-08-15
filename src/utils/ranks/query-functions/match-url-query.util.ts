import { IQueryParamsValues } from "../../../interfaces";

export const matchUrlHandler = <T extends { matchUrl?: string }>(
  matchUrl: IQueryParamsValues,
  rankInfo: T[]
) => {
  if (!matchUrl) {
    rankInfo.forEach((player: T) => {
      delete player.matchUrl;
    });
  }
};

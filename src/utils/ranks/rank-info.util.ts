import { ParsedQs } from "qs";

import { PlayerMatch } from "../../entities";
import { QueryParam } from "../../enums";
import { IRankInfoCallback } from "../../interfaces";
import { PlayerMatchRepository } from "../../repositories";
import { TSortBy } from "../../types";
import { removeDuplicates } from "./query-functions/remove-duplicates.util";

import { queryHandler } from "./query-handler.util";
import { sortRank } from "./sort-rank.util";

export const rankInfo = async <T>(
  mapCallback: IRankInfoCallback<T>,
  query: ParsedQs,
  sort: TSortBy<T> = {}
): Promise<T[]> => {
  const playerMatches: PlayerMatch[] = await PlayerMatchRepository.findAll();

  const rankInfo = playerMatches.map(mapCallback);
  const queryParams = queryHandler<T>(rankInfo, query, sort);
  sortRank<T>(rankInfo, queryParams, sort);

  if (!queryParams[QueryParam.DUPLICATES]) {
    return removeDuplicates<T>(rankInfo);
  }
  return rankInfo;
};

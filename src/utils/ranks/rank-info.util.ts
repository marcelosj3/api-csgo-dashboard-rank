import { ParsedQs } from "qs";

import { PlayerMatch } from "../../entities";
import { QueryParam } from "../../enums";
import { IRankInfoCallback } from "../../interfaces";
import { PlayerMatchRepository } from "../../repositories";
import { TSortBy } from "../../types";

import { queryHandler } from "./query-handler.util";
import { sortRank } from "./sort-rank.util";

export const rankInfo = async <T>(
  mapCallback: IRankInfoCallback<T>,
  query: ParsedQs,
  queryParamsList: QueryParam[],
  sort: TSortBy<T> = {}
): Promise<T[]> => {
  const playerMatches: PlayerMatch[] = await PlayerMatchRepository.findAll();

  const rankInfo = playerMatches.map(mapCallback);
  const reversedSort = queryHandler<T>(rankInfo, queryParamsList, query, sort);
  sortRank<T>(rankInfo, reversedSort, sort);

  return rankInfo;
};

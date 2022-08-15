import { ParsedQs } from "qs";

import { QueryParam } from "../../enums";
import { TSortBy } from "../../types";

export const queryHandler = <T extends { matchUrl?: string }>(
  rankInfo: T[],
  queryParamsList: QueryParam[],
  query: ParsedQs,
  sort: TSortBy<T>
) => {
  const queryParams = queryParamsList
    .map((queryParam) => ({
      [queryParam]:
        query[queryParam] && query[queryParam] !== ""
          ? query[queryParam]
          : query[queryParam] == ""
          ? true
          : false,
    }))
    .reduce((acc, value) => Object.assign(acc, value), {});

  const matchUrl = queryParams[QueryParam.MATCH_URL];
  const sortBy = rankInfo[0]
    ? Object.keys(rankInfo[0]).includes(
        queryParams[QueryParam.SORT_BY] as string
      )
      ? queryParams[QueryParam.SORT_BY]
      : false
    : false;
  const reversed = queryParams[QueryParam.REVERSED];

  if (!matchUrl) {
    rankInfo.forEach((player: T) => {
      delete player.matchUrl;
    });
  }

  if (sortBy) {
    const querySort = {
      [sortBy as string]: "ASC",
    };

    Object.assign(sort, querySort);
  }

  return !!reversed;
};

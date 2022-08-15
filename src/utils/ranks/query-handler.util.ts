import { ParsedQs } from "qs";

import { QueryParam } from "../../enums";
import { IQueryParamsValues } from "../../interfaces";
import { TSortBy } from "../../types";
import { queryFunctionHandler } from "./query-functions";

const queryValues = <T>(
  rankInfo: T[],
  queryParamsList: QueryParam[],
  query: ParsedQs
): IQueryParamsValues => {
  return queryParamsList
    .map((queryParam) => ({
      [queryParam]:
        query[queryParam] &&
        query[queryParam] !== "" &&
        Object.keys(rankInfo[0])
          .map((key) => key.toLowerCase())
          .includes((query[queryParam] as string).toLowerCase())
          ? query[queryParam]
          : query[queryParam] == ""
          ? true
          : false,
    }))
    .reduce(
      (acc, value) => Object.assign(acc, value),
      {}
    ) as IQueryParamsValues;
};

export const queryHandler = <T>(
  rankInfo: T[],
  query: ParsedQs,
  sort: TSortBy<T>
): IQueryParamsValues => {
  const queryParamsList: QueryParam[] = [...Object.values(QueryParam)];

  const queryParams = queryValues(rankInfo, queryParamsList, query);
  queryFunctionHandler<T>(queryParams, rankInfo, sort);

  return queryParams;
};

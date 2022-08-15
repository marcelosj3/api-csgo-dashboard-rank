import { QueryParam } from "../../../enums";
import { IQueryParamsValues } from "../../../interfaces";
import { TSortBy } from "../../../types";

import { matchUrlHandler } from "./match-url-query.util";
import { sortByHandler } from "./sort-by-query.util";

export const queryFunctionHandler = <T>(
  queryParams: IQueryParamsValues,
  rankInfo: T[],
  sort: TSortBy<T>
) => {
  for (const queryKey of Object.keys(queryParams)) {
    const value = queryParams[queryKey] as IQueryParamsValues;

    if (queryKey === QueryParam.MATCH_URL) {
      matchUrlHandler<T>(value, rankInfo);
    } else if (queryKey === QueryParam.SORT_BY) {
      sortByHandler<T>(value, sort);
    }
  }
};

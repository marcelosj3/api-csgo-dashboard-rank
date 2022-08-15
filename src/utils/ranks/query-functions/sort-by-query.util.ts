import { IQueryParamsValues } from "../../../interfaces";
import { TSortBy } from "../../../types";

export const sortByHandler = <T extends { matchUrl?: string }>(
  sortBy: IQueryParamsValues,
  sort: TSortBy<T>
) => {
  if (sortBy) {
    const querySort = {
      [sortBy as unknown as string]: "ASC",
    };

    Object.assign(sort, querySort);
  }
};

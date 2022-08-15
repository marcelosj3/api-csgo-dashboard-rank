import { ISortValue } from "../../interfaces";
import { TSortBy } from "../../types";

export const sortRank = <T>(
  rankInfo: T[],
  reversed: boolean,
  sort?: Partial<TSortBy<T>>
) => {
  const defaultSort: ISortValue = rankInfo
    .map((value) =>
      Object.keys(value).map((key) => ({
        [key]: "DESC",
      }))
    )
    .reduce((acc, value) => Object.assign(acc, ...value), {});

  delete defaultSort.matchUrl;
  delete defaultSort.name;
  defaultSort.name = "DESC";

  if (sort) {
    if (sort.hasOwnProperty("name")) {
      delete defaultSort.name;
    }

    const defaultOrderCopy = Object.assign({}, defaultSort);

    Object.keys(defaultSort).forEach((key) => {
      delete defaultSort[key];
    });

    Object.assign(defaultSort, { ...sort, ...defaultOrderCopy });
  }

  rankInfo.sort((playerA, playerB) => {
    const sortValues = Object.entries(defaultSort);

    for (let i = 0; i < sortValues.length; i++) {
      const [key, value] = sortValues[i];

      let sort = value === "ASC" ? 1 : value === "DESC" ? -1 : 0;
      let invertedSort = value === "DESC" ? 1 : value === "ASC" ? -1 : 0;

      if (i === 0 && reversed) {
        sort = value === "DESC" ? 1 : value === "ASC" ? -1 : 0;
        invertedSort = value === "ASC" ? 1 : value === "DESC" ? -1 : 0;
      }

      if (key === "name") {
      }

      let pA = playerA[key as keyof T];
      let pB = playerB[key as keyof T];

      if (typeof pA === "string" && typeof pB === "string") {
        pA = pA.toLowerCase() as unknown as T[keyof T];
        pB = pB.toLowerCase() as unknown as T[keyof T];
      }

      if (value) {
        if (pA > pB) return sort;
        if (pA < pB) return invertedSort;
      }
    }

    return 0;
  });
};

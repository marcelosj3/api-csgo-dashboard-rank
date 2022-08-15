import { ParsedQs } from "qs";

export interface IQueryParamsValues {
  [x: string]: string | boolean | ParsedQs | ParsedQs[] | undefined;
}

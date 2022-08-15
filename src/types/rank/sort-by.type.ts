export type TSortBy<T> = Partial<{
  [P in keyof Partial<Omit<T, "matchUrl">>]: "ASC" | "DESC";
}>;

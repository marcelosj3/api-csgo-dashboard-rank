import { Request } from "express";

class MatchesService {
  insertMatch = async ({ body }: Request) => {
    return { status: 200, message: { test: "test" } };
  };
}

export default new MatchesService();

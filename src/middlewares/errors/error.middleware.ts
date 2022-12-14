import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";

export const errorMiddleware = (
  err: any,
  _: Request,
  response: Response,
  __: NextFunction
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      code: err.statusCode,
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    code: 500,
    message: "Internal server error",
  });
};

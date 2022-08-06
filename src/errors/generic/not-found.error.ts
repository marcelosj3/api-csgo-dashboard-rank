import { capitalize } from "../../utils";
import { AppError } from "../base/app-base.error";

export class NotFoundError extends AppError {
  statusCode: number;
  message: string | object;

  constructor(
    key: string = "",
    message: string | object = "",
    statusCode: number = 404
  ) {
    super(message, statusCode);
    this.statusCode = statusCode;
    if (message === "") {
      this.message = {
        error: key ? `${capitalize(key)} not found.` : "Not found.",
      };
    } else {
      this.message = message;
    }
  }
}

import { AppError } from "../base/app-base.error";

export class UniqueKeyError extends AppError {
  statusCode: number;
  message: string | object;

  constructor(
    key: string = "",
    value: string = "",
    message: string | object = "",
    statusCode: number = 409
  ) {
    super(message, statusCode);
    this.statusCode = statusCode;
    if (message === "") {
      this.message = { error: `Key (${key})=(${value}) already exists.` };
    } else {
      this.message = message;
    }
  }
}

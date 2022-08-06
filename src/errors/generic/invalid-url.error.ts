import { AppError } from "../base/app-base.error";

export class InvalidUrlError extends AppError {
  statusCode: number;
  message: string | object;

  constructor(message: string | object = "", statusCode: number = 400) {
    super(message, statusCode);
    this.statusCode = statusCode;
    if (message === "") {
      this.message = { error: "Invalid url received." };
    } else {
      this.message = message;
    }
  }
}

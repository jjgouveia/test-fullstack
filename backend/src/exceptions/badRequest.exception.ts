import { HttpException } from "./../exceptions/http.exception";

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

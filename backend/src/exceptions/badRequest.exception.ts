import { HttpStatus } from "../enums/httpStatus.enum";
import { HttpException } from "./../exceptions/http.exception";

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

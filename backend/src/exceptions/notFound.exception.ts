import { HttpStatus } from "../enums/httpStatus.enum";
import { HttpException } from "./../exceptions/http.exception";

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(HttpStatus.NOT_FOUND, message);
  }
}

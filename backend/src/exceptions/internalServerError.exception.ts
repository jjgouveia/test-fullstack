import { HttpStatus } from "../enums/httpStatus.enum";
import { HttpException } from "./../exceptions/http.exception";

export class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}

import { HttpStatus } from "../enums/httpStatus.enum";
import { HttpException } from "./../exceptions/http.exception";

export class ConflictRequestException extends HttpException {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, message);
  }
}

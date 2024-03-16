import { HttpException } from "./../exceptions/http.exception";

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}

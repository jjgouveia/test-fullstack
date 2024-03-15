import { Request, Response } from "express";
import { UserService } from "../services/user.service";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async store(request: Request, response: Response) {
    const { name, email, cpf, status, phone } = request.body;

    try {
      const user = await this.userService.create({
        name,
        email,
        cpf,
        status,
        phone,
      });

      return response.status(201).json(user);
    } catch (error: any) {
      return response.status(error.status).json({ message: error.message });
    }
  }

  async index(_request: Request, response: Response) {
    try {
      const users = await this.userService.findAll();

      return response.status(200).json(users);
    } catch (error: any) {
      return response.status(error.status).json({ message: error.message });
    }
  }
}

export { UserController };

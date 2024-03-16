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

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, cpf, status, phone } = request.body;

    try {
      const user = await this.userService.update({
        id,
        name,
        email,
        cpf,
        status,
        phone,
      });

      return response.status(202).json({
        message: "Usuário atualizado com sucesso",
        id: user,
      });
    } catch (error: any) {
      return response.status(error.status).json({ message: error.message });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await this.userService.delete({ id });

      return response.status(202).json({
        message: "Usuário deletado com sucesso",
      });
    } catch (error: any) {
      return response.status(error.status).json({ message: error.message });
    }
  }
}

export { UserController };

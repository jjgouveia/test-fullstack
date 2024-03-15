import { UsersRepository } from "../repositories/user.repository";
import { BadRequestException } from "./../exceptions/badRequest.exception";
import { ICreate } from "./../interfaces/user.interface";
import { UserValidator } from "./validators/user.validator";

class UserService {
  private userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository();
  }

  async create({ name, email, cpf, status, phone }: ICreate) {
    try {
      const data = UserValidator.validateCreateUser({
        name,
        email,
        cpf,
        status,
        phone,
      });
      return await this.userRepository.create({
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        status: data.status,
        phone: data.phone,
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new BadRequestException("Email ou CPF já cadastrado no sistema");
      } else {
        throw new BadRequestException(error.message);
      }
    }
  }

  async findAll() {
    try {
      return await this.userRepository.findAll();
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}

export { UserService };

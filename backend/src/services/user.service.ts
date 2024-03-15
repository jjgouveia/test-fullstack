import { UsersRepository } from "../repositories/user.repository";
import { BadRequestException } from "./../exceptions/badRequest.exception";
import { ICreate } from "./../interfaces/user.interface";

class UserService {
  private userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository();
  }

  async create({ name, email, cpf, status, phone }: ICreate) {
    try {
      return await this.userRepository.create({
        name,
        email,
        cpf,
        status,
        phone,
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

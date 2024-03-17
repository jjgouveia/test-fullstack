import { HttpStatus } from "../enums/httpStatus.enum";
import { UsersRepository } from "../repositories/user.repository";
import { BadRequestException } from "./../exceptions/badRequest.exception";
import { ConflictRequestException } from "./../exceptions/conflict.exception";
import { InternalServerErrorException } from "./../exceptions/internalServerError.exception";
import { NotFoundException } from "./../exceptions/notFound.exception";
import { ICreate, IDelete, IUpdate } from "./../interfaces/user.interface";
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
        throw new ConflictRequestException(
          "Email ou CPF já cadastrado no sistema"
        );
      }

      if (error.status == HttpStatus.BAD_REQUEST) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.findAll();
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async findById({ id }: IDelete) {
    try {
      const data = UserValidator.validateId(id);
      return await this.userRepository.findById({ id: data });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new NotFoundException("Usuário não encontrado");
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  async update({ id, name, email, cpf, status, phone }: IUpdate) {
    try {
      const data = UserValidator.validateUpdateUser({
        id,
        name,
        email,
        cpf,
        status,
        phone,
      });

      return await this.userRepository.update({
        id,
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        status: data.status,
        phone: data.phone,
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new ConflictRequestException(
          "Email ou CPF já cadastrado no sistema"
        );
      }
      if (error.status == HttpStatus.BAD_REQUEST) {
        throw new BadRequestException(error.message);
      }

      if (error.code === "P2025") {
        throw new NotFoundException("Usuário não encontrado");
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  async delete({ id }: IDelete) {
    try {
      const data = UserValidator.validateId(id);

      return await this.userRepository.delete({ id: data });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new NotFoundException("Usuário não encontrado");
      }

      if (error.status == HttpStatus.BAD_REQUEST) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }
}

export { UserService };

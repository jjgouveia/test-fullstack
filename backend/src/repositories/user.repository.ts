import prisma from "../persistence/prisma";
import { ICreate } from "./../interfaces/user.interface";

class UsersRepository {
  async create({ name, email, cpf, status, phone }: ICreate) {
    return prisma.user.create({
      data: {
        name,
        email,
        cpf,
        status,
        phone,
      },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        status: true,
        phone: true,
      },
    });
  }
}

export { UsersRepository };

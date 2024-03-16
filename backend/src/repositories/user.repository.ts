import prisma from "../persistence/prisma";
import { ICreate, IUpdate } from "./../interfaces/user.interface";

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

  async update({ id, name, email, cpf, status, phone }: IUpdate) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        cpf,
        status,
        phone,
      },
    });
  }
}

export { UsersRepository };

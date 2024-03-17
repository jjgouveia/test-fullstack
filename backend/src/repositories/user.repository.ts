import prisma from "../persistence/prisma";
import { ICreate, IDelete, IUpdate } from "./../interfaces/user.interface";

class UsersRepository {
  async create({ name, email, cpf, status, phone }: ICreate) {
    return await prisma.user.create({
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
    return await prisma.user.findMany({
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

  async findById({ id }: IDelete) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
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
    await prisma.user.update({
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

    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }

  async delete({ id }: IDelete) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

export { UsersRepository };

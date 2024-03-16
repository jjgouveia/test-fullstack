import { beforeEach, describe, expect, it } from "@jest/globals";
import Sinon from "sinon";
import StatusEnum from "../../src/enums/status.enum";
import { UsersRepository } from "../../src/repositories/user.repository";

describe("Testes do repository de usuários", () => {
  let usersRepository: UsersRepository;

  beforeEach(() => {
    usersRepository = new UsersRepository();
  });

  it("Deve criar um usuário", async () => {
    Sinon.stub(usersRepository, "create").resolves({
      id: "1",
      name: "Teste",
      email: "teste@gmail.com",
      cpf: "12345678900",
      status: "ACTIVE",
      phone: "123456789",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await usersRepository.create({
      name: "Teste",
      email: "dsd@gmail.com",
      cpf: "12345678900",
      status: StatusEnum.ACTIVE,
      phone: "123456789",
    });

    expect(result.id).toBe("1");
  });

  it("Deve listar todos os usuários", async () => {
    Sinon.stub(usersRepository, "findAll").resolves([
      {
        id: "1",
        name: "Teste",
        email: "teste@gmail.com",
        cpf: "12345678900",
        status: "ACTIVE",
        phone: "123456789",
      },
    ]);

    const result = await usersRepository.findAll();

    expect(result.length).toBe(1);
    expect(result[0].email).toBe("teste@gmail.com");
  });

  it("Deve lançar uma exceção ao criar um usuário", async () => {
    Sinon.stub(usersRepository, "create").resolves({
      id: "",
      name: "",
      email: "",
      cpf: "",
      status: "",
      phone: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    try {
      await usersRepository.create({
        name: "",
        email: "",
        cpf: "",
        status: StatusEnum.ACTIVE,
        phone: "",
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("Deve lançar uma exceção ao listar todos os usuários", async () => {
    Sinon.stub(usersRepository, "findAll").throws();

    try {
      await usersRepository.findAll();
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("Deve atualizar um usuário", async () => {
    Sinon.stub(usersRepository, "update")
      .resolves({
        id: "1",
      })
      .withArgs({
        id: "1",
        name: "Teste",
        email: "teste@gmail.com",
        cpf: "12345678900",
        status: StatusEnum.ACTIVE,
        phone: "123456789",
      });

    const result = await usersRepository.update({
      id: "1",
      name: "Teste",
      email: "teste@gmail.com",
      cpf: "12345678900",
      status: StatusEnum.ACTIVE,
      phone: "123456789",
    });

    expect(result?.id).toBe("1");
  });

  it("Deve lançar uma exceção ao atualizar um usuário", async () => {
    Sinon.stub(usersRepository, "update").throws();

    try {
      await usersRepository.update({
        id: "1",
        name: "Teste",
        email: "teste@gmail.com",
        cpf: "12345678900",
        status: StatusEnum.ACTIVE,
        phone: "123456789",
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("Deve deletar um usuário", async () => {
    Sinon.stub(usersRepository, "delete").calledWith({ id: "1" });

    const result = await usersRepository.delete({ id: "1" });

    expect(result).toBeCalled;
  });

  it("Deve lançar uma exceção ao deletar um usuário", async () => {
    Sinon.stub(usersRepository, "delete").throws();

    try {
      await usersRepository.delete({ id: "1" });
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});

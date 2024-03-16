import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import Sinon from "sinon";
import { HttpStatus } from "../../src/enums/httpStatus.enum";
import StatusEnum from "../../src/enums/status.enum";
import { UsersRepository } from "../../src/repositories/user.repository";
import { UserService } from "../../src/services/user.service";

describe("Testes do service de usuários", () => {
  let userService: UserService;
  let userRepository: UsersRepository;

  beforeEach(() => {
    userService = new UserService();
    userRepository = new UsersRepository();
  });

  it("Deve chamar o método create do repositório com os dados corretos ao chamar o método create do service", async () => {
    const createDataOutput = {
      id: "2c6e0f65-a06c-4977-b20b-443ea1c9c60b",
      name: "Teste",
      email: "teste69@gmail.com",
      cpf: "11398193488",
      status: StatusEnum.ACTIVE,
      phone: "12345678945",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    Sinon.stub(userRepository, "create").resolves(createDataOutput);

    const createDataInput = {
      name: "Teste",
      email: "teste69@gmail.com",
      cpf: "11398193488",
      status: StatusEnum.ACTIVE,
      phone: "12345678945",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await userService.create(createDataInput);

    expect(result).toBeInstanceOf(Object);

    await userService.delete({ id: result.id });
  });

  it("Deve lançar uma exceção de conflito quando o email ou CPF já estiverem cadastrados", async () => {
    Sinon.stub(userRepository, "create").throws({
      code: "P2002",
    });

    await expect(
      userService.create({
        name: "Teste",
        email: "teste@gmail.com",
        cpf: "12345678900",
        status: StatusEnum.ACTIVE,
        phone: "12345678945",
      })
    ).rejects.toThrowError("Email ou CPF já cadastrado no sistema");
  });

  it("Deve lançar uma exceção de requisição inválida quando ocorrer um erro de validação", async () => {
    Sinon.stub(userRepository, "create").throws({
      status: HttpStatus.BAD_REQUEST,
      message: "Email ou CPF já cadastrado no sistema",
    });

    await expect(
      userService.create({
        name: "Teste",
        email: "teste2@gmail.com",
        cpf: "12345678901",
        status: StatusEnum.ACTIVE,
        phone: "12345678912",
      })
    ).rejects.toThrowError("Email ou CPF já cadastrado no sistema");
  });

  it("Deve lançar uma exceção de erro interno do servidor quando ocorrer um erro desconhecido", async () => {
    Sinon.stub(userRepository, "create").throws();

    await expect(
      userService.create({
        name: "Teste",
        email: "teste3@gmail.com",
        cpf: "12345454544",
        status: StatusEnum.ACTIVE,
        phone: "12345678912",
      })
    ).rejects.toThrowError();
  });

  it("Deve chamar o método findAll do repositório ao chamar o método findAll do service", async () => {
    Sinon.stub(userRepository, "findAll").resolves([]);

    const result = await userService.findAll();

    expect(result).toBeInstanceOf(Array);
  });

  it("Deve chamar o método update do repositório com os dados corretos ao chamar o método update do service", async () => {
    const user = await userService.create({
      name: "Teste",
      email: "teste69@gmail.com",
      cpf: "11398193488",
      status: StatusEnum.ACTIVE,
      phone: "12345678945",
    });

    const updateDataOutput = {
      id: user.id,
      name: "Oie",
      email: user.email,
      cpf: user.cpf,
      status: user.status,
      phone: user.phone,
    };

    Sinon.stub(userRepository, "update").resolves(updateDataOutput);

    const updateDataInput = {
      id: user.id,
      name: "Oie",
    };

    const result = await userService.update(updateDataInput);

    expect(result).toBeTruthy();
    await userService.delete({ id: user.id });
  });

  it("Deve lançar uma exceção de conflito quando o email ou CPF já estiverem cadastrados ao chamar o método update do service", async () => {
    Sinon.stub(userRepository, "update").throws({
      code: "P2002",
    });

    const data = {
      id: "5babba97-49e6-47b6-b9b4-c6aee21aae96",
      name: "Teste",
      email: "teste@gmail.com",
      cpf: "00038596555",
      status: StatusEnum.ACTIVE,
      phone: "12345678945",
    };

    await expect(userService.update(data)).rejects.toThrowError(
      "Email ou CPF já cadastrado no sistema"
    );
  });

  it("Deve chamar o método delete do repositório com o ID correto ao chamar o método delete do service", async () => {
    const { id } = await userService.create({
      name: "Teste",
      email: "teste69@gmail.com",
      cpf: "11398193488",
      status: StatusEnum.ACTIVE,
      phone: "12345678945",
    });

    const result = await userService.delete({ id });

    expect(result).toBeTruthy();
  });

  it("Deve lançar uma exceção de usuário não encontrado quando ocorrer um erro de usuário não encontrado ao chamar o método delete do service", async () => {
    const data = {
      id: "5babba97-49e6-47b6-b9b4-c6aee21aae80",
    };

    await expect(userService.delete(data)).rejects.toThrowError(
      "Usuário não encontrado"
    );
  });

  afterEach(function () {
    Sinon.restore();
  });
});

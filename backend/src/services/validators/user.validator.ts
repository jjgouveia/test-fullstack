import { z } from "zod";
import StatusEnum from "../../enums/status.enum";
import { BadRequestException } from "../../exceptions/badRequest.exception";
import { ICreate } from "../../interfaces/user.interface";

class UserValidator {
  static createAndUpdateUserSchema = z.object({
    name: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .min(3, { message: "O nome está muito curto" })
      .max(78, { message: "O nome está muito longo" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Nome deve conter somente letras",
      }),
    email: z.string().email(),
    cpf: z
      .string()
      .length(11, { message: "CPF deve ter somente 11 números" })
      .regex(/^\d+$/, { message: "CPF deve conter somente números" }),
    phone: z
      .string()
      .length(11, { message: "Telefone deve ter somente 11 números" })
      .regex(/^\d+$/, { message: "Telefone deve conter somente números" }),
    status: z.enum([
      StatusEnum.ACTIVE,
      StatusEnum.INACTIVE,
      StatusEnum.DEACTIVATED,
      StatusEnum.PENDING,
    ]),
  });

  static validateCreateUser = (data: ICreate) => {
    try {
      return this.createAndUpdateUserSchema.parse(data);
    } catch (error: any) {
      throw new BadRequestException(error.errors[0].message);
    }
  };
}

export { UserValidator };

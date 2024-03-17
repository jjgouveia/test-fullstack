import { z } from "zod";
import StatusEnum from "../../enums/status.enum";
import { BadRequestException } from "../../exceptions/badRequest.exception";
import { ICreate, IUpdate } from "../../interfaces/user.interface";

class UserValidator {
  static createUserSchema = z.object({
    name: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .min(3, { message: "O nome está muito curto" })
      .max(78, { message: "O nome está muito longo" })
      .regex(/^[a-zA-Z\u00C0-\u00FF\s]+$/, {
        message: "Nome deve conter somente letras",
      }),
    email: z.string().email(),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: "CPF deve ter o formato 999.999.999-99",
    }),
    phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
      message: "Telefone deve ter o formato (99) 99999-9999",
    }),
    status: z.enum([
      StatusEnum.ACTIVE,
      StatusEnum.INACTIVE,
      StatusEnum.DEACTIVATED,
      StatusEnum.PENDING,
    ]),
  });

  static validateCreateUser = (data: ICreate) => {
    try {
      return this.createUserSchema.parse(data);
    } catch (error: any) {
      throw new BadRequestException(error.errors[0].message);
    }
  };

  static updateUserSchema = z.object({
    name: z
      .string()
      .min(3, { message: "O nome está muito curto" })
      .max(78, { message: "O nome está muito longo" })
      .regex(/^[a-zA-Z\u00C0-\u00FF\s]+$/, {
        message: "Nome deve conter somente letras",
      })
      .optional(),
    email: z.string().email().optional(),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
        message: "CPF deve ter o formato 999.999.999-99",
      })
      .optional(),
    phone: z
      .string()
      .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
        message: "Telefone deve ter o formato (99) 99999-9999",
      })
      .optional(),
    status: z
      .enum([
        StatusEnum.ACTIVE,
        StatusEnum.INACTIVE,
        StatusEnum.DEACTIVATED,
        StatusEnum.PENDING,
      ])
      .optional(),
  });

  static validateUpdateUser = (data: IUpdate) => {
    try {
      return this.updateUserSchema.parse(data);
    } catch (error: any) {
      throw new BadRequestException(error.errors[0].message);
    }
  };

  static validateId = (id: string) => {
    try {
      return z.string().uuid().parse(id);
    } catch (error: any) {
      throw new BadRequestException("ID inválido");
    }
  };
}

export { UserValidator };

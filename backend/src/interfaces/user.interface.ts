import StatusEnum from "../enums/status.enum";

export interface ICreate {
  name: string;
  email: string;
  cpf: string;
  status: StatusEnum;
  phone: string;
}

export interface IUpdate extends ICreate {
  id: string;
}

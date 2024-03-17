import StatusEnum from "./userStatus.enum";

type CustomerProps = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  status: StatusEnum;
};

export default CustomerProps;

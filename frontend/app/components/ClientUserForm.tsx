import { useForm } from "react-hook-form";
import UseMySwal from "../hooks/UseMySwal";
import CreateCustomerProps from "../interfaces/ICreateUser";
import { createCustomer } from "../services/api";
import StatusEnum from "../types/userStatus.enum";
import Button from "./Button";

export type CreateCustomerFormProps = {
  users: any[];
  setUsers: (users: any[]) => void;
  setOpenCreateArea: (value: boolean) => void;
};

const MySwal = UseMySwal();

export default function CreateCustomerForm({
  users,
  setUsers,
  setOpenCreateArea,
}: CreateCustomerFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const response = await createCustomer(data as CreateCustomerProps);
    if (response && response.status === 201) {
      const newUser = response.data;
      setUsers([...users, newUser]);
      setOpenCreateArea(false);
      MySwal.fire("Sucesso!", "Cliente criado com sucesso!", "success");
    } else if (response && response.status === 409) {
      MySwal.fire("Erro!", "CPF ou Email já cadastrado", "error");
    } else {
      MySwal.fire("Erro!", "Erro ao criar cliente", "error");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="text-gray-900 font-bold">
            Nome
          </label>
          <input
            type="text"
            id="name"
            className="p-2 border border-gray-200 rounded-md"
            {...register("name", {
              required: true,
              minLength: {
                value: 3,
                message: "Nome deve ter no mínimo 3 caracteres",
              },
              maxLength: {
                value: 78,
                message: "Nome deve ter no máximo 78 caracteres",
              },
              pattern: {
                value: /^[a-zA-Z\u00C0-\u00FF\s]+$/,
                message: "Nome deve conter apenas letras",
              },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{String(errors.name.message)}</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="text-gray-900 font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="p-2 border border-gray-200 rounded-md"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Email inválido. Formato: ada@lovelace.com",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{String(errors.email.message)}</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="cpf" className="text-gray-900 font-bold">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            className="p-2 border border-gray-200 rounded-md"
            {...register("cpf", {
              required: true,
              pattern: {
                value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                message: "CPF inválido. Formato: 999.999.999-99",
              },
            })}
          />
          {errors.cpf && (
            <span className="text-red-500">{String(errors.cpf.message)}</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="phone" className="text-gray-900 font-bold">
            Telefone
          </label>
          <input
            type="text"
            id="phone"
            className="p-2 border border-gray-200 rounded-md"
            {...register("phone", {
              required: true,
              pattern: {
                value: /^\(\d{2}\) \d{5}-\d{4}$/,
                message: "Telefone inválido. Formato: (99) 99999-9999",
              },
            })}
          />
          {errors.phone && (
            <span className="text-red-500">{String(errors.phone.message)}</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="status" className="text-gray-900 font-bold">
            Status
          </label>
          <select
            id="status"
            className="p-2 border border-gray-200 rounded-md"
            {...register("status", { required: true })}
          >
            <option selected value={StatusEnum.Ativo}>
              Ativo
            </option>
            <option value={StatusEnum.Inativo}>Inativo</option>
            <option value={StatusEnum.Aguardando}>Aguardando</option>
            <option value={StatusEnum.Desativado}>Desativado</option>
          </select>
          {errors.status && (
            <span className="text-red-500">Campo obrigatório</span>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-8 gap-4">
        <Button type="submit">Criar</Button>
        <Button
          className="p-2 bg-red-600 text-white rounded-md"
          onClick={() => setOpenCreateArea(false)}
        >
          Cancelar
        </Button>
      </div>
      <hr className="my-8" />
    </form>
  );
}

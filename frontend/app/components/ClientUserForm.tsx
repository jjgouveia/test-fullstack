import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UseMySwal from "../hooks/UseMySwal";
import CreateCustomerProps from "../interfaces/ICreateUser";
import { createCustomer, updateCustomer } from "../services/api";
import CustomerProps from "../types/customer.type";
import StatusEnum from "../types/userStatus.enum";
import Button from "./Button";

export type CreateCustomerFormProps = {
  users?: any[];
  setUsers?: (users: any[]) => void;
  setOpenCreateArea: (value: boolean) => void;
  editMode?: boolean
  customer?: CustomerProps
  setCustumer?: (customer: CustomerProps) => void;
};

const MySwal = UseMySwal();

export default function CreateCustomerForm({
  users,
  setUsers,
  setOpenCreateArea,
  editMode,
  customer: initialCustomer,
  setCustumer,
}: CreateCustomerFormProps) {
  const [customer, setCustomer] = useState<CustomerProps | undefined>(initialCustomer);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    if (initialCustomer) {
      Object.entries(initialCustomer).forEach(([key, value]) => {
        setValue(key, value);
      });
    } 
  }, [initialCustomer, setValue]);


  const onSubmit = handleSubmit(async (data) => {
    if (!editMode && customer) {
      const response = await updateCustomer(customer.id, data as CustomerProps)
      if (response && response.status === 202) {
        if (setCustumer) setCustumer(response.data);
          setOpenCreateArea(false);
          MySwal.fire({
            icon: "success",
            title: "Cliente atualizado com sucesso",
          })
      } else if (response && response.status === 409) {
        MySwal.fire("Erro!", "CPF ou Email já cadastrado", "error");
      } else {
        MySwal.fire("Erro!", "Erro ao atualizar cliente", "error");
      }
    } else {

    const response = await createCustomer(data as CreateCustomerProps);
    if (response && response.status === 201) {
      const newUser = response.data;
      if (users && setUsers) setUsers([...users, newUser]);
      setOpenCreateArea(false);
      MySwal.fire("Sucesso!", "Cliente criado com sucesso!", "success");
    } else if (response && response.status === 409) {
      MySwal.fire("Erro!", "CPF ou Email já cadastrado", "error");
    } else {
      MySwal.fire("Erro!", "Erro ao criar cliente", "error");
    }
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
            placeholder={
              customer && customer.name ? customer.name : undefined
            }
            disabled={editMode}
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
            placeholder={
              customer && customer.email ? customer.email : undefined
            }
            disabled={editMode}
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
            placeholder={
              customer && customer.cpf ? customer.cpf : undefined
            }
            disabled={editMode}
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
                value: /^\(\d{2}\) (9\d{4}-\d{4}|[1,2,3,4,5,6,7,8]\d{3}-\d{4}$)/,
                message: "Telefone deve ter o formato válido no Brasil. Ex: (99) 99999-9999 ou (99) 3999-9999",
              },
            })}
            placeholder={
              customer && customer.phone ? customer.phone : undefined
            }
            disabled={editMode}
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
            disabled={editMode}
          >
           { Object.values(StatusEnum).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && (
            <span className="text-red-500">Campo obrigatório</span>
          )}
        </div>
      </div>
      {
        !editMode && (
          <div className="flex justify-end mt-8 gap-4">
        <Button type="submit">{
          customer ? "Atualizar" : "Criar"
        }</Button>
        <Button
          className="p-2 bg-red-600 text-white rounded-md"
          onClick={() => setOpenCreateArea(false)}
        >
          Cancelar
        </Button>
      </div>
        )
      }
      <hr className="my-8" />
    </form>
  );
}

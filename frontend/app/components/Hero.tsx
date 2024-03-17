"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCustomer } from "../services/api";
import CustomerProps from "../types/customer.type";
import Button from "./Button";
import { CreateCustomerFormProps } from "./ClientUserForm";

interface CustomerProps2 extends Partial<CreateCustomerFormProps> {
  openCreateArea?: boolean;
}

export default function Hero({
  openCreateArea,
  setOpenCreateArea,
}: CustomerProps2) {
  const router = usePathname();

  const [customer, setCustomer] = useState<CustomerProps>();
  const id = router.split("/")[2];

  useEffect(() => {
    getCustomer(id).then((response: any) => {
      setCustomer(response.data);
    });
  }, [id]);

  return (
    <>
      <div className="flex justify-center sm:justify-start align-middle">
        <Image
          className="mr-2 mt-2"
          src="/users-group.svg"
          alt="UOL"
          width={32}
          height={32}
        />
        <h2 className="pt-2 text-4xl font-bold text-gray-900">
          Painel de Clientes
        </h2>
      </div>
      <hr className="my-8" />
      <div id="pre_container" className="flex justify-between">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-gray-900">
            {router === "/" ? "Listagem de usuários" : "Novo cliente"}
          </h3>
          <span className="text-gray-500">
            Escolha um cliente para visualizar os detalhes
          </span>
        </div>
        <div className="flex align-middle items-center mr-0 sm:mr-4">
          <div className="flex justify-between items-center">
            <Button
              onClick={() => {
                setOpenCreateArea && setOpenCreateArea(!openCreateArea);
              }}
            >
              {openCreateArea ? "Cancelar" : "Criar Cliente"}
            </Button>
          </div>
        </div>
      </div>
      <div id="container" className="flex justify-between">
        {customer ? (
          <form className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4">
              <label htmlFor="name" className="text-gray-500">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={customer.name}
                disabled
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="email" className="text-gray-500">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={customer.email}
                disabled
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="cpf" className="text-gray-500">
                CPF
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={customer.cpf}
                disabled
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="phone" className="text-gray-500">
                Telefone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={customer.phone}
                disabled
              />
            </div>
          </form>
        ) : null}
      </div>
    </>
  );
}

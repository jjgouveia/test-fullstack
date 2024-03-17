"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCustomers } from "./services/api";

import Button from "./components/Button";
import ClientCard from "./components/ClientCard";
import CreateCustomerForm from "./components/ClientUserForm";
import Header from "./components/Header";
import LoadingDots from "./components/LoadingDots";
import CustomerProps from "./types/customer.type";

export default function Home() {
  const [users, setUsers] = useState<CustomerProps[]>([]);
  const [openCreateArea, setOpenCreateArea] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    getCustomers().then((response) => {
      setUsers(response.data);
    });
  }, []);
  return (
    <div className="flex w-full min-h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1 justify-center mt-0 p-4 sm:mt-32 sm:p-0">
        <main className="flex flex-col w-full sm:w-4/5 p-4 bg-gray-100 rounded-lg shadow-lg">
          <div className="flex justify-center sm:justify-start align-middle">
            <Image
              className="mr-2 mt-2"
              src="/users-group.svg"
              alt="UOL"
              width={32}
              height={32}
            />
            <h2 className="pt-2 text-4xl font-bold text-gray-900">
              Lista de Clientes
            </h2>
          </div>
          <hr className="my-8" />
          <div id="pre_container" className="flex justify-between">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Listagem de usuários
              </h3>
              <span className="text-gray-500">
                Escolha um cliente para visualizar os detalhes
              </span>
            </div>
            <div className="flex align-middle items-center mr-0 sm:mr-4">
              <div className="flex justify-between items-center">
                <Button
                  onClick={() => {
                    setOpenCreateArea(!openCreateArea);
                  }}
                >
                  {openCreateArea ? "Cancelar" : "Criar Cliente"}
                </Button>
              </div>
            </div>
          </div>
          <div id="create_user_container" className="mt-8">
            {openCreateArea ? (
              <CreateCustomerForm
                users={users}
                setUsers={setUsers}
                setOpenCreateArea={setOpenCreateArea}
              />
            ) : null}
          </div>
          <section id="list_users_container" className="mt-8">
            <ul>
              {users && users.length > 0 ? (
                users.map(({ id, cpf, email, name, phone, status }) => {
                  return (
                    <ClientCard
                      key={id}
                      id={id}
                      cpf={cpf}
                      email={email}
                      name={name}
                      phone={phone}
                      status={status}
                      users={users}
                      setUsers={setUsers}
                    />
                  );
                })
              ) : (
                <div className="flex items-center">
                  <LoadingDots />
                </div>
              )}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}

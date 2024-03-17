"use client";
import { useEffect, useState } from "react";
import { getCustomers } from "./services/api";

import ClientCard from "./components/ClientCard";
import CreateCustomerForm from "./components/ClientUserForm";
import Hero from "./components/Hero";
import LoadingDots from "./components/LoadingDots";
import CustomerProps from "./types/customer.type";

export default function Home() {
  const [users, setUsers] = useState<CustomerProps[]>([]);
  const [openCreateArea, setOpenCreateArea] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomers().then((response) => {
      setUsers(response.data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="flex w-full min-h-screen flex-col">
      <div className="flex w-full flex-1 justify-center mt-0 p-4 sm:mt-16 sm:p-0">
        <main className="flex flex-col w-full sm:w-4/5 p-4 bg-gray-100 rounded-lg shadow-lg">
          <Hero
            openCreateArea={openCreateArea}
            setOpenCreateArea={setOpenCreateArea}
            users={users}
            setUsers={setUsers}
          />
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
                <div className="flex items-center justify-center">
                  {loading && users.length === 0 ? (
                    <LoadingDots />
                  ) : (
                    <h2 className="mt-8 text-gray-700 text-xl font-bold tracking-wide">
                      Nenhum cliente cadastrado
                    </h2>
                  )}
                </div>
              )}
            </ul>
            {users && users.length > 0 ? (
              <div className="flex justify-start mt-8 col-span-2 text-gray-500">
                Exibindo {users.length} clientes
              </div>
            ) : null}
          </section>
        </main>
      </div>
    </div>
  );
}

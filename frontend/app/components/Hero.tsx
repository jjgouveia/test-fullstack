"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "./Button";
import CreateCustomerForm, { CreateCustomerFormProps } from "./ClientUserForm";

interface CustomerProps extends Partial<CreateCustomerFormProps> {
  openCreateArea?: boolean;
}

export default function Hero({
  openCreateArea,
  setOpenCreateArea,
  users,
  setUsers,
}: CustomerProps) {
  const router = usePathname();

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
    </>
  );
}

"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "./Button";
import { CreateCustomerFormProps } from "./ClientUserForm";

interface HandleCustomerProps extends Partial<CreateCustomerFormProps> {
  openCreateArea?: boolean;
}

export default function Hero({
  openCreateArea,
  setOpenCreateArea,
}: HandleCustomerProps) {
  const router = usePathname();
  const rootPage = router === "/";
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
            {rootPage ? "Listagem de usuários" : "Detalhes do cliente" }
          </h3>
          <span className="text-gray-500">
            {
              rootPage
                ? "Veja os detalhes ou exclua um cliente cadastrado. Para adicionar um novo cliente, basta clicar em: Novo cliente."
                : "Visualize, edite as informações do cliente ou exclua o cadastro."
            }
          </span>
        </div>
        <div className="flex align-middle items-center mr-0 sm:mr-4">
          <div className="flex justify-between items-center">
            <Button
              onClick={() => {
                setOpenCreateArea && setOpenCreateArea(!openCreateArea);
              }}
            >
              {openCreateArea ? "Cancelar" : rootPage ? "Novo cliente" : "Editar"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

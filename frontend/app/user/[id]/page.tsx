"use client";
import Button from "@/app/components/Button";
import CreateCustomerForm from "@/app/components/ClientUserForm";
import Hero from "@/app/components/Hero";
import LoadingDots from "@/app/components/LoadingDots";
import UseMySwal from "@/app/hooks/UseMySwal";
import { deleteCustomer, getCustomer } from "@/app/services/api";
import CustomerProps from "@/app/types/customer.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCustomer({ params }: { params: { id: string } }) {
  const { id } = params;
  const { push } = useRouter();
  const MySwal = UseMySwal();
  const [customer, setCustomer] = useState<CustomerProps>();
  const [openCreateArea, setOpenCreateArea] = useState(false);

  useEffect(() => {
    getCustomer(id).then((response: any) => {
      setCustomer(response.data);
    });
  }, [id]);

  return (
    <div className="flex w-full min-h-screen flex-col">
      <div className="flex w-full flex-1 justify-center mt-0 p-4 sm:mt-16 sm:p-0">
        <main className="flex flex-col w-full sm:w-4/5 p-4 bg-gray-100 rounded-lg shadow-lg">
          <Hero
            openCreateArea={openCreateArea}
            setOpenCreateArea={setOpenCreateArea}
          />
          <div id="user_details_container" className="mt-8">
            {customer ? (
              <CreateCustomerForm
                customer={customer}
                setCustumer={setCustomer}
                editMode={!openCreateArea}
                setOpenCreateArea={setOpenCreateArea}
              />
            ) : (
              <LoadingDots />
            )}
            {customer && !openCreateArea ? (
              <div className="flex justify-center">
                <Button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mr-4" onClick={
                  () => push("/")
                }>
                  Voltar
                </Button>
                <Button
                  onClick={async () => {
                    const result = await MySwal.fire({
                      title: "Você tem certeza?",
                      text: "Você não será capaz de reverter isso!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Sim!",
                      cancelButtonText: "Cancelar",
                    });
                    if (result.isConfirmed) {
                      const response = await deleteCustomer(id);
                      if (response && response.status === 202) {
                        MySwal.fire({
                          title: "Deletado!",
                          text: "O cliente foi deletado.",
                          icon: "success",
                          timer: 2000,
                        }
                        );
                        setTimeout(() => {
                          push("/");
                        }, 2000);
                      } else {
                        MySwal.fire(
                          "Erro!",
                          "Ocorreu um erro ao excluir o cliente.",
                          "error"
                        );
                      }
                    }
                  }}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Excluir
                </Button>
                
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <h2 className="mt-8 text-gray-700 text-xl font-bold tracking-wide">
                  Modo de edição
                </h2>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

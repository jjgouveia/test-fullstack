import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { deleteCustomer } from "../services/api";
import CustomerProps from "../types/customer.type";
import StatusEnum from "../types/userStatus.enum";
import Button from "./Button";
const MySwal = withReactContent(Swal);

interface CustomerProps2 extends CustomerProps {
  users: CustomerProps[];
  setUsers: (users: CustomerProps[]) => void;
}

export default function ClientCard({
  id,
  name,
  email,
  cpf,
  phone,
  status,
  users,
  setUsers,
}: CustomerProps2) {
  return (
    <li
      key={id}
      id={`user_${id}`}
      className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 mb-4"
    >
      <div className="flex items-center gap-4 max-w-60 min-w-56">
        <Image
          className="rounded-full"
          src="/users.svg"
          alt="UOL"
          width={32}
          height={32}
        />
        <div className="flex flex-col">
          <h4 className="text-lg font-bold text-gray-900">{name}</h4>
          <span className="text-gray-500">{email}</span>
        </div>
      </div>
      <div className="flex justify-start gap-4 max-w-60 min-w-40">
        <div className="flex flex-col">
          <h4 className="w-full text-lg font-bold text-gray-900 text-left">
            {cpf}
          </h4>
          <span className="w-full text-gray-500">{phone}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 max-w-80 min-w-32 break-words border border-red-500">
        <div className="flex flex-col items-center align-middle">
          <h4 className="text-gray-500 text-left">
            {status === StatusEnum.Ativo
              ? "🟢 Ativo"
              : status === StatusEnum.Inativo
              ? "🔴Inativo"
              : status === StatusEnum.Aguardando
              ? "🟡 Aguardando"
              : "⚫ Desativado"}
          </h4>
        </div>
      </div>
      <div className="flex gap-4">
        <Button>Editar</Button>
        <Button
          className="p-2 bg-red-600 text-white rounded-md"
          onClick={async (event: any) => {
            const id =
              event.currentTarget.parentElement.parentElement.id.split("_")[1];
            const result = await MySwal.fire({
              title: "Você tem certeza?",
              text: "Você não será capaz de reverter isso!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sim!",
            });
            if (result.isConfirmed) {
              const response = await deleteCustomer(id);

              if (response && response.status === 202) {
                const newUsers = users.filter((user) => user.id !== id);
                setUsers(newUsers);
                MySwal.fire(
                  "Excluído!",
                  "Seu cliente foi excluído.",
                  "success"
                );
              } else {
                MySwal.fire(
                  "Erro!",
                  "Ocorreu um erro ao excluir o cliente.",
                  "error"
                );
              }
            }
          }}
        >
          Excluir
        </Button>
      </div>
    </li>
  );
}

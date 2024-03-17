import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-full min-h-screen flex-col">
      <header className="flex items-end justify-center bg-gray-950 backdrop-blur-xl h-[98px]">
        <h1 className="px-4 text-4xl font-bold flex w-full items-center bg-gray-900 text-center justify-center h-[76px] text-white">
          UOL
        </h1>
      </header>

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
                <button className="p-2 bg-amber-600 text-white rounded-md">
                  Novo Cliente
                </button>
              </div>
            </div>
          </div>
          <section id="list_users_container" className="mt-8">
            <ul>
              <li className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-4">
                  <Image
                    className="rounded-full"
                    src="/users.svg"
                    alt="UOL"
                    width={32}
                    height={32}
                  />
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold text-gray-900">
                      Jarbas Gouveia
                    </h4>
                    <span className="text-gray-500">jarbas@gouveia.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold text-gray-900">
                      123.456.789-00
                    </h4>
                    <span className="text-gray-500">(81) 99612-2536</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <h4 className="text-gray-500">🟢 Ativo</h4>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="p-2 bg-amber-600 text-white rounded-md">
                    Editar
                  </button>
                  <button className="p-2 bg-red-600 text-white rounded-md">
                    Excluir
                  </button>
                </div>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}

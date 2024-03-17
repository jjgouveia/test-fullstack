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
          <div className="flex justify-center sm:justify-start align-middle items-center">
            <Image
              className="mr-2"
              src="/users.svg"
              alt="UOL"
              width={32}
              height={32}
            />
            <h2 className="text-4xl font-bold text-gray-900">
              Lista de Clientes
            </h2>
          </div>
          <hr className="my-8" />
        </main>
      </div>
    </div>
  );
}

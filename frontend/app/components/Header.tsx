import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-end justify-center bg-gray-950 backdrop-blur-xl h-[98px]">
      <h1 className="px-4 text-4xl font-bold flex w-full items-center bg-gray-900 text-center justify-center h-[76px] text-white gap-2">
        <Image src="/uol.png" alt="UOL" width={32} height={32} />
        UOL
      </h1>
    </header>
  );
};

export default Header;

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-end justify-center bg-gray-950 backdrop-blur-xl h-[98px]">
      <Link className="flex w-full" href="/">
        <h1 className="px-4 text-4xl font-bold flex w-full items-center bg-gray-900 text-center justify-center h-[76px] text-white gap-2">
          <Image src="/uol.png" alt="UOL" width={32} height={32} />
          UOL
        </h1>
      </Link>
    </header>
  );
};

export default Header;

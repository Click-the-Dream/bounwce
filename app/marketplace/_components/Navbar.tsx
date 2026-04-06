"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import navLogo from "../../assets/nav-logo.png";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 bg-white px-10 py-5 font-inter">
      <Image
        src={navLogo.src}
        alt="bouwnce"
        className="h-4 md:h-5"
        width={100}
        height={20}
      />
      {pathname !== "/marketplace" && (
        <button
          onClick={() => router.push("/marketplace")}
          className="ml-3 flex items-center gap-2 border border-gray-300 hover:bg-gray-300 text-xs font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <FaArrowLeft /> Back to Marketplace
        </button>
      )}
    </div>
  );
};

export default Navbar;

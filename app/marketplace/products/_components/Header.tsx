"use client";
import { useMarketStore } from "@/app/context/StoreContext";
import { useRouter } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";

const Header = ({ title = "", showCart = true }) => {
  const router = useRouter();
  const { carts } = useMarketStore();

  return (
    <div className="mt-4 mb-8 flex items-center justify-between">
      <h1 className="text-xl font-medium text-orange">{title}</h1>

      {showCart && (
        <div
          onClick={() => router.push("/marketplace/carts")}
          className="relative bg-[#ECECF0] p-2 rounded-lg cursor-pointer"
        >
          <FaCartShopping size={20} />
          <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center">
            {carts?.length || 0}
          </span>
        </div>
      )}
    </div>
  );
};

export default Header;

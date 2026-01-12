import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/storeContext";

const Header = ({ title = "" }) => {
  const navigate = useNavigate();
  const { cart } = useStore();

  const orderSummary = {
    totalItems: cart.reduce(
      (sum, vendor) =>
        sum + vendor.items.reduce((iSum, i) => iSum + i.quantity, 0),
      0
    ),
  };

  return (
    <div className="mt-4 mb-8 flex items-center justify-between">
      <h1 className="text-xl font-medium text-orange">{title}</h1>

      <div
        onClick={() => navigate("/cart")}
        className="relative bg-[#ECECF0] p-2 rounded-lg cursor-pointer"
      >
        <FaCartShopping size={20} />
        <span className="absolute -top-[6px] -right-[6px] h-4 w-4 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center">
          {orderSummary.totalItems}
        </span>
      </div>
    </div>
  );
};

export default Header;

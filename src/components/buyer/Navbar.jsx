import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 bg-white px-10 py-5 font-inter">
      <h2 className="font-bold text-lg mr-5 text-orange">bouwnce</h2>
      <button
        onClick={() => navigate("/marketplace")}
        className="ml-3 flex items-center gap-2 border border-gray-300 hover:bg-gray-300 text-xs font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
      >
        <FaArrowLeft /> Back to Marketplace
      </button>
    </div>
  );
};

export default Navbar;

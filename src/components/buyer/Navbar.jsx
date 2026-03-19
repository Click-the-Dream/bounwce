import { FaArrowLeft } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isMarketplace = location.pathname === "/buyer/marketplace";
  const isCheckout = location.pathname === "/buyer/checkout";

  const buttonText = isCheckout ? "Back to cart" : "Back to Marketplace";
  const buttonDestination = isCheckout ? "/buyer/cart" : "/buyer/marketplace";

  return (
    <div className="flex items-center gap-2 bg-white px-10 py-5 font-inter">
      <h2 className="font-bold text-lg mr-5 text-orange">bouwnce</h2>      
      
      {!isMarketplace && (
        <button
          onClick={() => navigate(buttonDestination)}
          className="ml-3 flex items-center gap-2 border border-gray-300 hover:bg-gray-300 text-xs font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <FaArrowLeft /> {buttonText}
        </button>
      )}
    </div>
  );
};

export default Navbar;
import { FaStar } from "react-icons/fa6";
import { formatCurrency } from "../../utils/formatters";
import { useStore } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { cart, setCart } = useStore();
  const navigate = useNavigate();

  if (!product) return null;

  const foundVendorIndex = cart.findIndex((vendor) => 
    vendor.items.some(item => item.id === product.id)
  );
  
  const isInCart = foundVendorIndex !== -1;

  const handleCardClick = (e) => {
    // Prevent navigation if clicking buttons
    if(e.target.closest("button")) return;

    navigate("/buyer/product-details", {
      state: {
        product: product,
        vendorInfo: {
          name: isInCart ? cart[foundVendorIndex].name : (product.vendor || "Tech Gadgets"),
        }
      }
    })
  }

  const handleCartAction = (e, action) => {
    e.stopPropagation(); // Stop clicking the card

    if (action === "add") {
      setCart((prevCart) => {
        const cartClone = [...prevCart];
        const vendorName = product.vendor || "Tech Gadgets";
        const vendorIndex = cartClone.findIndex(v => v.name === vendorName);

        if (vendorIndex > -1) {
            // Vendor exists, push item
            cartClone[vendorIndex].items.push({ ...product, quantity: 1, status: "cart" });
        } else {
            // New Vendor
            cartClone.push({
                name: vendorName,
                items: [{ ...product, quantity: 1, status: "cart" }]
            });
        }
        return cartClone;
      });
    } else {
      // REMOVE LOGIC
      if (isInCart) {
        setCart((prev) =>
            prev
                .map((vendor, vIdx) => {
                    // Only modify the vendor that contains this product
                    if (vIdx !== foundVendorIndex) return vendor;
                    
                    return {
                        ...vendor,
                        // Filter out the specific product ID
                        items: vendor.items.filter((item) => item.id !== product.id),
                    }
                })
                .filter((vendor) => vendor.items.length > 0) // Clean up empty vendors
        );
      }
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="
        group relative flex flex-col bg-white
        rounded-xl border border-gray-200
        w-[150px] md:w-[220px]
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1 cursor-pointer
      "
    >
      {/* Image wrapper */}
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={product.image}
          alt={product.name}
          className="
            h-36 w-full object-cover object-top
            transition-transform duration-500
            group-hover:scale-105 mb-4
          "
        />
      </div>

      <section className="px-4 pb-4 flex flex-col flex-1">
        <h2 className="font-medium text-sm mb-1 line-clamp-2">
          {product.name}
        </h2>

        <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-2">
          <span>{product.category}</span>
          <span className="flex items-center gap-1 text-yellow-500">
            <FaStar size={12} /> {product.rating.toFixed(1)}
          </span>
        </div>

        <p className="mb-1 text-[13px] font-semibold">
          {formatCurrency(product.price)}
        </p>

        {/* Action */}
        <div className="mt-auto flex justify-end">
          {isInCart ? (
            <button
              onClick={(e) => handleCartAction(e, "remove")}
              className="
                opacity-0 translate-y-3 pointer-events-none
                group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                transition-all duration-300
                bg-gray-400 hover:bg-gray-500
                text-white text-[10px] md:text-xs
                py-1 px-2 md:p-2 rounded-md
              "
            >
              Remove from Cart
            </button>
          ) : (
            <button
               onClick={(e) => handleCartAction(e, "add")}
              className="
                opacity-0 translate-y-3 pointer-events-none
                group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                transition-all duration-300
                bg-orange hover:bg-orange-600
                text-white text-[10px] md:text-xs
                py-1 px-2 md:p-2 rounded-md
              "
            >
              Add to Cart
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductCard;
import { FaStar } from "react-icons/fa6";
import { formatCurrency } from "../../utils/formatters";
import useCart from "../../hooks/useCart";
import { useStore } from "../../context/storeContext";

const ProductCard = ({ product }) => {
  const { cart } = useStore();
  const { addToCart, removeFromCart } = useCart();
  // Check if this product is already in the cart
  const isInCart = cart.some((vendor) =>
    vendor.items.find((item) => item.id === product.id)
  );

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm w-[220px] border border-gray-200">
      <img
        src={product.image}
        alt={product.name}
        className="rounded-t-lg mb-4 h-36 aspect-square object-top object-cover"
      />

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

        <p className="mb-3 text-[13px] font-semibold">
          {formatCurrency(product.price)}
        </p>

        {isInCart ? (
          <button
            onClick={() => removeFromCart(product)}
            className="ml-auto bg-gray-400 hover:bg-gray-500 text-white text-xs p-2 rounded-md transition duration-200"
          >
            Remove from Cart
          </button>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="ml-auto bg-orange text-white text-xs p-2 rounded-md transition duration-200"
          >
            Add to Cart
          </button>
        )}
      </section>
    </div>
  );
};

export default ProductCard;

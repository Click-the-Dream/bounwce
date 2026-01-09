import { FaStar } from "react-icons/fa6";
import { formatCurrency } from "../../utils/formatters";
import useCart from "../../hooks/useCart";
import { useStore } from "../../context/storeContext";

const ProductCard = ({ product }) => {
  const { cart } = useStore();
  const { addToCart, removeFromCart } = useCart();

  const isInCart = cart.some((vendor) =>
    vendor.items.find((item) => item.id === product.id)
  );

  return (
    <div
      className="
        group relative flex flex-col bg-white
        rounded-xl border border-gray-200
        w-[150px] md:w-[220px]
        transition-all duration-300 ease-out
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
            transition-transform duration-500 ease-out
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
              onClick={() => removeFromCart(product)}
              className="
                opacity-0 translate-y-3 pointer-events-none
                group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                transition-all duration-300 ease-out
                bg-gray-400 hover:bg-gray-500
                text-white text-[10px] md:text-xs
                py-1 px-2 md:p-2 rounded-md
              "
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="
                opacity-0 translate-y-3 pointer-events-none
                group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                transition-all duration-300 ease-out
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

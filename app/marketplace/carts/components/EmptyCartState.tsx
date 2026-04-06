"use client";
import { useRouter } from "next/navigation";
import { FiShoppingBag } from "react-icons/fi";

const EmptyCartState = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
      <div className="bg-gray-100 p-6 rounded-full mb-4">
        <FiShoppingBag className="text-gray-400" size={40} />
      </div>
      <h2 className="text-xl font-semibold text-gray-900">
        Your cart is empty
      </h2>
      <p className="text-gray-500 text-sm mt-2 mb-8 text-center max-w-xs">
        Looks like you haven't added anything to your cart yet.
      </p>
      <button
        onClick={() => router.push("/buyer/marketplace")}
        className="bg-black text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Start Shopping
      </button>
    </div>
  );
};

export default EmptyCartState;

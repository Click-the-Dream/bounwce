"use client";
import Link from "next/link";
import { FiDelete } from "react-icons/fi";

const ErrorState = ({ message }: any) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
    <div className="bg-red-50 p-6 rounded-full mb-4">
      <FiDelete className="text-red-500" size={40} />
    </div>
    <h2 className="text-xl font-bold text-gray-900">Product not found</h2>
    <p className="text-gray-500 mt-2 mb-6 max-w-xs">
      {message ||
        "The item you are looking for might have been removed or is temporarily unavailable."}
    </p>
    <Link
      href="/marketplace"
      className="bg-black text-white px-8 py-3 rounded-xl font-medium"
    >
      Back to Marketplace
    </Link>
  </div>
);

export default ErrorState;

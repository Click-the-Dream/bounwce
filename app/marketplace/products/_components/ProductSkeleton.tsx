"use client";
import Navbar from "@/app/_components/Navbar";

const ProductSkeleton = () => (
  <div className="bg-[#ECECF080] min-h-screen animate-pulse">
    <Navbar />
    <div className="max-w-5xl mx-auto px-6 mt-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 h-125 bg-gray-200 rounded-xl" />
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-1/4 bg-gray-200 rounded" />
          <div className="h-32 w-full bg-gray-200 rounded" />
          <div className="h-12 w-full bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  </div>
);
export default ProductSkeleton;

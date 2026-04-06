"use client";
import { useRouter } from "next/navigation";
import useProduct from "../hooks/use-product";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";

const CategoryList = () => {
  const router = useRouter();
  const { useGetProductCategories } = useProduct();
  const { data: categories = [] } = useGetProductCategories();

  const handleCategoryClick = (categoryName: string) => {
    // Navigates to /products?category=CategoryName
    router.push(`/marketplace?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3.5 mt-5 max-w-162.5">
      {categories?.map((cat: { name: string }, index: Key) => (
        <button
          key={index}
          onClick={() => handleCategoryClick(cat?.name)}
          className="cursor-pointer px-5 py-2 text-[12px] font-medium border-[0.5px] border-[#BDBDBD] rounded-full bg-white hover:bg-white/50 transition-all text-gray-700 active:scale-95"
        >
          {cat?.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;

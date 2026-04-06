"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useProduct from "@/app/hooks/use-product";
import SearchHeader from "./SearchHeader";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductCard from "./ProductCard";

const ProductSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "";

  const [activeTab, setActiveTab] = useState("vendors");
  const [inputValue, setInputValue] = useState(urlSearch);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  // 1. Debounced Search Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only update if the value has changed and meets length requirements
      if (
        inputValue !== urlSearch &&
        (inputValue.length >= 3 || inputValue.length === 0)
      ) {
        const query = createQueryString("search", inputValue);
        router.push(`${pathname}?${query}`, { scroll: false });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue, pathname, createQueryString, urlSearch]);

  const handleCategoryClick = (category: string) => {
    const value = category === "All" ? "" : category;
    const query = createQueryString("category", value);
    router.push(`${pathname}?${query}`, { scroll: false });
  };

  const apiFilters = {
    name: urlSearch.length >= 3 ? urlSearch : undefined,
    category: urlCategory.length >= 3 ? urlCategory : undefined,
  };

  const { useGetAllProducts, useGetProductCategories } = useProduct();
  const { data: CATEGORIES = [] } = useGetProductCategories();
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetAllProducts(apiFilters);

  const allProducts = data?.pages?.flatMap((page: any) => page.products) || [];

  return (
    <div className="min-h-screen bg-[#FCFAF5] text-[#111827]">
      <SearchHeader
        inputValue={inputValue}
        setInputValue={setInputValue}
        CATEGORIES={CATEGORIES}
        urlCategory={urlCategory}
        handleCategoryClick={handleCategoryClick}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        urlSearch={urlSearch}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-auto gap-8 place-items-center">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : allProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32">
              <h3 className="text-lg font-bold text-gray-400">
                No results found
              </h3>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-auto gap-8 gap-y-12 place-items-center">
                {allProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>

              {/* INFINITE SCROLL BUTTON */}
              {hasNextPage && (
                <div className="mt-16 flex justify-center pb-12">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="px-8 py-3 bg-black text-white rounded-full font-bold text-sm disabled:bg-gray-400 transition-transform active:scale-95"
                  >
                    {isFetchingNextPage ? "Loading more..." : "Load more items"}
                  </button>
                </div>
              )}
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ProductSearch;

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SearchHeader from '../components/SearchHeader';
import ProductCard from '../components/buyer/ProductCard';
import useProduct from '../hooks/useProduct';
import ProductCardSkeleton from '../components/buyer/ProductCardSkeleton';

const ProductSearch = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const urlSearch = searchParams.get("search") || "";
    const urlCategory = searchParams.get("category") || "";
    const [activeTab, setActiveTab] = useState('vendors');
    const [inputValue, setInputValue] = useState(urlSearch);

    // 1. Debounced Search Logic
    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue.length >= 3 || inputValue.length === 0) {
                setSearchParams(prev => {
                    if (!inputValue) prev.delete("search");
                    else prev.set("search", inputValue);
                    return prev;
                });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [inputValue, setSearchParams]);

    const handleCategoryClick = (category) => {
        setSearchParams(prev => {
            if (category === "All") {
                prev.delete("category");
            } else {
                prev.set("category", category);
            }
            return prev;
        });
    };

    const apiFilters = {
        name: urlSearch.length >= 3 ? urlSearch : undefined,
        category: urlCategory.length >= 3 ? urlCategory : undefined,
    };

    const { useGetAllProducts, useGetProductCategories } = useProduct();
    const { data: CATEGORIES = [] } = useGetProductCategories();
    // Destructuring fetchNextPage and hasNextPage for Infinite Scroll
    const {
        data,
        isLoading,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useGetAllProducts(apiFilters);

    const allProducts = data?.pages?.flatMap(page => page.products) || [];

    return (
        <div className="min-h-screen bg-[#FCFAF5] text-[#111827]">
            <SearchHeader
                navigate={navigate}
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
                        <div className="grid grid-cols-1 md:grid-cols-auto gap-8">
                            {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
                        </div>
                    ) : allProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32">
                            <h3 className="text-lg font-bold text-gray-400">No results found</h3>
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
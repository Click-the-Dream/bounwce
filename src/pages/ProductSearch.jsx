import { useState } from 'react';
import { ArrowLeft, MapPin, Utensils, Users, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/buyer/ProductCard';
import useProduct from '../hooks/useProduct';
import ProductCardSkeleton from '../components/buyer/ProductCardSkeleton';

const filters = ['All', 'Open Now', 'Closest', 'Top Rated', 'Verified'];

const ProductSearch = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('vendors');
    const [activeFilter, setActiveFilter] = useState('All');
    const [query, setQuery] = useState('Best jollof rice');

    const { useGetAllProducts } = useProduct();
    const { data, isLoading, error } = useGetAllProducts();

    const products = data?.products || [];

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#111827] font-sans">
            {/* HEADER */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* Back */}
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-500 hover:text-black transition"
                        >
                            <ArrowLeft size={18} />
                            <span className="font-medium">Back</span>
                        </button>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-2xl">
                            <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl focus-within:ring-2 focus-within:ring-[#FF5C35]">
                                <Search size={18} className="text-gray-400" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search food, vendors..."
                                    className="bg-transparent w-full outline-none text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="mt-6">
                        <h1 className="text-2xl md:text-3xl font-semibold">
                            Results for <span className="text-[#FF5C35]">"{query}"</span>
                        </h1>
                        <p className="text-gray-400 flex items-center gap-2 text-sm mt-1">
                            <MapPin size={14} className="text-[#FF5C35]" /> Vendors near you
                        </p>
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Tabs */}
                <div className="flex gap-3 mb-6">
                    {[
                        { key: 'vendors', label: 'Vendors', icon: Utensils },
                        { key: 'people', label: 'People', icon: Users },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition border
                ${activeTab === tab.key
                                        ? 'bg-[#FF5C35] text-white border-[#FF5C35] shadow-sm'
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <Icon size={16} /> {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border transition
              ${activeFilter === filter
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* STATES */}
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
                        Failed to load products. Please try again.
                    </div>
                )}

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="text-5xl mb-4">🍲</div>
                        <p className="text-gray-500 text-lg font-medium">No results found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductSearch;

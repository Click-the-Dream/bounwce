import { useState } from 'react';
import { ArrowLeft, Search, X, MapPin, Loader2, Menu, ChevronDown } from 'lucide-react';

const SearchHeader = ({
    navigate,
    inputValue,
    setInputValue,
    CATEGORIES,
    urlCategory,
    handleCategoryClick,
    activeTab,
    setActiveTab,
    isFetching,
    isFetchingNextPage,
    urlSearch,
}) => {
    const [showCategories, setShowCategories] = useState(false);

    return (
        <header className="bg-white/70 backdrop-blur-xl border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">

                {/* Top row: back + nav */}
                <div className="flex items-center justify-between gap-4 mb-6 md:mb-20">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2.5 hover:bg-gray-100 rounded-full transition-all flex items-center gap-2 font-semibold text-sm"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={20} />
                        <span className="hidden sm:inline">Back</span>
                    </button>

                    {/* Desktop nav */}
                    <nav className="ml-auto hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
                        <button className="hover:text-black transition-colors">New Arrivals</button>
                        <button className="hover:text-black transition-colors">Trending</button>
                        <button className="hover:text-black transition-colors">Deals</button>
                    </nav>

                    {/* Mobile nav toggle */}
                    <button className="ml-auto md:hidden p-2 hover:bg-gray-100 rounded-full" aria-label="Open menu">
                        <Menu size={20} />
                    </button>
                </div>

                {/* Middle row: search + tabs */}
                <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
                    {/* Search input */}
                    <div className="flex-1 w-full relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Search for items..."
                            aria-label="Search for items"
                            className="w-full bg-gray-100/80 border-none rounded-2xl py-3.5 pl-12 pr-10 text-sm font-medium focus:ring-2 focus:ring-orange/20 focus:bg-white transition-all outline-none"
                        />
                        {inputValue && (
                            <button
                                onClick={() => setInputValue('')}
                                aria-label="Clear search"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full text-gray-400"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Tabs */}
                    <div
                        className="inline-flex p-1 bg-gray-100/80 rounded-xl border border-gray-200/50 self-end md:self-auto"
                        role="tablist"
                    >
                        {['Places', 'People'].map((label) => (
                            <button
                                key={label}
                                onClick={() => setActiveTab(label.toLowerCase())}
                                role="tab"
                                aria-selected={activeTab === label.toLowerCase()}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    activeTab === label.toLowerCase()
                                        ? 'bg-white shadow-sm text-black'
                                        : 'text-gray-500'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom row: category + location */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                    {/* Categories desktop */}
                    <div className="hidden md:flex items-center gap-3 flex-1 flex-wrap">
                        <span className="text-lg font-bold text-black capitalize tracking-wider flex-shrink-0">
                            Popular:
                        </span>

                        <button
                            onClick={() => handleCategoryClick("All")}
                            className={`whitespace-nowrap px-5 py-2 rounded-xl text-xs font-bold transition-all border ${!urlCategory || urlCategory === "All"
                                ? 'bg-black text-white border-black shadow-md'
                                : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                                }`}
                        >
                            All
                        </button>

                        {CATEGORIES?.map((cat) => {
                            const categoryName = typeof cat === 'string' ? cat : cat.name;
                            const isActive = urlCategory === categoryName;
                            return (
                                <button
                                    key={cat.id || categoryName}
                                    onClick={() => handleCategoryClick(categoryName)}
                                    className={`whitespace-nowrap px-5 py-2 rounded-xl text-xs font-bold transition-all border ${isActive
                                        ? 'bg-black text-white border-black shadow-md'
                                        : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                                        }`}
                                >
                                    {categoryName}
                                </button>
                            );
                        })}
                    </div>

                    {/* Mobile categories toggle */}
                    <div className="md:hidden w-full">
                        <button
                            className="w-full flex justify-between items-center px-4 py-3 bg-gray-100/80 rounded-xl border border-gray-200/50 text-sm font-bold"
                            onClick={() => setShowCategories(!showCategories)}
                            aria-expanded={showCategories}
                        >
                            {urlCategory || "Select Category"}
                            <ChevronDown className={`transition-transform ${showCategories ? 'rotate-180' : ''}`} />
                        </button>

                        {showCategories && (
                            <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
                                <button
                                    onClick={() => { handleCategoryClick("All"); setShowCategories(false); }}
                                    className={`w-full text-left px-4 py-2 text-sm font-medium transition-all ${!urlCategory || urlCategory === "All" ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    All
                                </button>
                                {CATEGORIES?.map((cat) => {
                                    const categoryName = typeof cat === 'string' ? cat : cat.name;
                                    const isActive = urlCategory === categoryName;
                                    return (
                                        <button
                                            key={cat.id || categoryName}
                                            onClick={() => { handleCategoryClick(categoryName); setShowCategories(false); }}
                                            className={`w-full text-left px-4 py-2 text-sm font-medium transition-all ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            {categoryName}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Location */}
                    <div className="flex flex-col items-start sm:items-end flex-shrink-0 mt-3 sm:mt-0">
                        <div
                            className="flex items-center gap-2 mb-1"
                            aria-busy={isFetching && !isFetchingNextPage}
                        >
                            <h1 className="text-xl font-bold tracking-tight">
                                {urlCategory || urlSearch || 'Marketplace'}
                            </h1>
                            {(isFetching && !isFetchingNextPage) && (
                                <Loader2 className="w-4 h-4 text-[#FF5C35] animate-spin" />
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                            <MapPin size={12} className="text-[#FF5C35]" />
                            <span>Lagos, Nigeria</span>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default SearchHeader;

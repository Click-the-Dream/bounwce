"use client";
import { useState } from "react";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowLeft,
  Search,
  X,
  MapPin,
  Loader2,
  Menu,
  ChevronDown,
} from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useRouter } from "next/navigation";

const SearchHeader = ({
  inputValue,
  setInputValue,
  CATEGORIES,
  urlCategory,
  handleCategoryClick,
  activeTab,
  setActiveTab,
  isFetching,
  isFetchingNextPage,
}: any) => {
  const router = useRouter();
  const [showCategories, setShowCategories] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Smart Scroll Logic: Monitors scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous: any = scrollY.getPrevious();
    // If scrolling down and passed the initial header height (150px), hide it
    if (latest > previous && latest > 150) {
      setHidden(true);
      setShowCategories(false);
    } else {
      // If scrolling up, show it immediately
      setHidden(false);
    }
  });

  return (
    <>
      <nav className="bg-white w-full z-50 pb-14">
        {/* 1. TOP NAV: This part scrolls away and NEVER stays sticky */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between border-b border-gray-50">
          <button
            onClick={() => router.push("/")}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-all flex items-center gap-2 font-bold text-sm"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className=" hidden mx-auto md:inline-flex p-1 bg-gray-100/80 rounded-xl border border-gray-200/50">
            {["Places", "People"].map((label) => (
              <button
                key={label}
                onClick={() => setActiveTab(label.toLowerCase())}
                className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === label.toLowerCase()
                    ? "bg-white shadow-sm text-black"
                    : "text-gray-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="ml-auto md:ml-0">
            <ProfileDropdown fullMode={true} />
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* 2. THE SMART STICKY ROW: This handles the sticky behavior */}
      <motion.div
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input Field */}
            <div className="relative flex-1 w-full group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
                size={18}
              />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Quick search..."
                className="w-full bg-gray-100/80 border-none rounded-xl py-3 pl-12 pr-10 text-sm font-medium focus:ring-2 focus:ring-black/5 focus:bg-white outline-none transition-all"
              />
              {inputValue && (
                <button
                  onClick={() => setInputValue("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-black"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Toggle & Title */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <div className="relative">
                <button
                  className="flex items-center gap-3 px-5 py-3 bg-black text-white rounded-xl text-xs font-bold whitespace-nowrap shadow-lg shadow-black/10 active:scale-95 transition-transform"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  {urlCategory || "All Categories"}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${showCategories ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {showCategories && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowCategories(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full mt-2  left-0 md:right-0 md:left-auto w-60 bg-white border border-gray-200 rounded-2xl shadow-2xl z-20 overflow-y-auto max-h-60 p-2"
                      >
                        <button
                          onClick={() => {
                            handleCategoryClick("All");
                            setShowCategories(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm rounded-xl mb-1 ${!urlCategory || urlCategory === "All" ? "bg-gray-100 font-bold" : "hover:bg-gray-50 font-medium"}`}
                        >
                          All Products
                        </button>
                        {CATEGORIES?.map(
                          (cat: { id: string; name: string }) => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                handleCategoryClick(cat.name);
                                setShowCategories(false);
                              }}
                              className={`w-full text-left px-4 py-3 text-sm rounded-xl ${urlCategory === cat.name ? "bg-gray-100 font-bold" : "hover:bg-gray-50 font-medium"}`}
                            >
                              {cat.name}
                            </button>
                          ),
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-black tracking-tight">
                    {urlCategory || "MarketPlace"}
                  </h1>
                  {isFetching && !isFetchingNextPage && (
                    <Loader2
                      size={12}
                      className="animate-spin text-orange-500"
                    />
                  )}
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-[10px] font-bold">
                  <MapPin size={10} className="text-orange-500" />
                  <span>LAGOS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SearchHeader;

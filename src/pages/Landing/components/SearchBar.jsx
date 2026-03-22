import { Search } from 'lucide-react';
import React from 'react';

const SearchBar = () => {
    return (
        <div className="w-full max-w-4xl px-4 py-10">
            {/* 1. Added 'flex-col' for mobile and 'sm:flex-row' for larger screens.
                2. Added 'p-2' on mobile for better spacing when stacked.
            */}
            <div
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white rounded-[15px] sm:rounded-[10px] p-2 sm:p-1 border border-gray-200/50 transition-all duration-300"
                style={{
                    boxShadow: `
                        1px 1px 2px 0px rgba(0, 0, 0, 0.10), 
                        3px 3px 5px 0px rgba(0, 0, 0, 0.09), 
                        8px 7px 6px 0px rgba(0, 0, 0, 0.05), 
                        14px 12px 7px 0px rgba(0, 0, 0, 0.01)
                    `
                }}
            >
                {/* Input Field */}
                <input
                    type="text"
                    placeholder="e.g., A quiet coffee shop to meet a friend....."
                    className="flex-grow rounded-[8px] sm:rounded-[5px] px-4 md:px-6 py-4 md:py-3 bg-[#F4F4F5] text-gray-700 outline-none placeholder:text-gray-400 font-medium text-[13px]"
                />

                {/* Action Button */}
                <button className="bg-[#FF5030] hover:bg-[#e4462a] text-black font-semibold px-6 md:px-[30px] py-3 md:py-[15px] rounded-[8px] sm:rounded-[5px] border-2 border-black transition-all active:scale-[0.98] h-[52px] sm:h-[46px] text-[14px] sm:text-[13px] flex items-center justify-center">
                    <Search className='block lg:hidden' /> <span className='hidden lg:block'>Search</span>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
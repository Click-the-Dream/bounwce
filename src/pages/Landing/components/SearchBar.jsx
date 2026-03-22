import React from 'react';

const SearchBar = () => {
    return (
        <div className="w-full max-w-4xl px-4 py-10">
            {/* Container with the multi-layered shadow */}
            <div
                className="flex items-center gap-1 bg-white rounded-[10px] p-1 border border-gray-200/50 transition-all duration-300"
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
                    className="flex-grow rounded-[5px] px-6 py-3 bg-[#F4F4F5] text-gray-700 outline-none placeholder:text-gray-400 font-medium text-[13px]"
                />

                {/* Action Button */}
                <button className="bg-[#FF5030] hover:bg-[#e4462a] text-black font-medium px-[30px] py-[15px] rounded-[5px] border-2 border-black transition-transform active:scale-95 h-[46px] text-[13px]">
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
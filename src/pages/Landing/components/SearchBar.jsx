import { useState } from 'react'; // Added useState
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CategoryList from './CategoryList';
import { onPrompt } from '../../../utils/notifications/onPrompt';

const SearchBar = () => {
    const [query, setQuery] = useState(""); // Track search input

    const handleSearch = () => {
        onPrompt({
            title: "Search feature coming soon!",
            message: "We're working hard to bring you this feature. Stay tuned for updates!",
        })
        // if (query.trim()) {
        //     navigate(`/marketplace?search=${encodeURIComponent(query)}`);
        // } else {
        //     navigate(`/marketplace`);
        // }
    };

    return (
        <>
            <CategoryList setQuery={setQuery} />
            <div className="w-full max-w-4xl px-4 py-5">
                <div
                    className="flex flex-row items-stretch md:items-center gap-2 bg-white rounded-[15px] md:rounded-[10px] p-2 md:p-1 border border-gray-200/50 transition-all duration-300"
                    style={{
                        boxShadow: `1px 1px 2px 0px rgba(0, 0, 0, 0.10), 3px 3px 5px 0px rgba(0, 0, 0, 0.09), 8px 7px 6px 0px rgba(0, 0, 0, 0.05), 14px 12px 7px 0px rgba(0, 0, 0, 0.01)`
                    }}
                >
                    <input
                        type="text"
                        value={query}
                        //onChange={(e) => setQuery(e.target.value)}
                        //onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Search on Enter key
                        placeholder="Where can i get a shawarma"
                        className="flex-grow rounded-[8px] md:rounded-[5px] px-4 md:px-6 py-4 md:py-3 bg-[#F4F4F5] text-gray-700 outline-none placeholder:text-gray-400 font-medium text-[13px]"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-[#FF5030] hover:bg-[#e4462a] text-black font-semibold px-6 md:px-[30px] py-3 md:py-[15px] rounded-[8px] md:rounded-[5px] border-2 border-black transition-all active:scale-[0.98] h-[52px] md:h-[46px] text-[14px] md:text-[13px] flex items-center justify-center"
                    >
                        <Search className='block lg:hidden' />
                        <span className='hidden lg:block'>Search</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default SearchBar;
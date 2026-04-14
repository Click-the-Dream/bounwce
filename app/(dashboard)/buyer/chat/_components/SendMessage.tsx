import { ArrowUp, Plus } from "lucide-react";
import { useState } from "react";

const SendMessage = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="py-1.5 px-3 md:px-6 border-t-[0.53px] border-b-[0.53px] border-[#00000033] bg-white h-13.75">
      <div className="h-full flex items-center gap-3 bg-[#EFF3F4] border-[0.5px] border-orange rounded-[50px] px-1.5 py-2 shadow-sm">
        <button className="w-7.5 h-7.5 flex items-center justify-center p-1 text-black border border-black rounded-full">
          <Plus size={18} strokeWidth={1} />
        </button>
        <input
          type="text"
          placeholder="Message"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent text-sm focus:outline-none"
        />
        {isFocused && (
          <button className="w-7.5 h-7.5 flex items-center justify-center p-1 bg-orange text-white rounded-full transition-all duration-300">
            <ArrowUp size={18} strokeWidth={1} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SendMessage;

"use client";
import { Search, Plus, PlusCircle } from "lucide-react";
import ChatCard from "./ChatCard";
import { CHATS } from "@/app/_utils/dummy";

const ChatSidebar = () => {
  return (
    <div className="hidden md:flex w-80 border-r-[0.53px] border-[#00000033] flex-col bg-white h-full">
      <div className="p-4 flex items-center justify-between h-15.5  border-b-[0.53px] border-[#00000033]">
        <h2 className="text-[16px] font-semibold">Chats</h2>
        <button className="cursor-pointer max-w-17.75 h-7.5 flex-1 bg-orange outline-[0.83px] outline-orange border border-[#F4F4F4] hover:bg-[#ee3d15] text-white p-2 rounded-full text-xs font-medium flex items-center justify-center transition-all">
          <PlusCircle fill="#8a0202" className="size-4 mr-1.75" /> New
        </button>
      </div>

      <div className="relative z-20 px-2 pb-[7.73px] my-2 border-b-[0.53px] border-[#00000033]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9C9C] size-4" />
          <input
            type="text"
            placeholder="Find Anything"
            className="w-full bg-white border-[0.53px] border-[#0000004D] rounded-[10px] py-2 pl-10 pr-4 text-sm focus:outline-none focus:rounded-b-none focus:border-0 focus:border-b focus:pb-3 placeholder:text-[#9C9C9C] transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {CHATS.map((chat, i) => (
          <ChatCard chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;

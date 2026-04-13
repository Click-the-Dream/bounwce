"use client";
import { ArrowUp, Plus } from "lucide-react";
import SafeImage from "@/app/_components/SafeImage";
import SendMessage from "./SendMessage";
import MessageList from "./MessageList";

const ChatWindow = ({ chat }: any) => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="h-16 border-b border-gray-200 flex items-center px-6 gap-3 shrink-0">
        <div
          className="relative shrink-0 rounded-[10px]  border border-white"
          style={{
            boxShadow:
              "0px 0px 2.03px 0.51px #00000040, 0.51px -3.05px 2.03px 1.52px #00000040 inset",
          }}
        >
          {chat?.type === "initials" ? (
            <div className="w-9.25 h-9.25 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-black">
              {chat?.initials}
            </div>
          ) : (
            <SafeImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat?.name}${chat?.id}`}
              alt="Profile"
              width={40}
              height={40}
              className="w-9.25 h-9.25 rounded-[10px] object-cover"
            />
          )}
          <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-[0.83px] border-white rounded-full"></span>
        </div>

        <span className="font-medium text-sm">Zara Okafor</span>
      </div>

      {/* Messages */}
      <MessageList />

      {/* Input Area */}
      <SendMessage />
    </div>
  );
};

export default ChatWindow;

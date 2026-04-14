"use client";
import { MESSAGES_DATA } from "@/app/_utils/dummy";
import ChatMessage from "./ChatMessage";
import { useChatUtils } from "@/app/context/ChatContext";
import { MessageSquareDashed } from "lucide-react"; // Optional: for a nice icon

const MessageList = () => {
  const { selectedChat } = useChatUtils();

  const messages = selectedChat ? MESSAGES_DATA[Number(selectedChat.id)] : [];

  if (!selectedChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 text-center">
        <div className="bg-[#F4F4F4] p-4 rounded-full mb-4">
          <MessageSquareDashed className="size-8 text-[#9C9C9C]" />
        </div>
        <h3 className="text-[13px] font-semibold text-black">Your Messages</h3>
        <p className="text-xs text-[#9C9C9C] max-w-[250px] mt-2">
          Select a conversation from the sidebar to start gisting.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
      <div className="text-center">
        <span className="text-[13px] text-black font-medium">
          April 12, 2026
        </span>
      </div>

      {messages && messages.length > 0 ? (
        messages.map((msg) => <ChatMessage key={msg.id} msg={msg} />)
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-[#9C9C9C]">
          <p className="text-sm italic">No messages here yet...</p>
        </div>
      )}
    </div>
  );
};

export default MessageList;

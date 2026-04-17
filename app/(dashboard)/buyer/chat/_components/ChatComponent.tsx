"use client";
import { useEffect } from "react";
import ChatWindow from "./ChatWindow";
import ChatSidebar from "./SideBar";
import { useParams } from "next/navigation";
import { useChatUtils } from "@/app/context/ChatContext";
import { CHATS } from "@/app/_utils/dummy";

const ChatComponent = () => {
  const { chatId } = useParams<any>();
  const { setSelectedChat } = useChatUtils();
  useEffect(() => {
    setSelectedChat(CHATS.find((c) => c.id == chatId));
  }, [chatId, CHATS]);
  return (
    <div className="flex h-[calc(100vh-60px)] bg-white overflow-hidden  border-[0.56px] border-t-0 border-l-0 border-[#00000033]">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};

export default ChatComponent;

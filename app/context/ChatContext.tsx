"use client";
import { createContext, useContext, useState } from "react";

export const ChatContext = createContext<any>({});
export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedChat, setSelectedChat] = useState<boolean>(false);
  const [isUserList, setIsUserList] = useState<boolean>(false);
  return (
    <ChatContext.Provider
      value={{ selectedChat, setSelectedChat, isUserList, setIsUserList }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const useChatUtils = () => useContext(ChatContext);

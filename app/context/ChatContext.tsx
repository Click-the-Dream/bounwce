"use client";
import { createContext, useContext, useState } from "react";
import { MESSAGES_DATA } from "@/app/_utils/dummy";

export const ChatContext = createContext<any>({});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [isUserList, setIsUserList] = useState(false);

  const [messages, setMessages] = useState(MESSAGES_DATA);

  // typing state per chat
  const [typingUsers, setTypingUsers] = useState<Record<number, boolean>>({});

  const sendMessage = (chatId: number, text?: string, image?: string) => {
    if (!text?.trim() && !image) return;

    const newMessage = {
      id: Date.now(),
      text: text || "",
      image: image || null,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSender: true,
    };

    setMessages((prev: any) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage],
    }));

    setTypingUsers((prev) => ({ ...prev, [chatId]: true }));

    setTimeout(() => {
      const replies = [
        "😂 I hear you",
        "No wahala, makes sense",
        "Let me check that",
      ];

      const replyMessage = {
        id: Date.now() + 1,
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSender: false,
      };

      setMessages((prev: any) => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), replyMessage],
      }));

      setTypingUsers((prev) => ({ ...prev, [chatId]: false }));
    }, 1500);
  };

  const triggerTyping = (chatId: number) => {
    setTypingUsers((prev) => ({
      ...prev,
      [chatId]: true,
    }));

    setTimeout(() => {
      setTypingUsers((prev) => ({
        ...prev,
        [chatId]: false,
      }));
    }, 1000);
  };

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        isUserList,
        setIsUserList,
        messages,
        sendMessage,
        typingUsers,
        triggerTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatUtils = () => useContext(ChatContext);

"use client";
import { createContext, useContext, useState } from "react";
import { MESSAGES_DATA } from "@/app/_utils/dummy";
import { MessageStatus } from "../_utils/types/buyer";

export const ChatContext = createContext<any>({});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [isUserList, setIsUserList] = useState(false);

  const [messages, setMessages] = useState(MESSAGES_DATA);

  // typing state per chat
  const [typingUsers, setTypingUsers] = useState<Record<number, boolean>>({});

  const sendMessage = (chatId: number, text?: string, images?: string[]) => {
    if (!text?.trim() && (!images || images.length === 0)) return;

    const newMessage = {
      id: Date.now(),
      text: text || "",
      images: images || [],
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSender: true,
      status: "sent" as MessageStatus,
    };

    setMessages((prev: any) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage],
    }));

    // 👇 STATUS PIPELINE (SIMULATED)
    queueMicrotask(() => {
      updateMessageStatus(chatId, newMessage.id, "delivered");

      setTimeout(() => {
        updateMessageStatus(chatId, newMessage.id, "read");
      }, 1500);
    });

    // fake reply typing
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
        images: [],
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSender: false,
        status: "delivered" as MessageStatus,
      };

      setMessages((prev: any) => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), replyMessage],
      }));

      setTypingUsers((prev) => ({ ...prev, [chatId]: false }));
    }, 1500);
  };

  const updateMessageStatus = (
    chatId: number,
    messageId: number,
    status: MessageStatus,
  ) => {
    setMessages((prev: any) => ({
      ...prev,
      [chatId]: prev[chatId].map((msg: any) =>
        msg.id === messageId ? { ...msg, status } : msg,
      ),
    }));
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
        updateMessageStatus,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatUtils = () => useContext(ChatContext);

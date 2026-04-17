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
      status: "sent" as MessageStatus,
    };

    setMessages((prev: any) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage],
    }));

    // 👇 STATUS FLOW LIVES HERE
    setTimeout(() => {
      updateMessageStatus(chatId, newMessage.id, "delivered");
    }, 800);

    setTimeout(() => {
      updateMessageStatus(chatId, newMessage.id, "read");
    }, 2000);

    // fake reply logic
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
        status: "delivered",
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

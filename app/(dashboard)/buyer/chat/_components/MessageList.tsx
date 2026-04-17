import { useEffect, useRef, useState } from "react";
import { useChatUtils } from "@/app/context/ChatContext";
import { MessageSquareDashed } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatImageMessage from "./ChatImageMessage";
import ImageViewer from "./ImageViewer";

const MessageList = () => {
  const { selectedChat, messages, typingUsers } = useChatUtils();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const chatMessages = selectedChat ? messages[Number(selectedChat.id)] : [];
  const mediaMessages = chatMessages.filter((m: any) => m.image);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, typingUsers]);

  if (!selectedChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-6 text-center">
        <div className="bg-[#F4F4F4] p-4 rounded-full mb-4">
          <MessageSquareDashed className="size-8 text-[#9C9C9C]" />
        </div>
        <h3 className="text-[13px] font-semibold text-black">Your Messages</h3>
        <p className="text-xs text-[#9C9C9C] max-w-62.5 mt-2">
          Select a conversation from the sidebar to start gisting.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
      <div className="text-center">
        <span className="text-[13px] text-black font-medium">
          April 12, 2026
        </span>
      </div>

      {chatMessages?.map((msg: any) =>
        msg.image ? (
          <ChatImageMessage
            key={msg.id}
            msg={msg}
            index={mediaMessages.findIndex((m: any) => m.id === msg.id)}
            onOpen={(i: number) => {
              setViewerIndex(i);
              setViewerOpen(true);
            }}
          />
        ) : (
          <ChatMessage key={msg.id} msg={msg} />
        ),
      )}

      {/* Typing indicator */}
      {typingUsers[selectedChat.id] && (
        <div className="text-sm text-gray-400 italic">typing...</div>
      )}

      <div ref={bottomRef} />
      {viewerOpen && (
        <ImageViewer
          media={mediaMessages}
          startIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
          user={selectedChat}
        />
      )}
    </div>
  );
};

export default MessageList;

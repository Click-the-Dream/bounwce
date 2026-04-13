import ChatWindow from "./_components/ChatWindow";
import ChatSidebar from "./_components/SideBar";

const ChatPage = () => {
  return (
    <div className="flex h-[calc(100vh-60px)] bg-white overflow-hidden mx-6 border-[0.56px] border-[#00000033]">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};

export default ChatPage;

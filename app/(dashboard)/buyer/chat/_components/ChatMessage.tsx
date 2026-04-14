const ChatMessage = ({ msg }: any) => {
  const containerClasses = msg?.isSender
    ? "flex flex-col gap-1 items-end ml-auto max-w-[70%]"
    : "flex flex-col gap-1 items-start max-w-[70%]";

  const bubbleClasses = msg?.isSender
    ? "bg-orange text-white"
    : "bg-[#EFF3F4] text-black";

  const timeClasses = msg?.isSender ? "text-white" : "text-black";

  return (
    <div className={containerClasses}>
      <div
        className={`${bubbleClasses} p-4 rounded-[10px] text-[13px] relative pb-6 pr-6`}
        style={{
          boxShadow:
            "0px 0px 1.5px 0px #00000040, 0px 0px 0px 0px #00000040 inset",
        }}
      >
        {msg?.text}
        <span
          className={`absolute bottom-1.25 right-1.25 text-[10px] ${timeClasses}`}
        >
          {msg?.timestamp}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;

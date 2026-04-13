const MessageList = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
      <div className="text-center">
        <span className="text-[13px] text-black font-medium">
          April 12, 2026
        </span>
      </div>

      {/* Incoming */}
      <div className="flex flex-col gap-1 items-start max-w-[70%]">
        <div
          className="bg-[#EFF3F4] text-[13px] text-black p-4 rounded-[10px] text-sm relative pb-6 pr-6"
          style={{
            boxShadow:
              "0px 0px 1.5px 0px #00000040, 0px 0px 0px 0px #00000040 inset",
          }}
        >
          Hi Victor, how are you doing? Trust you good?
          <span className="absolute bottom-1.25 right-1.25 text-[10px] text-black">
            08:09
          </span>
        </div>
      </div>

      {/* Outgoing */}
      <div className="flex flex-col gap-1 items-end ml-auto max-w-[70%]">
        <div
          className="bg-orange text-white p-4 rounded-[10px] text-[13px] relative pb-6 pr-6"
          style={{
            boxShadow:
              "0px 0px 1.5px 0px #00000040, 0px 0px 0px 0px #00000040 inset",
          }}
        >
          Hi, Zara, I am doing fine, what about you? Trust you good?
          <span className="absolute bottom-1.25 right-1.25 text-[10px] text-white">
            08:10
          </span>
        </div>
      </div>

      {/* Incoming repeated... */}
      <div className="flex flex-col gap-1 items-start max-w-[70%]">
        <div
          className="bg-[#EFF3F4] text-[13px] text-black p-4 rounded-[10px] text-sm relative pb-6 pr-6"
          style={{
            boxShadow:
              "0px 0px 1.5px 0px #00000040, 0px 0px 0px 0px #00000040 inset",
          }}
        >
          Hi Victor, how are you doing? Trust you good?
          <span className="absolute bottom-1.25 right-1.25 text-[10px] text-black">
            08:09
          </span>
        </div>
      </div>

      {/* Outgoing repeated... */}
      <div className="flex flex-col gap-1 items-end ml-auto max-w-[70%]">
        <div
          className="bg-orange text-white p-4 rounded-[10px] text-[13px] relative pb-6 pr-6"
          style={{
            boxShadow:
              "0px 0px 1.5px 0px #00000040, 0px 0px 0px 0px #00000040 inset",
          }}
        >
          Hi, Zara, I am doing fine, what about you? Trust you good?
          <span className="absolute bottom-1.25 right-1.25 text-[10px] text-white">
            08:10
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageList;

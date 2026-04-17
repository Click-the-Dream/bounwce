import { getMessageLayout, renderCheck } from "@/app/_utils/formatters";
import Image from "next/image";

const ChatImageMessage = ({ msg, index, onOpen }: any) => {
  const isSender = msg.isSender;
  const styles = getMessageLayout(isSender);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.bubble} p-0.5 relative w-71.25 rounded-[10px] overflow-hidden shadow-sm`}
      >
        {/* IMAGE */}
        {msg.image && (
          <div
            className="relative cursor-pointer"
            onClick={() => onOpen(index)}
          >
            <Image
              src={msg.image}
              alt="chat image"
              width={260}
              height={300}
              className="object-cover w-full h-88 rounded-[10px]"
            />

            {/* Timestamp overlay */}
            <span
              className={`absolute bottom-1.25 right-1.25 text-[10px] flex items-center gap-1 ${styles.time}`}
            >
              {msg.timestamp}
              {msg?.isSender && msg?.status && (
                <span className="text-[10px] opacity-80">
                  {renderCheck(msg.status)}
                </span>
              )}
            </span>
          </div>
        )}

        {/* CAPTION */}
        {msg.text && (
          <div className="px-2.25 py-1.75 text-[13px]">{msg.text}</div>
        )}
      </div>
    </div>
  );
};

export default ChatImageMessage;

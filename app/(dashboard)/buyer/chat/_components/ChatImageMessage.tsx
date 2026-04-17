import { getMessageLayout } from "@/app/_utils/formatters";
import Image from "next/image";

const ChatImageMessage = ({ msg }: { msg: any }) => {
  const isSender = msg.isSender;
  const styles = getMessageLayout(isSender);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.bubble} p-0.5 relative max-w-71.25 rounded-[10px] overflow-hidden shadow-sm`}
      >
        {/* IMAGE */}
        {msg.image && (
          <div className="relative">
            <Image
              src={msg.image}
              alt="chat image"
              width={260}
              height={300}
              className="object-cover w-full h-88 rounded-[10px]"
            />

            {/* Timestamp overlay */}
            <span
              className={`absolute bottom-1.25 right-1.25 text-[10px] ${styles.time}`}
            >
              {msg.timestamp}
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

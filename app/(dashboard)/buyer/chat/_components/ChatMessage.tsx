import { getMessageLayout, renderCheck } from "@/app/_utils/formatters";

const ChatMessage = ({ msg }: any) => {
  const styles = getMessageLayout(msg.isSender);
  return (
    <div className={styles.container}>
      <div
        className={`${styles.bubble} p-4 rounded-[10px] text-[13px] relative pb-6 pr-12`}
        style={{
          boxShadow:
            "0px 0px 1.5px 0px #00000040, 0px 0px 0px 0px #00000040 inset",
        }}
      >
        {msg?.text}
        <span
          className={`absolute bottom-1.25 right-1.25 text-[10px] flex items-center gap-1 ${styles.time}`}
        >
          {msg?.timestamp}
          {msg?.isSender && msg?.status && (
            <span className="text-[10px] opacity-80">
              {renderCheck(msg.status)}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;

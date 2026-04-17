import { ArrowUp, Plus, Image, Camera } from "lucide-react";
import { useRef, useState } from "react";
import { useChatUtils } from "@/app/context/ChatContext";
import ImagePreview from "./ImagePreview";

const SendMessage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [message, setMessage] = useState("");
  const [pendingImages, setPendingImages] = useState<string[]>([]);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const { selectedChat, sendMessage } = useChatUtils();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const readers = Array.from(files).map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      setPendingImages((prev) => [...prev, ...images]);
      setShowMenu(false);
    });

    // reset input so same file can be reselected
    e.target.value = "";
  };

  const handleSend = () => {
    if (!selectedChat) return;

    if (pendingImages.length > 0 || message.trim()) {
      sendMessage(
        Number(selectedChat.id),
        message.trim(),
        pendingImages, // now array
      );

      setPendingImages([]);
      setMessage("");
    }
  };

  return (
    <div className="relative py-2 px-3 md:px-6 border-t border-b border-[#00000033] bg-white">
      {pendingImages && (
        <ImagePreview images={pendingImages} setImages={setPendingImages} />
      )}

      {showMenu && (
        <div className="absolute bottom-16 left-3 md:left-6 w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-1 flex flex-col gap-1 z-50">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2.75 px-3 py-2 bg-[#F9F8F8] hover:bg-[#f5f0f0] rounded-lg text-sm text-[13px]"
          >
            <Image size={12} className="text-[#007BFC]" />
            <span>Add Photos</span>
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2.75 px-3 py-2 bg-[#F9F8F8] hover:bg-[#f5f0f0] rounded-lg text-sm text-[13px] border-t border-gray-50"
          >
            <Camera size={12} className="text-[#FF2E74]" />
            <span>Camera</span>
          </button>
        </div>
      )}

      <div className="flex items-center gap-3 bg-[#EFF3F4] border-[0.5px] border-orange rounded-[50px] px-1.5 py-2 shadow-sm">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`cursor-pointer w-7.5 h-7.5 flex items-center justify-center border rounded-full ${
            showMenu ? "bg-black text-white" : "text-black border-black"
          }`}
        >
          <Plus
            size={18}
            strokeWidth={1}
            className={`${showMenu ? "rotate-45" : ""}`}
          />
        </button>

        {/* INPUT */}
        <input
          value={pendingImages ? message : message}
          onChange={(e) =>
            pendingImages
              ? setMessage(e.target.value)
              : setMessage(e.target.value)
          }
          type="text"
          placeholder={pendingImages ? "Add caption..." : "Message"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent text-sm focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        {(isFocused || message || pendingImages) && (
          <button
            onClick={handleSend}
            className="w-7.5 h-7.5 flex items-center justify-center bg-orange text-white rounded-full"
          >
            <ArrowUp size={18} strokeWidth={1} />
          </button>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default SendMessage;

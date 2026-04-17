import SafeImage from "@/app/_components/SafeImage";
import Image from "next/image";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FiZoomIn, FiDownload, FiX } from "react-icons/fi";

const ImageViewer = ({ media, startIndex, onClose, user }: any) => {
  const [index, setIndex] = useState(startIndex);

  const current = media[index];

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50">
      {/* HEADER - Static height, not absolute */}
      <div className="h-16 w-full flex items-center justify-between px-6 border-b border-[#0000001a]">
        <div className="flex items-center gap-3">
          <div className="relative">
            {user?.type === "initials" ? (
              <div className="w-9.25 h-9.25 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-black text-xs">
                {user?.initials}
              </div>
            ) : (
              <div className="relative">
                <SafeImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}${user?.id}`}
                  alt="Profile"
                  width={37}
                  height={37}
                  className="w-9.25 h-9.25 rounded-[10px] object-cover"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#22C55E] border-2 border-white rounded-full"></div>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-black leading-tight">
              {user?.name}
            </span>
            <span className="text-[13px] text-black">Today at 13:59</span>
          </div>
        </div>

        {/* HEADER ACTIONS */}
        <div className="flex items-center gap-5 text-black">
          <button className="hover:text-black cursor-pointer transition-colors">
            <FiZoomIn size={14} />
          </button>
          <a
            href={current.image}
            download
            className="hover:text-black cursor-pointer transition-colors"
          >
            <FiDownload size={14} />
          </a>
          <button
            onClick={onClose}
            className="hover:text-black cursor-pointer transition-colors"
          >
            <FiX size={14} />
          </button>
        </div>
      </div>

      {/* VIEWPORT AREA */}
      <div className="relative flex-1 flex items-center justify-center bg-[#F9F9F9] overflow-hidden">
        {/* NAVIGATION BUTTONS */}
        <button
          onClick={() => setIndex((i: number) => Math.max(i - 1, 0))}
          className="z-10 cursor-pointer absolute left-6 flex items-center justify-center text-white bg-orange hover:bg-orange/90 transition-all rounded-full w-11 h-11 text-3xl shadow-md"
        >
          <MdKeyboardArrowLeft />
        </button>

        <div className="p-10 w-full h-full flex items-center justify-center">
          <Image
            src={current.image}
            alt="media"
            width={1200}
            height={800}
            priority
            className="max-h-full w-auto object-contain"
          />
        </div>

        <button
          onClick={() =>
            setIndex((i: number) => Math.min(i + 1, media.length - 1))
          }
          className="z-10 cursor-pointer absolute right-6 flex items-center justify-center text-white bg-orange hover:bg-orange/90 transition-all rounded-full w-11 h-11 text-3xl shadow-md"
        >
          <MdKeyboardArrowRight />
        </button>
      </div>

      {/* THUMB STRIP */}
      <div className="h-24 bg-white flex items-center justify-center gap-3 px-6 overflow-x-auto border-t border-[#0000000d]">
        {media.map((m: any, i: number) => (
          <div
            key={m.id}
            onClick={() => setIndex(i)}
            className={`relative min-w-14 h-14 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
              i === index
                ? "border-orange scale-110 shadow-sm"
                : "border-transparent opacity-50"
            }`}
          >
            <img
              src={m.image}
              className="w-full h-full object-cover"
              alt="thumb"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageViewer;

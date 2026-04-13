import SafeImage from "@/app/_components/SafeImage";
import React from "react";

const SearchUser = ({ item }: any) => {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer transition-colors rounded-xl group">
      <div className="relative w-10 h-10 shrink-0">
        {item.type === "image" ? (
          <SafeImage
            src={item.src}
            alt="Profile"
            width={40}
            height={40}
            className="w-full h-full rounded-xl object-cover border-2 border-white"
            style={{
              boxShadow:
                "0px 0px 2.03px 0.51px #00000040, 0.51px -3.05px 2.03px 1.52px #00000040 inset",
            }}
          />
        ) : (
          <div
            className="w-full h-full rounded-xl bg-white border border-white flex items-center justify-center text-[13px] text-black"
            style={{
              boxShadow:
                "0px 0px 2.03px 0.51px #00000040, 0.51px -3.05px 2.03px 1.52px #00000040 inset",
            }}
          >
            {item.initials}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-[13px] text-black leading-tight transition-colors">
          {item.name}
        </span>
        <span className="text-[13px] text-[#747474]">{item.handle}</span>
      </div>
    </div>
  );
};

export default SearchUser;

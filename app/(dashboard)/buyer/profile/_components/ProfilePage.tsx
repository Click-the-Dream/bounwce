"use client";
import { useState } from "react";
import IdentityCard from "./IdentityCard";
import Image from "next/image";
import profileBg from "../../../../assets/buyer/profile-bg.jpg";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Posts");

  const userData = {
    name: "Victorious Victor",
    handle: "p-origamixiii",
    bio: "Better to be woke and broke than sleep and creep",
    followers: 0,
    badges: 0,
    tags: ["Foodie", "Concerts", "Fitness"],
  };

  return (
    <main className="w-full h-full mx-auto flex flex-col md:flex-row justify-center p-4 md:p-8 pt-40 md:pt-4.75 overflow-y-auto">
      {/* Left Column */}
      <div className="w-full md:max-w-76.25 relative top-auto md:sticky md:top-0">
        <IdentityCard data={userData} />
      </div>

      {/* Right Column */}
      <div className="md:flex-1 space-y-6 max-w-143 w-full">
        <div className="bg-white">
          {/* Colored Banner Header */}
          <Image
            src={profileBg.src}
            alt="profile-banner"
            width={500}
            height={130}
            className="w-full h-31.25"
          />

          {/* Profile Details Content */}
          <div className="px-8.75 py-5">
            <h2 className="text-[16px] font-semibold text-black mb-1">
              {userData.name}
            </h2>
            <p className="text-[#888888] text-[13px] mb-3.25">
              {userData.handle}
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              {userData.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.75 py-1 border-[0.53px] border-[#8D8D8D] rounded-full text-[12px] text-[#747474] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2.75  border-y-[0.53px] border-[#00000033] py-4.75">
              {["Posts", "Replies", "Likes"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`min-w-13 text-sm transition-all relative text-black hover:bg-[#d9d9d954] px-3 py-2.5 rounded-[50px] ${
                    activeTab === tab ? "bg-[#D9D9D9]" : "bg-transparent"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Empty State / Feed */}
            <div className="py-7.75 flex flex-col items-center justify-center">
              <div className="w-full h-48 border-[0.53px] border-[#00000033] flex items-center justify-center">
                <p className="text-gray-200 font-medium">
                  No activity to show yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

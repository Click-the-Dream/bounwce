import { Bell, MessageCircleReply, Search, Menu } from "lucide-react";
import userImg from "../../../assets/buyer/user.jpg";
import Image from "next/image";

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="h-13.75 flex items-center justify-between py-2.25 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#00000033] sticky top-0 z-10">
    {/* LEFT SECTION */}
    <div className="flex items-center gap-3 w-full">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100"
      >
        <Menu className="size-5" />
      </button>

      {/* Search */}
      <div className="relative w-full max-w-xl mx-auto">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9C9C9C] size-4" />
        <input
          type="text"
          placeholder="Find Anything"
          className="w-full bg-white border-[0.53px] border-[#0000004D] rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none placeholder:text-[#9C9C9C]"
        />
      </div>
    </div>

    {/* RIGHT SECTION */}
    <div className="flex items-center gap-3 text-black mx-4">
      <MessageCircleReply
        strokeWidth={1.5}
        className="shrink-0 size-5 cursor-pointer"
      />

      <div className="relative cursor-pointer">
        <Bell strokeWidth={1.5} className="size-5" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 rounded-full">
          2
        </span>
      </div>

      <Image
        src={userImg}
        alt="Profile"
        width={32}
        height={32}
        className="rounded-md"
      />
    </div>
  </header>
);

export default Navbar;

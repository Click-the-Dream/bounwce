import { Bell, MessageCircleReply, Search, Menu } from "lucide-react";
import userImg from "../../../assets/buyer/user.jpg";
import Image from "next/image";
import SearchComponent from "./SearchComponent";
import Link from "next/link";

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="h-13.75 flex items-center justify-between py-2.25 px-4 md:px-6 lg:px-8 bg-white border-b border-[#00000033] sticky top-0 z-10">
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

      <SearchComponent />
    </div>

    {/* RIGHT SECTION */}
    <div className="flex items-center gap-3 text-black mx-4 mr-8 md:mr-4">
      <Link href="/buyer/chat">
        <MessageCircleReply
          strokeWidth={1.5}
          className="shrink-0 size-5 cursor-pointer"
        />
      </Link>

      <div className="relative cursor-pointer">
        <Bell strokeWidth={1.5} className="size-5" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 rounded-full">
          2
        </span>
      </div>

      <Link href="/buyer/profile" className="w-[32px] h-[32px]">
        <Image
          src={userImg}
          alt="Profile"
          width={32}
          height={32}
          className="rounded-md w-full h-full"
        />
      </Link>
    </div>
  </header>
);

export default Navbar;

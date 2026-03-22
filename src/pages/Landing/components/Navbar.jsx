import { Play } from "lucide-react";
import React from "react";
import Logo from "./Logo";

const Navbar = () => {
    return (
        <nav className="w-full bg-white mt-4 rounded-[15px] border-[0.83px] border-[#0000001A] shadow-md max-w-[900px] h-[45px] dark:bg-neutral-900 py-2 px-8 flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2 mr-auto">
                <Logo />
            </div>

            {/* Navigation Links */}
            <ul className="hidden md:flex items-center gap-4 text-gray-700 text-[13px] dark:text-gray-300 font-medium">
                <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                    About Us
                </li>
                <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                    Blog
                </li>
                <li className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                    Manifesto
                </li>
            </ul>

            {/* Sign Up Button */}
            <button className="
  h-[34px] flex justify-between items-center gap-2 text-[13px] px-[15px] py-[6px] 
  bg-orange text-black font-bold rounded-lg border-2 border-black 
  transition-all duration-200 ease-out
  hover:-translate-y-0.5 hover:-translate-x-0.5 
  hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
  active:translate-y-0 active:translate-x-0 active:shadow-none
">
                Sign Up
                <Play
                    size={10}
                    fill="#FFC501"
                    className="transition-transform duration-300 group-hover:scale-110"
                />
            </button>
        </nav>
    );
};

export default Navbar;
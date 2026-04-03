import { Play, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { LuSun, LuMoon } from "react-icons/lu";

import Logo from "./Logo";
import { Link } from "react-router-dom";
import { Divide } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const navLinks = [
        { name: "About Us", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Products", href: "/products" },
    ];

    return (
        <div className="relative w-full flex justify-center px-4">
            <nav className="w-full bg-white mt-4 rounded-[15px] border-[0.83px] border-[#0000001A] shadow-md max-w-[900px] min-h-[45px] dark:bg-neutral-900 py-2 px-4 md:px-8 flex items-center justify-between gap-4 z-50">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Logo />
                </div>

                <button
                    onClick={toggleTheme}
                    className="md:ml-0 ml-auto flex items-center justify-center p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors duration-300"
                    aria-label="Toggle Dark Mode"
                >
                    {theme === 'dark' ? <LuSun size={16} /> : <LuMoon size={16} />}
                </button>
                {/* Desktop Links */}
                <div className="ml-auto mr-2 hidden md:flex items-center gap-6 text-gray-700 text-[13px] dark:text-gray-300 font-medium">
                    {navLinks.map((link) => (
                        <Link key={link.name} to={link.href} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">

                    <Link to="/register" className="hidden md:flex h-[34px] justify-between items-center gap-2 text-[13px] px-[15px] py-[6px] bg-orange text-black font-bold rounded-lg border-2 border-black transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none">
                        Sign Up
                        <Play size={10} fill="#FFC501" />
                    </Link>



                    {/* Mobile Toggle Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden flex items-center justify-center w-[34px] h-[34px] rounded-lg border-2 border-black bg-white transition-all active:scale-90"
                    >
                        {isOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-[70px] left-4 right-4 bg-white border-2 border-black rounded-[15px] shadow-xl p-6 md:hidden z-40"
                    >
                        <ul className="flex flex-col gap-5">
                            {navLinks.map((link) => (
                                <li key={link.name} className="text-[13px] font-bold text-black border-b border-gray-100 pb-2">
                                    {link.name}
                                </li>
                            ))}
                            <li>
                                <Link to="/register" className="text-[13px] w-full h-[45px] flex justify-center items-center gap-2 bg-orange text-black font-bold rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    Sign Up <Play size={12} fill="#FFC501" />
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;

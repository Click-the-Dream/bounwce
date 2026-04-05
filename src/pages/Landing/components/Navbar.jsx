import { useState, useRef } from "react";
import { Play, Menu, X } from "lucide-react";
import navLogo from "../../../assets/nav-logo.png";
import { Link } from "react-router-dom";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
    const { authDetails } = useContext(AuthContext);
    const user = authDetails?.user;
    const [isOpen, setIsOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const navRef = useRef(null);
    const navLinks = [
        // { name: "About Us", href: "#" },
        // { name: "Blog", href: "#" },
        // { name: "Marketplace", href: "/marketplace" },
    ];

    const { scrollY } = useScroll();

    // Monitor scroll position relative to navbar
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (navRef.current) {
            const offsetTop = navRef.current.offsetTop;
            setIsFixed(latest > offsetTop);
        }
    });

    return (
        <>
            <div
                ref={navRef}
                className={`w-full flex justify-center px-4 transition-all duration-300 ${isFixed ? "fixed top-3 left-0 z-50 " : "relative mt-4"
                    }`}
            >
                <nav
                    style={{
                        boxShadow: '22px 18px 8px 0px #00000000, 0px 0px 4px 0px #00000040 inset'
                    }}
                    className="w-full max-w-[1000px] h-[49px] p-[9px] flex items-center justify-between gap-4 rounded-[15px] border-[0.83px] border-[#0000001A] bg-white"                >
                    {/* Logo */}
                    <div className="flex items-center gap-2 ml-2">
                        <img src={navLogo} alt="bouwnce" className="h-[16px] md:h-[20px]" />
                    </div>



                    {/* Desktop Links */}
                    <div className="ml-auto mr-2 hidden md:flex items-center gap-6 text-gray-700 text-[13px] font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="hover:text-black  cursor-pointer transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {!user && <Link
                            to="/register"
                            className="hidden md:flex h-[34px] justify-between items-center gap-2 text-[13px] px-[25px] py-[6px] bg-orange text-black font-bold rounded-lg border-2 border-black transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none"
                        >
                            Sign Up
                            <Play size={10} fill="#FFC501" />
                        </Link>}

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden flex items-center justify-center w-[34px] h-[34px] rounded-lg border-2 border-black bg-white transition-all active:scale-90"
                        >
                            {isOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Dropdown */}
                {isOpen && (
                    <div className="absolute top-[60px] left-4 right-4 bg-white border-2 border-black rounded-[15px] shadow-xl p-6 md:hidden z-50">
                        <ul className="flex flex-col gap-5">
                            {navLinks.map((link) => (
                                <li key={link.name} className="text-[13px] font-bold text-black border-b border-gray-100 pb-2">
                                    {link.name}
                                </li>
                            ))}
                            <li>
                                {!user && <Link
                                    to="/register"
                                    className="text-[13px] w-full h-[45px] flex justify-center items-center gap-2 bg-orange text-black font-bold rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    Sign Up <Play size={12} fill="#FFC501" />
                                </Link>}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;

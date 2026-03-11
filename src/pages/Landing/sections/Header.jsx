import { logoDark, logoWhite } from "../assets/images";
import { useModal } from "../context/ModalContext";
import { useTheme } from "../context/ThemeContext";
import { LuSun, LuMoon } from "react-icons/lu";

const Header = () => {
  const { openModal } = useModal();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center gap-2 fixed w-full z-50 bg-white dark:bg-gray-900 border-b border-b-gray-300 dark:border-gray-800 px-4 py-7 lg:py-6 transition-colors duration-300">
        
        <a 
            href="/" 
            className="flex items-center text-md md:text-xl lg:text-[1.75rem] font-sthupo lowercase font-black tracking-[0.15em] text-[#1A1A1A] dark:text-white transition-colors duration-300">
            <span>bou<span className="text-brand-orange">w</span>nce</span>
            <span className="-ml-1.5 md:-ml-2 -mt-0.2  flex items-center">
                <img 
                    src={theme === "dark" ? logoWhite : logoDark}
                    alt="logo"
                    className="w-[24px] md:w-[40px] shrink-0 object-contain"
                />
            </span>
        </a>

        <div className="flex items-center gap-3 md:gap-5">
            
            {/* The Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors duration-300"
                aria-label="Toggle Dark Mode"
            >
                {theme === 'dark' ? <LuSun size={16} /> : <LuMoon size={16} />}
            </button>

            {/* The Waitlist Button */}
            <button
                className="bg-brand-orange hover:opacity-90 transition-opacity text-white px-5 py-2 rounded-3xl font-semibold tracking-wide shadow-lg shadow-brand-orange/20 text-[10px] md:text-sm cursor-pointer hover:bg-brand-orange/70"
                onClick={openModal}
            >
                Join Waitlist
            </button>
        </div>
    </div>
  )
}

export default Header;

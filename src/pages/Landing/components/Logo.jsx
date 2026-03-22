
import { Link } from 'react-router-dom'
import { logoDark, logoWhite } from '../assets/images'
import { useTheme } from '../context/ThemeContext';

const Logo = () => {
    const { theme } = useTheme();
    return (
        <Link
            to="/"
            className="flex items-center text-[13px] font-inter lowercase font-black tracking-[0.15em] text-[rgb(26,26,26)] dark:text-white transition-colors duration-300">
            <span className="-mr-[7px] md:-mr-2 -mt-1 flex items-center">
                <img
                    src={theme === "dark" ? logoWhite : logoDark}
                    alt="logo"
                    className="w-[30px] md:w-[40px] shrink-0 object-contain"
                />
            </span>
            <span><span className="text-brand-orange">b</span>ouwnce</span>
        </Link>
    )
}

export default Logo
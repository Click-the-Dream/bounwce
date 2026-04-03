import { Link } from 'react-router-dom';
import { logoDark, logoWhite } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

const Logo = ({ onlyImage = false, size }) => {
    const { theme } = useTheme();

    // Default sizes
    const defaultImageClass = "w-[30px] md:w-[40px]";
    const defaultTextClass = "text-[13px] md:text-[16px]";

    // Dynamic sizing
    const imageStyle = size ? { width: `${size}px` } : {};
    const textStyle = size ? { fontSize: `${Math.round(size * 0.3)}px` } : {};

    // 🔥 Dynamic margin (key fix)
    const dynamicMargin = size
        ? { marginRight: `${-Math.round(size * 0.15)}px` }
        : {};

    return (
        <Link
            to="/"
            style={size ? textStyle : {}}
            className="flex items-center font-STHupo font-semibold tracking-[0.53px] lowercase text-[rgb(26,26,26)] dark:text-white transition-colors duration-300"
        >
            <span
                style={!onlyImage ? dynamicMargin : {}}
                className="flex items-center"
            >
                <img
                    src={theme === "dark" ? logoWhite : logoDark}
                    alt="logo"
                    style={imageStyle}
                    className={`${!size ? defaultImageClass : ""} shrink-0 object-contain`}
                />
            </span>

            {!onlyImage && (
                <span
                    className={!size ? defaultTextClass : ""}
                >
                    ou<span className="text-brand-orange">w</span>nce
                </span>
            )}
        </Link>
    );
};

export default Logo;

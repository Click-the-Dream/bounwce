import { Link } from 'react-router-dom';
import { logoDark, logoWhite } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

const Logo = ({ onlyImage = false, size }) => {
    const { theme } = useTheme();

    // Determine image size
    const imageSize = size ? `${size}px` : "w-[30px] md:w-[40px]";
    // Determine text size proportional to image
    const textSize = size ? `${Math.round(size * 0.3)}px` : "text-[13px] md:text-[16px]";

    return (
        <Link
            to="/"
            className={`flex items-center font-STHupo font-black lowercase text-[rgb(26,26,26)] dark:text-white transition-colors duration-300`}
            
        >
            <span className={`${onlyImage ? "" : "-mr-[12px]"} flex items-center`}>
                <img
                    src={theme === "dark" ? logoWhite : logoDark}
                    alt="logo"
                    style={size ? { width: imageSize } : {}}
                    className={`${!size && imageSize} shrink-0 object-contain`}
                />
            </span>

            {!onlyImage && <span style={size ? { fontSize: textSize } : {}}>ou<span className="text-brand-orange">w</span>nce</span>}
        </Link>
    );
};

export default Logo;

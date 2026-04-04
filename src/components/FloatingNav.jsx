import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Search, Settings, User, LayoutGrid } from 'lucide-react';

const CircularFloatingNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [direction, setDirection] = useState("up-left");

    const navItems = [
        { icon: <Home size={20} />, label: 'Home' },
        { icon: <Search size={20} />, label: 'Search' },
        { icon: <Settings size={20} />, label: 'Settings' },
        { icon: <User size={20} />, label: 'Profile' },
    ];

    const DISTANCE = 110;

    // Detect best expansion direction
    useEffect(() => {
        const updateDirection = () => {
            const x = window.innerWidth - 80;
            const y = window.innerHeight - 80;

            const isRight = x > window.innerWidth / 2;
            const isBottom = y > window.innerHeight / 2;

            if (isRight && isBottom) setDirection("up-left");
            else if (!isRight && isBottom) setDirection("up-right");
            else if (isRight && !isBottom) setDirection("down-left");
            else setDirection("down-right");
        };

        updateDirection();
        window.addEventListener("resize", updateDirection);
        return () => window.removeEventListener("resize", updateDirection);
    }, []);

    // Angle ranges per direction
    const getAngleRange = () => {
        switch (direction) {
            case "up-left": return [180, 270];
            case "up-right": return [270, 360];
            case "down-left": return [90, 180];
            case "down-right": return [0, 90];
            default: return [180, 270];
        }
    };

    const [START, END] = getAngleRange();
    const spread = END - START;
    const step = navItems.length > 1 ? spread / (navItems.length - 1) : 0;

    const getCoords = (i) => {
        const angle = START + i * step;
        const rad = (angle * Math.PI) / 180;

        return {
            angle,
            x: Math.cos(rad) * DISTANCE,
            y: Math.sin(rad) * DISTANCE,
            scale: 0.9 + (i / navItems.length) * 0.2
        };
    };

    // ✅ Smart tooltip positioning (prevents overlap)
    const getTooltipStyle = (angle) => {
        if (angle >= 180 && angle <= 270) {
            return "right-full mr-3 top-1/2 -translate-y-1/2";
        }
        if (angle > 270 && angle <= 360) {
            return "left-full ml-3 top-1/2 -translate-y-1/2";
        }
        if (angle >= 90 && angle < 180) {
            return "right-full mr-3 top-1/2 -translate-y-1/2";
        }
        return "left-full ml-3 top-1/2 -translate-y-1/2";
    };

    return (
        <>
            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-md z-[90]"
                    />
                )}
            </AnimatePresence>

            <div className="fixed bottom-10 right-10 z-[100] w-16 h-16">

                {/* Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <div className="relative w-full h-full flex items-center justify-center">
                            {navItems.map((item, i) => {
                                const { x, y, scale, angle } = getCoords(i);

                                return (
                                    <motion.div
                                        key={i}
                                        style={{ zIndex: 100 + i }} // ✅ prevents stacking issues
                                        initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                        animate={{ opacity: 1, x, y, scale }}
                                        exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 220,
                                            damping: 18,
                                            delay: i * 0.05
                                        }}
                                        className="absolute"
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.2, y: -4 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="group relative w-12 h-12 flex items-center justify-center 
                                            rounded-full bg-white dark:bg-neutral-800 
                                            text-neutral-600 dark:text-neutral-300
                                            border border-neutral-200 dark:border-neutral-700
                                            shadow-lg transition-all duration-300
                                            hover:bg-[#FF4B2B] hover:text-white"
                                        >
                                            {item.icon}

                                            {/* Tooltip */}
                                            <span
                                                className={`absolute ${getTooltipStyle(angle)}
                                                px-2.5 py-1 text-[11px] rounded-md
                                                bg-black/90 backdrop-blur-sm text-white
                                                opacity-0 group-hover:opacity-100
                                                transition-all duration-200
                                                whitespace-nowrap shadow-xl
                                                pointer-events-none`}
                                            >
                                                {item.label}
                                            </span>
                                        </motion.button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </AnimatePresence>

                {/* FAB */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    animate={isOpen ? { rotate: 135, scale: 0.9 } : { rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className={`absolute inset-0 flex items-center justify-center rounded-full text-white 
                    ${isOpen ? 'bg-neutral-900' : 'bg-[#FF4B2B]'}`}
                    style={{
                        boxShadow: isOpen
                            ? '0px 8px 20px rgba(0,0,0,0.3)'
                            : '0px 12px 30px rgba(255,75,43,0.45)'
                    }}
                >
                    {isOpen ? <X size={24} /> : <LayoutGrid size={26} />}
                </motion.button>
            </div>
        </>
    );
};

export default CircularFloatingNav;
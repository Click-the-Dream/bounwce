import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Home, Search, Settings, User } from 'lucide-react'; // Using Lucide for icons

const FloatingNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { icon: <Home size={20} />, label: 'Home', onClick: () => console.log('Home') },
        { icon: <Search size={20} />, label: 'Search', onClick: () => console.log('Search') },
        { icon: <Settings size={20} />, label: 'Settings', onClick: () => console.log('Settings') },
        { icon: <User size={20} />, label: 'Profile', onClick: () => console.log('Profile') },
    ];

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-center gap-4">
            {/* Expanded Menu */}
            <AnimatePresence>
                {isOpen && (
                    <div className="flex flex-col-reverse items-center gap-3">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={item.onClick}
                                className="group relative flex items-center justify-center w-12 h-12 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full shadow-lg hover:bg-brand-orange hover:text-white transition-colors border border-neutral-200 dark:border-neutral-700"
                            >
                                {item.icon}
                                {/* Tooltip Label */}
                                <span className="absolute right-14 px-2 py-1 rounded bg-neutral-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    {item.label}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Main Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'bg-neutral-900 rotate-45' : 'bg-[#FF4B2B]'
                    } text-white`}
                style={{
                    boxShadow: '0px 10px 20px rgba(255, 75, 43, 0.3)'
                }}
            >
                <Plus size={28} />
            </button>
        </div>
    );
};

export default FloatingNav;
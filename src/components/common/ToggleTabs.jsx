import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ToggleTabs = ({
  tabs = [], // [{ label, path }, ...]
  activePath,
  onChange, // optional callback if you don’t want automatic navigation
}) => {
  const navigate = useNavigate();

  const activeIndex = tabs.findIndex((tab) => tab.path === activePath);
  const tabWidth = 100 / tabs.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative flex justify-between items-center w-full max-w-[368px] h-[42px] rounded-[20px] bg-[#ECECF033]/30 border border-gray-300 mb-5 p-1 overflow-hidden"
    >
      {/* Animated highlight background */}
      {activeIndex !== -1 && (
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute h-[80%] bg-orange rounded-[16px] z-0"
          style={{
            width: `${tabWidth - 4}%`, // a small gap for aesthetics
            left: `calc(${activeIndex * tabWidth}% + 2%)`,
          }}
        />
      )}

      {/* Render buttons dynamically */}
      {tabs.map((tab, index) => {
        const isActive = tab.path === activePath;
        return (
          <button
            key={tab.path || index}
            onClick={() => (onChange ? onChange(tab) : navigate(tab.path))}
            className={`relative z-10 flex-1 py-2 rounded-[16px] text-[12px] font-medium transition-all duration-300 ${
              isActive ? "text-white" : "text-black"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </motion.div>
  );
};

export default ToggleTabs;

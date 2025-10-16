import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ToggleTabs = ({ tabs = [], activePath, onChange }) => {
  const navigate = useNavigate();
  const activeIndex = tabs.findIndex((tab) => tab.path === activePath);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative flex w-full h-full rounded-full bg-[#ECECF033]/30 border border-gray-300 mb-5 p-1 overflow-hidden"
    >
      {/* Animated highlight */}
      {activeIndex !== -1 && (
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute h-[80%] bg-orange rounded-[16px] z-0"
          style={{
            width: `${100 / tabs.length - 4}%`,
            left: `calc(${activeIndex * (100 / tabs.length)}% + 2%)`,
          }}
        />
      )}

      {/* Render buttons */}
      {tabs.map((tab, index) => {
        const isActive = tab.path === activePath;

        return (
          <button
            key={tab.path || index}
            onClick={() => (onChange ? onChange(tab) : navigate(tab.path))}
            className={`relative z-10 flex-1 py-2 px-2 flex items-center justify-center gap-1 rounded-[16px] text-[12px] font-medium transition-all duration-300 ${
              isActive ? "text-white" : "text-black"
            }`}
          >
            {/* Render icon if exists */}
            {tab.icon &&
              (typeof tab.icon === "string" ? (
                <img
                  src={tab.icon}
                  alt=""
                  className="w-4 h-4"
                  style={{
                    filter: isActive
                      ? "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
                      : "invert(0%)",
                  }}
                />
              ) : (
                <span className="w-4 h-4 flex items-center justify-center">
                  {tab.icon}
                </span>
              ))}
            {tab.label}
          </button>
        );
      })}
    </motion.div>
  );
};

export default ToggleTabs;

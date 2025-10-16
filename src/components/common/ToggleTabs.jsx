import React from "react";
import { useNavigate } from "react-router-dom";

const ToggleTabs = ({ tabs = [], activePath, onChange }) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full rounded-full bg-[#ECECF033]/30 border border-gray-300 mb-5 p-1">
      {tabs.map((tab, index) => {
        const isActive = tab.path === activePath;

        return (
          <button
            key={tab.path || index}
            onClick={() => (onChange ? onChange(tab) : navigate(tab.path))}
            className={`flex-1 min-w-10 py-2 md:py-3 px-3 sm:px-4 flex flex-col md:flex-row items-center justify-center md:gap-2 rounded-full text-[12px] sm:text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-orange text-white"
                : "bg-transparent text-black hover:bg-orange/10"
            }`}
          >
            {/* Icon */}
            {tab.icon &&
              (typeof tab.icon === "string" ? (
                <img
                  src={tab.icon}
                  alt=""
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{
                    filter: isActive
                      ? "invert(100%) brightness(200%)"
                      : "invert(0%)",
                  }}
                />
              ) : (
                <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {tab.icon}
                </span>
              ))}

            {/* Label */}
            <span
              className={`transition-all duration-200 ${
                // On mobile: show label only if active
                isActive ? "block text-[8px]" : "hidden md::block"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ToggleTabs;

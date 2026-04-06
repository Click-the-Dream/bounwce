"use client";

import { useRouter } from "next/navigation";

const ToggleTabs = ({
  tabs = [],
  activePath,
  onChange,
}: {
  tabs: { path: string; icon?: React.ReactNode; label: string }[];
  activePath: string | null;
  onChange?: (tab: any) => void;
}) => {
  const router = useRouter();

  return (
    <div className="flex w-full max-w-lg gap-1 rounded-full bg-white border-[0.83px] border-gray-300 mb-5 p-1 overflow-hidden">
      {tabs.map((tab, index) => {
        const isActive = tab.path === activePath;

        return (
          <button
            key={tab.path || index}
            onClick={() => (onChange ? onChange(tab) : router.push(tab.path))}
            className={`flex items-center justify-center gap-2 py-2 px-3 sm:px-4 rounded-full text-[12px] sm:text-sm font-semibold 
              transition-all duration-300 ease-in-out min-w-0 flex-1 
              ${
                isActive
                  ? " bg-orange text-white"
                  : "bg-transparent text-black hover:bg-orange/10"
              }
              md:flex-1
            `}
          >
            {/* Icon */}
            {tab.icon &&
              (typeof tab.icon === "string" ? (
                <img
                  src={tab.icon}
                  alt=""
                  className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                  style={{
                    filter: isActive
                      ? "invert(100%) brightness(200%)"
                      : "invert(0%)",
                  }}
                />
              ) : (
                <span className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center shrink-0">
                  {tab.icon}
                </span>
              ))}

            {/* Label */}
            <span
              className={`transition-all text-[8px] sm:text-[9px] lg:text-[10px] duration-300 ease-in-out text-xs wrap-break-word text-center ${
                tab.icon ? "hidden md:block" : "block"
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

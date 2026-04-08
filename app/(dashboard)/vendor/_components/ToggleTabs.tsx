"use client";

import SafeImage from "@/app/_components/SafeImage";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

const ToggleTabs = ({
  tabs = [],
  activePath,
  onChange,
}: {
  tabs: {
    path: string;
    icon?: any;
    label: string;
    disabled?: boolean;
  }[];
  activePath: string | null;
  onChange?: (tab: any) => void;
}) => {
  const router = useRouter();

  return (
    <div className="flex w-full max-w-lg gap-1 rounded-full bg-white border-[0.83px] border-gray-300 mb-5 p-1 overflow-hidden">
      {tabs.map((tab, index) => {
        const isActive = tab.path === activePath;
        const isStaticImage =
          (tab.icon && typeof tab.icon === "object" && "src" in tab.icon) || // Static import
          false;

        return (
          <button
            key={tab.path || index}
            disabled={tab?.disabled}
            onClick={() => (onChange ? onChange(tab) : router.push(tab.path))}
            className={`cursor-pointer flex items-center justify-center gap-2 py-2 px-3 sm:px-4 rounded-full text-[12px] sm:text-sm font-semibold 
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
            {tab.icon && isStaticImage ? (
              <Image
                src={tab.icon as StaticImageData}
                alt=""
                width={20}
                height={20}
                className="object-contain"
                style={{ filter: isActive ? "invert(100%)" : "none" }}
              />
            ) : typeof tab.icon === "string" ? (
              <SafeImage
                src={tab.icon}
                alt=""
                width={20}
                height={20}
                className="w-4 h-4 object-contain"
                style={{ filter: isActive ? "invert(100%)" : "none" } as any}
              />
            ) : (
              tab.icon // React component icon
            )}

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

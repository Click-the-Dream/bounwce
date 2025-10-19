import { FiPhone } from "react-icons/fi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { brandingSteps } from "../../../utils/fields";
import { FaLightbulb } from "react-icons/fa";
import { LuCircleCheckBig } from "react-icons/lu";

const BrandingFooter = ({ currentIndex }) => {
  return (
    <>
      {/* Tips + Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Left Side */}
        <section className="space-y-4">
          <div className="border border-purple-200 bg-purple-50 rounded-xl p-4 text-sm text-purple-700">
            <div className="flex items-center gap-2 font-medium mb-1">
              <FaLightbulb className="text-yellow-500" /> Pro Tip
            </div>
            <p className="text-[10px] leading-snug">
              A professional logo and banner helps build trust and attract more
              customers.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl py-5 px-8 text-sm w-max">
            <p className="font-medium mb-2">Need Help?</p>
            <div className="text-[10px] text-blue-500 space-y-2">
              <p className="flex items-center cursor-pointer">
                <IoIosHelpCircleOutline size="14" className="mr-1" />
                Setup Guide
              </p>
              <p className="flex items-center cursor-pointer">
                <FiPhone size="14" className="mr-1" />
                Contact Support
              </p>
              <p className="flex items-center cursor-pointer">
                <TbWorld size="14" className="mr-1" />
                Video tutorials
              </p>
            </div>
          </div>
        </section>

        {/* Right Side Checklist */}
        <div className="border-2 border-gray-200 rounded-xl p-5 bg-white">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Setup Checklist
          </h4>

          <ul className="space-y-3 text-sm">
            {brandingSteps.map((step, index) => {
              const isCompleted = index < currentIndex;
              const isActive = index === currentIndex;

              return (
                <li
                  key={step.key}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 transition-colors duration-300 ${
                    isCompleted
                      ? "bg-[#E4FFEC]"
                      : isActive
                      ? "bg-[#E5F0FF]"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold transition-colors duration-300 ${
                        isCompleted
                          ? "bg-green-500"
                          : isActive
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {isCompleted ? <LuCircleCheckBig size={14} /> : index + 1}
                    </div>
                    <span
                      className={`text-gray-700 ${
                        isActive
                          ? "font-medium text-black"
                          : isCompleted
                          ? "text-[#158041]"
                          : ""
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BrandingFooter;

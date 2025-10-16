import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaLightbulb, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { TbWorld } from "react-icons/tb";

import StepOne from "./branding/StepOne"; // Branding form
import { brandingSteps } from "../../../utils/fields";
import StepTwo from "./branding/StepTwo";
import { IoRocketOutline } from "react-icons/io5";

const GettingStarted = ({ onNext, onBack }) => {
  const [currentSubStep, setCurrentSubStep] = useState("branding");
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentIndex = brandingSteps.findIndex((s) => s.key === currentSubStep);

  const handleNextSub = () => {
    if (currentIndex < brandingSteps.length - 1) {
      setCurrentSubStep(brandingSteps[currentIndex + 1].key);
    } else {
      onNext();
    }
  };

  const handlePrevSub = () => {
    if (currentIndex > 0) {
      setCurrentSubStep(brandingSteps[currentIndex - 1].key);
    } else {
      onBack();
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          <IoRocketOutline size="24" /> Getting Started
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Let’s set up your store and add your first products
        </p>
      </div>

      {/* Sub-step Navigation */}
      <div className="flex justify-between gap-1 text-center items-stretch mb-4 overflow-x-auto">
        {brandingSteps.map((step, index) => (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center text-center flex-1 relative max-w-20">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 bg-gray-50
              ${
                index === 0
                  ? "border-black text-black"
                  : "border-gray-300 text-gray-400"
              }`}
              >
                {<step.icon size={14} />}
              </div>
              <span
                className={`text-xs mt-2 ${
                  index === 0 ? "text-black font-medium" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
              <span className="text-[10px] text-gray-400 line-clamp-2">
                {step.desc}
              </span>
            </div>
            {index < brandingSteps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 ${
                  step > step.number ? "bg-green-500" : "bg-gray-300"
                } transition-colors duration-300`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="mt-6">
        {currentSubStep === "branding" && (
          <StepOne register={register} errors={errors} />
        )}
        {currentSubStep === "products" && (
          <StepTwo register={register} errors={errors} />
        )}
        {/* {currentSubStep === "shipping" && <StepThree />} */}
        {/* {currentSubStep === "publish" && <StepFour />} */}
      </div>

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
            {brandingSteps.map((step, index) => (
              <li
                key={step.key}
                className={`flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${
                  index <= currentIndex ? "bg-[#E5F0FF]" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold ${
                      index <= currentIndex ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap justify-between gap-2 items-center mt-8 text-sm">
        <button
          type="button"
          onClick={handlePrevSub}
          className="flex gap-2 items-center px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="flex gap-3 ml-auto">
          <button
            type="button"
            onClick={onNext}
            className="flex gap-2 items-center px-4 py-2 border bg-black rounded-lg text-white"
          >
            Skip <FaArrowRight />
          </button>

          <button
            type="button"
            onClick={handleNextSub}
            className="flex gap-2 items-center px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange/90"
          >
            Next <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;

import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";
import { LuCircleCheckBig } from "react-icons/lu";

import StepOne from "./branding/StepOne";
import StepTwo from "./branding/StepTwo";
import BrandingFooter from "./BrandingFooter";
import { brandingSteps } from "../../../utils/fields";

const GettingStarted = ({ onNext, onBack }) => {
  const [currentSubStep, setCurrentSubStep] = useState("branding");

  const {
    register,
    trigger,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const currentIndex = brandingSteps.findIndex((s) => s.key === currentSubStep);

  // ✅ Validate before moving to next
  const handleNextSub = async () => {
    const currentStep = brandingSteps[currentIndex];

    // Trigger validation only for fields in this step
    const isValid = await trigger(currentStep.fields);

    if (!isValid) return; // stop if invalid

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

      {/* Steps */}
      {/* Sub-step Navigation (fixed logic using indices) */}
      <div className="flex justify-between gap-1 text-center items-stretch mb-4 overflow-x-auto">
        {brandingSteps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex; // strictly before current

          return (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center text-center flex-1 relative max-w-20">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2
              ${
                isCompleted
                  ? "border-green-500 bg-green-500 text-white"
                  : isActive
                  ? "border-black bg-white text-black"
                  : "border-gray-300 bg-gray-50 text-gray-400"
              }`}
                >
                  {isCompleted ? (
                    <LuCircleCheckBig size={14} />
                  ) : (
                    <step.icon size={14} />
                  )}
                </div>

                <span
                  className={`text-xs mt-2 ${
                    isActive ? "text-black font-medium" : "text-gray-500"
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
                  className={`flex-1 h-[2px] mx-2 my-auto ${
                    index < currentIndex ? "bg-green-500" : "bg-gray-300"
                  } transition-colors duration-300`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="mt-6">
        {currentSubStep === "branding" && (
          <StepOne
            register={register}
            errors={errors}
            setValue={setValue}
            trigger={trigger}
            control={control}
          />
        )}
        {currentSubStep === "products" && (
          <StepTwo
            register={register}
            errors={errors}
            trigger={trigger}
            reset={reset}
          />
        )}
      </div>

      <BrandingFooter currentIndex={currentIndex} />

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

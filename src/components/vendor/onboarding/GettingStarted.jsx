import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";
import { LuCircleCheckBig, LuSave } from "react-icons/lu";

import StepOne from "./branding/StepOne";
import StepTwo from "./branding/StepTwo";
import BrandingFooter from "./BrandingFooter";
import { brandingSteps } from "../../../utils/fields";
import StepThree from "./branding/StepThree";
import StepFour from "./branding/StepFour";
import { onPrompt } from "../../../utils/notifications/onPrompt";
import useStore from "../../../hooks/useStore";

const GettingStarted = ({ storeData, onNext, onBack }) => {
  const [currentSubStep, setCurrentSubStep] = useState("branding");
  const {
    register,
    trigger,
    reset,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const { updateBranding, activateStore } = useStore();

  const currentIndex = brandingSteps.findIndex((s) => s.key === currentSubStep);
  const products = watch("products") || [];

  const handleNextSub = async () => {
    const currentStep = brandingSteps[currentIndex];
    const fieldsToValidate = currentStep.fields;

    // Validate fields defined for this substep
    const isValid = await trigger(fieldsToValidate);

    if (!isValid) {
      onPrompt({
        title: "Validation Error",
        message:
          "Please complete all required fields before proceeding to the next step.",
      });
      return;
    }

    // --- PRODUCTS VALIDATION ---
    if (currentSubStep === "products" && products.length === 0) {
      onPrompt({
        title: "No Products Added",
        message: "Please add at least one product before continuing.",
      });
      return;
    }

    // --- SHIPPING VALIDATION ---
    if (currentSubStep === "shipping") {
      const shippings = watch("shippings") || [];

      if (shippings.length === 0) {
        onPrompt({
          title: "Add Shipping Option",
          message: "You need to add at least one shipping option to proceed.",
        });
        return;
      }

      for (const s of shippings) {
        if (
          !s.shipping_address ||
          s.delivery_fee === "" ||
          s.delivery_time === ""
        ) {
          onPrompt({
            title: "Incomplete Shipping Details",
            message:
              "Please make sure each shipping option includes method, cost, and estimated delivery.",
          });
          return;
        }
      }
    }

    // --- BRANDING STEP LOGIC ---
    if (currentSubStep === "branding") {
      try {
        const formData = new FormData();

        // Use uploaded file if present, otherwise fallback to URL string
        const logoFile = watch("store_logo")?.[0];
        const bannerFile = watch("store_banner")?.[0];

        formData.append("store_logo", logoFile || null);
        formData.append("store_banner", bannerFile || null);

        formData.append("store_description", watch("store_description") || "");

        await updateBranding.mutateAsync(formData, {
          onSuccess: () => {
            setCurrentSubStep(brandingSteps[currentIndex + 1].key);
          },
        });
      } catch (error) {
        console.error(error);
        return;
      }
      return;
    }

    // --- STEP NAVIGATION ---
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
  const handleSkip = () => {
    if (currentIndex < brandingSteps.length - 1) {
      setCurrentSubStep(brandingSteps[currentIndex + 1].key);
    } else {
      onNext();
    }
  };

  // Helper to check if step can be skipped
  const canSkipStep = (stepKey) => {
    const step = brandingSteps.find((s) => s.key === stepKey);
    if (!step) return false;

    // If no fields, no skip needed
    if (!step.fields || step.fields.length === 0) return false;

    // Check if *all* fields for this step already have data
    const hasData =
      storeData &&
      step.fields.some((field) => {
        const value = storeData[field];
        return value !== null && value !== undefined && value !== "";
      });

    // Show Skip only when there's already data
    return !!hasData;
  };

  const nextButtonLabel = updateBranding.isPending ? "Please wait..." : "Next";
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

      {/* Sub-step Progress Bar */}
      <div className="flex justify-between gap-1 text-center items-stretch mb-4 overflow-x-auto">
        {brandingSteps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center text-center flex-1 relative max-w-20">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
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
            storeData={storeData}
            watch={watch}
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
        {currentSubStep === "shipping" && (
          <StepThree
            register={register}
            errors={errors}
            setValue={setValue}
            trigger={trigger}
            control={control}
            watch={watch}
          />
        )}

        {currentSubStep === "publish" && (
          <StepFour
            register={register}
            errors={errors}
            setValue={setValue}
            trigger={trigger}
            control={control}
            watch={watch}
          />
        )}
      </div>

      <BrandingFooter currentIndex={currentIndex} />

      {/* Navigation */}
      {/* Navigation */}
      <div className="flex flex-wrap justify-between gap-2 items-center mt-8 text-sm">
        <button
          type="button"
          onClick={handlePrevSub}
          className="flex gap-2 items-center px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
        >
          <FaArrowLeft /> Back
        </button>

        {/* If on publish step → show Draft & Publish buttons */}
        {currentSubStep === "publish" ? (
          <div className="flex gap-3 ml-auto">
            <button
              type="button"
              onClick={() =>
                onPrompt({
                  title: "Saved as Draft",
                  message: "Your store has been saved as a draft.",
                })
              }
              className="flex gap-2 items-center px-4 py-2 border border-gray-300 bg-black text-white rounded-lg hover:bg-black/90"
            >
              <LuSave /> Save as Draft
            </button>

            <button
              type="button"
              disabled={activateStore.isPending}
              onClick={() => {
                // simulate success and move to success screen
                activateStore.mutate(null, { onSuccess: () => onNext() });
              }}
              className="flex gap-2 items-center px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange/90 disabled:opacity-50 disabled:cursor-wait"
            >
              <IoRocketOutline />{" "}
              {activateStore.isPending ? "Please wait..." : "Publish My Store"}
            </button>
          </div>
        ) : (
          <div className="flex gap-3 ml-auto">
            {canSkipStep(currentSubStep) && (
              <button
                type="button"
                onClick={handleSkip}
                className="flex gap-2 items-center px-4 py-2 border bg-black rounded-lg text-white hover:bg-black/90"
              >
                Skip <FaArrowRight />
              </button>
            )}

            <button
              type="submit"
              disabled={updateBranding.isPending}
              onClick={handleNextSub}
              className="flex gap-2 items-center px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange/90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {nextButtonLabel} <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GettingStarted;

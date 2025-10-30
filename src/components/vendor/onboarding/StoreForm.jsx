import React, { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import StepOne from "./form/StepOne";
import StepTwo from "./form/StepTwo";
import StepThree from "./form/StepThree";
import StepFour from "./form/StepFour";

const StoreForm = ({
  currentTab,
  onNext,
  onBack,
  handleSkip,
  isLoading = false,
  hasExistingData = false,
  canSkip = false,
}) => {
  const {
    register,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const tabFields = useMemo(() => {
    switch (currentTab) {
      case "store":
        return ["storeName", "storeEmail", "storeAddress", "phoneNumber"];
      case "contact":
        return ["contactPerson"];
      case "verification":
        return ["nin"];
      case "payout":
        return [
          "accountName",
          "accountNumber",
          "bankName",
          "withdrawalCode",
          "securityQuestion",
          "securityAnswer",
        ];
      default:
        return [];
    }
  }, [currentTab]);

  const validateCurrentTab = useCallback(async () => {
    return await trigger(tabFields);
  }, [trigger, tabFields]);

  const handleNext = async (e) => {
    e.preventDefault();
    const valid = await validateCurrentTab();
    if (valid) onNext();
  };

  const renderFields = () => {
    switch (currentTab) {
      case "store":
        return <StepOne register={register} errors={errors} />;
      case "contact":
        return <StepTwo register={register} errors={errors} />;
      case "verification":
        return <StepThree register={register} errors={errors} />;
      case "payout":
        return (
          <StepFour
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        );
      default:
        return null;
    }
  };

  const isLastTab = currentTab === "payout";
  const nextButtonLabel = isLoading
    ? "Please wait..."
    : hasExistingData
    ? "Update"
    : isLastTab
    ? "Continue to Getting Started"
    : "Next";

  return (
    <form onSubmit={handleNext} className="space-y-6 pt-2">
      {renderFields()}

      {hasExistingData && (
        <p className="text-xs text-gray-500 italic mt-2">
          You already have saved information. Clicking “Update” will overwrite
          your current data.
        </p>
      )}

      <div className="flex flex-wrap justify-between gap-2 pt-6 text-sm">
        <button
          type="button"
          onClick={onBack}
          disabled={currentTab === "store"}
          className={`flex gap-2 items-center px-6 py-2 border rounded-md text-gray-700 transition-colors ${
            currentTab === "store"
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <FaArrowLeft /> Back
        </button>

        <div className="flex gap-3 ml-auto">
          {/* ✅ Show Skip only when allowed */}
          {canSkip && (
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
            disabled={isLoading}
            className="flex gap-2 items-center px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange/90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {nextButtonLabel} <FaArrowRight />
          </button>
        </div>
      </div>
    </form>
  );
};

export default StoreForm;

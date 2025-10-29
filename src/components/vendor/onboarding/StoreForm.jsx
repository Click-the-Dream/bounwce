import React, { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import StepOne from "./form/StepOne";
import StepTwo from "./form/StepTwo";
import StepThree from "./form/StepThree";
import StepFour from "./form/StepFour";

const StoreForm = ({ currentTab, onNext, onBack, isLoading = false }) => {
  const {
    register,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  // Memoize tab fields to prevent unnecessary recalculations
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
    if (valid) {
      onNext();
    }
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

  // Determine button label
  const isLastTab = currentTab === "payout";
  const nextButtonLabel = isLoading
    ? "Please wait..."
    : isLastTab
    ? "Continue to Getting Started"
    : "Next";

  return (
    <form onSubmit={handleNext} className="space-y-6 pt-2">
      {renderFields()}

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
          <FaArrowLeft className="inline-block mr-2" /> Back
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className={`ml-auto flex gap-2 items-center px-6 py-2 text-white rounded-md transition-all duration-300 ${
            isLoading
              ? "bg-orange/70 cursor-not-allowed"
              : "bg-orange/90 hover:bg-orange"
          }`}
        >
          {nextButtonLabel}
          <FaArrowRight className="inline-block ml-2 transition-all duration-200" />
        </button>
      </div>
    </form>
  );
};

export default StoreForm;

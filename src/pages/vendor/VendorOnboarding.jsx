import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ProgressSteps from "../../components/vendor/onboarding/ProgressStep";
import StoreSetup from "../../components/vendor/onboarding/StoreSetup";
import StoreForm from "../../components/vendor/onboarding/StoreForm";
import GettingStarted from "../../components/vendor/onboarding/GettingStarted";
import OnboardingSuccess from "../../components/vendor/onboarding/OnboardingSuccess";
import useBusiness from "../../hooks/useBusiness";

const tabOrder = ["store", "contact", "verification", "payout"];

const VendorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [currentTab, setCurrentTab] = useState("store");
  const [completedTabs, setCompletedTabs] = useState([]);
  const { createBusiness } = useBusiness();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      storeName: "",
      storeEmail: "",
      storeAddress: "",
      phoneNumber: "",
      contactPerson: "",
      verificationDocs: null,
      payoutInfo: "",
    },
  });

  const getTabFields = (tab) => {
    switch (tab) {
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
  };

  const handleNext = async () => {
    const valid = await methods.trigger(getTabFields(currentTab));
    if (!valid) return;

    const currentIndex = tabOrder.indexOf(currentTab);

    if (currentTab === "store") {
      const formData = methods.getValues();
      createBusiness.mutateAsync(
        {
          name: formData.storeName,
          email: formData.storeEmail,
          address: formData.storeAddress,
          phone_number: formData.phoneNumber,
        },
        {
          onSuccess: () => {
            setCompletedTabs((prev) => [...prev, currentTab]);
            // Move to next tab
            setCurrentTab(tabOrder[currentIndex + 1]);
          },
        }
      );

      return;
    }

    if (!completedTabs.includes(currentTab)) {
      setCompletedTabs((prev) => [...prev, currentTab]);
    }

    if (currentIndex < tabOrder.length - 1) {
      setCurrentTab(tabOrder[currentIndex + 1]);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      setCurrentTab("store");
    }
  };

  const handleBack = () => {
    const currentIndex = tabOrder.indexOf(currentTab);
    if (currentIndex > 0) {
      setCurrentTab(tabOrder[currentIndex - 1]);
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 2));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-xl font-medium text-orange mb-2">
            Vendor Onboarding
          </h1>
          <p className="text-orange text-sm">
            Complete your setup to start selling on our platform
          </p>
        </div>

        <ProgressSteps currentStep={currentStep} />

        <FormProvider {...methods}>
          {currentStep === 2 && (
            <div className="mb-8 bg-white p-6 rounded-xl border border-gray-200">
              <StoreSetup
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                completedTabs={completedTabs}
              />
              <StoreForm
                currentTab={currentTab}
                onNext={handleNext}
                onBack={handleBack}
                isLoading={createBusiness.isPending}
              />
            </div>
          )}

          {currentStep === 3 && (
            <GettingStarted
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}
          {currentStep === 4 && <OnboardingSuccess />}
        </FormProvider>
      </div>
    </div>
  );
};

export default VendorOnboarding;

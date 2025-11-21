import { useState, useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ProgressSteps from "../../components/vendor/onboarding/ProgressStep";
import StoreSetup from "../../components/vendor/onboarding/StoreSetup";
import StoreForm from "../../components/vendor/onboarding/StoreForm";
import GettingStarted from "../../components/vendor/onboarding/GettingStarted";
import OnboardingSuccess from "../../components/vendor/onboarding/OnboardingSuccess";
import useStore from "../../hooks/useStore";
import useUser from "../../hooks/useUser";
import StoreLoader from "../../components/common/StoreLoader";

const tabOrder = ["store", "contact", "verification", "payout"];

const VendorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [currentTab, setCurrentTab] = useState("store");
  const [completedTabs, setCompletedTabs] = useState([]);

  const {
    createStore,
    updateStore,
    createContact,
    updateContact,
    useGetMyStore,
    createPayout,
    updatePayout,
  } = useStore();
  const { data: storeData, isLoading } = useGetMyStore();

  const {
    createVendorVerification,
    updateVendorVerification,
    useGetVendorVerification,
  } = useUser();

  const { data: verificationData } = useGetVendorVerification();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone_number: "",
      contact_info: {
        name: "",
        title: "",
        email: "",
        phone_number: "",
      },
      id_number: "",
      payout_info: {
        account_name: "",
        account_number: "",
        bank_name: "",
        withdrawal_pin: "",
        security_question: "",
        security_answer: "",
      },
    },
  });

  // Populate form with existing data
  useEffect(() => {
    if (storeData) {
      methods.reset({
        name: storeData.name || "",
        email: storeData.email || "",
        address: storeData.address || "",
        phone_number: storeData.phone_number || "",
        contact_info: {
          name: storeData.contact_info?.name || "",
          title: storeData.contact_info?.title || "",
          email: storeData.contact_info?.email || "",
          phone_number: storeData.contact_info?.phone_number || "",
        },
        id_number: verificationData?.id_number || "",
        payout_info: {
          account_name: storeData.payout_info?.account_name || "",
          account_number: storeData.payout_info?.account_number || "",
          bank_name: storeData.payout_info?.bank_name || "",
          withdrawal_pin: storeData.payout_info?.withdrawal_pin || "",
          security_question: storeData.payout_info?.security_question || "",
          security_answer: storeData.payout_info?.security_answer || "",
        },
      });
    }
  }, [storeData, verificationData, methods]);

  // Detect existing data for skip logic
  const hasExistingData = useMemo(() => {
    if (!storeData) return false;
    switch (currentTab) {
      case "store":
        return Boolean(storeData.name || storeData.email || storeData.address);
      case "contact":
        return Boolean(
          storeData.contact_info?.name ||
            storeData.contact_info?.email ||
            storeData.contact_info?.title ||
            storeData.contact_info?.phone_number
        );
      case "verification":
        return Boolean(verificationData?.id_number);
      case "payout":
        return Boolean(storeData.payout_info?.account_name);
      default:
        return false;
    }
  }, [storeData, verificationData, currentTab]);

  // Skip logic
  const canSkip = currentTab === "contact" || hasExistingData;

  const getTabFields = (tab) => {
    switch (tab) {
      case "store":
        return ["name", "email", "address", "phone_number"];
      case "contact":
        return [
          "contact_info.name",
          "contact_info.title",
          "contact_info.email",
          "contact_info.phone_number",
        ];
      case "verification":
        return ["id_number"];
      case "payout":
        return [
          "payout_info.account_name",
          "payout_info.account_number",
          "payout_info.bank_name",
          "payout_info.withdrawal_pin",
          "payout_info.security_question",
          "payout_info.security_answer",
        ];
      default:
        return [];
    }
  };

  // Handle Next (create or update)
  const handleNext = async () => {
    const valid = await methods.trigger(getTabFields(currentTab));
    if (!valid) return;

    const currentIndex = tabOrder.indexOf(currentTab);
    const formData = methods.getValues();

    try {
      if (currentTab === "store") {
        const action = storeData ? updateStore : createStore;
        await action.mutateAsync(
          {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            phone_number: formData.phone_number,
          },
          {
            onSuccess: () => {
              setCompletedTabs((prev) => [...prev, currentTab]);
              setCurrentTab(tabOrder[currentIndex + 1]);
            },
          }
        );
        return;
      }

      if (currentTab === "contact") {
        const action = storeData?.contact_info ? updateContact : createContact;
        await action.mutateAsync(
          {
            name: formData.contact_info.name,
            email: formData.contact_info.email,
            title: formData.contact_info.title,
            phone_number: formData.contact_info.phone_number,
          },
          {
            onSuccess: () => {
              setCompletedTabs((prev) => [...prev, currentTab]);
              setCurrentTab(tabOrder[currentIndex + 1]);
            },
          }
        );
        return;
      }

      if (currentTab === "verification") {
        const action = verificationData
          ? updateVendorVerification
          : createVendorVerification;
        await action.mutateAsync(
          {
            id_number: formData.id_number,
            type: "NIN",
          },
          {
            onSuccess: () => {
              setCompletedTabs((prev) => [...prev, currentTab]);
              setCurrentTab(tabOrder[currentIndex + 1]);
            },
          }
        );
        return;
      }
      if (currentTab === "payout") {
        const action = storeData?.payout_info ? updatePayout : createPayout;
        await action.mutateAsync(
          {
            account_name: formData.payout_info.account_name,
            account_number: formData.payout_info.account_number,
            bank_name: formData.payout_info.bank_name,
            security_question: formData.payout_info.security_question,
            security_answer: formData.payout_info.security_answer,
            withdrawal_pin: formData.payout_info.withdrawal_pin,
          },
          {
            onSuccess: () => {
              setCompletedTabs((prev) => [...prev, currentTab]);
              setCurrentStep((prev) => Math.min(prev + 1, 4));
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
      }
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  // Handle Skip
  const handleSkip = () => {
    const currentIndex = tabOrder.indexOf(currentTab);

    // Mark current tab as completed
    setCompletedTabs((prev) => [...prev, currentTab]);

    // If not the last tab, go to next tab
    if (currentIndex < tabOrder.length - 1) {
      setCurrentTab(tabOrder[currentIndex + 1]);
    } else {
      // If last tab, move to next onboarding step
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  // Handle Back
  const handleBack = () => {
    const currentIndex = tabOrder.indexOf(currentTab);
    if (currentIndex > 0) {
      setCurrentTab(tabOrder[currentIndex - 1]);
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 2));
    }
  };

  // Loading Screen
  if (isLoading) {
    return (
      <StoreLoader
        title="Setting up your vendor account"
        description="Preparing your store dashboard..."
      />
    );
  }

  // Render UI
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
                handleSkip={handleSkip}
                currentTab={currentTab}
                onNext={handleNext}
                onBack={handleBack}
                isLoading={
                  createStore.isPending ||
                  updateStore.isPending ||
                  createContact.isPending ||
                  updateContact.isPending ||
                  createPayout.isPending ||
                  createVendorVerification.isPending ||
                  updateVendorVerification.isPending
                }
                hasExistingData={hasExistingData}
                canSkip={canSkip}
              />
            </div>
          )}

          {currentStep === 3 && (
            <GettingStarted
              storeData={storeData}
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && <OnboardingSuccess storeData={storeData} />}
        </FormProvider>
      </div>
    </div>
  );
};

export default VendorOnboarding;

"use client";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import useProduct from "@/app/hooks/use-product";
import VendorHeader from "../../_components/VendorHeader";
import ProductDetails from "@/app/marketplace/products/_components/ProductDetails";
import PricingInventory from "./PricingInventory";
import ProductImages from "./ProductImages";
import ProductTags from "./ProductTags";
import ProductActions from "./ProductActions";
import HelpSection from "./HelpSection";
import ProductInfo from "./ProductInfo";

const AddProductForm = ({ onClose }: any) => {
  const { createProduct } = useProduct();
  const [submittingAction, setSubmittingAction] = useState<any>(null);

  const isLoading = createProduct.isPending;
  const isPublishing = isLoading && submittingAction === "publish";
  const isSavingDraft = isLoading && submittingAction === "draft";

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      productName: "",
      description: "",
      category: "",
      availability: "",
      price: "",
      stockQuantity: "",
      images: [],
      tags: [],
    },
  });

  const onSubmit = async (
    data: {
      productName: any;
      description: any;
      category: any;
      availability: any;
      price: string;
      stockQuantity: string;
      images: any[];
      tags: any[];
    },
    e: { nativeEvent: { submitter: { value: string } } },
  ) => {
    console.log("Form data:", data);
    const action = e?.nativeEvent?.submitter?.value ?? "publish";
    setSubmittingAction(action);

    try {
      // // --- HANDLE DRAFT ---
      // if (action === "draft") {
      //   const draftData = {
      //     productName: data.productName || "",
      //     description: data.description || "",
      //     category: data.category || "",
      //     availability: data.availability || "",
      //     price: data.price || "",
      //     stockQuantity: data.stockQuantity || "",
      //     tags: data.tags || [],
      //     savedAt: new Date().toISOString(),
      //   };

      //   localStorage.setItem("draft_product", JSON.stringify(draftData));
      //   alert("Draft saved successfully");
      //   setSubmittingAction(null);
      //   return; // Stop here if it's a draft
      // }

      // --- HANDLE PUBLISH (FormData) ---
      const formData = new FormData();

      // Add text fields
      formData.append("name", data.productName || "");
      formData.append("description", data.description || "");
      formData.append("category", data.category || "");
      formData.append("availability", data.availability || "");
      formData.append("amount", parseFloat(data?.price) as any);
      formData.append("stock", parseInt(data?.stockQuantity) as any);

      //add images
      if (data.images && data.images.length > 0) {
        data.images.forEach((file) => formData.append("images", file));
      }

      // Add tags
      if (data.tags && data.tags.length > 0) {
        data.tags.forEach((tag) => {
          formData.append("tags[]", tag);
        });
      }

      // Add status based on submit mode
      formData.append("status", action);
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Make API call
      await createProduct.mutateAsync(formData as any);

      // Reset form after successful submission
      methods.reset();
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setSubmittingAction(null);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="bg-[#ECECF080] min-h-screen">
        <div className="sticky top-0 z-50">
          <VendorHeader
            header={"Store Management"}
            headerDetails={"Add New Product"}
            isBackButton={true}
            onClose={onClose}
          />
        </div>

        <form
          className="px-4 md:px-12 lg:px-25 xl:px-35 2xl:px-20 py-5 flex flex-col xl:flex-row gap-4"
          onSubmit={methods.handleSubmit(onSubmit as any)}
        >
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4 w-full xl:w-[70%]">
            <div>
              <ProductInfo />
            </div>

            <div>
              <PricingInventory />
            </div>

            <div>
              <ProductImages />
            </div>

            <div>
              <ProductTags />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4 w-full xl:w-[30%]">
            <div>
              <ProductActions
                isLoading={isLoading}
                isPublishing={isPublishing}
                isSavingDraft={isSavingDraft}
              />
            </div>

            <div>
              <HelpSection />
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddProductForm;

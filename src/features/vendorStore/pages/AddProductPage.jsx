import VendorHeader from "../../vendorDashboard/components/ui/VendorHeader";
import { useNavigate } from "react-router-dom";
import ProductDetails from "../ProductDetails";
import ProductImages from "../ProductImages";
import { useForm, FormProvider } from "react-hook-form";
import ProductActions from "../ProductActions";
import PricingInventory from "../PricingInventory";
import ProductTags from "../ProductTags";
import HelpSection from "../HelpSection";
import useProduct from "../../../hooks/useProduct";
import { useState } from "react";

const AddProductPage = ({ onClose }) => {
  const navigate = useNavigate();
  const { createProduct } = useProduct();
  const [submittingAction, setSubmittingAction] = useState(null);
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

  const onSubmit = async (data, e) => {
    console.log("Form data:", data);
    const action = e?.nativeEvent?.submitter?.value ?? "publish";
    setSubmittingAction(action);

    try {
      const formData = new FormData();

      // Add text fields
      formData.append("name", data.productName || "");
      formData.append("description", data.description || "");
      formData.append("category", data.category || "");
      formData.append("availability", data.availability || "");
      formData.append("amount", Number(data.price) || 0);
      formData.append("stock", Number(data.stockQuantity) || 0);

      // Add tags
      if (data.tags && data.tags.length > 0) {
        data.tags.forEach((tag) => {
          formData.append("tags[]", tag);
        });
      }

      // Add images
      if (data.images && data.images.length > 0) {
        data.images.forEach((fileListOrNull) => {
          if (fileListOrNull && fileListOrNull.length > 0) {
            const file = fileListOrNull[0];
            if (file instanceof File) {
              formData.append("images", file);
            }
          }
        });
      }

      // Add status based on submit mode
      formData.append("status", action);

      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Make API call
      await createProduct.mutateAsync(formData);

      console.log(`Product ${submitMode}ed successfully`);

      // Reset form after successful submission
      methods.reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="bg-[#ECECF080]">
        <VendorHeader
          header={"Store Management"}
          headerDetails={"Add New Product"}
          isBackButton={true}
          onClose={onClose}
        />

        <form
          className="px-[1rem] md:px-[3rem] py-5 flex flex-col xl:flex-row gap-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4 w-full xl:w-[70%]">
            <div>
              <ProductDetails />
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

export default AddProductPage;

"use client";
import useProduct from "@/app/hooks/use-product";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";
import Dropdown from "@/app/_components/common/Dropdown";
import { availabilityOptions } from "@/app/_utils/dummy";

const ProductInfo = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { useGetProductCategories } = useProduct();
  const { data: categories = [] } = useGetProductCategories();
  const categoryOptions = (categories ?? []).map(
    (cat: { name: any; description: any }) => ({
      value: cat?.name,
      label: cat?.name,
      description: cat?.description,
    }),
  );
  return (
    <div className="bg-white rounded-[10px] p-5">
      <h1 className="text-[14px]">Basic Information</h1>
      <p className="text-[13px] text-[#717182] mb-4">
        Essential details about your product
      </p>

      <div className="mb-2">
        <InputField
          label={"Product Name *"}
          type={"text"}
          placeholder={"Enter product name"}
          error={errors.productName}
          {...register("productName", { required: "Product Name is required" })}
        />
      </div>

      <div>
        <InputField
          label={"Description *"}
          type={"textarea"}
          placeholder={"Describe your product in detail..."}
          error={errors.description}
          {...register("description", {
            required: "Product Description is required",
          })}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-2 w-full">
        <div className="mb-2 flex-1">
          <label className="text-[13px]">Category *</label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Product Category is required" }}
            render={({ field, fieldState }) => (
              <Dropdown
                value={field.value || ""}
                onChange={(val: any) => {
                  field.onChange(
                    typeof val === "string" ? val : String(val ?? ""),
                  );
                  field.onBlur();
                }}
                options={categoryOptions}
                placeholder="Choose a category"
                searchable
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className="flex-1">
          <label className="text-[13px]">Availability *</label>
          <Controller
            name="availability"
            control={control}
            rules={{ required: "Product availability is required" }}
            render={({ field, fieldState }) => (
              <Dropdown
                value={field.value || ""}
                onChange={(val: any) => {
                  field.onChange(
                    typeof val === "string" ? val : String(val ?? ""),
                  );
                  field.onBlur();
                }}
                options={availabilityOptions}
                placeholder="Select Availability"
                searchable
                error={fieldState.error?.message}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

import React from "react";
import { useFormContext } from "react-hook-form";
import { Tag, Upload } from "lucide-react";
import Dropdown from "../../../common/Dropdown";

const StepTwo = ({ register, errors }) => {
  const { setValue, watch } = useFormContext();

  const watchedFeatures = watch("features") || [];

  // Sample categories data
  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "home", label: "Home & Garden" },
    { value: "sports", label: "Sports" },
    { value: "books", label: "Books" },
  ];

  // Availability options
  const availabilityOptions = [
    { value: "in-stock", label: "In Stock" },
    { value: "out-of-stock", label: "Out of Stock" },
    { value: "pre-order", label: "Pre-Order" },
  ];

  // Feature tags
  const featureOptions = [
    "Eco-Friendly",
    "Premium Quality",
    "Fast Shipping",
    "Best Seller",
    "New Arrival",
    "Limited Edition",
  ];

  const handleFeatureToggle = (feature) => {
    const currentFeatures = watchedFeatures;
    if (currentFeatures.includes(feature)) {
      setValue(
        "features",
        currentFeatures.filter((f) => f !== feature)
      );
    } else {
      setValue("features", [...currentFeatures, feature]);
    }
  };

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Product Name *
          </label>
          <input
            {...register("productName", {
              required: "Product name is required",
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
              errors.productName ? "border-red-500" : "bg-gray-50"
            }`}
            placeholder="e.g., Wireless Headphones"
          />
          {errors.productName && (
            <p className="text-red-600 mt-1 text-xs">
              {errors.productName.message}
            </p>
          )}
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Category *
          </label>
          <Dropdown
            value={watch("category")}
            onChange={(e) => setValue("category", e.target.value)}
            options={categories}
            placeholder="Choose a category"
            error={errors.category?.message}
            borderClass="border-gray-300"
            bgClass="bg-white"
            containerClass="text-xs"
            dropdownClass="border-gray-300"
            radiusClass="rounded-md"
          />
        </div>
      </section>

      {/* Product Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Description *
        </label>
        <div className="relative">
          <textarea
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 1000,
                message: "Description must be less than 1000 characters",
              },
            })}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Describe your products features, materials, sizes, etc."
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {watch("description")?.length || 0}/1000
          </div>
        </div>
        {errors.description && (
          <p className="text-red-500 text-xs ml-2">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Features Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Features
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {featureOptions.map((feature) => (
            <button
              key={feature}
              type="button"
              onClick={() => handleFeatureToggle(feature)}
              className={`flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm transition-colors ${
                watchedFeatures.includes(feature)
                  ? "bg-orange/20 border-orange text-orange"
                  : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Tag size={14} />
              {feature}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Availability *
        </label>
        <Dropdown
          value={watch("availability")}
          onChange={(e) => setValue("availability", e.target.value)}
          options={availabilityOptions}
          placeholder="Select availability status"
          error={errors.availability?.message}
          borderClass="border-gray-300"
          bgClass="bg-white"
          containerClass="text-xs"
          dropdownClass="border-gray-300"
          radiusClass="rounded-md"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-1">
            Drag and drop images here, or click to upload
          </p>
          <p className="text-xs text-gray-500">
            Supports JPG, PNG up to 5MB each
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register("images")}
            className="hidden"
            id="product-images"
          />
          <label
            htmlFor="product-images"
            className="inline-block mt-3 px-4 py-2 bg-orange text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-orange/90 transition-colors"
          >
            Choose Files
          </label>
        </div>
        {errors.images && (
          <p className="text-red-500 text-xs ml-2">{errors.images.message}</p>
        )}
      </div>

      <button
        type="button"
        className="bg-black text-white text-sm p-3 w-full text-center rounded-lg hover:bg-gray-800 transition-colors"
      >
        Add Product
      </button>
    </div>
  );
};

export default StepTwo;

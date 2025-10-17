import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import Dropdown from "../../../common/Dropdown";
import { GoImage } from "react-icons/go";
import { FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { availabilityOptions, categories } from "../../../../utils/dummies";

const StepTwo = ({ register, errors, trigger, reset }) => {
  const { setValue, watch, getValues } = useFormContext();
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddProduct = async () => {
    const isValid = await trigger([
      "productName",
      "category",
      "description",
      "price",
      "stock",
      "availability",
    ]);

    const images = watch("images") || [];
    if (!isValid || images.length === 0) {
      if (images.length === 0)
        alert("Please upload at least one product image");
      return;
    }

    const newProduct = {
      productName: getValues("productName"),
      category: getValues("category"),
      description: getValues("description"),
      price: getValues("price"),
      stock: getValues("stock"),
      availability: getValues("availability"),
      images,
    };

    if (editIndex !== null) {
      // Update existing product
      const updated = [...products];
      updated[editIndex] = newProduct;
      setProducts(updated);
      setEditIndex(null);
    } else {
      // Add new product
      setProducts((prev) => [newProduct, ...prev]);

      setValue("products", products, { shouldValidate: true });
    }

    reset({
      productName: "",
      category: "",
      description: "",
      price: "",
      stock: "",
      availability: "",
      images: [],
      features: [],
    });
  };

  const handleEditProduct = (index) => {
    const prod = products[index];
    setValue("productName", prod.productName);
    setValue("category", prod.category);
    setValue("description", prod.description);
    setValue("price", prod.price);
    setValue("stock", prod.stock);
    setValue("availability", prod.availability);
    setValue("images", prod.images);
    setEditIndex(index);
  };

  const handleDeleteProduct = (index) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div>
        <h3 className="text-sm font-medium capitalize mb-2">
          {products.length === 0
            ? "Add your first Product"
            : "Manage your Products"}
        </h3>
        <p className="text-xs text-gray-500">
          {products.length === 0
            ? "Start with one product to get your store up and running"
            : "Edit or remove products anytime"}
        </p>
      </div>

      {/* Product list display */}
      {products.length > 0 && (
        <div>
          <ul className="gap-4">
            {products.map((prod, index) => (
              <li
                key={index}
                className="relative border rounded-lg p-4 flex items-start gap-3 bg-[#DFDFDF]/60 mb-2"
              >
                {/* Edit/Delete buttons */}
                <div className="absolute top-2 right-3 flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleEditProduct(index)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                    title="Edit"
                  >
                    <FaRegEdit size={15} className="text-gray-700" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(index)}
                    className="p-1 hover:bg-red-100 rounded-full"
                    title="Delete"
                  >
                    <FiTrash2 size={15} className="text-red-600" />
                  </button>
                </div>

                {/* Product info */}
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-gray-800">
                    {prod.productName}{" "}
                    <span className="inline-block border border-[#9F9F9F] rounded-2xl px-2 text-[10px] text-gray-600 ml-2 capitalize">
                      {prod?.category}
                    </span>
                    <span className="inline-block ml-2 text-[10px] text-gray-100 bg-[#92922e] border-[#9F9F9F] px-3 rounded-2xl">
                      Draft
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {prod?.description}
                  </p>
                  <p className="text-xs">
                    <b>Price:</b> ${prod?.price} <b className="ml-2">Stock:</b>{" "}
                    {prod?.stock}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Product input form */}
      <div className="border border-gray-200 rounded-lg p-4 space-y-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Name *
            </label>
            <input
              {...register("productName", {
                required: "Product name is required",
              })}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors.productName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., Wireless Headphones"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <Dropdown
              value={watch("category")}
              onChange={(e) => setValue("category", e.target.value)}
              options={categories}
              placeholder="Choose a category"
              error={errors.category?.message}
              borderClass="border-gray-300"
              bgClass="bg-gray-50"
              containerClass="text-sm"
              dropdownClass="border-gray-300"
              radiusClass="rounded-md"
            />
          </div>
        </section>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              maxLength: { value: 1000, message: "Max 1000 characters" },
            })}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg text-sm resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Describe your product"
          />
          <div className="text-xs text-gray-400 text-right">
            {watch("description")?.length || 0}/1000
          </div>
        </div>

        {/* Price / Stock / Availability */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Price (USD) *
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., 49.99"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Stock Quantity *
            </label>
            <input
              type="number"
              {...register("stock", { required: "Stock is required" })}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors.stock ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., 100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Availability *
            </label>
            <Dropdown
              value={watch("availability")}
              onChange={(e) => setValue("availability", e.target.value)}
              options={availabilityOptions}
              placeholder="Select availability"
              error={errors.availability?.message}
              borderClass="border-gray-300"
              bgClass="bg-gray-50"
              containerClass="text-sm"
              dropdownClass="border-gray-300"
              radiusClass="rounded-md"
            />
          </div>
        </section>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Images
          </label>
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((slot) => {
              const images = watch("images") || [];
              const file = images[slot - 1];
              const previewUrl = file ? URL.createObjectURL(file) : null;

              return (
                <div
                  key={slot}
                  className={`relative aspect-video border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer ${
                    errors.images
                      ? "border-red-500"
                      : "border-gray-300 hover:border-orange-400"
                  }`}
                >
                  <input
                    type="file"
                    {...register("images")}
                    accept="image/*"
                    className="hidden"
                    id={`image-upload-${slot}`}
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files?.length > 0) {
                        const updated = [...(images || [])];
                        updated[slot - 1] = files[0];
                        setValue("images", updated);
                      }
                    }}
                  />
                  <label
                    htmlFor={`image-upload-${slot}`}
                    className="flex flex-col items-center justify-center h-full w-full text-gray-400 hover:text-gray-600"
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <GoImage size={26} />
                        <span className="text-[11px] mt-1">Upload</span>
                      </>
                    )}
                  </label>
                </div>
              );
            })}
          </section>
        </div>

        <button
          type="button"
          onClick={handleAddProduct}
          className="bg-black text-white text-sm p-3 w-full rounded-lg hover:bg-gray-800 transition-colors"
        >
          {editIndex !== null ? "Update Product" : "Add Product"}
        </button>
      </div>
    </div>
  );
};

export default StepTwo;

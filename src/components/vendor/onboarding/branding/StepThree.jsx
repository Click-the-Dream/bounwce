import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Dropdown from "../../../common/Dropdown";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { GoPlus } from "react-icons/go";

const shippingOptions = [
  { label: "Standard Shipping", value: "standard" },
  { label: "Express Shipping", value: "express" },
  { label: "Overnight Shipping", value: "overnight" },
];

const StepThree = () => {
  const {
    register,
    setValue,
    watch,
    control,
    trigger,
    formState: { errors },
  } = useFormContext();

  const shippings = watch("shippings") || [];
  const shippingMethod = watch("shippingMethod");
  const shippingCost = watch("shippingCost");
  const estimatedDelivery = watch("estimatedDelivery");
  const editIndex = watch("editIndex"); // store edit index in form

  const handleAddShipping = async () => {
    const isValid = await trigger([
      "shippingMethod",
      "shippingCost",
      "estimatedDelivery",
    ]);
    if (!isValid) return;

    const newShipping = { shippingMethod, shippingCost, estimatedDelivery };
    let updated = [];

    if (editIndex != null) {
      updated = shippings.map((s, i) => (i === editIndex ? newShipping : s));
    } else {
      updated = [newShipping, ...shippings];
    }

    setValue("shippings", updated, { shouldValidate: true });
    setValue("shippingMethod", "");
    setValue("shippingCost", "");
    setValue("estimatedDelivery", "");
    setValue("editIndex", null); // reset edit index
  };

  const handleEdit = (index) => {
    const s = shippings[index];
    setValue("shippingMethod", s.shippingMethod);
    setValue("shippingCost", s.shippingCost);
    setValue("estimatedDelivery", s.estimatedDelivery);
    setValue("editIndex", index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this shipping option?")) {
      const updated = shippings.filter((_, i) => i !== index);
      setValue("shippings", updated, { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Set Up Shipping Options</h3>
        <p className="text-xs text-gray-500">
          Configure how you’ll deliver products to your customers
        </p>
      </div>

      {shippings.length > 0 && (
        <ul className="gap-4">
          {shippings.map((s, index) => (
            <li
              key={index}
              className="relative border rounded-lg p-4 flex items-start gap-3 bg-[#DFDFDF]/60 mb-2"
            >
              <div className="absolute top-2 right-3 flex gap-1">
                <button
                  type="button"
                  onClick={() => handleEdit(index)}
                  className="p-1 hover:bg-gray-300 rounded-md border border-[#9E9E9E]"
                  title="Edit"
                >
                  <FaRegEdit size={10} className="text-gray-700" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="p-1 hover:bg-gray-300 rounded-md border border-[#9E9E9E]"
                  title="Delete"
                >
                  <FiTrash2 size={10} className="" />
                </button>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium capitalize">
                  {s.shippingMethod}
                </p>
                <p className="text-[10px] font-medium text-gray-900">
                  <span>Fee:</span> ${s.shippingCost}{" "}
                  <span className="ml-2">Estimated:</span> {s.estimatedDelivery}{" "}
                  days
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="border border-gray-200 rounded-lg p-4 space-y-6">
        <section>
          <h3 className="text-[10px] font-semibold flex gap-1 items-center">
            {" "}
            <GoPlus size={14} /> Add Shipping Option
          </h3>
          <p className="text-gray-400 text-[10px] mt-1">
            Add at least 3 delivery options
          </p>
        </section>
        <div>
          <label className="block text-xs font-medium mb-2">
            Shipping Method *
          </label>
          <Controller
            name="shippingMethod"
            control={control}
            rules={{ required: "Shipping method is required" }}
            render={({ field, fieldState }) => (
              <Dropdown
                {...field}
                options={shippingOptions}
                placeholder="Select a shipping method"
                error={fieldState.error?.message}
                borderClass="border-gray-300"
                bgClass={"bg-gray-50"}
                radiusClass="rounded-md"
                dropdownClass="border-gray-300"
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-2">
              Delivery Fee (₦) *
            </label>
            <input
              type="number"
              step="0.01"
              {...register("shippingCost", {
                required: "Shipping cost is required",
                min: { value: 0, message: "Cost must be greater than 0" },
              })}
              className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] bg-gray-50 text-xs ${
                errors.shippingCost ? "border border-red-500" : ""
              }`}
              placeholder="e.g., 5.99"
            />
            {errors.shippingCost && (
              <p className="text-red-500 text-xs mt-1">
                {errors.shippingCost.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium mb-2">
              Estimated Delivery (days) *
            </label>
            <input
              type="number"
              {...register("estimatedDelivery", {
                required: "Estimated delivery is required",
                min: { value: 1, message: "Must be at least 1 day" },
              })}
              className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] bg-gray-50 text-sm ${
                errors.estimatedDelivery ? "border border-red-500" : ""
              }`}
              placeholder="e.g., 3"
            />
            {errors.estimatedDelivery && (
              <p className="text-red-500 text-xs mt-1">
                {errors.estimatedDelivery.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddShipping}
          className="bg-black text-white text-sm p-3 w-full rounded-lg hover:bg-gray-800 transition-colors"
        >
          {editIndex != null ? "Update Shipping" : "Add Shipping"}
        </button>
      </div>
    </div>
  );
};

export default StepThree;

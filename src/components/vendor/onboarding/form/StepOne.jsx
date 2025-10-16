import React from "react";

const StepOne = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-2">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Store Name *
        </label>
        <input
          {...register("storeName", {
            required: "Store name is required",
          })}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.storeName ? "border-red-500" : "bg-gray-50"
          }`}
          placeholder="Enter your business name"
        />
        {errors.storeName && (
          <p className="text-red-600 mt-1 text-xs">
            {errors.storeName.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Store Email *
        </label>
        <input
          {...register("storeEmail", { required: "Email is required" })}
          type="email"
          placeholder="Enter your business email"
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.storeEmail ? "border-red-500" : "bg-gray-50"
          }`}
        />
        {errors.storeEmail && (
          <p className="text-red-600 mt-1 text-xs">
            {errors.storeEmail.message}
          </p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Store Address *
        </label>
        <textarea
          {...register("storeAddress", {
            required: "Address is required",
          })}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none ${
            errors.storeAddress ? "border-red-500" : "bg-gray-50"
          }`}
          placeholder="Enter your complete business address"
        />
        {errors.storeAddress && (
          <p className="text-red-600 mt-1 text-xs">
            {errors.storeAddress.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          {...register("phoneNumber", {
            required: "Phone number is required",
          })}
          type="tel"
          placeholder="+1 (555) 123-4567"
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            errors.phoneNumber ? "border-red-500" : "bg-gray-50"
          }`}
        />
        {errors.phoneNumber && (
          <p className="text-red-600 mt-1 text-xs">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default StepOne;

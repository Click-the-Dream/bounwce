import React from "react";

const StepOne = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Store Name *
        </label>
        <input
          {...register("name", {
            required: "Store name is required",
          })}
          className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] ${
            errors.name ? "border border-red-500" : "bg-gray-50"
          }`}
          placeholder="Enter your business name"
        />
        {errors.name && (
          <p className="text-red-600 mt-1 text-xs">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Store Email *
        </label>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Enter your business email"
          className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] ${
            errors.email ? "border border-red-500" : "bg-gray-50"
          }`}
        />
        {errors.email && (
          <p className="text-red-600 mt-1 text-xs">{errors.email.message}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="block font-medium text-gray-700 mb-2">
          Store Address *
        </label>
        <textarea
          {...register("address", {
            required: "Address is required",
          })}
          rows={4}
          className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] resize-none ${
            errors.address ? "border border-red-500" : "bg-gray-50"
          }`}
          placeholder="Enter your complete business address"
        />
        {errors.address && (
          <p className="text-red-600 mt-1 text-xs">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          {...register("phone_number", {
            required: "Phone number is required",
          })}
          type="tel"
          placeholder="+1 (555) 123-4567"
          className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] ${
            errors.phone_number ? "border border-red-500" : "bg-gray-50"
          }`}
        />
        {errors.phone_number && (
          <p className="text-red-600 mt-1 text-xs">
            {errors.phone_number.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default StepOne;

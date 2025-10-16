import React from "react";

const StepTwo = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-2 gap-4 gap-y-10">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Contact Person Name
        </label>
        <input
          {...register("contactName", {
            required: "Contact name is required",
          })}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
            errors.contactName ? "border-red-500" : "bg-gray-50"
          }`}
          placeholder="Afolabi Mubarak"
        />
        {errors.contactName && (
          <p className="text-red-600 mt-1 text-xs">
            {errors.contactName.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Role/Title
        </label>
        <input
          {...register("role", { required: "Email is required" })}
          type="text"
          placeholder="CEO, Manager, Owner etc."
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
            errors.role ? "border-red-500" : "bg-gray-50"
          }`}
        />
        {errors.role && (
          <p className="text-red-600 mt-1 text-xs">{errors.role.message}</p>
        )}
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Contact Person Email
        </label>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="business@gmail.com"
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
            errors.email ? "border-red-500" : "bg-gray-50"
          }`}
        />
        {errors.email && (
          <p className="text-red-600 mt-1 text-xs">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Contact Person Number
        </label>
        <input
          {...register("phoneNumber", {
            required: "Phone number is required",
          })}
          type="tel"
          placeholder="+1 (555) 123-4567"
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
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

export default StepTwo;

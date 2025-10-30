import React from "react";

const StepTwo = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-y-10">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Contact Person Name
        </label>
        <input
          {...register("contact_info.name", {
            required: "Contact name is required",
          })}
          className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] text-xs ${
            errors?.contact_info?.name ? "border border-red-500" : "bg-gray-50"
          }`}
          placeholder="Afolabi Mubarak"
        />
        {errors?.contact_info?.name && (
          <p className="text-red-600 mt-1 text-xs">
            {errors?.contact_info.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Role/Title
        </label>
        <input
          {...register("contact_info.title", {
            required: "Email is required",
          })}
          type="text"
          placeholder="CEO, Manager, Owner etc."
          className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] text-xs ${
            errors?.contact_info?.title ? "border border-red-500" : "bg-gray-50"
          }`}
        />
        {errors?.contact_info?.title && (
          <p className="text-red-600 mt-1 text-xs">
            {errors?.contact_info?.title.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Contact Person Email
        </label>
        <input
          {...register("contact_info.email", {
            required: "Email is required",
          })}
          type="email"
          placeholder="business@gmail.com"
          className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] text-xs ${
            errors?.contact_info?.email ? "border border-red-500" : "bg-gray-50"
          }`}
        />
        {errors?.contact_info?.email && (
          <p className="text-red-600 mt-1 text-xs">
            {errors?.contact_info?.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Contact Person Number
        </label>
        <input
          {...register("contact_info.phone_number", {
            required: "Phone number is required",
          })}
          type="tel"
          placeholder="+1 (555) 123-4567"
          className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] text-xs ${
            errors?.contact_info?.phone_number
              ? "border border-red-500"
              : "bg-gray-50"
          }`}
        />
        {errors?.contact_info?.phone_number && (
          <p className="text-red-600 mt-1 text-xs">
            {errors?.contact_info?.phone_number.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default StepTwo;

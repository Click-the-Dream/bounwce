import React from "react";
import { FaShieldAlt } from "react-icons/fa";

const StepThree = ({ register, errors }) => {
  return (
    <div className="space-y-5 md:space-y-10 text-xs">
      <div>
        <label className="block text-xs font-medium mb-2">
          National Identification Number (NIN) *
        </label>
        <input
          type="text"
          placeholder="Enter your NIN"
          {...register("id_number", {
            required: "NIN is required",
            pattern: {
              value: /^[0-9]{11}$/,
              message: "NIN must be an 11-digit number",
            },
          })}
          maxLength={11}
          className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] bg-gray-50 ${
            errors.id_number ? "border border-red-500" : "bg-gray-50"
          }`}
        />
        {errors.id_number && (
          <p className="text-red-600 mt-1 text-xs">
            {errors.id_number.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <FaShieldAlt className="flex-shrink-0 text-gray-400 text-lg" />
        <p className="text-gray-400 text-xs">
          Your verification will be reviewed within 1-2 business days. You'll
          receive an email confirmation once approved.
        </p>
      </div>
    </div>
  );
};

export default StepThree;

import React from "react";
import { FaShieldAlt } from "react-icons/fa";

const StepThree = ({ register, errors }) => {
  return (
    <div className="space-y-10 text-sm">
      <div>
        <label className="block text-xs font-medium mb-2">
          National Identification Number (NIN) *
        </label>
        <input
          type="text"
          placeholder="Enter your NIN"
          {...register("nin", {
            required: "NIN is required",
            pattern: {
              value: /^[0-9]{11}$/,
              message: "NIN must be an 11-digit number",
            },
          })}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 ${
            errors.nin ? "border-red-500" : "border-gray-300 bg-gray-50"
          }`}
        />
        {errors.nin && (
          <p className="text-red-600 mt-1 text-xs">{errors.nin.message}</p>
        )}
      </div>

      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <FaShieldAlt className="text-gray-400 text-lg mt-0.5" />
        <p className="text-gray-400 text-xs">
          Your verification will be reviewed within 1-2 business days. You'll
          receive an email confirmation once approved.
        </p>
      </div>
    </div>
  );
};

export default StepThree;

import React from "react";
import { FaLock } from "react-icons/fa";
import Dropdown from "../../../common/Dropdown";

const banks = [
  { value: "access", label: "Access Bank" },
  { value: "gtb", label: "GTBank" },
  { value: "zenith", label: "Zenith Bank" },
  { value: "uba", label: "UBA" },
];

const securityQuestions = [
  { value: "pet", label: "What was your first pet’s name?" },
  { value: "school", label: "What was your primary school name?" },
  { value: "city", label: "What city were you born in?" },
];

const StepFour = ({ register, errors, setValue, watch }) => {
  const bankName = watch("bankName");
  const securityQuestion = watch("securityQuestion");

  return (
    <div className="space-y-4 pt-2">
      {/* Account details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Account Name *
          </label>
          <input
            type="text"
            placeholder="Account holder name"
            {...register("accountName", {
              required: "Account name is required",
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 ${
              errors.accountName
                ? "border-red-500"
                : "border-gray-300 bg-gray-50"
            }`}
          />
          {errors.accountName && (
            <p className="text-red-600 text-xs mt-1">
              {errors.accountName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Account Number *
          </label>
          <input
            type="text"
            placeholder="10-digit account number"
            maxLength={10}
            {...register("accountNumber", {
              required: "Account number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Account number must be 10 digits",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 ${
              errors.accountNumber
                ? "border-red-500"
                : "border-gray-300 bg-gray-50"
            }`}
          />
          {errors.accountNumber && (
            <p className="text-red-600 text-xs mt-1">
              {errors.accountNumber.message}
            </p>
          )}
        </div>

        {/* Bank and withdrawal code */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Bank Name *
          </label>
          <Dropdown
            value={bankName}
            onChange={(e) => setValue("bankName", e.target.value)}
            options={banks}
            placeholder="Select your bank"
            error={errors.bankName?.message}
            borderClass="border-gray-300"
            bgClass="bg-white"
            containerClass="text-xs"
            dropdownClass="border-gray-300"
            radiusClass="rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            6-Digit Withdrawal Code *
          </label>
          <input
            type="password"
            placeholder="Enter 6-digit code"
            maxLength={6}
            {...register("withdrawalCode", {
              required: "Withdrawal code is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Must be a 6-digit numeric code",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 ${
              errors.withdrawalCode
                ? "border-red-500"
                : "border-gray-300 bg-gray-50"
            }`}
          />
          <p className="text-[10px] lg:text-xs text-gray-400 mt-1">
            This code will be required for all withdrawal requests
          </p>
          {errors.withdrawalCode && (
            <p className="text-red-600 text-xs mt-1">
              {errors.withdrawalCode.message}
            </p>
          )}
        </div>
      </div>

      {/* Security question */}
      <div>
        <label className="block font-medium text-gray-700 mb-2 text-xs">
          Security Question *
        </label>
        <Dropdown
          value={securityQuestion}
          onChange={(e) => setValue("securityQuestion", e.target.value)}
          options={securityQuestions}
          placeholder="Select a security question"
          error={errors.securityQuestion?.message}
          borderClass="border-gray-300"
          bgClass="bg-gray-50"
          containerClass="text-xs"
          dropdownClass="border-gray-300"
          radiusClass="rounded-md"
        />
      </div>

      <div className="text-xs">
        <label className="block font-medium text-gray-700 mb-2 ">
          Security Answer *
        </label>
        <input
          type="text"
          placeholder="Enter your answer"
          {...register("securityAnswer", {
            required: "Security answer is required",
          })}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 ${
            errors.securityAnswer
              ? "border-red-500"
              : "border-gray-300 bg-gray-50"
          }`}
        />
        {errors.securityAnswer && (
          <p className="text-red-600 text-xs mt-1">
            {errors.securityAnswer.message}
          </p>
        )}
      </div>

      {/* Info message */}
      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
        <FaLock className="flex-shrink-0 text-gray-400 text-lg mt-0.5" />
        <p className="text-gray-600">
          Your payout information is encrypted and secure. Your security
          question and withdrawal code help protect your account.
        </p>
      </div>
    </div>
  );
};

export default StepFour;

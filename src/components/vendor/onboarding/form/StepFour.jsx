import React from "react";
import { FaLock } from "react-icons/fa";
import { Controller } from "react-hook-form";
import Dropdown from "../../../common/Dropdown";

const banks = [
  { value: "access", label: "Access Bank" },
  { value: "gtb", label: "GTBank" },
  { value: "zenith", label: "Zenith Bank" },
  { value: "uba", label: "UBA" },
];

const securityQuestions = [
  {
    value: "What was your first pet’s name?",
    label: "What was your first pet’s name?",
  },
  {
    value: "What was your primary school name?",
    label: "What was your primary school name?",
  },
  {
    value: "What city were you born in?",
    label: "What city were you born in?",
  },
];

const StepFour = ({ register, errors, control }) => {
  return (
    <div className="space-y-4 pt-2">
      {/* Account details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Account Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Account Name *
          </label>
          <input
            type="text"
            placeholder="Account holder name"
            {...register("payout_info.account_name", {
              required: "Account name is required",
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] ${
              errors?.payout_info?.account_name
                ? "border border-red-500"
                : "border-gray-300 bg-gray-50"
            }`}
          />
          {errors?.payout_info?.account_name && (
            <p className="text-red-600 text-xs mt-1">
              {errors?.payout_info?.account_name.message}
            </p>
          )}
        </div>

        {/* Account Number */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Account Number *
          </label>
          <input
            type="text"
            placeholder="10-digit account number"
            maxLength={10}
            {...register("payout_info.account_number", {
              required: "Account number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Account number must be 10 digits",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] ${
              errors?.payout_info?.account_number
                ? "border border-red-500"
                : "border-gray-300 bg-gray-50"
            }`}
          />
          {errors?.payout_info?.account_number && (
            <p className="text-red-600 text-xs mt-1">
              {errors?.payout_info?.account_number.message}
            </p>
          )}
        </div>

        {/* Bank Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Bank Name *
          </label>
          <Controller
            name="payout_info.bank_name"
            control={control}
            rules={{ required: "Bank name is required" }}
            render={({ field }) => (
              <Dropdown
                value={field.value}
                onChange={(value) => field.onChange(value)}
                options={banks}
                placeholder="Select your bank"
                error={errors?.payout_info?.bank_name?.message}
                bgClass="bg-gray-50"
                borderClass="border-none focus:border focus:border-gray-500"
                containerClass="text-xs"
                dropdownClass="border-gray-300"
                radiusClass="rounded-md"
              />
            )}
          />
        </div>

        {/* Withdrawal Code */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            6-Digit Withdrawal Code *
          </label>
          <input
            type="password"
            placeholder="Enter 6-digit code"
            maxLength={6}
            {...register("payout_info.withdrawal_pin", {
              required: "Withdrawal code is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Must be a 6-digit numeric code",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] ${
              errors?.payout_info?.withdrawal_pin
                ? "border border-red-500"
                : "border-gray-300 bg-gray-50"
            }`}
          />
          <p className="text-[10px] lg:text-xs text-gray-400 mt-1">
            This code will be required for all withdrawal requests
          </p>
          {errors?.payout_info?.withdrawal_pin && (
            <p className="text-red-600 text-xs mt-1">
              {errors?.payout_info?.withdrawal_pin.message}
            </p>
          )}
        </div>
      </div>

      {/* Security question */}
      <div>
        <label className="block font-medium text-gray-700 mb-2 text-xs">
          Security Question *
        </label>
        <Controller
          name="payout_info.security_question"
          control={control}
          rules={{ required: "Security question is required" }}
          render={({ field }) => (
            <Dropdown
              value={field.value}
              onChange={(value) => field.onChange(value)}
              options={securityQuestions}
              placeholder="Select a security question"
              error={errors?.payout_info?.security_question?.message}
              bgClass="bg-gray-50"
              containerClass="text-xs"
              dropdownClass="border-gray-300"
              radiusClass="rounded-md"
            />
          )}
        />
      </div>

      {/* Security Answer */}
      <div className="text-xs">
        <label className="block font-medium text-gray-700 mb-2 ">
          Security Answer *
        </label>
        <input
          type="text"
          placeholder="Enter your answer"
          {...register("payout_info.security_answer", {
            required: "Security answer is required",
          })}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] ${
            errors?.payout_info?.security_answer
              ? "border border-red-500"
              : "border-gray-300 bg-gray-50"
          }`}
        />
        {errors?.payout_info?.security_answer && (
          <p className="text-red-600 text-xs mt-1">
            {errors?.payout_info?.security_answer.message}
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

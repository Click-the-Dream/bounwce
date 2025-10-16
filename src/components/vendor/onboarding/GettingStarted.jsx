import React from "react";
import { useFormContext } from "react-hook-form";
import { BsBox, BsTruck } from "react-icons/bs";
import { FaLightbulb, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoColorPaletteOutline, IoRocketOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";

const steps = [
  {
    icon: IoColorPaletteOutline,
    key: "branding",
    label: "Branding",
    desc: "Business details & verification",
  },
  {
    icon: BsBox,
    key: "products",
    label: "Products",
    desc: "Add your first product or service",
  },
  {
    icon: BsTruck,
    key: "shipping",
    label: "Shipping",
    desc: "Set up delivery options",
  },
  {
    icon: IoRocketOutline,
    key: "publish",
    label: "Publish",
    desc: "Make your catalogue live",
  },
];

const GettingStarted = ({ currentStep, onNext, onBack }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800">Getting Started</h2>
        <p className="text-sm text-gray-500">
          Let’s set up your store and add your first products
        </p>
      </div>

      {/* Sub-step Navigation */}
      <div className="flex justify-between gap-1 text-center items-stretch mb-4 overflow-x-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center text-center flex-1 relative max-w-20">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 bg-gray-50
              ${
                index === 0
                  ? "border-black text-black"
                  : "border-gray-300 text-gray-400"
              }`}
              >
                {<step.icon size={14} />}
              </div>
              <span
                className={`text-xs mt-2 ${
                  index === 0 ? "text-black font-medium" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
              <span className="text-[10px] text-gray-400 line-clamp-2">
                {step.desc}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 ${
                  currentStep > step.number ? "bg-green-500" : "bg-gray-300"
                } transition-colors duration-300`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Branding Section */}
      <div className="mb-10">
        <h3 className="text-sm font-semibold mb-2">Brand Your Store</h3>
        <p className="text-xs text-gray-400 mb-4">
          Upload your logo and banner to make your store stand out
        </p>

        {/* Logo */}
        <div className="mb-6">
          <label className="block text-sm mb-1">Store Logo (Optional)</label>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange/50 transition-colors">
            <input
              id="storeLogo"
              type="file"
              {...register("storeLogo")}
              accept="image/png, image/jpeg"
              className="hidden"
            />
            <label
              htmlFor="storeLogo"
              className="inline-block bg-gray-50 text-sm font-medium px-4 py-2 rounded-md cursor-pointer border-2 border-gray-300 hover:bg-gray-50/90 transition"
            >
              Choose File
            </label>

            <p className="text-[9px] text-gray-400 mt-2">
              PNG, JPG up to 5MB. Recommended: 200x200px
            </p>
          </div>
        </div>

        {/* Banner */}
        <div className="mb-6">
          <label className="block text-sm mb-1">Store Banner (Optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange/50 transition-colors">
            <input
              id="storeBanner"
              type="file"
              {...register("storeBanner")}
              accept="image/png, image/jpeg"
              className="hidden"
            />
            <label
              htmlFor="storeBanner"
              className="inline-block bg-gray-50 text-sm font-medium px-4 py-2 rounded-md cursor-pointer border-2 border-gray-300 hover:bg-gray-50/90 transition"
            >
              Choose File
            </label>

            <p className="text-[9px] text-gray-400 mt-2">
              PNG, JPG up to 5MB. Recommended: 200x200px
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-1">
            Store Description (Optional)
          </label>
          <textarea
            {...register("storeDescription")}
            rows="3"
            placeholder="Tell your customers what you sell and what makes you special..."
            className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-1 focus:ring-orange resize-none"
          />
        </div>
      </div>

      {/* Tips and Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="space-y-4">
          {/* Pro Tip */}
          <div className="border border-purple-200 bg-purple-50 rounded-xl p-4 text-sm text-purple-700">
            <div className="flex items-center gap-2 font-medium mb-1">
              <FaLightbulb className="text-yellow-500" /> Pro Tip
            </div>
            <p className="text-[10px] leading-snug">
              A professional logo and banner helps build trust and attract more
              customers.
            </p>
          </div>

          {/* Need help */}
          <div className="border border-gray-200 rounded-xl py-5 px-8 text-sm w-max">
            <p className=" font-medium mb-2">Need Help?</p>
            <div className="text-[10px] text-blue-500 space-y-2">
              <p className="flex items-center cursor-pointer">
                <IoIosHelpCircleOutline
                  size="14"
                  className="inline-block mr-1"
                />{" "}
                Setup Guide
              </p>
              <p className="flex items-center cursor-pointer">
                <FiPhone size="14" className="inline-block mr-1" />
                Contact Support
              </p>
              <p className="flex items-center cursor-pointer">
                <TbWorld size="14" className="inline-block mr-1" />
                Video tutorials
              </p>
            </div>
          </div>
        </section>

        {/* Setup Checklist */}
        <div className="border-2 border-gray-200 rounded-xl p-5 bg-white">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Setup Checklist
          </h4>

          <ul className="space-y-3 text-sm">
            {[
              { label: "Upload logo", status: "active" },
              { label: "Add product", status: "⏳" },
              { label: "Set shipping", status: "⏳" },
              { label: "Publish store", status: "⏳" },
            ].map((item, index) => (
              <li
                key={index}
                className={`flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 transition-colors ${
                  item.status === "active" ? " bg-[#E5F0FF]" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold ${
                      item.status === "active" ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{item.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
        >
          <FaArrowLeft className="inline-block mr-2" /> Back
        </button>
        <div className="flex gap-3">
          <button
            type="button"
            className="px-4 py-2 border bg-black rounded-lg text-white"
            onClick={onNext}
          >
            Skip <FaArrowRight className="inline-block ml-2" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange/90"
          >
            Next <FaArrowRight className="inline-block ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;

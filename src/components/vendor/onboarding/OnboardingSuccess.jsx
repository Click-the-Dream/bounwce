import React from "react";
import { useFormContext } from "react-hook-form";
import { Store, LayoutDashboard } from "lucide-react";
import { LuCircleCheckBig } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OnboardingSuccess = () => {
  const { watch } = useFormContext();
  const navigate = useNavigate();

  // Watch data from form
  const storeName = watch("name") || "Unnamed Store";
  const contactPerson = watch("contact_info.name") || "N/A";
  const phoneNumber = watch("contact_info.phone_number") || "+234-XXXXXXXXXX";
  const businessType = watch("contact_info.title") || "Sole Proprietorship";

  return (
    <div className="">
      {/* Success Message */}
      <div className="text-center mb-10 border border-gray-300 bg-white p-6 sm:p-8 rounded-2xl">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <LuCircleCheckBig className="text-green-600 w-8 h-8" />
          </div>
        </div>
        <h2 className="text-sm font-semibold text-gray-800">
          Congratulations! 🎉
        </h2>
        <p className="text-gray-500 text-xs mt-1">
          Your vendor account is now active
        </p>

        <div className="mt-4 flex flex-col justify-center items-center">
          <div className="flex items-center gap-2 px-4 py-2">
            <Store className="w-6 h-6" />
            <span className="font-medium text-[11px]">{storeName}</span>
            <span className="inline-block text-[10px] text-gray-100 bg-[#92922e] border-[#9F9F9F] px-3 py-[2px] rounded-2xl">
              Draft
            </span>
          </div>
          <p className="text-xs text-gray-400">Store ID: #368118</p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="border border-gray-300 bg-white p-6 sm:p-8 rounded-2xl">
        <h3 className="text-sm font-semibold mb-1">Your Store Overview</h3>
        <p className="text-xs text-gray-500 mb-6">
          Here’s what you’ve set up so far
        </p>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-8">
          {[
            { label: "Total Products", value: watch("products")?.length || 0 },
            { label: "Draft Products", value: 1 },
            {
              label: "Shipping Options",
              value: watch("shippings")?.length || 0,
            },
            { label: "Avg. Price", value: "₦1000" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg p-4 min-h-20 text-center flex flex-col justify-around items-center"
            >
              <p className="text-sm">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Business Info + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-sm font-medium mb-2">Business Information</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex justify-between gap-2">
                <span className="text-gray-400">Business Type:</span>{" "}
                {businessType}
              </li>
              <li className="flex justify-between gap-2">
                <span className="text-gray-400">Contact:</span> {contactPerson}
              </li>
              <li className="flex justify-between gap-2">
                <span className="text-gray-400">Phone:</span> {phoneNumber}
              </li>
              <li className="flex justify-between items-center gap-2">
                <span className="text-gray-400">Verification Status:</span>
                <span className="bg-green-600 text-[10px] text-green-100 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Store Features</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {[
                "Custom branding applied",
                "Products saved in draft",
                "Shipping configured",
                "Payment processing enabled",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <LuCircleCheckBig className="w-4 h-4 text-green-500" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Important Info */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-4">
          <h5 className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FiMessageSquare /> Important Information
          </h5>

          <div className="bg-[#E5F0FF] text-blue-700 p-3 rounded-md text-xs">
            <p className="font-medium">Payment Processing</p>
            <p>Your first payout will be processed after your first sale.</p>
          </div>

          <div className="bg-[#F0FDF4] text-green-700 p-3 rounded-md text-xs">
            <p className="font-medium">Support & Resources</p>
            <p>
              Need help? Check out our vendor handbook or contact support 24/7.
            </p>
          </div>

          <div className="bg-[#FFFBEB] text-yellow-700 p-3 rounded-md text-xs">
            <p className="font-medium">Store Performance</p>
            <p>
              Keep your store active by adding new products and maintaining good
              ratings.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex flex-wrap justify-between items-center gap-3 mt-8 text-sm">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="ml-auto flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900">
            <Store className="w-4 h-4" /> View My Store
          </button>
          <button
            onClick={() => navigate("/vendor")}
            className="flex items-center gap-2 px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange/90"
          >
            <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSuccess;

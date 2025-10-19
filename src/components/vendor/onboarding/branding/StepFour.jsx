import React from "react";
import { FiBox, FiTruck } from "react-icons/fi";
import { IoColorPaletteOutline } from "react-icons/io5";

const StepFour = () => {
  return (
    <div className="w-full flex flex-col items-center py-10 px-4 bg-white rounded-3xl">
      {/* Title Section */}
      <div className="text-center mb-10">
        <p className="text-sm font-semibold">Ready to Launch!</p>
        <p className="text-gray-500 text-xs max-w-md mx-auto mt-1">
          Your store is ready to go live. Review everything below and publish
          when ready or save your store as draft.
        </p>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-stretch">
        {/* Branding Card */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-md p-6 hover:shadow-md transition w-full max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <IoColorPaletteOutline className="flex-shrink-0 text-lg text-black" />
            <h3 className="font-medium text-gray-800">Branding</h3>
          </div>
          <ul className="text-gray-600 text-xs space-y-2">
            <li>
              <span className="mr-1">✓</span> Logo uploaded
            </li>
            <li>
              <span className="mr-1">✓</span> Banner uploaded
            </li>
            <li>
              <span className="mr-1">✓</span> Store description set
            </li>
          </ul>
        </div>

        {/* Products Card */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-md p-6 hover:shadow-md transition w-full max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <FiBox className="flex-shrink-0 text-lg text-black" />
            <h3 className="font-medium text-gray-800">Products</h3>
          </div>
          <ul className="text-gray-600 text-xs space-y-2">
            <li>
              <span className="mr-1">✓</span> 1 product added
            </li>
            <li>
              <span className="mr-1">✓</span> 0 active products
            </li>
            <li>
              <span className="mr-1">✓</span> 1 draft product
            </li>
          </ul>
        </div>

        {/* Shipping Card */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-md p-6 hover:shadow-md transition w-full max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <FiTruck className="flex-shrink-0 text-lg text-black" />
            <h3 className="font-medium text-gray-800">Shipping</h3>
          </div>
          <ul className="text-gray-600 text-xs space-y-2">
            <li>
              <span className="mr-1">✓</span> 1 shipping option
            </li>
            <li>
              <span className="mr-1">✓</span> Delivery methods configured
            </li>
            <li>
              <span className="mr-1">✓</span> Pricing structure set
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StepFour;

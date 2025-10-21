import { useEffect, useState } from "react";

const StepOne = ({ register, errors, watch, setValue }) => {
  const storeLogo = watch("storeLogo");
  const storeBanner = watch("storeBanner");

  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  // Generate image preview when files change
  useEffect(() => {
    if (storeLogo && storeLogo[0]) {
      const file = storeLogo[0];
      const previewURL = URL.createObjectURL(file);
      setLogoPreview(previewURL);
      return () => URL.revokeObjectURL(previewURL);
    }
  }, [storeLogo]);

  useEffect(() => {
    if (storeBanner && storeBanner[0]) {
      const file = storeBanner[0];
      const previewURL = URL.createObjectURL(file);
      setBannerPreview(previewURL);
      return () => URL.revokeObjectURL(previewURL);
    }
  }, [storeBanner]);

  return (
    <div className="mb-10">
      <h3 className="text-sm font-semibold mb-2">Brand Your Store</h3>
      <p className="text-xs text-gray-400 mb-4">
        Upload your logo and banner to make your store stand out
      </p>

      {/* Logo Upload */}
      <div className="mb-6">
        <label className="block text-sm mb-1">Store Logo (Optional)</label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-colors relative">
          {/* Image Preview */}
          {logoPreview ? (
            <div className="flex flex-col items-center space-y-2">
              <img
                src={logoPreview}
                alt="Store Logo"
                className="w-20 h-20 object-cover rounded-full border"
              />
              <button
                type="button"
                onClick={() => {
                  setLogoPreview(null);
                  setValue("storeLogo", null);
                }}
                className="text-[11px] text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <>
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
              {errors.storeLogo && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.storeLogo.message}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Banner Upload */}
      <div className="mb-6">
        <label className="block text-sm mb-1">Store Banner (Optional)</label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-colors relative">
          {/* Image Preview */}
          {bannerPreview ? (
            <div className="flex flex-col items-center space-y-2">
              <img
                src={bannerPreview}
                alt="Store Banner"
                className="w-full h-28 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => {
                  setBannerPreview(null);
                  setValue("storeBanner", null);
                }}
                className="text-[11px] text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <>
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
                PNG, JPG up to 5MB. Recommended: 1200x300px
              </p>
              {errors.storeBanner && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.storeBanner.message}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <textarea
        {...register("storeDescription", {
          required: "Store description is required",
          minLength: {
            value: 10,
            message: "Description must be at least 10 characters long",
          },
        })}
        rows="3"
        placeholder="Tell your customers what you sell and what makes you special..."
        className={`w-full border rounded-xl p-3 text-sm focus:ring-1 resize-none ${
          errors.storeDescription
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-orange"
        }`}
      />
      {errors.storeDescription && (
        <p className="text-xs text-red-500 mt-1">
          {errors.storeDescription.message}
        </p>
      )}
    </div>
  );
};

export default StepOne;

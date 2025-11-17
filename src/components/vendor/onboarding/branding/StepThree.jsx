import React, { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import useShipping from "../../../../hooks/useShipping";
import { AuthContext } from "../../../../context/AuthContext";
import { useMemo } from "react";
import { onPrompt } from "../../../../utils/notifications/onPrompt";

const StepThree = () => {
  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  const { authDetails } = useContext(AuthContext);
  const userId = authDetails?.user?.id;

  const {
    useGetShipmentByUser,
    createShipment,
    updateShipment,
    deleteShipment,
  } = useShipping();

  // Fetch user's existing shipment info
  const {
    data: shipmentData,
    isLoading,
    isError,
    isSuccess,
  } = useGetShipmentByUser(userId);

  // Normalize to array (if it's an object, wrap it)
  const shippings = useMemo(() => {
    if (!shipmentData) return [];
    return Array.isArray(shipmentData) ? shipmentData : [shipmentData];
  }, [shipmentData]);

  useEffect(() => {
    if (shippings?.length > 0) {
      setValue("shippings", shippings);
    }
  }, [shippings, setValue]);
  // Watch form state
  const deliveryAddress = watch("shipping_address");
  const deliveryFee = watch("delivery_fee");
  const estimatedDelivery = watch("delivery_time");
  const editIndex = watch("editIndex");

  const handleAddShipping = async () => {
    const isValid = await trigger([
      "shipping_address",
      "delivery_fee",
      "delivery_time",
    ]);
    if (!isValid) return;
    if (shipmentData?.length >= 3 && !editIndex) {
      onPrompt({
        title: "Limit Reached",
        message: "You can only add up to 3 shipments at this stage.",
      });
      return; // Stop the function
    }

    const newShipping = {
      shipping_address: deliveryAddress,
      delivery_fee: deliveryFee,
      delivery_time: estimatedDelivery,
      delivery_method: "Standard",
    };

    // Choose API call based on whether shipment already exists
    const mutation = editIndex != null ? updateShipment : createShipment;
    mutation.mutate(
      editIndex ? { id: editIndex, ...newShipping } : newShipping,
      {
        onSuccess: () => {
          setValue("shipping_address", "");
          setValue("delivery_fee", "");
          setValue("delivery_time", "");
          setValue("editIndex", null);
        },
      }
    );
  };

  const handleEdit = (index) => {
    const s = shippings[index];
    setValue("shipping_address", s.shipping_address);
    setValue("delivery_fee", s.delivery_fee);
    setValue("delivery_time", s.delivery_time);
    setValue("editIndex", s.id);
  };
  const handleCancelEdit = () => {
    setValue("shipping_address", "");
    setValue("delivery_fee", "");
    setValue("delivery_time", "");
    setValue("editIndex", null);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this shipping option?")) return;
    deleteShipment.mutate(id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Set Up Shipping Options</h3>
        <p className="text-xs text-gray-500">
          Configure how you’ll deliver products to your customers
        </p>
      </div>

      {/* Display conditions */}
      {isLoading ? (
        <p className="text-gray-500 text-xs">Loading shipping options...</p>
      ) : isError ? (
        <p className="text-red-500 text-xs">
          Failed to load shipping options. Please try again.
        </p>
      ) : isSuccess && shippings.length > 0 ? (
        <ul className="gap-4">
          {shippings.map((s, index) => (
            <li
              key={index}
              className="relative border rounded-lg p-4 flex items-start gap-3 bg-[#DFDFDF]/60 mb-2"
            >
              <div className="absolute top-2 right-3 flex gap-1">
                <button
                  type="button"
                  onClick={() => handleEdit(index)}
                  className="p-1 hover:bg-gray-300 rounded-md border border-[#9E9E9E]"
                  title="Edit"
                >
                  <FaRegEdit size={10} className="text-gray-700" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(s?.id)}
                  className="p-1 hover:bg-gray-300 rounded-md border border-[#9E9E9E]"
                  title="Delete"
                >
                  <FiTrash2 size={10} />
                </button>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm capitalize">{s.shipping_address}</p>
                <p className="text-xs text-gray-900">
                  <span>Fee:</span>{" "}
                  {parseInt(s.delivery_fee) > 0
                    ? `₦ ${s.delivery_fee}`
                    : "free"}
                  <span className="ml-2">Estimated:</span> {s.delivery_time}{" "}
                  days
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-xs">No shipping options added yet.</p>
      )}

      {/* Add new shipping option */}
      <div className="border border-gray-200 rounded-lg p-4 space-y-6">
        <div className="flex justify-between items-center">
          <section>
            <h3 className="text-sm font-medium flex gap-1 items-center">
              {editIndex ? "Edit Shipping Option" : "Add Shipping Option"}
            </h3>
            <p className="text-gray-500 text-xs mt-1">
              Add at least 3 delivery options
            </p>
          </section>
          {editIndex && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-xs text-gray-600 border border-gray-300 hover:border-gray-400 px-3 py-2 rounded-md transition-all duration-200 hover:bg-white font-medium"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {/* Delivery Method */}
        <div>
          <label className="block text-xs font-medium mb-2">
            Delivery Method *
          </label>
          <input
            type="text"
            {...register("shipping_address", {
              required: "Delivery method is required",
            })}
            className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] bg-gray-50 text-xs ${
              errors.shipping_address ? "border border-red-500" : ""
            }`}
            placeholder="e.g., Pickup, Door Delivery"
          />
          {errors.shipping_address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.shipping_address.message}
            </p>
          )}
        </div>

        {/* Fee & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-2">
              Delivery Fee (₦) *
            </label>
            <input
              type="number"
              step="0.01"
              {...register("delivery_fee", {
                required: "Shipping cost is required",
                min: { value: 0, message: "Cost must be greater than 0" },
              })}
              className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] bg-gray-50 text-xs ${
                errors.delivery_fee ? "border border-red-500" : ""
              }`}
              placeholder="0"
            />
            {errors.delivery_fee && (
              <p className="text-red-500 text-xs mt-1">
                {errors.delivery_fee.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium mb-2">
              Estimated Delivery (days) *
            </label>
            <input
              type="number"
              {...register("delivery_time", {
                required: "Estimated delivery is required",
                min: { value: 1, message: "Must be at least 1 day" },
              })}
              className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] bg-gray-50 text-sm ${
                errors.delivery_time ? "border border-red-500" : ""
              }`}
              placeholder="e.g. 3"
            />
            {errors.delivery_time && (
              <p className="text-red-500 text-xs mt-1">
                {errors.delivery_time.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddShipping}
          disabled={createShipment.isPending || updateShipment.isPending}
          className="bg-black text-white text-sm p-3 w-full rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {editIndex != null
            ? updateShipment.isPending
              ? "Updating..."
              : "Update Shipping"
            : createShipment.isPending
            ? "Saving..."
            : "Add Shipping"}
        </button>
      </div>
    </div>
  );
};

export default StepThree;

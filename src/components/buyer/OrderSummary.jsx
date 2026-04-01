import { useState } from "react";
import { extractErrorMessage, formatCurrency } from "../../utils/formatters";
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { onPrompt } from "../../utils/notifications/onPrompt";
import { onFailure } from "../../utils/notifications/OnFailure";

const OrderSummary = ({ orderSummary, mode = "Checkout", selectedDelivery, deliveryFee }) => {
    const [idempotencyKey] = useState(() => crypto.randomUUID());
    const navigate = useNavigate();
    const { checkoutCarts } = useCart();
    const [expandedVendors, setExpandedVendors] = useState({});

    const toggleVendor = (vendorName) => {
        setExpandedVendors((prev) => ({
            ...prev,
            [vendorName]: !prev[vendorName],
        }));
    };

    const handleClick = () => {
        if (mode.toLowerCase() === "payment") {
            const vendorIds = orderSummary.vendorTotals.map((v) => v.storeId);
            const allStoresHaveDelivery = vendorIds.every(
                (storeId) => !!selectedDelivery[storeId]?.id
            );
            const payload = Object.entries(selectedDelivery).map(
                ([storeId, deliveryData]) => ({
                    store_id: storeId,
                    shipment_id: deliveryData.id,
                })
            );

            if (!allStoresHaveDelivery || payload.length === 0) {
                return onPrompt({ title: "Checkout", message: "Please select a delivery method for all stores before proceeding." });
            }


            checkoutCarts.mutate({ payload, idempotencyKey }, {
                onSuccess: (res) => {
                    console.log(res);

                    const {
                        available_products = [],
                        unavailable_products = [],
                        payment_url,
                    } = res?.data?.data || {};

                    // Handle unavailable products (granular feedback)
                    if (unavailable_products.length > 0) {
                        unavailable_products.forEach((p) => {
                            console.error(`${p.name}: ${p.error}`);
                            onPrompt({ title: "Checkout", message: `${p.name}: ${p.error}` });
                        });
                    }

                    // If nothing is valid, stop flow
                    if (available_products.length === 0) {
                        onPrompt({ title: "checkout", message: "No valid items available for checkout." });
                        return;
                    }

                    // Backend controls payment 
                    if (payment_url) {
                        window.location.href = payment_url;
                        return;
                    }

                    // Fallback (rare case)
                    navigate("/buyer/checkout");
                },

                onError: (err) => {
                    console.error(err);
                    onFailure({ title: "Checkout Failed", message: extractErrorMessage(err) || "An error occurred during checkout. Please try again." });
                },
            });

            return;
        }

        navigate("/buyer/checkout");
    };

    const singleVendor = orderSummary?.vendorTotals?.length === 1;
    const vendors = orderSummary?.vendorTotals || [];

    return (
        <div className="md:sticky md:overflow-y-auto md:max-h-screen md:top-0 bg-white rounded-xl p-6 h-fit shadow-sm">
            <h2 className="text-[13px] font-medium mb-6">Order Summary</h2>

            {!singleVendor && (
                <p className="text-[13px] font-semibold text-orange mb-4">
                    {vendors.length} VENDORS
                </p>
            )}

            <div className="space-y-3 text-xs mb-6">
                {singleVendor
                    ? vendors[0].products.map((p) => (
                        <div
                            key={p.id}
                            className="pl-2 flex items-center justify-between mt-2"
                        >
                            <span className="text-[13px] text-[#767676] ">{p.name}</span>
                            <span className="text-[12px] font-medium">{formatCurrency(p.total)}</span>
                        </div>
                    ))
                    : vendors
                        .filter((v) => v.total > 0)
                        .map((v) => {
                            const isExpanded = expandedVendors[v.name];
                            return (
                                <div key={v.name} className="p-4 pb-1 border-[0.53px] rounded">
                                    <div className="flex justify-between gap-2 items-center">
                                        <span className="text-[13px] font-medium capitalize truncate">
                                            {v.name}
                                        </span>
                                        {!isExpanded && (
                                            <span className="text-[13px] font-semibold">
                                                {formatCurrency(v.total)}
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        className={`overflow-hidden transition-all duration-300`}
                                        style={{
                                            maxHeight: isExpanded
                                                ? `${v.products.length * 40 + 20}px`
                                                : "0",
                                        }}
                                    >
                                        {v.products.map((p) => (
                                            <div
                                                key={p.id}
                                                className="border-l border-[#767676] pl-2 flex items-center justify-between mt-2"
                                            >
                                                <span className="text-[13px] text-[#767676] truncate">
                                                    {p.name}
                                                </span>
                                                <span className="text-[13px]">{formatCurrency(p.total)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => toggleVendor(v.name)}
                                        className="flex items-center justify-center w-full text-center text-gray-400 hover:text-black text-sm mt-2"
                                    >
                                        {isExpanded ? <RiArrowUpWideLine /> : <RiArrowDownWideLine />}
                                    </button>
                                </div>
                            );
                        })}
            </div>

            <div className="border-t pt-4 space-y-3 text-xs">
                <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-bold text-black">
                        {formatCurrency(orderSummary.subtotal)}
                    </span>
                </div>
                <div className="flex justify-between text-gray-500">
                    <span>Delivery Fee</span>
                    <span className="text-black">{formatCurrency(deliveryFee || 0) || "Free"}</span>
                </div>
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between text-xs">
                <span className="font-semibold">Total</span>
                <span className="font-bold">{formatCurrency(Number(orderSummary.subtotal || 0) + Number(deliveryFee || 0))}</span>
            </div>

            <button
                onClick={handleClick}
                disabled={checkoutCarts.isPending} className="mt-6 w-full bg-black text-white py-3 rounded-lg text-[10px] disabled:opacity-50 disabled:cursor-not-allowed">

                {checkoutCarts.isPending ? "Processing..." : `Proceed to ${mode}`}
            </button>
        </div>
    );
};

export default OrderSummary;
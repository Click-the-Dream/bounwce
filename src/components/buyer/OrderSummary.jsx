import { useState } from "react";
import { formatCurrency } from "../../utils/formatters"
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";

const OrderSummary = ({ orderSummary }) => {
    console.log(orderSummary);
    const [expandedVendors, setExpandedVendors] = useState({});
    const toggleVendor = (vendorName) => {
        setExpandedVendors((prev) => ({
            ...prev,
            [vendorName]: !prev[vendorName],
        }));
    };


    return (
        <div className="md:sticky md:top-0 bg-white rounded-xl p-6 h-fit shadow-sm">
            <h2 className="text-[13px] font-medium mb-6">Order Summary</h2>

            <p className="text-[13px] font-semibold text-orange mb-4">
                {orderSummary.vendorTotals.length} VENDORS
            </p>

            <div className="space-y-3 text-xs mb-6">
                {orderSummary.vendorTotals.map((v) => {
                    const isExpanded = expandedVendors[v.name];
                    const visibleProducts = isExpanded
                        ? v.products
                        : null;

                    return (
                        <div key={v.name} className="p-4 pb-1 border-[0.53px] rounded-lg">
                            {/* Vendor Name */}
                            <span className="text-[13px] font-medium">{v.name}</span>

                            {/* Products */}
                            {visibleProducts && <section className="flex flex-col gap-2 mt-2 mb-2">
                                {visibleProducts?.map((p) => (
                                    <div
                                        key={p.id}
                                        className="border-l border-[#767676] pl-2 flex items-center justify-between"
                                    >
                                        <span className="text-[13px] text-[#767676] truncate">
                                            {p.name}
                                        </span>

                                        {/* FIXED: use product total, not vendor total */}
                                        <span className="text-[13px]">
                                            {formatCurrency(p.total)}
                                        </span>
                                    </div>
                                ))}
                            </section>}


                            <button
                                onClick={() => toggleVendor(v.name)}
                                className="flex items-center justify-center w-full text-center text-gray-400 hover:text-black text-sm"
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
                    <span className="text-black">Free</span>
                </div>
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between text-sm">
                <span className="font-semibold">Total</span>
                <span className="font-bold">
                    {formatCurrency(orderSummary.subtotal)}
                </span>
            </div>

            <button className="mt-6 w-full bg-black text-white py-3 rounded-lg text-[10px]">
                Proceed to Checkout
            </button>
        </div>
    )
}

export default OrderSummary
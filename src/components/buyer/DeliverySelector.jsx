import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { RiArrowDownWideLine } from 'react-icons/ri';
import useCart from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatters';

const DeliverySelector = ({ carts, selectedDelivery, setSelectedDelivery }) => {
    const { getShippingInfo } = useCart();
    const { data: shippingInfo, isLoading, error } = getShippingInfo();
    const [openVendors, setOpenVendors] = useState({});
    const [openItems, setOpenItems] = useState({});

    const isMultiVendor = carts.length > 1;

    const toggleVendor = (storeId) => {
        if (!isMultiVendor) return;
        setOpenVendors((prev) => ({
            ...prev,
            [storeId]: !prev[storeId],
        }));
    };

    const toggleItems = (storeId) => {
        setOpenItems((prev) => ({
            ...prev,
            [storeId]: !prev[storeId],
        }));
    };

    const handleSelect = (vendorId, loc) => {
        setSelectedDelivery(prev => ({
            ...prev,
            [vendorId]: {
                id: loc.id,
                fee: loc.delivery_fee,
                address: loc.shipping_address
            }
        }));
    };

    return (
        <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="text-sm font-medium text-black">
                Choose Delivery Location <span className="text-red-500">*</span>
            </h2>

            <p className="text-xs text-gray-400 mt-1 mb-4">
                Please select a delivery zone near you as configured by the Vendor
            </p>

            {carts.map((vendor) => {
                const storeId = vendor.storeId;

                const vendorLocations =
                    shippingInfo?.find((s) => s.store_id === storeId)
                        ?.shipment_info || [];

                return (
                    <div
                        key={storeId}
                        className={`border-gray-100 rounded-xl p-[15px] pb-0 mb-6 divide-y ${selectedDelivery[storeId] ? "border-2" : "border-[0.53px]"}`}
                    >
                        {/* Vendor Header */}
                        <div
                            className="flex justify-between mb-4 cursor-pointer"

                        >
                            <div>
                                <h3 className="capitalize font-medium text-black text-sm">
                                    {vendor.storeName}
                                </h3>
                                <p className="text-xs text-gray-400 mt-2">
                                    All {vendor.items?.length || 0} items will use the same delivery location.
                                </p>
                            </div>

                            {isMultiVendor && (
                                <MoreHorizontal onClick={() => toggleVendor(storeId)} size={18} className="text-black" />
                            )}
                        </div>

                        {/* Vendor Collapse */}
                        <div
                            className={`transition-all duration-300 overflow-hidden ${!isMultiVendor || openVendors[storeId]
                                ? 'max-h-[2000px] opacity-100'
                                : 'max-h-0 opacity-0'
                                }`}
                        >
                            {/* Items Section */}
                            <div className="py-2">
                                <div
                                    className="flex justify-between items-center p-[11px] cursor-pointer border-[0.53px] border-red-500"
                                    onClick={() => toggleItems(storeId)}
                                >
                                    <span className="text-[13px] font-medium">
                                        Items from this vendor
                                    </span>

                                    <RiArrowDownWideLine
                                        size={18}
                                        className={`transition-transform ${openItems[storeId] ? 'rotate-180' : ''
                                            }`}
                                    />
                                </div>

                                {/* Items Collapse */}
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${openItems[storeId]
                                        ? 'max-h-[1000px] opacity-100'
                                        : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="p-0 bg-white relative mt-2">
                                        <div className="absolute left-5 top-0 bottom-0 w-[0.83px] bg-[#0000004D]"></div>
                                        {vendor.items?.map((item) => (
                                            <div key={item.id} className="relative group">
                                                <div className="absolute left-5 top-[40px] w-6 h-[0.83px] bg-[#0000004D]"></div>
                                                <div className="flex items-center gap-4 py-4">
                                                    <div className="w-8 flex-shrink-0" />
                                                    <img
                                                        src={item?.images[0]?.url}
                                                        alt={item?.name || 'item'}
                                                        className="w-12 h-12 rounded-lg object-cover z-10 border border-gray-100 bg-white"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="text-[13px] font-semibold text-gray-700 leading-tight">{item?.name || ''}</p>
                                                        <p className="text-[13px] text-gray-400 mt-1">Qty: {item?.quantity || 1}</p>
                                                    </div>
                                                </div>
                                                <div className="ml-10 mr-4 border-b border-gray-100/50"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Section */}
                            <div className="space-y-4 p-2 py-4 pb-2">
                                <h3 className="text-sm font-medium">
                                    Available Delivery Locations
                                </h3>

                                {/* Loading (ONLY here) */}
                                {isLoading && (
                                    <div className="space-y-3">
                                        {[1, 2].map((i) => (
                                            <div
                                                key={i}
                                                className="h-[60px] bg-gray-100 rounded-xl animate-pulse"
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Error */}
                                {error && (
                                    <p className="text-red-500 text-sm">
                                        Failed to load delivery options
                                    </p>
                                )}

                                {/* Empty */}
                                {!isLoading && !error && vendorLocations.length === 0 && (
                                    <p className="text-gray-400 text-sm">
                                        No delivery options available
                                    </p>
                                )}

                                {/* Data */}
                                {!isLoading &&
                                    !error &&
                                    vendorLocations.map((loc) => (
                                        <div
                                            key={loc.id}
                                            onClick={() => handleSelect(vendor.storeId, loc)}
                                            className={`cursor-pointer border-2 rounded-xl p-[13px] px-[20px] flex justify-between transition-all duration-300 ${selectedDelivery[vendor.storeId]?.id === loc.id ? 'border-orange' : 'border-gray-100'
                                                }`}
                                        >
                                            <div className="flex gap-4">
                                                <div
                                                    className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedDelivery[vendor.storeId]?.id === loc.id ? 'border-orange' : 'border-gray-300'
                                                        }`}
                                                >
                                                    {selectedDelivery[vendor.storeId]?.id === loc.id && <div className="w-2.5 h-2.5 rounded-full bg-orange" />}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-black text-sm">{loc.shipping_address}</p>
                                                    <p className="text-[13px] text-gray-400">Delivery in {loc.delivery_time} days</p>
                                                </div>
                                            </div>
                                            <span className="font-medium text-black text-[13px] ">{formatCurrency(loc.delivery_fee)}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Bottom Summary / Dots Section */}
                        {isMultiVendor && (
                            <div
                                className='w-full cursor-pointer border-t border-gray-100 mt-2'
                            >
                                {!openVendors[storeId] && selectedDelivery[storeId] &&
                                    <div className="flex justify-between items-center px-1 pt-2">
                                        <div className="space-y-1">
                                            <p className="text-[13px] text-gray-400">Selected Location</p>
                                            <p className="text-[13px] font-medium text-black">{selectedDelivery[storeId]?.address}</p>
                                        </div>
                                        <p className="text-[13px] text-black">{formatCurrency(selectedDelivery[storeId]?.fee)}</p>
                                    </div>
                                }
                                <div
                                    onClick={() => toggleVendor(storeId)} className="flex justify-center pt-3 pb-2 w-full transition-all hover:bg-gray-50/50 text-2xl leading-none">
                                    .....
                                </div>

                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default DeliverySelector;
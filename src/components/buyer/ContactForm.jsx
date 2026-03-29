import React from "react";

const ContactForm = ({ register, errors }) => {
    return (
        <div className="bg-white p-5 rounded-[12px] border-[0.53px] border-gray-200">
            <div className="mb-8">
                <h2 className="text-sm font-medium text-black flex items-center gap-2">
                    Contact Information
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                    We’ll use this to send order updates and receipts
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-y-10">
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                        First Name
                    </label>
                    <input
                        {...register("contact_info.firstName", {
                            required: "Contact name is required",
                        })}
                        className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] text-xs ${errors?.contact_info?.firstName ? "border border-red-500" : "bg-gray-100"
                            }`}
                        placeholder="Afolabi Mubarak"
                    />
                    {errors?.contact_info?.firstName && (
                        <p className="text-red-600 mt-1 text-xs">
                            {errors?.contact_info.firstName.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                        Last Name
                    </label>
                    <input
                        {...register("contact_info.lastName", {
                            required: "Email is required",
                        })}
                        type="text"
                        placeholder="CEO, Manager, Owner etc."
                        className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] text-xs ${errors?.contact_info?.lastName ? "border border-red-500" : "bg-gray-100"
                            }`}
                    />
                    {errors?.contact_info?.lastName && (
                        <p className="text-red-600 mt-1 text-xs">
                            {errors?.contact_info?.lastName.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input
                        {...register("contact_info.email", {
                            required: "Email is required",
                        })}
                        type="email"
                        placeholder="business@gmail.com"
                        className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] text-xs ${errors?.contact_info?.email ? "border border-red-500" : "bg-gray-100"
                            }`}
                    />
                    {errors?.contact_info?.email && (
                        <p className="text-red-600 mt-1 text-xs">
                            {errors?.contact_info?.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <input
                        {...register("contact_info.phone_number", {
                            required: "Phone number is required",
                        })}
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className={`w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#737373] text-xs ${errors?.contact_info?.phone_number
                            ? "border border-red-500"
                            : "bg-gray-100"
                            }`}
                    />
                    {errors?.contact_info?.phone_number && (
                        <p className="text-red-600 mt-1 text-xs">
                            {errors?.contact_info?.phone_number.message}
                        </p>
                    )}
                </div>
            </div>
        </div>

    );
};

export default ContactForm;

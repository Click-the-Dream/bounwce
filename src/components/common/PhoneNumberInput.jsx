import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Phone } from "lucide-react";

const PhoneNumberInput = React.forwardRef(
    ({ value, onChange, error, placeholder, ...rest }, ref) => {
        const validatePhone = (val) => {
            try {
                const phone = parsePhoneNumber(val, "NG");
                return phone.isValid();
            } catch {
                return false;
            }
        };
        return (
            <div className="w-full relative">
                <div
                    className={`flex items-center border ${error ? "border-red-500" : "border-brand-orange"
                        } rounded-full px-4 py-[2px] bg-white transition-all`}
                >
                    {/* Lucide Icon */}
                    <Phone className="text-gray-400 flex-shrink-0 mr-1" size={15} />

                    <PhoneInput
                        country={"ng"}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        inputProps={{
                            ref,
                            name: "phone_number",
                        }}
                        // Standardizing the container
                        containerClass="phone-container"
                        inputClass="phone-input-field"
                        buttonClass="phone-button-style"

                        // Inline overrides to kill default borders
                        containerStyle={{
                            width: "100%",
                            border: "none",
                            background: "transparent",
                        }}
                        inputStyle={{
                            width: "100%",
                            border: "none",
                            background: "transparent",
                            fontSize: "14px",
                            marginLeft: "-10px"
                        }}
                        buttonStyle={{
                            border: "none",
                            background: "transparent",
                            position: "absolute",
                            left: "8px"

                        }}
                        dropdownStyle={{
                            borderRadius: "12px",
                            fontSize: "12px",
                            zIndex: 50,
                            textAlign: "left"
                        }}
                        {...rest}
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-[11px] mt-1 ml-4 font-medium">
                        {error}
                    </p>
                )}

                {/* CSS Fix for the library's internal classes */}
                <style jsx global>{`
          .phone-container .form-control {
            background: transparent !important;
          }
          .phone-container .flag-dropdown {
            border: none !important;
            background: transparent !important;
          }
          .phone-container .selected-flag {
            background: transparent !important;
            padding-left: 0 !important;
          }
          /* Ensure the dial code text is visible and black */
          .phone-container .form-control {
            color: #333 !important;
          }
            .phone-container .country-list {
    opacity: 1;
    transform: translateY(0px);
    transition: all 0.2s ease-in-out;
  }

        `}</style>
            </div>
        );
    }
);

PhoneNumberInput.displayName = "PhoneNumberInput";

export default PhoneNumberInput;
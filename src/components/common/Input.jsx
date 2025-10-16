import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Input = React.forwardRef(
  (
    {
      value,
      onChange,
      icon,
      type = "text",
      placeholder,
      options = [],
      variant = "input",
      error,
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Handle dropdown toggle
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    // Click outside handler
    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle select change
    const handleSelect = (val) => {
      onChange?.({ target: { value: val } });
      setIsOpen(false);
    };

    return (
      <div className="w-full relative" ref={dropdownRef}>
        {/* Input or custom dropdown container */}
        <div
          className={`flex items-center justify-between gap-2 border ${
            error ? "border-red-400" : "border-orange"
          } rounded-[20px] px-3 sm:px-4 text-[clamp(12px,1vw,14px)] py-[10px] bg-white cursor-pointer relative`}
          onClick={() => variant === "select" && handleToggle()}
        >
          {/* Left icon */}
          {icon && <span className="text-gray-400 flex-shrink-0">{icon}</span>}

          {/* Text or input */}
          {variant === "select" ? (
            <div className="flex-1 text-gray-700 truncate">
              {value ? (
                options.find((opt) => opt.value === value)?.label || value
              ) : (
                <span className="text-gray-400">
                  {placeholder || "Select an option"}
                </span>
              )}
            </div>
          ) : (
            <input
              ref={ref}
              type={type}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              className="flex-1 bg-transparent focus:outline-none w-full"
              {...rest}
            />
          )}

          {/* Right arrow */}
          {variant === "select" && (
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-400 flex-shrink-0"
            >
              <ChevronDown size={16} />
            </motion.span>
          )}
        </div>

        {/* Dropdown list */}
        <AnimatePresence>
          {variant === "select" && isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 mt-1 bg-white border border-orange rounded-[16px] shadow-lg overflow-y-auto max-h-40 cursor-pointer z-50"
            >
              {options.map((opt, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(opt.value || opt)}
                  className={`px-4 py-2 text-sm hover:bg-orange/10 transition-colors ${
                    value === opt.value
                      ? "text-orange font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {opt.label || opt}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-[11px] mt-1 ml-2 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

import React, { useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

const Dropdown = ({
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  error,
  icon,
  containerClass = "",
  dropdownClass = "border-orange",
  itemClass = "",
  borderClass = "border-gray-300",
  bgClass = "bg-orange/10",
  radiusClass = "rounded-[20px]",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange?.({ target: { value: val } });
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${containerClass}`}>
      {/* Select Box */}
      <div
        className={`flex items-center justify-between gap-2 border ${radiusClass} px-3 sm:px-4 py-[10px] text-[clamp(12px,1vw,14px)] cursor-pointer transition-all
        ${error ? "border-red-500 focus:ring-red-500" : borderClass}
        ${bgClass}`}
        onClick={handleToggle}
      >
        {icon && <span className="text-gray-400 flex-shrink-0">{icon}</span>}

        <div className="flex-1 text-gray-700 truncate">
          {value ? (
            options.find((opt) => opt.value === value)?.label || value
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400"
        >
          <ChevronDown size={16} />
        </motion.span>
      </div>

      {/* Dropdown List */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-0 right-0 mt-1 bg-white border ${radiusClass} shadow-lg overflow-y-auto max-h-40 cursor-pointer z-50 ${dropdownClass}`}
          >
            {options.map((opt, idx) => {
              const isSelected = value === (opt.value ?? opt);
              return (
                <li
                  key={idx}
                  onClick={() => handleSelect(opt.value ?? opt)}
                  className={`px-4 py-2 text-sm hover:bg-orange/10 transition-colors flex justify-between items-center
                    ${
                      isSelected
                        ? `${bgClass} font-medium text-orange`
                        : "text-gray-700"
                    } ${itemClass}`}
                >
                  <span>{opt.label || opt}</span>
                  {isSelected && (
                    <Check size={16} className="text-orange ml-2" />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-red-500 text-[11px] mt-1 ml-2 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default Dropdown;

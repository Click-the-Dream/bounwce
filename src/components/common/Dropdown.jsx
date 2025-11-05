import { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { useMemo } from "react";

const Dropdown = ({
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  error,
  icon,
  containerClass = "",
  dropdownClass = "border-gray-200",
  itemClass = "",
  borderClass = "border border-gray-300",
  bgClass = "bg-gray-50",
  borderFocusClass = "bg-gray-100 ring-1 ring-[#737373]",
  radiusClass = "rounded-md",
  searchable = false,
  searchPlaceholder = "Search...",
  noResultsText = "No options found",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (newIsOpen && searchable) {
      // Focus search input when dropdown opens and is searchable
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm(""); // Clear search when closing
    }
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange?.({ target: { value: val } });
    setIsOpen(false);
    setIsFocused(false);
    setSearchTerm("");
  };

  const clearSearch = () => {
    setSearchTerm("");
    searchInputRef.current?.focus();
  };

  const filteredOptions = useMemo(() => {
    if (!Array.isArray(options)) return [];
    if (!searchTerm) return options;

    const search = searchTerm.toLowerCase();

    return options.filter((opt) => {
      const label = (opt.label || opt).toString().toLowerCase();
      return label.includes(search);
    });
  }, [options, searchTerm]);

  const selectedOption = value
    ? options.find((opt) => opt.value === value)
    : null;

  return (
    <div ref={dropdownRef} className={`relative w-full ${containerClass}`}>
      {/* Select Box */}
      <div
        tabIndex={0}
        onClick={handleToggle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`flex items-center justify-between gap-2 ${radiusClass} px-3 sm:px-4 py-[10px]
          text-[clamp(12px,1vw,14px)] cursor-pointer transition-all duration-150
          ${error ? "border border-red-500" : borderClass}
          ${isFocused || isOpen ? borderFocusClass : bgClass}`}
      >
        {icon && <span className="text-gray-400 flex-shrink-0">{icon}</span>}

        <div className="flex-1 text-gray-700 truncate">
          {selectedOption ? (
            selectedOption.label || value
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
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-0 right-0 mt-1 bg-white border ${radiusClass} shadow-lg overflow-hidden cursor-pointer z-50 ${dropdownClass}`}
          >
            {/* Search Input */}
            {searchable && (
              <div className={"p-2 border-b border-gray-100"}>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={searchPlaceholder}
                    className={`w-full pl-9 pr-8 py-2 text-sm rounded-md ${borderClass} ${borderFocusClass} focus:outline-none`}
                    onClick={(e) => e.stopPropagation()}
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Options List */}
            <ul className="max-h-40 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt, idx) => {
                  const isSelected = value === (opt.value ?? opt);
                  return (
                    <li
                      key={idx}
                      onClick={() => handleSelect(opt.value ?? opt)}
                      className={`px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex justify-between items-center
                        ${
                          isSelected
                            ? "bg-gray-100 font-medium text-[#737373]"
                            : "text-gray-700"
                        } ${itemClass}`}
                    >
                      <span>{opt.label || opt}</span>
                      {isSelected && (
                        <Check size={16} className="text-[#737373] ml-2" />
                      )}
                    </li>
                  );
                })
              ) : (
                <li className="px-4 py-3 text-sm text-gray-500 text-center">
                  {noResultsText}
                </li>
              )}
            </ul>
          </motion.div>
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

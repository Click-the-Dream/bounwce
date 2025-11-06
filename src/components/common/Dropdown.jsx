import { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Check,
  Search,
  X,
  ExternalLink,
  Loader2,
} from "lucide-react";
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
  enableInternetSearch = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Debounced search function
  useEffect(() => {
    if (!enableInternetSearch || !searchTerm.trim() || !isOpen) {
      setSearchResults([]);
      return;
    }

    const searchInstitutions = async () => {
      setIsSearching(true);
      try {
        // Using a free API for educational institutions
        const response = await fetch(
          `https://corsproxy.io/?http://universities.hipolabs.com/search?name=${encodeURIComponent(
            searchTerm
          )}&limit=5`
        );

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.slice(0, 5)); // Limit to 5 results
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(searchInstitutions, 500); // Debounce 500ms
    return () => clearTimeout(timeoutId);
  }, [searchTerm, enableInternetSearch, isOpen]);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (newIsOpen && searchable) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
        setSearchTerm("");
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    const selectedValue = typeof val === "object" ? val.value : val;

    if (onChange) {
      if (typeof onChange === "function") {
        onChange(selectedValue);
      } else if (onChange.onChange) {
        onChange.onChange(selectedValue);
      } else {
        onChange(selectedValue);
      }
    }

    setIsOpen(false);
    setIsFocused(false);
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleSelectSearchResult = (institution) => {
    handleSelect(institution.name);
  };

  const clearSearch = (e) => {
    e.stopPropagation();
    setSearchTerm("");
    setSearchResults([]);
    searchInputRef.current?.focus();
  };

  const filteredOptions = useMemo(() => {
    if (!Array.isArray(options)) return [];
    if (!searchTerm) return options;

    const search = searchTerm.toLowerCase();
    return options.filter((opt) => {
      if (typeof opt === "string") {
        return opt.toLowerCase().includes(search);
      } else if (typeof opt === "object" && opt.label) {
        return opt.label.toLowerCase().includes(search);
      }
      return String(opt).toLowerCase().includes(search);
    });
  }, [options, searchTerm]);

  const getSelectedLabel = () => {
    if (!value) return null;

    if (typeof value === "string") {
      const found = options.find((opt) =>
        typeof opt === "string" ? opt === value : opt.value === value
      );

      if (found) {
        return typeof found === "object" ? found?.label : found;
      }

      return value;
    }

    return value;
  };

  const selectedLabel = getSelectedLabel();

  const showInternetSearchResults =
    enableInternetSearch &&
    searchTerm.trim() &&
    (searchResults.length > 0 || isSearching);

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
        {...props}
      >
        {icon && <span className="text-gray-400 flex-shrink-0">{icon}</span>}

        <div className="flex-1 text-gray-700 truncate">
          {selectedLabel ? (
            selectedLabel
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
            onClick={(e) => e.stopPropagation()}
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
              {/* Local Options */}
              {filteredOptions.length > 0 && (
                <>
                  {filteredOptions.map((opt, idx) => {
                    const optionValue =
                      typeof opt === "object" ? opt.value : opt;
                    const optionLabel =
                      typeof opt === "object" ? opt.label : opt;
                    const isSelected = value === optionValue;

                    return (
                      <li
                        key={`local-${idx}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(opt);
                        }}
                        className={`px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex justify-between items-center
                          ${
                            isSelected
                              ? "bg-gray-100 font-medium text-[#737373]"
                              : "text-gray-700"
                          } ${itemClass}`}
                      >
                        <span>{optionLabel}</span>
                        {isSelected && (
                          <Check size={16} className="text-[#737373] ml-2" />
                        )}
                      </li>
                    );
                  })}
                </>
              )}

              {/* Internet Search Results */}
              {showInternetSearchResults && (
                <>
                  <li className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-t border-b border-gray-100">
                    SEARCH RESULTS
                  </li>
                  {isSearching ? (
                    <li className="px-4 py-3 text-sm text-gray-500 flex items-center justify-center">
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Searching online...
                    </li>
                  ) : (
                    searchResults.map((institution, idx) => (
                      <li
                        key={`search-${idx}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectSearchResult(institution);
                        }}
                        className={`px-4 py-2 text-sm hover:bg-green-50 transition-colors flex items-center text-green-700 ${itemClass}`}
                      >
                        <ExternalLink
                          size={14}
                          className="mr-2 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium truncate">
                            {institution.name}
                          </div>
                          {institution.country && (
                            <div className="text-xs text-green-600 truncate">
                              {institution.country}
                              {institution.domains &&
                                institution.domains[0] && (
                                  <span> • {institution.domains[0]}</span>
                                )}
                            </div>
                          )}
                        </div>
                      </li>
                    ))
                  )}
                </>
              )}

              {/* No Results */}
              {filteredOptions.length === 0 &&
                !showInternetSearchResults &&
                !isSearching && (
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

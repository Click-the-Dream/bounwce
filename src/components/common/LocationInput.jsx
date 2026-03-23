import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

const LocationInput = ({ value, onChange, placeholder = "Start typing a location...", className = "" }) => {
  const [inputText, setInputText] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const justSelected = useRef(false); // ⚡ Prevent fetch after selection

  // Sync inputText if parent value changes (except when just selected)
  useEffect(() => {
    if (!justSelected.current) {
      setInputText(value || "");
    }
  }, [value]);

  // Fetch suggestions based on inputText
  useEffect(() => {
    if (!inputText || inputText.length < 3) {
      setSuggestions([]);
      return;
    }

    // Skip fetch if we just selected a suggestion
    if (justSelected.current) {
      justSelected.current = false;
      return;
    }

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            inputText
          )}&format=json&addressdetails=1&limit=5`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setSuggestions(data.map((d) => d.display_name));
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [inputText]);

  const handleSelectSuggestion = (address) => {
    justSelected.current = true; // ⚡ Mark selection to skip fetch
    onChange(address);            // notify parent
    setInputText(address);        // update input text
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-md border bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500 text-xs ${className}`}
      />

      {loading && (
        <div className="absolute top-full left-0 w-full bg-white border border-t-0 rounded-b-lg p-2 flex items-center gap-2 text-gray-500 text-sm z-20 shadow-md animate-fade-in">
          <Loader2 className="animate-spin w-4 h-4 text-gray-400" />
          Loading suggestions...
        </div>
      )}

      {suggestions.length > 0 && !loading && (
        <ul className="absolute top-full mt-2 left-0 w-full bg-white border border-t-0 rounded-b-lg max-h-60 overflow-y-auto text-sm z-30 shadow-lg animate-fade-in">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="px-4 py-2 hover:bg-orange/5 hover:text-orange cursor-pointer transition-colors rounded-md"
              onClick={() => handleSelectSuggestion(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.2s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default LocationInput;
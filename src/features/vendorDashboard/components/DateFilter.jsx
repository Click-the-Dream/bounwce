import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  addDays,
  addMonths,
  endOfDay,
  endOfMonth,
  format,
  isAfter,
  isEqual,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
} from "date-fns";

/** Small utility to compose class names */
function cx(...args) {
  return args.filter(Boolean).join(" ");
}

export default function DateFilter({ value, onChange, className }) {
  const today = startOfDay(new Date());

  // --- Presets --------------------------------------------------------------
  const presets = useMemo(() => {
    const yesterday = subDays(today, 1);
    return [
      {
        key: "today",
        label: "Today",
        range: { start: today, end: endOfDay(today) },
      },
      {
        key: "yesterday",
        label: "Yesterday",
        range: { start: startOfDay(yesterday), end: endOfDay(yesterday) },
      },
      {
        key: "last7",
        label: "Last 7 Days",
        range: { start: startOfDay(subDays(today, 6)), end: endOfDay(today) },
      },
      {
        key: "last30",
        label: "Last 30 Days",
        range: { start: startOfDay(subDays(today, 29)), end: endOfDay(today) },
      },
      {
        key: "thisMonth",
        label: "This Month",
        range: {
          start: startOfMonth(today),
          end: endOfDay(endOfMonth(today)),
        },
      },
      { key: "custom", label: "Custom", range: null },
    ];
  }, [today]);

  // --- State ----------------------------------------------------------------
  const [open, setOpen] = useState(false);

  // derive an initial state if the caller didn't provide one
  const [selection, setSelection] = useState(
    value /** default: Today preset */ || { type: "preset", key: "today" }
  );

  // Month shown in the calendar
  const [monthCursor, setMonthCursor] = useState(
    selection?.type === "single" ? selection.date : today
  );

  // if external value changes, sync it
  useEffect(() => {
    if (value) setSelection(value);
  }, [value]);

  // --- Derived display label ------------------------------------------------
  const displayLabel = useMemo(() => {
    if (selection.type === "preset") {
      const p = presets.find((x) => x.key === selection.key);
      return p ? p.label : "Custom";
    }
    if (selection.type === "single") {
      return format(selection.date, "MMMM d, yyyy");
    }
    if (selection.type === "range" && selection.start && selection.end) {
      const s = selection.start;
      const e = selection.end;
      if (format(s, "yyyy") === format(e, "yyyy")) {
        if (format(s, "MMM") === format(e, "MMM")) {
          return `${format(s, "MMM d")} – ${format(e, "d, yyyy")}`;
        }
        return `${format(s, "MMM d")} – ${format(e, "MMM d, yyyy")}`;
      }
      return `${format(s, "MMM d, yyyy")} – ${format(e, "MMM d, yyyy")}`;
    }
    return "Custom";
  }, [selection, presets]);

  // --- Close on outside click / Escape -------------------------------------
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // --- Helpers: calendar grid for the current month ------------------------
  const weeks = useMemo(() => {
    const start = startOfWeek(startOfMonth(monthCursor), { weekStartsOn: 0 }); // Sun
    const days = Array.from({ length: 42 }, (_, i) => addDays(start, i));
    return Array.from({ length: 6 }, (_, w) => days.slice(w * 7, w * 7 + 7));
  }, [monthCursor]);

  // --- NEW: compute active range so presets (Today/Yesterday/…) show on calendar
  const activeRange = useMemo(() => {
    if (selection.type === "preset") {
      const p = presets.find((x) => x.key === selection.key);
      return p?.range ?? null;
    }
    if (selection.type === "single") {
      return {
        start: startOfDay(selection.date),
        end: endOfDay(selection.date),
      };
    }
    if (selection.type === "range" && selection.start && selection.end) {
      return {
        start: startOfDay(selection.start),
        end: endOfDay(selection.end),
      };
    }
    if (selection.type === "range" && selection.start && !selection.end) {
      return {
        start: startOfDay(selection.start),
        end: startOfDay(selection.start),
      };
    }
    return null;
  }, [selection, presets]);

  // --- Selection handlers ---------------------------------------------------
  const applyPreset = (key) => {
    if (key === "custom") {
      setSelection({ type: "range", start: null, end: null });
      setOpen(true);
      return;
    }
    const p = presets.find((x) => x.key === key);
    // jump calendar to the relevant month (so Today/Yesterday are visible)
    if (p?.range?.start) setMonthCursor(p.range.start);

    const next = { type: "preset", key };
    setSelection(next);
    onChange && onChange(next);
    setOpen(false);
  };

  const selectSingleDay = (day) => {
    const next = { type: "single", date: day };
    setSelection(next);
    onChange && onChange(next);
    setOpen(false);
  };

  const selectRangeDay = (day) => {
    // start empty -> set start
    if (selection.type !== "range") {
      setSelection({ type: "range", start: day, end: null });
      return;
    }
    const { start, end } = selection;
    if (!start) {
      setSelection({ type: "range", start: day, end: null });
    } else if (!end && (isAfter(day, start) || isEqual(day, start))) {
      const next = { type: "range", start, end: day };
      setSelection(next);
      onChange && onChange(next);
      setOpen(false);
    } else {
      // restart range
      setSelection({ type: "range", start: day, end: null });
    }
  };

  // Which list item is "selected"?
  const selectedPresetKey = selection.type === "preset" ? selection.key : null;

  // --- Rendering ------------------------------------------------------------
  return (
    <div className={cx("relative inline-block text-sm", className)}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cx(
          "flex justify-between items-center gap-2 rounded-lg border border-gray-200 bg-white min-w-40",
          "px-3 py-1.5 shadow-sm hover:bg-gray-50",
          "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <CalendarIcon className="h-4 w-4" />
        <span className="">{displayLabel}</span>
        <ChevronDownIcon className="h-3.5 w-3.5" />
      </button>

      {/* Popover */}
      {open && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label="Date filter"
          className={cx(
            // --- Responsive container: centered on mobile, aligned under trigger on ≥sm
            "absolute z-50 mt-2 transform  md:left-0 md:translate-x-0",
            "w-[calc(100vw-5rem)] lg:w-[640px] max-w-lg",
            "rounded-lg border border-gray-200 bg-white shadow-xl"
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr]">
            {/* Left: presets */}
            <div className="p-2">
              {presets.map((p) => {
                const selected = selectedPresetKey === p.key;
                return (
                  <button
                    key={p.key}
                    type="button"
                    className={cx(
                      "group flex w-full items-center justify-between rounded-md px-3 py-2",
                      selected ? "bg-gray-50" : "hover:bg-gray-50"
                    )}
                    onClick={() => applyPreset(p.key)}
                  >
                    <div className="flex items-center gap-2 text-gray-800">
                      {p.key === "custom" ? (
                        <TuneIcon className="h-4 w-4 text-gray-500" />
                      ) : (
                        <span className="inline-block h-4 w-4" />
                      )}
                      <span>{p.label}</span>
                    </div>
                    {selected && (
                      <CheckIcon className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: calendar */}
            <div className="border-t border-gray-200 p-3 md:border-t-0 md:border-l">
              {/* Calendar header */}
              <div className="mb-2 flex items-center justify-between">
                <button
                  className="rounded-md p-1.5 hover:bg-gray-100"
                  onClick={() => setMonthCursor((d) => subMonths(d, 1))}
                  aria-label="Previous month"
                >
                  <ChevronLeftIcon className="h-4 w-4 text-gray-700" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="rounded-md border border-gray-200 px-2 py-1 text-gray-800">
                    {format(monthCursor, "MMM")}
                  </span>
                  <span className="rounded-md border border-gray-200 px-2 py-1 text-gray-800">
                    {format(monthCursor, "yyyy")}
                  </span>
                </div>
                <button
                  className="rounded-md p-1.5 hover:bg-gray-100"
                  onClick={() => setMonthCursor((d) => addMonths(d, 1))}
                  aria-label="Next month"
                >
                  <ChevronRightIcon className="h-4 w-4 text-gray-700" />
                </button>
              </div>

              {/* Weekday labels */}
              <div className="grid grid-cols-7 px-1 text-center text-xs text-gray-500">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1 px-1">
                {weeks.flat().map((day) => {
                  const inMonth = isSameMonth(day, monthCursor);

                  // Use activeRange so presets show up on the calendar
                  const isRangeStart =
                    activeRange?.start && isSameDay(activeRange.start, day);
                  const isRangeEnd =
                    activeRange?.end && isSameDay(activeRange.end, day);
                  const isInRange =
                    activeRange &&
                    activeRange.start &&
                    activeRange.end &&
                    isWithinInterval(day, {
                      start: activeRange.start,
                      end: activeRange.end,
                    });

                  const isSelected = isRangeStart || isRangeEnd;
                  const isRangeMiddle = isInRange && !isSelected;

                  const dayClasses = cx(
                    "relative flex h-9 w-9 items-center justify-center rounded-full text-sm",
                    inMonth ? "text-gray-800" : "text-gray-400",
                    !isSelected &&
                      !isRangeMiddle &&
                      "hover:bg-gray-100 focus:outline-none",
                    isSelected && "bg-rose-500 text-white",
                    isRangeMiddle && "bg-rose-50 text-rose-700"
                  );

                  const handleClick =
                    selection.type === "range"
                      ? selectRangeDay
                      : selectSingleDay;

                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => handleClick(day)}
                      className={dayClasses}
                      aria-label={format(day, "PPP")}
                    >
                      <span>{format(day, "d")}</span>
                      {/* Soft rectangular background for the span between start & end */}
                      {isRangeMiddle && (
                        <span className="pointer-events-none absolute inset-0 -z-10 rounded-md bg-rose-50" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------- Icons (inline SVG) --------------------------- */

function CalendarIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.06 1.06l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.29a.75.75 0 01.02-1.08z" />
    </svg>
  );
}

function ChevronLeftIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.78 15.53a.75.75 0 01-1.06 0L6.97 10.78a.75.75 0 010-1.06l4.75-4.75a.75.75 0 111.06 1.06L8.56 10l4.22 4.22a.75.75 0 010 1.06z" />
    </svg>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7.22 4.47a.75.75 0 011.06 0l4.75 4.75a.75.75 0 010 1.06l-4.75 4.75a.75.75 0 11-1.06-1.06L11.44 10 7.22 5.78a.75.75 0 010-1.06z" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.704 5.29a1 1 0 010 1.41l-7.01 7.01a1 1 0 01-1.42 0l-3-3a1 1 0 111.42-1.42l2.29 2.3 6.3-6.3a1 1 0 011.42 0z" />
    </svg>
  );
}

function TuneIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 7h10M14 7v6M20 17H10M10 17V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

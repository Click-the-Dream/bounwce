import { format } from "date-fns";

export const mapDateFilter = (selection) => {
    if (!selection) {
        return { date_range: "yesterday"}
    }

    if (selection.type === "preset") {
        switch (selection.key) {
            case "today":
                return {date_range: "today"};
            case "yesterday": 
                return {date_range: "yesterday"};
            case "last7": 
                return {date_range: "last_7_days"};
            case "last30": 
                return {date_range: "last_30_days"};
            case "thisMonth": 
                return {date_range: "this_month"};
            default:
                return {date_range: selection.key}
        }
    }

    if (selection.type === "range" && selection.start && selection.end) {
        const startDate = format(selection.start, "yyyy-MM-dd");
        const endDate = format(selection.end, "yyyy-MM-dd");

        return {
            date_range: "custom",
            start_date: startDate,
            end_date: endDate
        }
    }

    if (selection.type === "single" && selection.date) {
        const date = format(selection.date, "yyyy-MM-dd")

        return {
            date_range: "custom",
            start_date: date,
            end_date: date
        }
    }
    
    return {};
}

export const getComparisonLabel = (selection) => {
    if (!selection || selection.type !== "preset") {
        return "from yesterday"
    }

    switch (selection.key) {
        case "yesterday":
        case "today":
            return "from previous day";
        case "last7":
            return "from previous week"; 
        case "last30":
            return "from previous period"; 
        case "thisMonth":
            return "from previous month";
        default:
            return "from previous period"; 
    }
}
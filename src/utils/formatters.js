import { vendors } from "./dummies";

export const extractErrorMessage = (error) => {
  try {
    // 1. Dig into the response data (where FastAPI's detail lives)
    const resData = error?.response?.data;

    if (resData) {
      // Handle the specific structure: { detail: { message: "..." } }
      if (resData.detail?.message) {
        return resData.detail.message;
      }

      // Handle FastAPI Validation Errors: { detail: [{ loc: [...], msg: "..." }] }
      if (Array.isArray(resData.detail)) {
        return resData.detail
          .map((d) => {
            const field = Array.isArray(d.loc)
              ? d.loc[d.loc.length - 1]
              : d.loc || "";
            const formattedField = field
              .toString()
              .replace(/_/g, " ")
              .replace(/^\w/, (c) => c.toUpperCase());
            const cleanMsg = d.msg
              ?.replace("Field required", "is required")
              .trim();
            return formattedField ? `${formattedField} ${cleanMsg}` : cleanMsg;
          })
          .join(" | ");
      }

      // Handle simple string detail: { detail: "Error message" }
      if (typeof resData.detail === "string") {
        return resData.detail;
      }

      // Handle direct message or error keys: { message: "..." }
      if (resData.message && typeof resData.message === "string")
        return resData.message;
      if (resData.error && typeof resData.error === "string")
        return resData.error;
    }

    // 2. If no response data, check for standard Axios error messages
    if (error?.message) {
      if (error.message.includes("network error"))
        return "Network error. Please check your connection.";
      if (error.message.includes("timeout"))
        return "Request timed out. Please try again.";
      return error.message;
    }

    return "An unknown error occurred";
  } catch (err) {
    console.error("Error parsing message:", err);
    return "Something went wrong while processing the error.";
  }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export const formStepVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
};

// Progress bar steps
export const steps = [
  { number: 1, title: "Account Created", desc: "Welcome to our platform" },
  { number: 2, title: "Store Setup", desc: "Store details & verification" },
  { number: 3, title: "Getting Started", desc: "Branding & first products" },
  { number: 4, title: "Complete", desc: "Ready to start selling" },
];

export const storedUserEmail = (email) => {
  if (email) {
    localStorage.setItem("register_email", email);
  } else {
    return localStorage.getItem("register_email");
  }
};

export const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay },
  },
});

export const statusStyles = {
  Processing: "bg-yellow-100 text-yellow-700",
  "Ready for Shipment": "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Completed: "bg-[#F0FDF4] text-[#38C066]",
};

export const formatCurrency = (amount) => `₦${amount.toLocaleString("en-NG")}`;

export const getVendor = (vendorId) => vendors.find((v) => v.id === vendorId);

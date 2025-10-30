export const extractErrorMessage = (error) => {
  const getString = (data) => {
    if (!data) return "";
    if (typeof data === "string") return data;
    if (Array.isArray(data)) return data.map(getString).join(", ");
    if (typeof data === "object") return JSON.stringify(data);
    return String(data);
  };

  try {
    // ✅ FastAPI / Pydantic validation errors
    if (Array.isArray(error?.response?.data?.detail)) {
      const details = error.response.data.detail.map((d) => {
        // Extract field name from "loc" array, e.g. ["body", "type"] → "type"
        const field = Array.isArray(d.loc)
          ? d.loc[d.loc.length - 1]
          : d.loc || "field";

        // Capitalize field name
        const formattedField = field
          .replace(/_/g, " ")
          .replace(/^\w/, (c) => c.toUpperCase());

        // Format message like "Type: Field required" → "Type field is required"
        const msg =
          d.msg
            ?.replace("Field required", "field is required")
            ?.replace("string", "text")
            ?.trim() || "Invalid input";

        return `${formattedField} ${msg}`;
      });

      return details.join(" | ");
    }

    // ✅ Handle direct detail string
    if (error?.response?.data?.detail) {
      return getString(error.response.data.detail);
    }

    // ✅ Handle message and error fields
    if (error?.response?.data?.message) {
      return getString(error.response.data.message);
    }

    if (error?.response?.data?.error) {
      return getString(error.response.data.error);
    }

    if (error?.response?.error) {
      return getString(error.response.error);
    }

    // ✅ Fallback
    return getString(error?.message || "An unknown error occurred");
  } catch (err) {
    console.error("Error parsing error message:", err);
    return "An unexpected error occurred while processing the error message.";
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

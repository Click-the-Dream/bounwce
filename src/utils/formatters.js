export const extractErrorMessage = (error) => {
  const getString = (data) => {
    return typeof data === "string" ? data : JSON.stringify(data);
  };

  if (error?.response?.data?.message) {
    return getString(error.response.data.message);
  }

  if (error?.response?.data?.error) {
    return getString(error.response.data.error);
  }

  if (error?.response?.error) {
    return getString(error.response.error);
  }

  return getString(error?.message || "An unknown error occurred");
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

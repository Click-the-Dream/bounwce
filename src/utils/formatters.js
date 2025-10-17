import { desc } from "framer-motion/client";

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

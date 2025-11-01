import React from "react";

const Button = ({
  variant = "primary",
  onClick,
  text,
  isLoading = false,
  disabled = false,
  type = "button",
}) => {
  const styles = {
    primary:
      "w-full max-w-[368px] bg-orange text-white rounded-[16px] hover:bg-orange/90 transition-colors",
    primarySmaller:
      "w-full max-w-[178px] bg-orange text-white rounded-[16px] hover:bg-orange/90 transition-colors",
    secondary:
      "text-black w-full max-w-[178px] bg-[#ECECF033] rounded-[16px] hover:bg-gray-100 transition-colors",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${
        styles[variant] || styles.primary
      } px-2 py-3 text-[12px] mx-auto flex items-center justify-center gap-2 ${
        disabled || isLoading ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {isLoading && (
        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {isLoading ? "Please wait..." : text}
    </button>
  );
};

export default Button;

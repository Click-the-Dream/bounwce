import React from "react";

const Button = ({ variant = "primary", onClick, text }) => {
  const styles = {
    primary: "w-full max-w-[368px] bg-orange text-white rounded-[16px]",
    primarySmaller: "w-full max-w-[178px] bg-orange text-white rounded-[16px]",
    secondary: "text-black w-full max-w-[178px] bg-[#ECECF033] rounded-[16px]",
  };
  return (
    <button
      className={`${
        styles[variant] || styles.primary
      } px-2 py-2 text-[12px] mx-auto`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

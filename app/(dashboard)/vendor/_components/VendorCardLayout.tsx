import React from "react";

const VendorCardLayout = ({
  title,
  handleClick,
  buttonText,
  children,
}: any) => {
  return (
    <section className="border-[0.83px] border-[#0000001A] rounded-[12.75px] p-5 w-full bg-white h-60">
      {/* reusable header structure */}
      <div className="flex justify-between items-center gap-2 mb-5">
        <p className="text-[11px]">{title}</p>
        <button
          className="border-[0.53px] border-[#0000001A] p-1 rounded-[7px] font-bold text-[10px]"
          onClick={handleClick}
        >
          {buttonText}
        </button>
      </div>

      {/* unique content area */}
      <div>{children}</div>
    </section>
  );
};

export default VendorCardLayout;

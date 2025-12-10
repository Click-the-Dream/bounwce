import React from "react";
import Logo from "./common/Logo";
function Fallback() {
  return (
    <main className="w-full h-screen bg-gradient-to-br from-orange/20 to-white flex flex-col justify-center items-center space-y-8">
      {/* Brand Text */}
      <div className="text-center space-y-3">
        <Logo size="text-4xl md:text-5xl" />
        <p className="text-ash text-sm md:text-base font-medium">
          Grow. Connect. Build.
        </p>
      </div>

      {/* Custom CSS Loader with your brand colors */}
      <div className="relative flex items-center justify-center">
        {/* Outer pulsing circle */}
        <div className="absolute w-20 h-20 border-4 border-orange/20 rounded-full animate-ping"></div>
        {/* Main spinner */}
        <div className="w-16 h-16 border-4 border-lighter-ash border-t-orange rounded-full animate-spin"></div>
      </div>

      {/* Loading dots */}
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-orange rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-orange rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-2 bg-orange rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>

      <p className="text-ash text-sm font-medium">Loading your community...</p>
    </main>
  );
}

export default Fallback;

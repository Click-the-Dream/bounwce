import React from "react";
import { motion } from "framer-motion";
import Logo from "../pages/Landing/components/Logo";

function Fallback() {
  return (
    <main className="w-full h-screen bg-gradient-to-br from-orange/10 via-white/50 to-white relative overflow-hidden flex flex-col justify-center items-center">
      {/* --- Abstract background shapes --- */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-orange/5 blur-3xl top-[-50px] left-[-50px]" />
      <div className="absolute w-[200px] h-[200px] rounded-full bg-red-200/10 blur-2xl bottom-[-40px] right-[-40px]" />

      {/* --- Loader container with smooth scale/fade --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center space-y-6 z-10"
      >
        {/* --- Logo & tagline --- */}
        <div className="text-center flex flex-col items-center space-y-2">
          <Logo size={100} className="drop-shadow-xl" />
          <p className="text-gray-500 text-base md:text-lg font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-orange to-red-400">
            Grow. Connect. Build.
          </p>
        </div>

        {/* --- Layered pulsing/spinning loader --- */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute w-32 h-32 border-4 border-orange/20 rounded-full animate-ping-slow"></div>
          <div className="absolute w-24 h-24 border-4 border-red-300/50 rounded-full animate-ping-slower"></div>
          <div className="w-16 h-16 border-4 border-lighter-ash border-t-orange rounded-full animate-spin"></div>
        </div>

        {/* --- Animated loading dots --- */}
        <div className="flex space-x-2 mt-4">
          {[0, 0.15, 0.3].map((delay, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-orange rounded-full"
              style={{
                animation: `loadingWave 0.8s ease-in-out ${delay}s infinite alternate`,
              }}
            ></div>
          ))}
        </div>

        <p className="text-gray-500 text-sm font-medium mt-2">
          Loading your community...
        </p>
      </motion.div>

      {/* --- Custom keyframes for loading dots --- */}
      <style jsx>{`
        @keyframes loadingWave {
          0% { transform: scale(0.8); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.4; }
        }
      `}</style>
    </main>
  );
}

export default Fallback;
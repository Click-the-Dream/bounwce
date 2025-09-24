
import React, { useState } from "react";

// LandingPage with 3D-looking rectangles and interactive hover effects
// - Buttons and rectangles have hover states that add depth (scale, translateZ-like effect simulated with translateY and shadow)
// - Container uses perspective so transforms look 3D

export default function LandingPage() {
  const [hoveredRect, setHoveredRect] = useState(null);

  // scaled container (kept from previous step)
  const containerStyle = {
    width: "400px",
    height: "430px",
    position: "relative",
    opacity: 1,
    transformStyle: "preserve-3d",
  };

  const rectBase = (top, left, borderRadiusProp) => ({
    width: "190px",
    height: "190px",
    top,
    left,
    position: "absolute",
    zIndex: 1,
    borderWidth: "6px",
    background: "#9CA3AF", // tailwind gray-400 hex
    borderColor: "rgba(107,114,128,0.6)",
    borderStyle: "solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    transition: "transform 300ms cubic-bezier(.2,.9,.2,1), box-shadow 200ms, filter 200ms",
    transformOrigin: "50% 50%",
    borderBottomLeftRadius: borderRadiusProp?.bottomLeft || 0,
    borderTopLeftRadius: borderRadiusProp?.topLeft || 0,
    borderTopRightRadius: borderRadiusProp?.topRight || 0,
    borderBottomRightRadius: borderRadiusProp?.bottomRight || 0,
    boxShadow: "0 12px 30px rgba(2,6,23,0.25)",
  });

  // circle style (behind the rectangles)
  const circleStyle = {
    width: "180px",
    height: "180px",
    top: "130px",
    left: "110px",
    background: "#C1CEE8",
    boxShadow: "0px 7.58px 15.15px 0px rgba(0,0,0,0.25)",
    borderRadius: "50%",
    position: "absolute",
    zIndex: 0,
    transition: "transform 300ms ease, opacity 300ms",
  };

  // helper to compute hovered transform
  function getRectTransform(id, baseTransform) {
    if (hoveredRect === id) {
      // bring forward: slight upward translate, slight scale, and stronger shadow
      return {
        transform: baseTransform + " translateY(-12px) scale(1.04)",
        boxShadow: "0 30px 60px rgba(2,6,23,0.45)",
        filter: "brightness(1.02)",
      };
    }
    return {
      transform: baseTransform,
      boxShadow: "0 12px 30px rgba(2,6,23,0.25)",
      filter: "none",
    };
  }

  return (
    <div className="w-full h-screen bg-gray-50 flex items-center justify-between px-12 relative">
      {/* Container for rectangles + circle (with perspective for 3D feel) */}
      <div style={{ ...containerStyle }} className="relative" aria-hidden>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", perspective: "1200px" }}>
          {/* Circle behind */}
          <div style={circleStyle} />

          {/* Rectangles (4) */}
          {/* Top-left */}
          {(() => {
            const baseLeft = "0px";
            const baseTop = "25px";
            const baseTransform = "translate(0, 0)"; // base placeholder
            const style = rectBase(baseTop, baseLeft, { topLeft: "60px" });
            const hoverStyles = getRectTransform(1, baseTransform);
            return (
              <div
                onMouseEnter={() => setHoveredRect(1)}
                onMouseLeave={() => setHoveredRect(null)}
                style={{ ...style, ...hoverStyles }}
              >
                1
              </div>
            );
          })()}

          {/* Top-right */}
          {(() => {
            const baseLeft = "200px";
            const baseTop = "0px";
            const baseTransform = "translate(0, 0)";
            const style = rectBase(baseTop, baseLeft, { topRight: "60px" });
            const hoverStyles = getRectTransform(2, baseTransform);
            return (
              <div
                onMouseEnter={() => setHoveredRect(2)}
                onMouseLeave={() => setHoveredRect(null)}
                style={{ ...style, ...hoverStyles }}
              >
                2
              </div>
            );
          })()}

          {/* Bottom-left */}
          {(() => {
            const baseLeft = "0px";
            const baseTop = "230px";
            const baseTransform = "translate(0, 0)";
            const style = rectBase(baseTop, baseLeft, { bottomLeft: "60px" });
            const hoverStyles = getRectTransform(3, baseTransform);
            return (
              <div
                onMouseEnter={() => setHoveredRect(3)}
                onMouseLeave={() => setHoveredRect(null)}
                style={{ ...style, ...hoverStyles }}
              >
                3
              </div>
            );
          })()}

          {/* Bottom-right */}
          {(() => {
            const baseLeft = "200px";
            const baseTop = "200px";
            const baseTransform = "translate(0, 0)";
            const style = rectBase(baseTop, baseLeft, { bottomRight: "60px" });
            const hoverStyles = getRectTransform(4, baseTransform);
            return (
              <div
                onMouseEnter={() => setHoveredRect(4)}
                onMouseLeave={() => setHoveredRect(null)}
                style={{ ...style, ...hoverStyles }}
              >
                4
              </div>
            );
          })()}
        </div>
      </div>

      {/* Right side UI: text + interactive buttons */}
      <div className="absolute" style={{ top: "83px", left: "741px", width: "599px", height: "288px" }}>
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "48px",
            lineHeight: "72px",
            color: "#000000",
          }}
        >
          Empower Your Academic Journey, Where Minds Unite and Innovate
        </p>
      </div>

      {/* GET STARTED - small button with hover 3D effect */}
      <button
        type="button"
        className="absolute flex items-center justify-center rounded shadow cursor-pointer bg-gray-300 text-black transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
        style={{
          width: "182px",
          height: "44px",
          top: "419px",
          left: "741px",
          fontFamily: "Open Sans, sans-serif",
          fontWeight: 700,
          fontSize: "19px",
          lineHeight: "100%",
        }}
      >
        GET STARTED
      </button>

      {/* CREATE ACCOUNT */}
      <button
        type="button"
        className="absolute flex items-center justify-center bg-gray-300 text-black rounded-full shadow cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
        style={{
          width: "350px",
          height: "50px",
          top: "495px",
          left: "741px",
          borderRadius: "30px",
          fontFamily: "Open Sans, sans-serif",
          fontWeight: 600,
          fontSize: "20px",
        }}
      >
        Create Account
      </button>

      {/* OR */}
      <div
        className="absolute text-gray-600"
        style={{ top: "560px", left: "910px", fontFamily: "Open Sans, sans-serif", fontWeight: 500, fontSize: "16px" }}
      >
        OR
      </div>

      {/* CONTINUE WITH GOOGLE */}
      <button
        type="button"
        className="absolute flex items-center justify-center bg-gray-300 text-black rounded-full shadow cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
        style={{
          width: "350px",
          height: "50px",
          top: "607px",
          left: "741px",
          borderRadius: "30px",
          fontFamily: "Open Sans, sans-serif",
          fontWeight: 600,
          fontSize: "20px",
        }}
      >
        Continue with Google
      </button>

      {/* ALREADY HAVE AN ACCOUNT */}
      <div
        className="absolute text-black"
        style={{
          width: "256px",
          height: "27px",
          top: "702px",
          left: "741px",
          fontFamily: "Open Sans, sans-serif",
          fontWeight: 700,
          fontSize: "20px",
          lineHeight: "100%",
        }}
      >
        Already have an account?
      </div>

      {/* SIGN IN */}
      <button
        type="button"
        className="absolute flex items-center justify-center bg-gray-300 text-black rounded-full shadow cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
        style={{
          width: "350px",
          height: "50px",
          top: "744px",
          left: "741px",
          borderRadius: "30px",
          fontFamily: "Open Sans, sans-serif",
          fontWeight: 600,
          fontSize: "20px",
        }}
      >
        Sign In
      </button>
    </div>
  );
}

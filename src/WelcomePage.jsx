// src/BackgroundSplit.jsx
import React, { useState } from "react";
import createpicImg from "./assets/createpic.jpg";
import Input from "./components/Input";

export default function WelcomePage() {
  const [mode, setMode] = useState("create");

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    username: "",
    institution: "",
    role: "customer",
  });

  const [loginForm, setLoginForm] = useState({
    identifier: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Form submitted! Check console for data.");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", loginForm);
    alert("Login submitted! Check console for data.");
  };

  return (
    <div className="flex  h-screen w-full overflow-hidden">
      {/* LEFT IMAGE */}
      <div className=" relative w-1/2">
        <img
          src={createpicImg}
          alt="Create"
          className="w-full h-full object-cover absolute inset-0"
          style={{ clipPath: "polygon(0 0, 0 0, 100% 0, 0 400%)" }}
        />
      </div>

      {/* RIGHT WHITE FORM */}
      <div className="flex-1 bg-white flex justify-center w-full md:w-1/2">
        <div className="flex flex-col items-center gap-6  md:mt-[120px] px-4 md:px-0">
          {/* Heading */}
          {mode === "create" ? (
            <div className="text-[#FF4B2B] font-poppins font-medium text-[28.67px]">
              Create Account
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-[#FF4B2B] font-poppins font-medium text-[28.67px]">
                Welcome Back
              </div>
              <p
                className="mt-1 text-[10px] text-[#545454] text-center"
                style={{
                  width: "205px",
                  height: "15px",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontStyle: "Medium",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                Enter your email to access your account
              </p>
            </div>
          )}

          {/* Toggle */}
          <div className="w-full max-w-[368px] h-[46px] border border-[#C0C0C0] rounded-[20px] flex p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-[20px] ${
                mode === "login" ? "bg-[#FF4B2B] text-white" : "text-black"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("create")}
              className={`flex-1 rounded-[20px] ${
                mode === "create" ? "bg-[#FF4B2B] text-white" : "text-black"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* FORM */}
          {mode === "create" ? (
            <form className="w-full max-w-[368px] flex flex-col gap-2" onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full h-[46px] border-[1px] border-[#FF4B2B] rounded-[20px] px-3 py-2 opacity-100"
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full h-[46px] border-[1px] border-[#FF4B2B] rounded-[20px] px-3 py-2 opacity-100"
              />
              <Input
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full h-[46px] border-[1px] border-[#FF4B2B] rounded-[20px] px-3 py-2 opacity-100"
              />

              {/* Institution Dropdown */}
              <div className="w-full h-[46px] opacity-100">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                </label>
                <select
                  name="institution"
                  value={form.institution}
                  onChange={handleChange}
                  className="w-full h-[46px] px-3 py-2 border-[1px] border-[#FF4B2B] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#FF4B2B] opacity-100"
                >
                  <option value="">Select your institution</option>
                  <option value="Olabisi Onabanjo University">Olabisi Onabanjo University</option>
                  <option value="University of Lagos">University of Lagos</option>
                  <option value="Obafemi Awolowo University">Obafemi Awolowo University</option>
                  <option value="Covenant University">Covenant University</option>
                  <option value="University of Ibadan">University of Ibadan</option>
                </select>
              </div>

              {/* Role Dropdown */}
              <div className="w-full h-[46px] opacity-100">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full h-[46px] px-3 py-2 border-[1px] border-[#FF4B2B] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#FF4B2B] opacity-100"
                >
                  <option value="customer">Sign up as a Vendor</option>
                  <option value="vendor">Sign up as a Customer</option>
                </select>
              </div>

              <p
                className="w-full max-w-[340px] h-[15px] text-center opacity-100 mt-[30px]"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontStyle: "Medium",
                  fontSize: "10px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>

              <button
                type="submit"
                className="w-full max-w-[368px] h-[46px] bg-[#FF4B2B] text-white font-medium rounded-[20px] hover:scale-105 transition opacity-100 mt-[30px]"
              >
                Create Account
              </button>
            </form>
          ) : (
            <form className="w-full max-w-[368px] flex flex-col gap-2" onSubmit={handleLoginSubmit}>
              <Input
                label="Email or Username"
                name="identifier"
                value={loginForm.identifier}
                onChange={handleLoginChange}
                placeholder="you@example.com"
                className="w-full h-[46px] border-[1px] border-[#FF4B2B] rounded-[20px] px-3 py-2 opacity-100"
              />

              <button
                type="submit"
                className="w-full h-[46px] bg-[#FF4B2B] text-white font-medium rounded-[20px] hover:scale-105 transition opacity-100 mt-[30px]"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

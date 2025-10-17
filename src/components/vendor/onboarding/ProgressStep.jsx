import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { itemVariants, steps } from "../../../utils/formatters";
import { LuCircleCheckBig } from "react-icons/lu";

const ProgressStep = ({ currentStep }) => {
  return (
    <motion.div
      className="mb-8 bg-white p-6 rounded-xl border border-gray-200"
      variants={itemVariants}
    >
      <div className="flex flex-col justify-between items-center mb-4">
        {/* progress count */}
        <div className="w-full flex items-center gap-2 justify-between mb-4">
          <h3 className="text-sm font-medium ">Setup Progress</h3>
          <div
            className={`blobk md:hidden flex-1 h-[2px] mx-2 bg-gray-300 transition-colors duration-300`}
          ></div>
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep} of {steps.length}
          </span>
        </div>
        {/* progress width */}
        <div className="w-full bg-gray-400/80 rounded-full h-2 hidden md:block">
          <div
            className="bg-green-600 h-2 rounded transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between gap-1 text-center items-stretch overflow-x-auto">
        {steps.map((step) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              {currentStep <= step.number ? (
                <div
                  className={`w-6 h-6 rounded-full font-medium flex items-center border-2 justify-center ${
                    currentStep > step.number
                      ? "border-green-500 text-white"
                      : currentStep === step.number
                      ? "border-black bg-black text-white"
                      : "border-gray-500 text-gray-200"
                  } transition-colors duration-300`}
                >
                  {currentStep === step.number && step.number}
                </div>
              ) : (
                <LuCircleCheckBig className="w-6 h-6 text-green-500" />
              )}
              <span
                className={`${
                  currentStep < step.number ? "text-gray-300" : "text-[#0A0A0A]"
                } text-xs mt-2 text-gray-300`}
              >
                {step.title}
              </span>
              <span className="text-[10px] mt-1 text-gray-400 hidden md:block">
                {step.desc}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default ProgressStep;

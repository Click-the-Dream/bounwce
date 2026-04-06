"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react"; // Or any icon library you use
import BouwnceDemo from "./BouwnceDemo";
const STEPS = [
  {
    id: 1,
    title: "Find Your People",
    description:
      "Want to go out, hit the gym, attend an event, or just not be bored? Just type it, Bouwnce connects you with people that share your vibe, interests, or plans.",
  },
  {
    id: 2,
    title: "See What’s Happening",
    description:
      "Discover things you can actually do right now: Places to visit, Events to attend and opportunities that suit your interest.",
  },
  {
    id: 3,
    title: "Get What You Need",
    description:
      "Looking for food, accessories, services, or something to buy, Bouwnce shows you the right vendors for you when you need them.",
  },
  {
    id: 4,
    title: "Make It Happen",
    description:
      "Chat, plan, link up, buy, show up. Everything flows in one place, from thoughts to results.",
  },
];

const INTERVAL_TIME = 4000;

const AboutSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % STEPS.length) + 1);
    }, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.section
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      className="relative flex flex-col items-center bg-white transition-colors duration-300 overflow-hidden"
    >
      <div className="grid grid-cols-1 xl:grid-cols-2 items-center min-h-250 max-w-250">
        <div className="flex flex-col max-w-125.5 justify-center space-y-12 bg-[#F9F9F9] h-full p-10 border-l-[0.53px] border-r-[0.53px] border-dashed border-[#BDBDBD]">
          <header className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xl lg:text-[24px] font-bold leading-[1.05] tracking-tight text-black"
            >
              Bouwnce brings your world together, people, places, and resources.
            </motion.h2>
            <p className="text-sm text-[#949494] font-medium">
              You type it. Bouwnce find it. A person, a vendor, or an
              experience, and Bouwnce connect you to exactly that.
            </p>
          </header>

          <div className="relative flex flex-col">
            {STEPS.map((step, index) => {
              const isActive = activeStep === step.id;
              const isLast = index === STEPS.length - 1;
              const isCompleted = activeStep > step.id;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className="relative flex gap-6 cursor-pointer min-h-32.5 group"
                >
                  {/* The Line Logic */}
                  {!isLast && (
                    <div className="absolute left-[13.5px] top-8 bottom-0 w-px bg-[#E5E5E5]">
                      {/* This is the "Filling" Progress Bar */}
                      {isActive && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "100%" }}
                          transition={{
                            duration: INTERVAL_TIME / 1000,
                            ease: "linear",
                          }}
                          className="w-full bg-[#FF4B2B]"
                        />
                      )}
                      {isCompleted && (
                        <div className="absolute inset-0 bg-[#FF4B2B]" />
                      )}
                    </div>
                  )}

                  {/* The Number Circle */}
                  <div className="relative z-10 shrink-0 pt-1">
                    <motion.div
                      initial={false}
                      animate={{
                        backgroundColor:
                          isActive || isCompleted ? "#FF4B2B" : "#C9C9C9",
                        scale: isActive ? 1.1 : 1,
                      }}
                      className="w-7 h-7 flex items-center justify-center text-xs font-bold shadow-sm transition-colors"
                    >
                      <AnimatePresence mode="wait">
                        {isCompleted ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                          >
                            <Check size={14} strokeWidth={3} color="white" />
                          </motion.div>
                        ) : (
                          <motion.span
                            key="number"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ color: isActive ? "#fff" : "#949494" }}
                          >
                            {step.id}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* The Content */}
                  <div className="flex-1 pb-10">
                    <motion.h3
                      className={`text-sm tracking-tight text-black ${isActive ? "font-bold" : "font-medium"}`}
                    >
                      {step.title}
                    </motion.h3>

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 5 }}
                          className="text-[13px] leading-relaxed max-w-87.5 whitespace-pre-line mt-2 text-[#949494]"
                        >
                          {step.description}
                        </motion.p>
                      )}
                      {!isActive && (
                        <p className="text-[13px] leading-relaxed max-w-87.5 mt-2 text-[#949494] opacity-40">
                          {step.description.split("\n")[0]}...
                        </p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: The Phone Mockup */}
        <section className="h-full w-full max-w-125.5 flex justify-center items-center border-r-[0.53px] border-[#BDBDBD] border-dashed p-3 md:p-5">
          <div className="p-4 md:p-6 rounded-[40px] bg-[#F7F7F7] w-full h-137.5 shadow-inner">
            <BouwnceDemo />
          </div>
        </section>
      </div>
    </motion.section>
  );
};

export default AboutSection;

/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { CiKeyboard } from "react-icons/ci";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import useAuth from "../../hooks/useAuth";
import { storedUserEmail } from "../../utils/formatters";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const VerifyAccount = () => {
  const { verifyOtp, requestOtp } = useAuth();
  const userEmail = storedUserEmail();

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const otpRef = useRef(null);

  // 🧭 Prevent reloads or accidental exits while timer is running
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (timer > 0) {
        e.preventDefault();
        e.returnValue =
          "You can’t leave this page while the verification timer is running.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [timer]);

  // 🎯 Autofocus OTP field
  useEffect(() => {
    if (userEmail && otpRef.current) otpRef.current.focus();
  }, [userEmail]);

  // ⏱️ Start countdown once
  useEffect(() => {
    if (!userEmail) return;
    if (timer === 0) setTimer(30);
  }, [userEmail]);

  // 🔁 Decrease timer every second
  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleVerify = async () => {
    if (!otp) return;
    setIsLoading(true);
    try {
      await verifyOtp.mutateAsync({ email: userEmail, code: otp });
    } catch (err) {
      console.error("Verification failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!userEmail) return;
    try {
      await requestOtp.mutateAsync(
        { email: userEmail },
        {
          onSuccess: () => setTimer(30),
        }
      );
    } catch (err) {
      console.error("Failed to resend OTP:", err);
    }
  };

  if (!userEmail) {
    return (
      <motion.div
        className="h-screen flex items-center justify-center text-center text-gray-600"
        initial="hidden"
        animate="show"
        variants={fadeInUp}
      >
        <p>No email found. Please sign up or log in again.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full flex flex-col justify-center items-center mx-auto gap-3 flex-1 px-4 py-8 h-screen"
      initial="hidden"
      animate="show"
      variants={fadeInUp}
    >
      <motion.h1
        className="text-orange text-[clamp(20px,2vw,28px)] font-semibold mb-3"
        variants={fadeInUp}
      >
        Verify Account
      </motion.h1>

      <motion.p
        className="text-[clamp(10px,1vw,12px)] mt-[-15px] mb-[15px]"
        variants={fadeInUp}
      >
        Enter the OTP sent to your email
      </motion.p>

      <motion.div
        className="space-y-5 w-full max-w-[368px]"
        variants={fadeInUp}
      >
        <Input
          type="email"
          value={userEmail}
          placeholder="Enter your email"
          disabled
          icon={<MdOutlineMail size={18} className="text-gray-400" />}
        />

        <Input
          ref={otpRef}
          placeholder="6 digit OTP code"
          type="number"
          icon={<CiKeyboard size={18} className="text-gray-400" />}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </motion.div>

      <motion.div
        className="w-full max-w-[368px] mt-5 space-y-3"
        variants={fadeInUp}
      >
        <Button
          text={isLoading ? "Verifying..." : "Continue"}
          disabled={isLoading || !otp}
          onClick={handleVerify}
        />

        <div className="text-center text-sm text-gray-500">
          {timer > 0 ? (
            <p>
              Didn’t receive code?{" "}
              <span className="text-orange font-medium">
                Resend in {timer}s
              </span>
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              disabled={requestOtp.isPending}
              className="text-orange font-semibold hover:underline disabled:opacity-50"
            >
              {requestOtp.isPending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VerifyAccount;

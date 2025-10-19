// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { MdOutlineMail } from "react-icons/md";
import { CiKeyboard } from "react-icons/ci";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const VerifyAccount = () => {
  const location = useLocation();
  const { verifyOtp, requestOtp } = useAuth();
  const formData = location.state?.data;
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  // Countdown effect
  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      await verifyOtp.mutateAsync({ email: formData?.email, otp });
      // navigate("/dashboard"); // after successful verification
    } catch (err) {
      console.error("Verification failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await requestOtp.mutateAsync({ email: formData?.email });
      setTimer(60); // restart countdown
    } catch (err) {
      console.error("Failed to resend OTP", err);
    }
  };

  return (
    <motion.div
      className="w-full flex flex-col justify-center items-center mx-auto gap-3 flex-1 px-4 sm:px-6 md:px-10 lg:px-12 py-8 h-screen"
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
          value={formData?.email || ""}
          placeholder="Enter your email"
          disabled
          icon={<MdOutlineMail size={18} className="text-gray-400" />}
        />
        <Input
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

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { MdOutlineMail } from "react-icons/md";
import { CiKeyboard } from "react-icons/ci";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const VerifyAccount = () => {
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
        Enter your email to access your account
      </motion.p>

      <motion.div
        className="space-y-5 w-full max-w-[368px]"
        variants={fadeInUp}
      >
        <Input
          placeholder="xxxxxxxx@gmail.com"
          type="email"
          icon={<MdOutlineMail size={18} className="text-gray-400" />}
        />
        <Input
          placeholder="6 digit OTP code"
          type="number"
          icon={<CiKeyboard size={18} className="text-gray-400" />}
        />
      </motion.div>

      <motion.div className="w-full max-w-[368px] mt-5" variants={fadeInUp}>
        <Button text="Continue" />
      </motion.div>
    </motion.div>
  );
};

export default VerifyAccount;

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Logo = ({ size = "text-4xl block lg:hidden" }) => {
  return (
    <motion.div
      className={` font-extrabold tracking-tight bg-gradient-to-r from-orange via-yellow-400 to-amber-400 bg-clip-text text-transparent mb-3 mx-auto w-max ${size}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      bouwnce
    </motion.div>
  );
};

export default Logo;

import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      className="block lg:hidden font-extrabold text-4xl tracking-tight bg-gradient-to-r from-orange via-yellow-400 to-amber-400 bg-clip-text text-transparent mb-3 mx-auto w-max"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      bouwnce
    </motion.div>
  );
};

export default Logo;

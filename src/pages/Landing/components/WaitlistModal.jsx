import { motion, AnimatePresence } from "framer-motion";
import { LuX } from "react-icons/lu";
import { useModal } from "../context/ModalContext"; 
import WaitlistForm from "./WaitlistForm"; 
import { CiLock } from "react-icons/ci";

const WaitlistModal = () => {
  const { isModalOpen, closeModal } = useModal();

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-0">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-[6px] cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            // ADDED: dark:bg-neutral-900 and transition-colors
            className="relative w-full max-w-md bg-[#EDE7DE] dark:bg-neutral-900 rounded-xl shadow-2xl p-6 md:p-8 z-10 border-t-[6px] border-brand-orange transition-colors duration-300"
          >
            
            <button
              onClick={closeModal}
              // ADDED: dark:text-gray-400, dark:bg-white/5, dark:hover:bg-white/10
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors p-1.5 rounded-full"
            >
              <LuX size={18} />
            </button>

            <div className="mb-6">
              <p className="text-brand-orange text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-4 h-[2px] bg-brand-orange"></span> JOIN THE WAITLIST
              </p>
              {/* ADDED: dark:text-gray-400 */}
              <p className="text-[#8C857B] dark:text-gray-400 text-[13px] font-medium mt-1 transition-colors duration-300">
                Be first in when we launch and get early access.
              </p>
            </div>

            {/* Form Wrapper */}
            <div className="w-full">
              <WaitlistForm />
            </div>

            {/* Bottom Lock Footer */}
            {/* ADDED: dark:text-gray-500 */}
            <div className="mt-5 flex justify-center items-center gap-1.5 text-[9px] text-[#A69E93] dark:text-gray-500 font-medium transition-colors duration-300">
              <span className="text-brand-orange"><CiLock /></span> Bouwnce. Get Access.
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
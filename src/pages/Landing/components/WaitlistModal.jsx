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
            className="relative w-full max-w-md bg-[#EDE7DE] rounded-xl shadow-2xl p-6 md:p-8 z-10 border-t-[6px] border-brand-orange"
          >
            
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 bg-black/5 hover:bg-black/10 transition-colors p-1.5 rounded-full"
            >
              <LuX size={18} />
            </button>

            <div className="mb-6">
              <p className="text-brand-orange text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-4 h-[2px] bg-brand-orange"></span> JOIN THE WAITLIST
              </p>
              <p className="text-[#8C857B] text-[13px] font-medium mt-1">
                Be first in when we launch and get early access.
              </p>
            </div>

            {/* Form Wrapper */}
            <div className="w-full">
              <WaitlistForm />
            </div>

            {/* Bottom Lock Footer */}
            <div className="mt-5 flex justify-center items-center gap-1.5 text-[9px] text-[#A69E93] font-medium">
              <span className="text-brand-orange"><CiLock /></span> Bouwnce. Get Access.
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
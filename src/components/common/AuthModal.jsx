import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../pages/Landing/components/Logo";

const AuthModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
                >
                    {/* Click outside to close */}
                    <div
                        className="absolute inset-0"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 30 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="relative z-10 w-[92%] max-w-md rounded-2xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                        >
                            <X size={18} />
                        </button>

                        {/* Content */}
                        <div className="flex flex-col items-center text-center">

                            {/* Logo + Icon */}
                            <div className="mb-5 flex flex-col items-center gap-3">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-transparent">
                                    <Logo onlyImage={true} size={60} />
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                                Sign in to continue
                            </h2>

                            {/* Description */}
                            <p className="mt-2 mb-7 text-sm leading-relaxed text-gray-500 max-w-sm">
                                Access your account to manage your cart, follow vendors, and enjoy a seamless personalized experience.
                            </p>

                            {/* Actions */}
                            <div className="w-full space-y-3">
                                <button
                                    onClick={() => navigate("/login")}
                                    className="w-full rounded-xl bg-black py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-900 active:scale-[0.97]"
                                >
                                    Log In
                                </button>

                                <button
                                    onClick={() => navigate("/register")}
                                    className="w-full rounded-xl border border-gray-200 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.97]"
                                >
                                    Create Account
                                </button>
                            </div>

                            {/* Footer */}
                            <p className="mt-6 text-xs text-gray-400">
                                By continuing, you agree to our Terms of Service & Privacy Policy.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
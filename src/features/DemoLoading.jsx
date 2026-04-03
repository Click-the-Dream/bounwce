import { motion } from "framer-motion";

const DemoLoading = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="flex items-center justify-center h-full w-full"
    >
        <div className="relative flex items-center justify-center md:w-64 md:h-64 w-40 h-40">
            {/* Outer Soft Ring */}
            <div className="absolute inset-0 rounded-full border-[20px] border-gray-50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] opacity-50" />

            {/* Animated Progress Segments */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-[20px] border-transparent border-t-gray-200 border-b-gray-200"
                style={{ filter: 'blur(1px)' }}
            />

            {/* Inner "Depth" Ring */}
            <div className="md:w-40 md:h-40 w-32 h-32 rounded-full bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] flex items-center justify-center">
                {/* Hand cursor icon goes here or stays absolute to the parent */}
            </div>
        </div>
    </motion.div>
);

export default DemoLoading;
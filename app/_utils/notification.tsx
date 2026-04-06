import { toast } from "react-toastify";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";
import { motion } from "framer-motion";

const BaseToast = ({
  icon: Icon,
  iconColor,
  bgColor,
  borderColor,
  shadowColor,
  title,
  message,
}: any) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className={`flex items-center gap-4 p-4 min-w-70 bg-linear-to-r ${bgColor} shadow-2xl rounded-2xl border ${borderColor} hover:shadow-${shadowColor}`}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Icon className={`${iconColor} text-3xl`} />
    </motion.div>

    <div className="flex flex-col">
      <strong className="text-gray-900 font-semibold text-sm capitalize">
        {title}
      </strong>
      {message && <p className="text-gray-600 text-xs mt-1">{message}</p>}
    </div>
  </motion.div>
);

// --- Exported Helper Functions ---

export const onFailure = (error: { title: any; message: any }) => {
  toast(
    <BaseToast
      icon={MdCancel}
      iconColor="text-red-600"
      bgColor="from-red-100 to-red-50"
      borderColor="border-red-300"
      shadowColor="red-400/40"
      title={error?.title || "Error"}
      message={error?.message}
    />,
  );
};

export const onSuccess = (success: { title: any; message: any }) => {
  toast(
    <BaseToast
      icon={MdCheckCircle}
      iconColor="text-green-600"
      bgColor="from-green-200 to-green-50"
      borderColor="border-green-300"
      shadowColor="green-400/40"
      title={success?.title || "Success"}
      message={success?.message}
    />,
  );
};

export const onPrompt = ({
  title = "Prompt",
  message,
}: {
  title: string;
  message: string;
}) => {
  toast(
    <BaseToast
      icon={IoInformationCircle}
      iconColor="text-gray-600"
      bgColor="from-gray-100 to-gray-50"
      borderColor="border-gray-300"
      shadowColor="gray-400/30"
      title={title}
      message={message}
    />,
  );
};

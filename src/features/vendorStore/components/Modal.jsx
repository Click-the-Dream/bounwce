import { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ open, onClose, children, widthClass = "max-w-5xl" }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className={`w-full ${widthClass} max-h-[90vh] bg-white rounded-xl shadow-xl overflow-auto`}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

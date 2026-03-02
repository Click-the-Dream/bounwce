
const Button = ({
  onClick,
  text,
  isLoading = false,
  disabled = false,
  type = "button",
}) => {

  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full max-w-[368px] bg-brand-orange text-white rounded-full hover:bg-orange/90 transition-colors px-2 py-3 text-[12px] mx-auto flex items-center justify-center gap-2 "
        
    >
      {isLoading && (
        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {isLoading ? "Please wait..." : text}
    </button>
  );
};

export default Button;

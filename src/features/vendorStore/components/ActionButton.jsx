const ActionButton = ({label, icon: Icon, onClick, className, type, disabled, value}) => {    
  return (
    <button 
        className={`w-full px-4 py-2 font-medium text-gray-700 border border-gray-300 rounded-md flex items-center justify-center space-x-2 ${className || ""}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
        value={value}
    >
        <Icon size={15} className="hidden md:block"/>
        <span className="text-[10px] md:text-[13px] md:whitespace-nowrap">{label}</span>
    </button>
  )
}

export default ActionButton
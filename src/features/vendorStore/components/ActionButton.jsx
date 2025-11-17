const ActionButton = ({label, icon: Icon, onClick, className}) => {    
  return (
    <button 
        className={` px-4 py-2 font-medium text-gray-700 border border-gray-300 rounded-md flex items-center space-x-2 ${className || ""}`}
        onClick={onClick}
    >
        <Icon size={15} className="hidden md:block"/>
        <span className="text-[10px] md:text-[13px] md:whitespace-nowrap">{label}</span>
    </button>
  )
}

export default ActionButton
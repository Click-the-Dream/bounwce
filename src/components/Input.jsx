import React from 'react'


const Input = ({value, onChange, icon, type, placeholder}) => {
  return (
    <div className="flex gap-3 items-center w-[368px] h-[46px] border-[1px] border-orange rounded-[20px] px-[10px]">
        {icon}
        <input 
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full h-full focus:outline-none"
        /> 
    </div>
    
  )
}

export default Input
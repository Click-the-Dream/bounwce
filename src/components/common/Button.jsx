import React from 'react'

const Button = ({variant = "primary", onClick, text}) => {
    const styles = { 
        primary: "w-[368px] bg-orange text-white rounded-[16px]",
        primarySmaller: "w-[178px] bg-orange text-white rounded-[16px]",        
        secondary: "text-black w-[178px] bg-lighter-ash rounded-[16px]"
    }
  return (    
    <button 
        className={`${styles[variant] || styles.primary} px-2 py-2 text-[12px]`}
        onClick={onClick}
    >
        {text}
    </button>    
  )
}

export default Button
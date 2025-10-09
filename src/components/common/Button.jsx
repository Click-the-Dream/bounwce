import React from 'react'

const Button = ({variant = "primary", onClick, text}) => {
    const styles = { 
        primary: "w-[368px] h-[46px] bg-orange text-white rounded-[16px]",
        primarySmaller: "w-[178px] h-[38px] bg-orange text-white rounded-[16px]",        
        secondary: "text-black w-[178px] h-[38px] bg-lighter-ash rounded-[16px]"
    }
  return (    
    <button 
        className={`${styles[variant] || styles.primary}`}
        onClick={onClick}
    >
        {text}
    </button>    
  )
}

export default Button
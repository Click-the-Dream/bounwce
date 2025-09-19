import React from 'react'

const Button = ({variant = "primary", onClick}) => {
    const style = { 
        primary: "w-[178px] h-[38px] bg-orange text-white rounded-[16px]"
    }
  return (
    <div>
        <button 
            className={`${style[variant]}`}
            onClick={onClick}
        >
            Create Account
        </button>
    </div>
  )
}

export default Button
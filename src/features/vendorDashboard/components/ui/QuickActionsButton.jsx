import React from 'react'

const QuickActionsButton = ({icon: Icon, onClick, label}) => {
  
  return (
    <button
      onClick={onClick}
      className='border-[1px] rounded-[12.75px] text-[12px] px-8 py-3 flex flex-col items-center'
    >
      <Icon />
      {label}
    </button>
  )
}

export default QuickActionsButton
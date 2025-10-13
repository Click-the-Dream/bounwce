import React from 'react'

const Input = ({
  value,
  onChange,
  icon,
  type = 'text',
  placeholder,
  options = [],
  variant = 'input',
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 border border-orange rounded-[20px] px-3 sm:px-4 text-[clamp(12px,1vw,14px)] py-2  bg-white relative z-10">
        {icon && <span className="text-orange">{icon}</span>}

        {variant === 'select' ? (
          <select
            value={value}
            onChange={onChange}
            className="flex-1 bg-transparent focus:outline-none cursor-pointer appearance-none z-20"
          >
            <option value="" disabled>
              {placeholder || 'Select an option'}
            </option>
            {options.map((opt, idx) => (
              <option key={idx} value={opt.value || opt}>
                {opt.label || opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="flex-1 bg-transparent focus:outline-none"
          />
        )}
      </div>
    </div>
  )
}

export default Input

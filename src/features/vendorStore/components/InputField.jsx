import React from 'react'

const InputField = React.forwardRef(({label, type, placeholder, error, options = [], ...rest}, ref) => {
    const baseClasses = "focus:outline-none focus:ring-0 w-full p-2 bg-[#F3F3F5] rounded-[6.75px] mt-1 text-[12px]"
    const renderField = () => {
        if(type === "text") {  
            return (
                <input 
                    id={rest.name}
                    type={type}
                    ref={ref}
                    {...rest}
                    placeholder={placeholder}
                    className={`${baseClasses}`}
                /> 
            )             
        }

        if(type === "textarea") {
            return (
                <textarea 
                    id={rest.name}
                    ref={ref}
                    {...rest}
                    placeholder={placeholder}
                    className={`${baseClasses}`}
                />
            )            
        }

        if(type === "select") {
            return (
                <select
                    id={rest.name}
                    ref={ref}
                    placeholder={placeholder}
                    className={`${baseClasses}`}
                    {...rest}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {
                        options.map((option) => (
                            <option value={option.value} key={option.value}>{option.label}</option>
                        ))
                    }                
                </select>
            )           
        }
    }
  return (
    <div>
        <label className='text-[13px]'>
            {label}
        </label>

        {
           renderField()
        }
        {error && <p className='text-[10px] mb-2 text-red-700'>{error.message}</p>}
    </div>
  )
})

export default InputField
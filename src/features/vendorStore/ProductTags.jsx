import { useFormContext, useFieldArray } from 'react-hook-form'
import InputField from './components/InputField'
import { useState } from 'react';
import { IoMdAdd } from "react-icons/io";

const ProductTags = () => {
  const [ inputTag, setInputTag] = useState("");
  const { control } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: "tags",
  });

  const handleAddTag = () => {
    if(!inputTag.trim()) return;
    append({ value: inputTag.trim() })
    setInputTag("");
  }
  
  return (
    <div className="bg-white rounded-[10px] p-5">
        <h1 className="text-[14px]">Tags (Optional)</h1>
        <p className="text-[13px] text-[#717182] mb-4">Add tags to help customers find your product</p>

        <div className='w-full flex items-center gap-2 mb-2'>
          <div className='flex-1'>
            <InputField 
              type={"text"}
              placeholder={"Enter Tags"}
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
            />
          </div>

          <button
            type='button'
            onClick={handleAddTag}
            className='border-[1px] border-[#0000001A] rounded-[6.75px] p-2'
          >
            <IoMdAdd />
          </button>

          
        </div>

        <div className='flex gap-3'>
            {
              fields.map((tag, index) => (
                <div 
                  key={index}
                  className='text-[12px] text-[#717182]'
                >
                  <span>{`#${tag.value}`}</span>
                </div>
              ))
            }
          </div>
    </div>
  )
}

export default ProductTags
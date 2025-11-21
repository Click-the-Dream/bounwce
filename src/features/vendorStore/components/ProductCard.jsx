import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";

const ProductCard = ({stockAmount, status}) => {
  return (
    <div className="w-full">
        <div className="">
            <img 
                alt='product-image'
                height={250}
                className='bg-[#ECECF0] h-[250px]'
            />
        </div>

        <div className='border-[1px] border-[#00000036] px-5 py-7 rounded-br-[12.75px] rounded-bl-[12.75px]'>
            <div className='space-y-3 mb-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='uppercase text-[12px] font-medium'>Acid wash t-shirt</h1>
                    <p className='bg-[#38C066] text-white rounded-[9px] px-[13px] py-[2px] text-[9px] font-bold'>{status}</p>
                </div>

                <p className='text-[#000000] text-[11px]'>Description of product and the size</p>
                <p className='text-[11px] flex justify-between'>
                    <span className='font-medium'>Category:</span>
                    <span>Sports</span>
                </p>
                <p className='text-[11px] flex justify-between'>
                    <span className='font-medium'>Price:</span>
                    <span>25,000</span>
                </p>
                <p className='text-[11px] flex justify-between'>
                    <span className='font-medium'>Stock:</span>
                    <span>{stockAmount}</span>
                </p>
            </div>
            <div className='flex gap-2 justify-between flex-wrap'>
                <div className='flex gap-3'>
                    <button className='text-[10px] font-semibold border-[1px] rounded-[6.75px] border-[#00000036] px-2 py-1 flex gap-1 items-center'>
                        <TbEdit />
                        Edit
                    </button>

                    <button className='text-[10px] font-semibold border-[1px] rounded-[6.75px] border-[#00000036] px-2 py-1'>
                        Unpublish
                    </button> 
                </div>           

                <button className='text-[10px] font-semibold border-[1px] rounded-[6.75px] border-[#00000036] px-2 py-1'>
                    <RiDeleteBin6Line />
                </button>
            </div>
        </div>        
    </div>
  )
}

export default ProductCard
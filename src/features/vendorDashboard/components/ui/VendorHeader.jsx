import { TbHome } from "react-icons/tb";
import { LuStore } from "react-icons/lu";
import { FaArrowUpRightFromSquare } from "react-icons/fa6"
import { RiNotification3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import userImage from '../../../../assets/createpic.jpg'

const VendorHeader = () => {
  return (
    <header className='bg-white shadow px-[1rem] md:px-[3rem] lg:px-[140px] 2xl:px-[175px] py-5 flex justify-between gap-2'>
        <div className='flex gap-3 items-center'>
            <div>
                <img 
                    src={userImage}
                    alt='user_image'
                    className='w-[35px] aspect-square rounded-full object-cover'
                />
            </div>

            <div className='hidden md:block'>
                <div className='flex gap-1 items-center'>
                    <TbHome />
                    <p className='text-[10px]'><span>Origami Store</span> - Dashboard</p> 
                </div>
                <p className='text-[9px]'>Here is what's happening with your store</p>
            </div>
        </div>

        <div className='flex gap-2'>
            <button className='flex items-center gap-2 py-[6px] px-[11px] border-[2px] rounded-md'>
                <LuStore size={15}/>
                <p className='text-[12px] hidden md:block'>View Store</p>
                <FaArrowUpRightFromSquare size={12} className='hidden md:block'/>
            </button>

            <button className='relative border-[2px] py-[6px] px-[12px] flex items-center rounded-md'>
                <RiNotification3Line />
                <p className='absolute top-[-10px] right-[-3px] px-[5px] py-[3px] bg-red-600 text-[8px] text-white rounded-full w-[15px] h-[15px] aspect-square'>9</p>
            </button>

            <button className='border-[2px] py-[6px] px-[12px] flex items-center rounded-md'>
                <IoSettingsOutline />
            </button>
        </div>
    </header>
  )
}

export default VendorHeader
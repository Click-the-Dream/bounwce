import Input from '../../components/common/Input'
// import { MdOutlineMail } from "react-icons/md";
// import { CiKeyboard } from "react-icons/ci";
import Button from '../../components/common/Button'

const VerifyAccount = () => {
  return (
     <div className='w-full flex flex-col justify-center items-center mx-auto gap-3 flex-1 px-4 sm:px-6 md:px-10 lg:px-12 py-8'>
        <h1 className='text-orange text-[clamp(20px,2vw,28px)] font-semi-bold mb-3'>Verify Account</h1>
        <p className="text-[clamp(10px,1vw,12px)] mt-[-15px] mb-[15px]">Enter your email to access your account</p>

        <div className='space-y-5 w-full max-w-[368px]'>
            <div>
                <Input placeholder={"xxxxxxxx@gmail.com"} type={"email"} />
            </div>
           
            <div>
                <Input placeholder={"6 digit OTP code"} type={"number"} />   
            </div>            
        </div>

        <div className='w-full max-w-[368px] mt-5'>
            <Button text={"Continue"}/>
        </div>       
    </div>
  )
}

export default VerifyAccount
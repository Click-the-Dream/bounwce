import Input from '../../components/common/Input'
import { MdOutlineMail } from "react-icons/md";
import { CiKeyboard } from "react-icons/ci";
import Button from '../../components/common/Button'

const VerifyAccount = () => {
  return (
     <div className="h-screen flex flex-col justify-center items-center mx-auto gap-4">
        <h1 className="text-orange text-3xl font-semi-bold">Verify Account</h1>
        <p>Enter your email to access your account</p>

        <div className="space-y-5 mt-8">
            <div>
                <Input placeholder={"xxxxxxxx@gmail.com"} type={"email"} icon={<MdOutlineMail className=""/>}/>
            </div>
           
            <div>
                <Input placeholder={"6 digit OTP code"} type={"number"} icon={<CiKeyboard className=""/>}/>   
            </div>            
        </div>

        <div className='mt-6'>
            <Button text={"Continue"}/>
        </div>       
    </div>
  )
}

export default VerifyAccount
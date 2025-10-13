import Input from '../../components/common/Input'

import Button from '../../components/common/Button'
import { Link } from 'react-router'

const LoginPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center mx-auto gap-4">
        <h1 className="text-orange text-3xl font-semi-bold">Welcome Back</h1>
        <p>Enter your email to access your account</p>

        <div className="space-y-5 mt-8">
            <div>
                <Input placeholder={"xxxxxxxx@gmail.com"} type={"email"} />
            </div>
           
            <div>
                <Input placeholder={"6 digit OTP code"} type={"number"} />   
            </div>            
        </div>

        <div className='mt-6'>
            <Button text={"Continue"}/>
        </div>

       <div className='flex flex-row justify-center items-center gap-4'>
            <hr className='w-[10rem] border-[1px]'/>
            <p className='text-orange'>Or</p>
            <hr className='w-[10rem] border-[1px]'/>
       </div>

        <div>
            <Link to="/">
              <Button text={"Create Account"} />
            </Link>
        </div>
    </div>
  )
}

export default LoginPage
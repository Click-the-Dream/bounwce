import React from 'react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { Link } from 'react-router-dom'

const VerifyLogin = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center mx-auto gap-3 flex-1 px-4 sm:px-6 md:px-10 lg:px-12 py-8'>
        <div className='text-center'>
            <h1 className='text-orange text-[clamp(20px,2vw,28px)] font-semi-bold mb-3'>
                Welcome Back
            </h1>

            <p className="text-[clamp(10px,1vw,12px)] mt-[-15px] mb-[15px]">Enter your email to access your account</p>
        </div>

        <div className='space-y-5 w-full max-w-[368px]'>
            <Input 
                value={"jdjieoeb@gmail.com"}
            />
            <Input 
                placeholder={"6 digit OTP code"} 
                type={"number"} 
            />  
        </div>

        <div className='space-y-4 mt-10 w-full max-w-[368px]'>
            <div>
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
    </div>
  )
}

export default VerifyLogin
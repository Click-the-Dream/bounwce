import React, { useState } from 'react'
import Button from '../../components/common/Button'
import { useSelector, useDispatch} from 'react-redux';
import { useLocation, useNavigate, Outlet } from "react-router";
import createPicImg from '../../assets/createpic.jpg'
import CreateAccount from './CreateAccount';

const CreateAccountPage = () => {    
    const location = useLocation();
    const navigate = useNavigate();

    const isLogin = location.pathname === "/login";
    const isCreateAccount = location.pathname === "/createAccount";   
    
  return (
    <div className='flex gap-2 h-screen'>

        {/* welcome image section */}
        <div className='relative w-[55%] h-full overflow-hidden'>
            <img 
                src={createPicImg} 
                alt='create-pic-image' 
                className='w-full h-full object-cover [clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]'
            />
            <div className='absolute bg-black/20 inset-0 [clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]'/>
        </div>

        {/* Onboarding section (create account or login)*/}
        <div className="h-screen w-[45%] flex flex-col justify-center items-center mx-auto gap-3">
            <h1 className='text-orange text-[28px] font-semi-bold'>{isCreateAccount ? "Create Account" : "Welcome Back"}</h1>
            {isLogin && <p className="text-[10px] mt-[-15px] mb-[15px]">Enter your email to access your account</p>}

            <div className='flex justify-evenly items-center w-[368px] h-[41px] rounded-[20px] bg-lighter-ash border-[#C0C0C0] border-[1px] mb-5'>
                <Button variant={isLogin ? "primarySmaller" : "secondary"} text={"Login"} onClick={() => navigate("/login")}/>
                <Button variant={isCreateAccount ? "primarySmaller" : "secondary"} text={"Create Account"} onClick={() => navigate("/createAccount")}/>                
            </div>

            <Outlet />
        </div>
    </div>
    
  )
}

export default CreateAccountPage
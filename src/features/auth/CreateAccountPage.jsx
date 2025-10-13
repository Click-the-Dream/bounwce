import React, { useState } from 'react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { useSelector, useDispatch} from 'react-redux';
import { useLocation, useNavigate, Link } from "react-router";
import createPicImg from '../../assets/createpic.jpg'

import {
    setName,
    setEmail,
    setUsername,
    setInstitution,
    setVendor,
} from '../../store/authSlice'

const CreateAccountPage = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { name, email, username, institution, vendor } = useSelector( (state) => state.account);
    const handleSubmit = () => {
        navigate('/login')
    }    
    
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

        {/* create account section */}
        <div className="h-screen w-[45%] flex flex-col justify-center items-center mx-auto gap-3">
            <h1 className='text-orange text-2xl font-semi-bold'>Create Account</h1>

            <div className='flex justify-evenly items-center w-[368px] h-[41px] rounded-[20px] bg-lighter-ash border-[#C0C0C0] border-[1px]'>
                <Link to="/login">
                    <Button variant='secondary' text={"Login"} />
                </Link>
                
                <Button variant='primarySmaller' text={"Create Account"}/>
            </div>

            <form className="space-y-3 mt-2">
                <Input 
                    type={"name"}
                    placeholder={"Full name"}
                    // icon={<CiUser />}
                    value={name}
                    onChange={(e) => dispatch(setName(e.target.value))}
                /> 

                <Input 
                    type={"email"}
                    placeholder={"Email Address"}
                    // icon={<MdOutlineMailOutline />}
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                /> 

                <Input 
                    type={"name"}
                    placeholder={"Username"}
                    // icon={<CiAt />}
                    value={username}
                    onChange={(e) => dispatch(setUsername(e.target.value))}
                /> 

                <Input
                    variant='select' 
                    placeholder={"Institution"}
                    value={institution}
                    // icon={<TbSchool />}
                    options = {[
                        {label: "Olabisi Onabanjo University", value: "Olabisi Onabanjo University"},
                        {label: "University of Ibadan", value: "University of Ibadan"},
                    ]}
                    onChange={(e) => dispatch(setInstitution(e.target.value))}
                />

                <Input 
                    variant='select'
                    placeholder={"Are you a vendor"}
                    // icon={<TbUser />}
                    value={vendor}
                    options = {[
                        {label: "Yes", value: "no"},
                        {label: "No", value: "no"},
                    ]}
                    onChange={(e) => dispatch(setVendor(e.target.value))}
                />
            </form>

            <p className='text-[10px]'>By signing up, you agree to our <a href='#'>terms of service</a> and <a href='#'>privacy policy</a></p>

            <Button text={"Create Account"} onClick={handleSubmit}/>
        </div>
    </div>
    
  )
}

export default CreateAccountPage
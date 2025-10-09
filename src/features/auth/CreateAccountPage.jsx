import React, { useState } from 'react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { CiUser, CiAt } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbSchool, TbUser } from "react-icons/tb";
import { useSelector, useDispatch } from 'react-redux';
import {
    setName,
    setEmail,
    setUsername,
    setInstitution,
    setVendor,
} from '../../store/authSlice'

const CreateAccountPage = () => {
    const dispatch = useDispatch();
    const { name, email, username, institution, vendor } = useSelector( (state) => state.account);
    const handleSubmit = () => {

    }   
    
  return (
    <div className="h-screen flex flex-col justify-center items-center mx-auto gap-3">
        <h1 className='text-orange text-3xl font-semi-bold'>Create Account</h1>

        <div className='flex justify-evenly items-center w-[368px] h-[46px] rounded-[20px] bg-lighter-ash border-[#C0C0C0] border-[1px]'>
            <Button variant='secondary'  text={"Login"}/>
            <Button variant='primarySmaller'  text={"Create Account"}/>
        </div>

        <form className="space-y-5 mt-3">
            <Input 
                type={"name"}
                placeholder={"Full name"}
                icon={<CiUser />}
                value={name}
                onChange={(e) => dispatch(setName(e.target.value))}
            /> 

            <Input 
                type={"email"}
                placeholder={"Email Address"}
                icon={<MdOutlineMailOutline />}
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
            /> 

            <Input 
                type={"name"}
                placeholder={"Username"}
                icon={<CiAt />}
                value={username}
                onChange={(e) => dispatch(setUsername(e.target.value))}
            /> 

            <Input
                variant='select' 
                placeholder={"Institution"}
                value={institution}
                icon={<TbSchool />}
                options = {[
                    {label: "Olabisi Onabanjo University", value: "Olabisi Onabanjo University"},
                    {label: "University of Ibadan", value: "University of Ibadan"},
                ]}
                onChange={(e) => dispatch(setInstitution(e.target.value))}
            />

            <Input 
                variant='select'
                placeholder={"Are you a vendor"}
                icon={<TbUser />}
                value={vendor}
                options = {[
                    {label: "Yes", value: "no"},
                    {label: "No", value: "no"},
                ]}
                onChange={(e) => dispatch(setVendor(e.target.value))}
            />
        </form>

        <p className='text-sm'>By signing up, you agree to our <a href='#'>terms of service</a> and <a href='#'>privacy policy</a></p>

        <Button text={"Create Account"} onClick={handleSubmit}/>
    </div>
  )
}

export default CreateAccountPage
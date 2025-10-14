import React from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { useLocation, useNavigate, Link } from "react-router";
import Input from '../../components/common/Input'
import Button from '../../components/common/Button';
import {
    setName,
    setEmail,
    setUsername,
    setInstitution,
    setVendor,
} from '../../store/authSlice'

const CreateAccount = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { name, email, username, institution, vendor } = useSelector( (state) => state.account);
    const handleSubmit = () => {
        navigate('/verifyAccount')
    } 

  return (
    <div>
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

        <p className='text-[10px] my-4 text-center'>By signing up, you agree to our <a href='#'>terms of service</a> and <a href='#'>privacy policy</a></p>

        <Button text={"Create Account"} onClick={handleSubmit}/>
    </div>
  )
}

export default CreateAccount
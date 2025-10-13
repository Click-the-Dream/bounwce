import Input from '../../components/common/Input'

import Button from '../../components/common/Button'
import { Link } from 'react-router'

const LoginPage = () => {
    const handleInput = () => {

    }
  return (
    <div>
        <div className="space-y-5">            
            <Input 
                placeholder={"xxxxxxxx@gmail.com"} 
                type={"email"} 
                value={""}
                onChange={handleInput}
            />    

            <Input 
                placeholder={"6 digit OTP code"} 
                type={"number"} 
            />                       
        </div>

        <div className='space-y-4 mt-10'>
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

export default LoginPage
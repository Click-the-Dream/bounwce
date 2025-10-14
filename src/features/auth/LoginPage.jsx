import Input from '../../components/common/Input'

import Button from '../../components/common/Button'
import { Link } from 'react-router'

const LoginPage = () => {
    const handleInput = () => {
 
    }
  return (
    <div className='flex flex-col gap-5'>           
        <Input 
            placeholder={"your email"} 
            type={"email"} 
            value={""}
            onChange={handleInput}
        />  

        <Link to={"/verifyLogin"}>
            <Button text={"Login"} />
        </Link>                      
    </div>
  )
}

export default LoginPage
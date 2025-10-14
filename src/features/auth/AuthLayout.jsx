import Button from '../../components/common/Button'
import { useLocation, useNavigate, Outlet } from "react-router";
import createPicImg from '../../assets/createpic.jpg'

const CreateAccountPage = () => {    
    const location = useLocation();
    const navigate = useNavigate();

    const isLogin = location.pathname === "/login";
    const isCreateAccount = location.pathname === "/createAccount";   
    
  return (
    <div className='flex gap-2 h-screen'>

        {/* welcome image section */}
        <div className='hidden lg:block relative w-[55%] h-full overflow-hidden'>
            <img 
                src={createPicImg} 
                alt='create-pic-image' 
                className='w-full h-full object-cover [clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]'
            />
            <div className='absolute bg-black/20 inset-0 [clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]'/>
        </div>

        {/* Onboarding section (create account or login)*/}
        <div className="w-full flex flex-col justify-center items-center mx-auto gap-3 flex-1 px-4 sm:px-6 md:px-10 lg:px-12 py-8">
            <h1 className='text-orange text-[clamp(20px,2vw,28px)] font-semi-bold mb-1'>{isCreateAccount ? "Create Account" : "Welcome Back"}</h1>
            {isLogin && <p className="text-[clamp(10px,1vw,12px)] mt-[-15px] mb-[15px]">Enter your email to access your account</p>}

            <div className='flex justify-evenly items-center w-full max-w-[368px] h-[41px] rounded-[20px] bg-lighter-ash border-[#C0C0C0] border-[1px] mb-5 p-1'>
                <Button variant={isLogin ? "primarySmaller" : "secondary"} text={"Login"} onClick={() => navigate("/login")}/>
                <Button variant={isCreateAccount ? "primarySmaller" : "secondary"} text={"Create Account"} onClick={() => navigate("/createAccount")}/>                
            </div>

            <div className='w-full max-w-[368px]'>
              <Outlet />  
            </div>
            
        </div>
    </div>
    
  )
}

export default CreateAccountPage
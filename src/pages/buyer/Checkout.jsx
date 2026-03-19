import { useState } from 'react'
import Header from '../../components/buyer/Header'
import Navbar from '../../components/buyer/Navbar'
import InputField from '../../features/vendorStore/components/InputField'
import useUser from '../../hooks/useUser'
import CheckoutDelivery from '../../components/buyer/CheckoutDelivery'

const Checkout = () => {
    const { useGetCurrentUser } = useUser();
    const { data: currentUser, isLoading } = useGetCurrentUser();
    const [ phoneNumber, setPhoneNumber ] = useState();  
    console.log(currentUser);

    const fullName = currentUser?.data?.full_name || "";
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || ""; 
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
    

  return (
    <div className="bg-[#ECECF080] min-h-screen">
        <Navbar />

        <div className="max-w-5xl mx-auto px-6 pb-8">
            <Header title="Checkout" hideCart={true} />  

            <div className="bg-white rounded-[10px] p-5 mb-5">
                <h1 className="text-[14px] font-semibold">Contact Information</h1>
                <p className="text-[13px] text-[#717182] mb-5">We’ll use this to send order updates and receipts</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                                        
                    <InputField 
                        label="First Name *"
                        name="firstName"
                        type="text"
                        defaultValue={firstName}
                        readOnly={true}
                    />

                    <InputField 
                        label="Last Name *"
                        name="lastName"
                        type="text"
                        defaultValue={lastName}
                        readOnly={true}
                    />

                    <InputField 
                        label="Email Address *"
                        name="email"
                        type="text"
                        defaultValue={currentUser?.data?.email}
                        readOnly={true}
                    />

                    {/* Manual Input Field */}
                    <InputField 
                        label="Phone Number *"
                        name="phone"
                        type="number"
                        placeholder="e.g. 08012345678"
                    />
                </div>
            </div>

            <div className="bg-white rounded-[10px] p-5">
                <CheckoutDelivery /> 
            </div>
        </div>

                
    </div>
  )
}

export default Checkout;
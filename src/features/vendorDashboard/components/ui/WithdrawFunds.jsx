import { PiHandWithdrawFill } from "react-icons/pi";
import { withdrawBackgroudImg } from "../../../../assets";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useState } from "react";

const WithdrawFunds = ({onClose, isOpen, onWithdraw}) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [userData, setUserData] = useState({name: "John Doe", bankName: "Opay", accountNumber: "9585648473", availableBalance: 8950, securityQuestion: "In what city were you born?"});

    if(!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
        aria-modal="true"
        role="dialog"
    >

        <div 
            className="bg-white rounded-[8px] p-5"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-between gap-2 items-center mb-1">
                <div className="flex gap-2 items-center">
                    <PiHandWithdrawFill />
                    <h1 className="font-semibold text-[14px]">Withdraw Funds</h1> 
                </div>
                <button
                   onClick={onClose} 
                >
                    x
                </button>
            </div>
            <p className="text-[11px] text-black/50 mb-3">Enter Withdrawal details and security information</p>
            <div 
                className="bg-[#581C8F] rounded-[6.75px] p-3 space-y-3"
                style={{backgroundImage: `url(${withdrawBackgroudImg})`}}
            >
                <h1 className="text-white underline text-[12px]">Withdrawal Destination</h1>
                <p className="text-[10px]"><span className="text-white/65">Account Name: </span><span className="text-white ">{userData.name}</span> </p>
                <p className="text-[10px]"><span className="text-white/65">Bank Name: </span><span className="text-white ">{userData.bankName}</span> </p>
                <p className="text-[10px]"><span className="text-white/65">Account Number: </span ><span className="text-white ">{userData.accountNumber}</span> </p>
            </div>

            <form className="mt-3">
                <div className="mb-3">
                    <label className="font-semibold text-[10px]">Withdrawal Amount ₦*</label>
                    <input 
                        type='number' 
                        className="w-full bg-[#F5F5F7] p-1 rounded-[6.75px]"
                    />
                    <div className="flex justify-between text-black/50 text-[10px]">
                        <p>Minimum: ₦2,000</p>
                        <p>Available: ₦{userData.availableBalance}</p>
                    </div>
                </div>

                <div>
                    <label className="font-semibold text-[10px]">Your Security Question: {userData.securityQuestion}</label>
                    <input 
                        type='text' 
                        className="w-full bg-[#F5F5F7] p-1 rounded-[6.75px]"
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            className="bg-[#E5F0FF] text-[#2563EB] py-[3px] px-[10px] rounded-[50px] text-[8px]"
                        >
                            Click here to change security question
                        </button>
                    </div>
                </div>

                <div className="flex gap-3 justify-end text-[10px] mt-8">
                    <button 
                        className="border-[1px] p-[9px] rounded-[4.45px]"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="flex gap-1 items-center p-[9px] rounded-[4.45px] bg-black text-white"
                        onClick={onWithdraw}
                    >
                        <MdOutlineVerifiedUser />
                        Proceed to Verification
                    </button>
                </div>
            </form>
        </div>
        
    </div>
  )
}

export default WithdrawFunds
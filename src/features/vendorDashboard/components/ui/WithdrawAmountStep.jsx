import { useState } from "react";
import { withdrawBackgroudImg } from "../../../../assets";
import { userData } from "../..";

const WithdrawAmountStep = ({amount, setAmount, error}) => {
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [showSecurityAnswer, setShowSecurityAnswer] = useState(false)
  return (
    <div>
        <div 
            className="bg-[#581C8F] rounded-[6.75px] p-3 space-y-3"
            style={{backgroundImage: `url(${withdrawBackgroudImg})`}}
        >
            <h1 className="text-white underline text-[12px]">Withdrawal Destination</h1>
            <p className="text-[10px]">
                <span className="text-white/65">Account Name: </span>
                <span className="text-white ">{userData.name}</span>
            </p>
            <p className="text-[10px]">
                <span className="text-white/65">Bank Name: </span>
                <span className="text-white ">{userData.bankName}</span> 
            </p>
            <p className="text-[10px]">
                <span className="text-white/65">Account Number: </span >
                <span className="text-white ">{userData.accountNumber}</span> 
            </p>
        </div>

        <form className="mt-3">
            <div className="mb-3">
                <label className="font-semibold text-[10px]">Withdrawal Amount (₦) *</label>
                <input 
                    type='number' 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-[#F5F5F7] p-2 rounded-[6.75px] text-[10px] text-black"
                />
                <div className="flex justify-between text-black/50 text-[10px]">
                    <p>Minimum: ₦2,000</p>
                    <p>Available: ₦{userData.availableBalance}</p>
                </div>
                {error && <p className="text-[10px] text-red-700">{error}</p>}
            </div>

            <div className="relative">
                <label className="font-semibold text-[10px]">
                    Your Security Question: {userData.securityQuestion}
                </label>
                <input 
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    type={showSecurityAnswer ? "text" : "password"} 
                    className="w-full bg-[#F5F5F7] p-2 rounded-[6.75px] text-black text-[10px]"
                />
                <button
                    onClick={() => setShowSecurityAnswer((prev) => !prev)}
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 text-[10px] text-black/50 transform transition-all hover:scale-125"
                >
                    {showSecurityAnswer ? "hide" : "show"}
                </button> 
                <div className="flex justify-end mt-2">
                    <button
                        className="bg-[#E5F0FF] text-[#2563EB] py-[3px] px-[10px] rounded-[50px] text-[8px]"
                        type="button"
                    >
                        Click here to change security question
                    </button>
                </div>
            </div>                
        </form>
    </div>
  )
}

export default WithdrawAmountStep
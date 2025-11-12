import { PiHandWithdrawFill } from "react-icons/pi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useRef, useState } from "react";
import WithdrawAmountStep from "./WithdrawAmountStep";
import { userData } from "../..";
import WithdrawVerificationStep from "./WithdrawVerificationStep";
import WithdrawSucessStep from "./WithdrawSucessStep";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const WithdrawFunds = ({onClose, isOpen, onWithdraw}) => {
    const DEMO_VERIFICATION_CODE = ["1", "2", "3", "4", "5", "6"];
    const [step, setStep] = useState(1); //1: Amount 2: Verification 3: Success
    const [amount, setAmount] = useState('');
    const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
    const [errorMessage, setErrorMessage] = useState('');
    const [referenceID, setReferenceId] = useState("AS-HGSUWON763")

    // ref array for 6 input verification boxes 
    const codeRefs = useRef([]);
    const resetState = () => {
        setStep(1);
        setErrorMessage("");
        setVerificationCode(Array(6).fill(""));
        setAmount("");
        onClose();
    };

    const handleProceed = () => {
        setErrorMessage("");
        const numAmount = parseFloat(amount);
        const minAmount = parseFloat(2000);
        const availableBalance = parseFloat(userData.availableBalance);
        if(step === 1) {
            if (isNaN(numAmount)) {
                setErrorMessage("Please enter an amount.");
                return;
            }
            if (numAmount < minAmount) {
                setErrorMessage(`Minimum withdrawal amount is ₦${minAmount}.`);
                return;
            }
            if (numAmount > availableBalance) {
                setErrorMessage("You cannot withdraw more than your available balance.");
                return;
            }
            setErrorMessage("")
            setStep(2)
        }

        if(step === 2) {
            const enteredCode = verificationCode.join('');
            const correctCode = DEMO_VERIFICATION_CODE.join('');

            if(enteredCode.length !== 6) {
                setErrorMessage("Please enter all 6 digits of the withdrawal code");
                return;
            }

            if(enteredCode !== correctCode) {
                setErrorMessage("Invalid Withdrawal code. Please check and try again");
                setVerificationCode(Array(6).fill(''));
                return;
            }
            console.log(verificationCode); 
            setErrorMessage("")                       
            setStep(3)
        }

        if (step === 3) {
            resetState();
        }
    }    

    const renderContent = () => {
        switch (step) {
            case 1:
                return <WithdrawAmountStep amount={amount} setAmount={setAmount} error={errorMessage}/>
            case 2: 
                return <WithdrawVerificationStep code={verificationCode} setCode={setVerificationCode} codeRefs={codeRefs}
                amount={amount} bankName={userData.bankName} accountNumber={userData.accountNumber} error={errorMessage}/>
            case 3: 
                return <WithdrawSucessStep amount={amount} bankName={userData.bankName} accountNumber={userData.accountNumber} referenceID={referenceID}/>
            default:
                return null;
        }
    }    

  return (
    // makes entire backgorund blur when modal is clicked
    <div 
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        aria-modal="true"
        role="dialog"
    >

        {/* modal section */}
        <div 
            className={`bg-white rounded-[8px] p-5 transform transition-all duration-500 ease-in-out ${isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-between gap-2 items-center mb-1">
                <div className="flex gap-2 items-center">
                    {
                        step === 3 ? <IoMdCheckmarkCircleOutline size={20} className="text-[#00C950]"/> : <PiHandWithdrawFill /> 
                    }                   
                    <h1 className="font-semibold text-[14px]">
                        {
                            step === 1
                                ? "Withdraw Funds"
                                : step === 2
                                ? "Verify Withdrawal"
                                : "Withdrawal Successful"
                        }
                    </h1> 
                </div>
                <button
                   onClick={onClose} 
                   type="button"
                >
                    x
                </button>
            </div>

            {step === 3 ? "" : <p className="text-[11px] text-black/50 mb-3">Enter Withdrawal details and security information</p>}
            
            {/* dynamic content area */}
            {renderContent()}
            
            {/* modal footer section */}
            <div className="flex gap-3 justify-end text-[10px] mt-8">
                    <button 
                        className={`border-[1px] p-[9px] rounded-[4.45px] ${step === 3 ? "hidden" : "block"}`}
                        onClick={() => {
                            if(step === 2) {
                                setStep(1)
                            } else {
                                onClose()
                            }
                        }}
                        type="button"
                    >
                        {step === 1 ? "Cancel" : "Back"}
                    </button>

                    <button
                        className="flex gap-1 items-center p-[9px] rounded-[4.45px] bg-black text-white"
                        onClick={handleProceed}
                        type="button"
                    >
                        {step === 1 
                            ? <MdOutlineVerifiedUser /> 
                            : step === 2
                            ? <PiHandWithdrawFill />
                            : ""
                        }
                        {step === 1 
                            ? "Proceed to Verification" 
                            : step === 2
                            ? "Complete Withdrawal"
                            : "close"
                        }
                    </button>
                </div>
        </div>        
    </div>
  )
}

export default WithdrawFunds
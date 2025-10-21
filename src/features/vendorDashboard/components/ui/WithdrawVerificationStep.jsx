import { withdrawBackgroudImg } from "../../../../assets";
import { CgDanger } from "react-icons/cg";

const WithdrawVerificationStep = ({code, setCode, codeRefs, amount, bankName, accountNumber, error}) => {
    const handleChange = (e, index) => {
        const { value } = e.target;
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newCode = [...code];
        newCode[index] = value.slice(-1)
        setCode(newCode);

        // move to a new input if a digit was entered
        if(value.length === 1 && index < 5 && codeRefs.current[ index + 1 ]) {
            codeRefs.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0 && codeRefs.current[index - 1]) {
            codeRefs.current[index - 1].focus();
        }
    }
  return (
    <div>
        <div 
            className="bg-[#581C8F] rounded-[6.75px] p-3 space-y-3 mb-3"
            style={{backgroundImage: `url(${withdrawBackgroudImg})`}}
        >
            <div className="flex justify-between gap-2 items-center text-[10px]">
                <p className="text-white/50">Amount:</p>  
                <p className="text-white">₦{amount}</p>  
            </div>

            <div className="flex justify-between gap-2 items-center text-[10px]">
                <p className="text-white/50">Destination</p>
                <p className="text-white">{bankName}({accountNumber})</p>
            </div>
        </div>

        <div className="space-y-1">
            <p className="text-[10px] text-black">Enter your 6-digit withdrawal code</p>
            <div className='flex gap-2'>
                {
                    code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (codeRefs.current[index] = el)}
                            type='tel'
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className='w-[55px] h-[49px] border-[2px] rounded-[6.75px] bg-black/10 p-5 text-center focus:border-black/50 focus:ring-black'
                            autoFocus={index === 0}
                        />
                    ))
                }
            </div>
            <p className="text-[10px] text-black/50">This is the 6-digit code you set during account setup</p>
            {error && <div className="flex items-center gap-1 justify-center bg-[#FF4B2B1A] text-[10px] text-[#FF0000] w-full h-[45px] rounded-[6.75px] text-center border-[1px] border-[#FF000075]">
                <CgDanger size={18}/>
                {error}
            </div>}
        </div>
    </div>
  )
}

export default WithdrawVerificationStep
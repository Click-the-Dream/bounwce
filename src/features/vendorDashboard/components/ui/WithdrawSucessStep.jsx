import { withdrawSucessImg, withdrawSucessPattern } from "../../../../assets"

const WithdrawSucessStep = ({amount, bankName, accountNumber, referenceID}) => {
  return (
    <div className="flex flex-col justify-center gap-4">
        <div className="flex items-center justify-center">
           <img 
                src={withdrawSucessImg}
                alt="withdrawal-successful"
                className="w-[70px] h-[70px] mt-5"
            /> 
        </div>
        

        <div className="bg-[#F0FDF4] text-[10px] text-[#016630] border-[2px] border-[#B9F8CF] text-center p-4 rounded-[6.75px]">
            <p>Successfully processed withdrawal of ₦{amount}. Funds will<br /> be transferred to your account within 24 hours</p>
        </div>

        <div 
            className="flex justify-start flex-col rounded-[6.75px] bg-[#F5F5F7] bg-cover p-4"
            style={{backgroundImage: `url(${withdrawSucessPattern})`}}
        >
            <p className="flex gap-3 text-[10px]">
                <span>Reference ID:</span>
                <span>{referenceID}</span>
            </p>

            <p className="flex gap-5 text-[10px]">
                <span>Destination: </span>
                <span>({bankName}){accountNumber}</span>
            </p>
        </div>
    </div>
  )
}

export default WithdrawSucessStep
import useStore from "@/app/hooks/use-store";
import withdrawBackgroudImg from "../../../../assets/withdraw-background.png";
import { CgDanger } from "react-icons/cg";
import { ChangeEvent, RefObject } from "react";
import { KeyboardEvent } from "react";

interface WithdrawVerificationProps {
  code: string[];
  setCode: (code: string[]) => void;
  codeRefs: RefObject<(HTMLInputElement | null)[]>;
  amount: string | number;
  error: string | null;
}

const WithdrawVerificationStep = ({
  code,
  setCode,
  codeRefs,
  amount,
  error,
}: WithdrawVerificationProps) => {
  const { useGetMyStore } = useStore();
  const { data, isLoading } = useGetMyStore();
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Move to next input
    if (value && index < code.length - 1 && codeRefs.current) {
      codeRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (
      e.key === "Backspace" &&
      !code[index] &&
      index > 0 &&
      codeRefs.current
    ) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div
        className="bg-[#581C8F] rounded-[6.75px] p-3 space-y-3 mb-3"
        style={{ backgroundImage: `url(${withdrawBackgroudImg})` }}
      >
        <div className="flex justify-between gap-2 items-center text-[10px]">
          <p className="text-white/50">Amount:</p>
          <p className="text-white">₦{amount}</p>
        </div>

        <div className="flex justify-between gap-2 items-center text-[10px]">
          <p className="text-white/50">Destination</p>
          <p className="text-white">
            {data.payout_info.account_name}({data.payout_info.account_number})
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-[10px] text-black">
          Enter your 6-digit withdrawal code
        </p>
        <div className="flex gap-2">
          {code.map(
            (
              digit: string | number | readonly string[] | undefined,
              index: number,
            ) => (
              <input
                key={index}
                // Correct way to assign refs in a loop
                ref={(el) => {
                  if (codeRefs.current) {
                    codeRefs.current[index] = el;
                  }
                }}
                type="tel"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-13.75 h-12.25 border-2 rounded-[6.75px] bg-black/10 p-2 text-center focus:border-black/50 focus:ring-black"
                autoFocus={index === 0}
              />
            ),
          )}
        </div>
        <p className="text-[10px] text-black/50">
          This is the 6-digit code you set during account setup
        </p>
        {error && (
          <div className="flex items-center gap-1 justify-center bg-[#FF4B2B1A] text-[10px] text-[#FF0000] w-full h-11.25 rounded-[6.75px] text-center border border-[#FF000075]">
            <CgDanger size={18} />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawVerificationStep;

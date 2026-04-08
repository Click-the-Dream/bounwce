"use client";
const WithdrawalHistoryCard = ({
  statusImg,
  statusIcon: StatusIcon,
  label,
  date,
  amount,
  status,
}: any) => {
  return (
    <div className="flex justify-between items-center gap-2 w-full p-2 rounded-lg border border-[#0000001A]">
      <div className="flex gap-2 items-center">
        <div>
          <img src={statusImg} alt={label} />
        </div>

        <div>
          <h1 className="text-[9px] font-medium">{label}</h1>
          <h1 className="text-[7px] text-ash">{date}</h1>
        </div>
      </div>

      <div className="flex flex-col items-end gap-0.5">
        <h1 className="text-[8px] font-semibold">{amount}</h1>
        <div className="flex items-center gap-px bg-[#DBFCE7] text-[#00844D] rounded-lg p-0.75">
          <StatusIcon size={10} />
          <p className="text-[8px]">{status}</p>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalHistoryCard;

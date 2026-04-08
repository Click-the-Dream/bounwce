"use client";

import Image from "next/image";

interface WalletStatsCardProps {
  title: string;
  amount: string | number;
  subtext: string;
  image: string;
  amountColor?: string;
}
const WalletStatsCard = ({
  title,
  amount,
  subtext,
  image,
  amountColor,
}: WalletStatsCardProps) => {
  return (
    <div className="flex flex-col border-[0.53px] border-[#0000001A] rounded-xl p-5 bg-white">
      <div className="flex justify-between gap-2">
        <h1 className="text-[11px]">{title}</h1>
        <Image
          src={image}
          alt={title}
          width={50}
          height={55}
          className="w-12.5 h-13.75"
        />
      </div>

      <div>
        <h1 className={`text-[25px] ${amountColor}`}>{`₦${amount}`}</h1>
        <p className="text-[11px] text-ash">{subtext}</p>
      </div>
    </div>
  );
};

export default WalletStatsCard;

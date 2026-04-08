"use client";
import { useEffect, useState } from "react";
import { PiHandWithdraw } from "react-icons/pi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import useVendor from "@/app/hooks/use-vendor";
import { vendorWalletConfig } from "@/app/_utils/dashboardUtils";
import WalletStatsCard from "./WalletStatsCard";
import WithdrawFunds from "./WithdrawFunds";
import noHistoryImg from "../../../../assets/no-history-img.svg";
import walletDebitImg from "../../../../assets/wallet-debited.svg";
import walletRefundImg from "../../../../assets/wallet-refund.svg";

import Image from "next/image";
import WithdrawalHistoryCard from "./WithdrawalHistoryCard";
const VendorWallet = () => {
  const { useGetWalletSummary } = useVendor();
  const [withdrawalData, setWithdrawalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: walletData, isLoading } = useGetWalletSummary();
  console.log(walletData);

  const walletStats = vendorWalletConfig.map((config) => {
    const amount = walletData?.[config.dataKey] || 0;

    return {
      key: config.label,
      image: config.icon,
      label: config.label,
      subtext: config.subtext,
      amount: amount,
      amountColor: config.amountColor,
    };
  });

  useEffect(() => {
    const recentHistory = walletData?.withdrawal_history?.items || [];
    setWithdrawalData(recentHistory);
  }, [walletData]);

  return (
    <main>
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mb-4">
        {walletStats.map((stat) => (
          <WalletStatsCard
            key={stat.key}
            image={stat.image?.src}
            title={stat.label}
            subtext={stat.subtext}
            amount={stat.amount}
            amountColor={stat.amountColor}
          />
        ))}
      </section>

      <section className="flex justify-end mb-4">
        <button
          className="bg-black text-white flex gap-2 items-center justify-center p-2 rounded-[4.45px] "
          onClick={() => setIsModalOpen(true)}
        >
          <PiHandWithdraw />
          <span className="text-[11px]">Withdraw Funds</span>
        </button>
      </section>

      <WithdrawFunds
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <section className="border border-[#0000001A] rounded-xl p-5 w-full bg-white">
        <h1 className="text-[12px] font-medium">Withdrawal History</h1>
        <p className="text-[11px] text-ash mb-5">
          Track all your withdrawal transactions
        </p>

        <article className="flex flex-col items-center gap-3">
          {/* check if user had made any withdrawals */}
          {withdrawalData.length === 0 ? (
            <Image
              src={noHistoryImg.src}
              width={30}
              height={30}
              alt="no withdrawals"
              className="w-30 h-30"
            />
          ) : (
            withdrawalData.map((data: any) => {
              let statusImg = "";
              statusImg =
                data.action === "debit" ? walletDebitImg : walletRefundImg;

              return (
                <WithdrawalHistoryCard
                  key={data.label}
                  label={data.label}
                  icon={data.icon}
                  status={data.status}
                  amount={`${data.action === "debit" ? "-" : ""} ₦${data.amount}`}
                  date={data.date}
                  statusIcon={IoCheckmarkDoneCircleOutline}
                  statusImg={statusImg}
                />
              );
            })
          )}
        </article>
      </section>
    </main>
  );
};

export default VendorWallet;

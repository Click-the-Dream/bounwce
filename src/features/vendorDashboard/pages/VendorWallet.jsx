import WalletStatsCard from '../components/ui/WalletStatsCard'
import { useEffect, useState } from "react";
import { PiHandWithdraw } from "react-icons/pi";
import WithdrawalHistoryCard from "../components/ui/WithdrawalHistoryCard";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import {noHistoryImg, walletDebitImg, walletRefundImg} from "../../../assets"
import WithdrawFunds from "../components/ui/WithdrawFunds";
import { useGetWalletSummary } from "../../../hooks/useVendor";
import { vendorWalletConfig } from "../../../utils/vendorWalletMapper";

const VendorWallet = () => {
  const [withdrawalData, setWithdrawalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
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
      amountColor: config.amountColor
    }
  })

  useEffect(() => {
    const recentHistory = walletData?.withdrawal_history?.items || [];
    setWithdrawalData(recentHistory)
  }, [walletData])

  return (
    <main>
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mb-[1rem]">
        {
          walletStats.map((stat) => (            
            <WalletStatsCard 
              key={stat.key}
              image={stat.image}
              title={stat.label}
              subtext={stat.subtext}
              amount={stat.amount}
              amountColor={stat.amountColor}
            />
          ))
        }
      </section>

      <section className="flex justify-end mb-[1rem]">
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

      <section className="border-[2px] rounded-[12.75px] p-5 w-full">
        <h1 className="text-[12px] font-medium">Withdrawal History</h1>
        <p className="text-[11px] text-ash mb-5">Track all your withdrawal transactions</p>

        <article className="flex flex-col items-center gap-3">
          {/* check if user had made any withdrawals */}
          {
            withdrawalData.length === 0 ? (
              <img 
                src={noHistoryImg}
                alt="no withdrawals"
                className="w-[120px] h-[120px]"
              />
            ) : (
              withdrawalData.map((data) => {
                let statusImg = "";
                statusImg = data.action === "debit" ? walletDebitImg :  walletRefundImg;
                
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
                )
              })
            )
          }
        </article>       
      </section>     
    </main>
  )
}

export default VendorWallet
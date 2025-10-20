import { VscCalendar, VscSettingsGear } from "react-icons/vsc";
import WalletStatsCard from '../components/ui/WalletStatsCard'
import { useEffect, useState } from "react";
import { PiHandWithdraw } from "react-icons/pi";
import WithdrawalHistoryCard from "../components/ui/WithdrawalHistoryCard";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import {noHistoryImg, walletDebitImg, walletRefundImg, availableBalance, withdrawableBalance, pendingBalance} from "../../../assets"
import WithdrawFunds from "../components/ui/WithdrawFunds";

const VendorWallet = () => {
  const [walletStats, setWalletStats] = useState([]);
  const [withdrawalData, setWithdrawalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const dummyData = [
      {title: "Available Balance", amount: "20,000", subtext: "Total earnings from all sales", icon: availableBalance},
      {title: "Pending Balance", amount: "5,000", subtext: "Money in escrow for active orders", icon: pendingBalance, amountColor: "text-[#2563EB]"},
      {title: "Withdrawable Balance", amount: "15,000", subtext: "Available for withdrawal", icon:withdrawableBalance, amountColor: "text-[#00A644]"},      
    ]
    setWalletStats(dummyData);
  }, [])    

  const handleFundsWithdraw = () => {
    console.log("Withdraw Funds");    
  }

  useEffect(() => {
      const dummyData = [
          {action: "debit", label: "Wallet Account Debited", date: "Sep 20, 2025, 11:01AM", amount: "100,000", status: "sucessful" },
          {action: "debit", label: "Wallet Account Debited", date: "Sep 20, 2025, 11:01AM", amount: "100,000", status: "sucessful"},
          {action: "refund", label: "Wallet Account Refunded", date: "Sep 20, 2025, 11:01AM", amount: "100,000", status: "sucessful"}          
      ]
      setWithdrawalData(dummyData);
  }, [])  

  return (
    <main className="space-y-[1rem]">
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {
          walletStats.map((stat, index) => (            
            <WalletStatsCard 
              key={index}
              image={stat.icon}
              title={stat.title}
              subtext={stat.subtext}
              amount={stat.amount}
              amountColor={stat.amountColor}
            />
          ))
        }
      </section>

      <section className="flex justify-end">
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
              withdrawalData.map((data, index) => {
                let statusImg = "";
                statusImg = data.action === "debit" ? walletDebitImg :  walletRefundImg;
                
                return (
                <WithdrawalHistoryCard 
                    key={index}
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
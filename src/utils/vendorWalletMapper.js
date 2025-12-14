import { availableBalance, pendingBalance, withdrawableBalance } from "../assets";

export const vendorWalletConfig = [
    {
        label: "Available Balance", 
        dataKey: "available_balance",
        subtext: "Total earnings from all sales", 
        icon: availableBalance
    },
    {
        label: "Pending Balance", 
        dataKey: "pending_balance",
        subtext: "Money in escrow for active orders", 
        icon: pendingBalance, 
        amountColor: "text-[#2563EB]"
    },
    {
        label: "Withdrawable Balance",
        dataKey: "withdrawable_balance", 
        subtext: "Available for withdrawal", 
        icon:withdrawableBalance, 
        amountColor: "text-[#00A644]"
    },      
    ]
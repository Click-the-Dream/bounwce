
const WalletStatsCard = ({title, amount, subtext, image, amountColor}) => {
  return (
    <div className="flex flex-col gap-7 border-[2px] rounded-lg p-5">
        <div className="flex justify-between gap-2">
            <h1 className="text-[11px]">{title}</h1>
            <img 
                src={image}
                alt={title}
            />
        </div>

        <div>
            <h1 className={`text-[25px] ${amountColor}`}>{`₦${amount}`}</h1>
            <p className="text-[11px] text-ash">{subtext}</p>
        </div>
    </div>
  )
}

export default WalletStatsCard
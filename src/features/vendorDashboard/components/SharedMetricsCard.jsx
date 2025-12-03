
const SharedMetricsCard = ({icon: Icon, header, subtext, paragraphText, buttonLabel, onclick}) => {
  return (
    <section className="rounded-[12.75px] border-[1px] border-[#0000001A] bg-white p-5">
        <h1 className="text-[14px] font-medium">{header}</h1>
        <p className="text-[12px] text-[#717182]">{subtext}</p>

        <div className="flex flex-col justify-center items-center gap-2 my-20">
        <Icon size={35} className="text-[#717182]"/>
        <h1 className="text-[15px]">{header}</h1>
        <p className="text-[13px] text-[#717182]">{paragraphText}</p>
        <button 
            className="border-2 border-[#00000036] rounded-[6.75px] px-[16px] py-[7px] text-[10px]"
            onClick={onclick}
        >
            {buttonLabel}
        </button>
        </div>
    </section>
  )
}

export default SharedMetricsCard

const SharedAnalyticsCard = ({details, header}) => {
    const getProgressBarColor = (percentage) => {
        if (percentage >= 70) return "bg-[#38C066]";
        if(percentage >= 46) return "bg-[#E2DB28]";
        return "bg-[#FF0000]"
    }
  return (
    <div className="bg-white rounded-[12.75px] border-[1px] border-[#0000001A] p-5 h-full">
        <h1 className="text-[14px] font-medium mb-5">{header}</h1>
        <div className="pt-3">
            {
                details.map((detail, index) => (
                    <div 
                        className="mb-4"
                        key={index}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <div className="flex gap-3">
                                {detail.icon && <img 
                                    src={detail.icon}
                                />}
                                <h2 className="text-[13px] font-medium">{detail.label}</h2>
                            </div>
                            
                            {detail.percentage && <p className="text-[13px]">{detail.percentage}% of goal</p>}
                            {detail.value && <p className="text-[13px]">{detail.value}</p>}
                        </div>
                        {
                            detail.percentage && (
                                <div className="bg-[#03021333] w-full h-[7px] rounded-md relative">
                                    <span 
                                        className={`absolute h-[7px] rounded-l-[7px] ${getProgressBarColor(detail.percentage)}`}
                                        style={{ width: `${detail.percentage}%`}}
                                    ></span>
                                </div>
                            )
                        }                        
                    </div>
                ))
                }
        </div>
    </div>
  )
}

export default SharedAnalyticsCard
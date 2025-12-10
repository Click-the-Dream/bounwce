
const VendorOverviewCard = ({
  label, 
  amount, 
  analysis, 
  icon: OverviewIcon,
  trendIcon: TrendIcon,
  trendColor,
  iconColor,
  size
  }) => {

  return (
    <div className='bg-white flex items-center gap-2 justify-between p-5 rounded-lg border-[2px] w-full'>
        <div>
            <p className='text-[11px] text-ash'>{label}</p>
            <h1 className='text-[18px]'>{amount}</h1>
            {
              TrendIcon &&
              <div className={`flex gap-2 ${trendColor}`}>
                <TrendIcon />
                <p className='text-[10px] '>{analysis}</p>
              </div>
            }            
        </div>

        <div>
            <OverviewIcon size={size} className={`${iconColor} p-2 rounded-[8px] font-bold`}/>
        </div> 
    </div>
  )
}

export default VendorOverviewCard
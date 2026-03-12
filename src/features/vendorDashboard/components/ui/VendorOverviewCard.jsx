
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
    <div className='bg-white flex items-center gap-2 justify-between p-5 rounded-[12px] border-[2px] w-full min-h-32'>
      <div>
        <p className='text-sm font-semibold'>{label}</p>
        <h1 className='text-[20px] mt-2'>{amount}</h1>
        {
          TrendIcon &&
          <div className={`flex gap-2 ${trendColor}`}>
            <TrendIcon />
            <p className='text-[12px] font-semibold'>{analysis}</p>
          </div>
        }
      </div>

      <div>
        <OverviewIcon size={size} className={`${iconColor} p-2 rounded-[8px] font-bold`} />
      </div>
    </div>
  )
}

export default VendorOverviewCard
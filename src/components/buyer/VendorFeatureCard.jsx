
const VendorFeatureCard = ({icon: Icon, feature}) => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center bg-white rounded-lg p-3 flex-1">
        <Icon />
        <p className="text-[12px] font-medium whitespace-nowrap">{feature}</p>
    </div>
  )
}

export default VendorFeatureCard
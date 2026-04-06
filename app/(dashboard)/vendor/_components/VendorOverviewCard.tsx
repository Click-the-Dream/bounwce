const VendorOverviewCard = ({
  label,
  amount,
  analysis,
  icon: OverviewIcon,
  trendIcon: TrendIcon,
  trendColor,
  iconColor,
  size,
  loading,
}: any) => {
  if (loading) {
    return (
      <div className="bg-white p-5 rounded-xl border-2 border-[#0000001A] w-full min-h-32 animate-pulse">
        <div className="space-y-3">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white flex items-center gap-2 justify-between p-5 rounded-xl border-[0.53px] border-[#0000001A] w-full min-h-26.75">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <h1 className="text-[20px] mt-2">{amount}</h1>

        {TrendIcon && (
          <div className={`flex gap-2 ${trendColor}`}>
            <TrendIcon />
            <p className="text-[12px] font-semibold">{analysis}</p>
          </div>
        )}
      </div>

      <div>
        <OverviewIcon
          size={size}
          className={`${iconColor} w-9 h-9 shrink-0 p-2 rounded-lg`}
        />
      </div>
    </div>
  );
};

export default VendorOverviewCard;

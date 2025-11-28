import { TbHome } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import userImage from "../../../../assets/createpic.jpg";
import { useNavigate } from "react-router-dom";

const VendorHeader = ({
  header,
  onClose,
  headerDetails,
  notifications,
  isBackButton,
  label,
  icon: Icon,
  bgColor,
  storeLabel,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
}) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow px-[1rem] md:px-[3rem] lg:px-[100px] xl:px-[140px] 2xl:px-[175px] py-5 flex justify-between gap-2">
      <div className="flex gap-3 items-center">
        {isBackButton && (
          <button
            className="p-2 bg-[#FFFFFF] border-[1px] border-[#0000001A] rounded-[3px] text-[13px] mr-6"
            onClick={onClose}
          >
            Back
          </button>
        )}
        <div>
          <img
            src={userImage}
            alt="user_image"
            className="w-[35px] aspect-square rounded-full object-cover"
          />
        </div>

        <div className="hidden md:block">
          <div className="flex gap-1 items-center">
            <TbHome />
            <p className="text-[10px]">
              <span>Origami Store</span> - {header}
            </p>
          </div>
          <p className="text-[9px]">{headerDetails}</p>
        </div>
      </div>

      {storeLabel && (
        <div className="flex gap-2">
          <button className="flex items-center gap-2 py-[6px] px-[11px] border-[2px] rounded-md">
            {LeftIcon && <LeftIcon size={15} />}
            <p className="text-[12px] hidden lg:block">{storeLabel}</p>
            {RightIcon && <RightIcon size={12} className="hidden md:block" />}
          </button>

          <button
            className={`relative border-[2px] py-[6px] px-[12px] flex items-center rounded-md ${bgColor}`}
          >
            {Icon && <Icon />}
            {label && (
              <p className="text-[12px] ml-2 hidden lg:block">{label}</p>
            )}
            {notifications && (
              <p className="absolute top-[-10px] right-[-3px] px-[5px] py-[3px] bg-red-600 text-[8px] text-white rounded-full w-[15px] h-[15px] aspect-square">
                {notifications}
              </p>
            )}
          </button>

          <button className="border-[2px] py-[6px] px-[12px] flex items-center rounded-md">
            <IoSettingsOutline />
          </button>
        </div>
      )}
    </header>
  );
};

export default VendorHeader;

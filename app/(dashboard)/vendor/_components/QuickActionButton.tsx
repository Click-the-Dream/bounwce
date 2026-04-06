const QuickActionsButton = ({ icon: Icon, onClick, label }: any) => {
  return (
    <button
      onClick={onClick}
      className="border-[0.53px] border-[#0000001A] rounded-[12.75px] text-[12px] px-8 py-3 flex flex-col items-center"
    >
      <Icon />
      {label}
    </button>
  );
};

export default QuickActionsButton;

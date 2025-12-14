import { ClipLoader } from "react-spinners";

const DashboardLoader = ({ label = "Loading data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <ClipLoader size={42} />
      <p className="mt-3 text-sm text-gray-500">{label}</p>
    </div>
  );
};

export default DashboardLoader;

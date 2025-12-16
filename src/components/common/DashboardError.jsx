import { MdErrorOutline } from "react-icons/md";

const DashboardError = ({ message }) => {
  return (
    <div className="border border-red-200 bg-red-50 rounded-xl p-6 flex items-start gap-3">
      <MdErrorOutline className="text-red-500 text-xl mt-0.5" />
      <div>
        <h4 className="text-sm font-semibold text-red-700">
          Unable to load data
        </h4>
        <p className="text-sm text-red-600 mt-1">
          {message || "Something went wrong. Please refresh and try again."}
        </p>
      </div>
    </div>
  );
};

export default DashboardError;

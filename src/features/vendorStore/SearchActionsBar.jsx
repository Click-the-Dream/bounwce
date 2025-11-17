import { CiFilter, CiExport } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import ActionButton from "./components/ActionButton";

const SearchActionsBar = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full bg-white p-2 flex flex-col md:flex-row gap-3 items-center justify-between space-x-2 rounded-[12.75px]">
        <input
            type="text"
            placeholder="Search Product..."
            className="w-full px-4 py-2 rounded-[12.75px] text-[13px] bg-[#ECECF080]"
        />

        <div className="flex items-center space-x-2">
            <ActionButton
                label={"filter"}
                icon={CiFilter}
            />

            <ActionButton 
                label={"Export"}
                icon={CiExport}
            />

            <ActionButton 
                label={"Add Product"}
                icon={IoMdAdd}
                className="bg-black text-white"
                onClick={() => navigate("/vendor/addproduct")}
            />
        </div>
    </div>
  )
}

export default SearchActionsBar
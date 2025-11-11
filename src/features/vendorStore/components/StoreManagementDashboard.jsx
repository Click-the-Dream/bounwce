import { Package, Plus, Filter, Download } from 'lucide-react';
import VendorHeader from '../../vendorDashboard/components/ui/VendorHeader';
import { MdOutlineDashboard } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import VendorOverviewCard from '../../vendorDashboard/components/ui/VendorOverviewCard';
import { useState } from 'react';
import ActionButton from './actionButton';
import { CiFilter, CiExport } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";

const StoreManagementDashboard = () => {
  const [dummyStat, setDummyStat] = useState([
    {label: "Total Products", amount: "1", icon: MdOutlineDashboard},
    {label: "Active Products", amount: "0", icon: MdOutlineDashboard},
    {label: "Draft Products", amount: "1", icon: MdOutlineDashboard},
    {label: "Low Stock Items", amount: "0", icon: MdOutlineDashboard},
  ])
  return (
    <main className="min-h-screen bg-[#ECECF080]">
      <header className='mb-6'>
        <VendorHeader 
          icon={MdOutlineDashboard}
          label={"Go to Dashboard"}
          bgColor={"bg-orange text-white"}
          storeLabel={"Preview Store"}
          leftIcon={IoEyeOutline}
        />
      </header>      
      

      <section className='px-[1rem] md:px-[3rem] lg:px-[100px] xl:px-[140px] 2xl:px-[175px] py-5 space-y-6'>

      <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[21px]'>
        {
          dummyStat.map((data, index) => (
            <VendorOverviewCard 
              key={index}
              label={data.label}
              amount={data.amount}
              icon={data.icon}
            />
          ))
        }        
      </section>

      {/* Search & Actions */}
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
            />
          </div>
        </div>

      {/* Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <a
              href="#"
              className="py-2 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 flex items-center space-x-2"
            >
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">0</span>
              <span>Active Products</span>
            </a>
            <a
              href="#"
              className="py-2 px-1 border-b-2 border-red-500 text-sm font-medium text-red-600 flex items-center space-x-2"
            >
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">1</span>
              <span>Drafts</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Empty State */}
      <div className="px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No Active Products</h3>
          <p className="mt-1 text-sm text-gray-500">You haven't published any products yet</p>
          <button className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-2" />
            Add Your Product
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 sm:px-6 lg:px-8 mt-8 pb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          <p className="mt-1 text-sm text-gray-500">Common tasks to manage your inventory</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-6 py-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Plus className="w-5 h-5 mr-3" />
              Add Product
            </button>
            <button className="flex items-center justify-center px-6 py-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Package className="w-5 h-5 mr-3" />
              Update Inventory
            </button>
          </div>
        </div>
      </div>
      </section>
    </main>
  );
};

export default StoreManagementDashboard;
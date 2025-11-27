import QuickActionsButton from './ui/QuickActionsButton'
import { HiOutlinePlus } from "react-icons/hi2";
import { RxUpdate } from "react-icons/rx";
import { PiExport } from "react-icons/pi";

const QuickActionSection = () => {
    const handleAddProduct = () => {
        console.log("Add Product");        
    }
    const updateInventory = () => {
        console.log("update inventory");
        
    }
    const customersMessage = () => {
        console.log("customers message");
        
    }
    const exportData = () => {
        console.log("export data");
        
    }

    const quickActions = [
        {
            label: "Add Product",
            icon: HiOutlinePlus,
            onclick: handleAddProduct,
        },
        {
            label: "Update Inventory",
            icon: RxUpdate,
            onclick: handleAddProduct,
        },
        {
            label: "Customers Message",
            icon: HiOutlinePlus,
            onclick: handleAddProduct,
        },
        {
            label: "Export Data",
            icon: PiExport,
            onclick: handleAddProduct,
        }
    ]
  return (
    <section className='border-[2px] rounded-[12.75px] p-5 w-full'>
        <h1 className='text-[13px]'>Quick Actions</h1>
        <p className='text-ash text-[12px] mb-4'>Common tasks to manage your inventory</p>

        <article className='grid gap-3 md:grid-cols-2 lg:grid-cols-4'>
            {
                quickActions.map((action) => (
                    <QuickActionsButton 
                        key={action.label}
                        icon={action.icon}
                        label={action.label}
                        onClick={action.onclick}
                    />
                ))
            }           
        </article>
    </section>
  )
}

export default QuickActionSection
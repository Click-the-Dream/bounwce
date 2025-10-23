import { Plus, RefreshCw } from "lucide-react"

const QuickActions  = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h2>
      <p className="text-sm text-gray-600 mb-4">Common tasks to manage your inventory</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Add Product Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col items-center justify-center text-center hover:shadow-lg transition cursor-pointer">
          <Plus size={32} className="text-gray-400 mb-3" />
          <h3 className="text-base font-semibold text-gray-900">Add Product</h3>
        </div>

        {/* Update Inventory Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col items-center justify-center text-center hover:shadow-lg transition cursor-pointer">
          <RefreshCw size={32} className="text-gray-400 mb-3" />
          <h3 className="text-base font-semibold text-gray-900">Update Inventory</h3>
        </div>
      </div>
    </div>
  )
}

export default QuickActions
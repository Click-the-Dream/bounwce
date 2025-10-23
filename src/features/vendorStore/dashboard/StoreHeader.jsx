import { Settings } from "lucide-react"
import ProductsSection from "./ProductsSection"
import StatsCards from "./StatsCards"
import QuickActions from "./QuickActions"

const StoreHeader = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              O
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Origami Store - Store Management</h1>
              <p className="text-sm text-gray-500">Manage your products and inventory</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-100 rounded-lg transition">
              Preview Store
            </button>
            <button className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition">
              Go to Dashboard
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="mb-8">
          <StatsCards />
        </div>

        {/* Products and Quick Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuickActions />
          <ProductsSection />
          
        </div>
      </div>
    </div>
  )
}

export default StoreHeader

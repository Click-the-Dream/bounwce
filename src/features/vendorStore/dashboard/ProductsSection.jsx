import { Search, Filter, Download, Plus, Package } from "lucide-react"

const ProductsSection = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-6">
      {/* Search and Filter Bar */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input type="text" placeholder="Search products..." className="bg-transparent outline-none text-sm w-full" />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-gray-700 text-sm hover:bg-gray-100 rounded-lg transition">
          <Filter size={16} />
          Filter
        </button>
        <button className="flex items-center gap-2 px-3 py-2 text-gray-700 text-sm hover:bg-gray-100 rounded-lg transition">
          <Download size={16} />
          Export
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4 flex items-center gap-2 border-b border-gray-200">
        <button className="px-4 py-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900 flex items-center gap-2">
          Active Products (0)
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">NEW</span>
        </button>
      </div>

      {/* Empty State */}
      <div className="p-12 text-center">
        <Package size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No Active Products</h3>
        <p className="text-sm text-gray-500 mb-6">You haven't published any products yet</p>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
          <Plus size={16} />
          Add Your Product
        </button>
      </div>
    </div>
  )
}


export default ProductsSection
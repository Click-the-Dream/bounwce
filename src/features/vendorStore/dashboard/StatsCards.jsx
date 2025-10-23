import { Package, CheckCircle, FileText, Box } from "lucide-react"

const stats = [
  {
    label: "Total Products",
    value: "1",
    icon: Package,
    color: "text-gray-400",
  },
  {
    label: "Active Products",
    value: "0",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    label: "Draft Products",
    value: "1",
    icon: FileText,
    color: "text-yellow-500",
  },
  {
    label: "Stock Items",
    value: "0",
    icon: Box,
    color: "text-gray-400",
  },
]

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <Icon className={`${stat.color} w-8 h-8`} />
          </div>
        )
      })}
    </div>
  )
}



export default StatsCards
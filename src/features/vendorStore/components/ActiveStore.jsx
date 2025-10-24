import React from 'react';
import { Package, Plus, Filter, Download, Eye, LogOut, Settings, RefreshCw } from 'lucide-react';

const ActiveStore = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="text-lg font-semibold text-gray-900 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Origami Store - Store Management
              </h1>
              <p className="text-sm text-gray-500">Manage your products and inventory</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Preview Store</span>
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
              <Package className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft Products</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <RefreshCw className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <input
            type="text"
            placeholder="Search Product..."
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <a
              href="#"
              className="py-2 px-1 border-b-2 border-red-500 text-sm font-medium text-red-600 flex items-center space-x-2"
            >
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">1</span>
              <span>Active Products</span>
            </a>
            <a
              href="#"
              className="py-2 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 flex items-center space-x-2"
            >
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">0</span>
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
              <RefreshCw className="w-5 h-5 mr-3" />
              Update Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveStore;
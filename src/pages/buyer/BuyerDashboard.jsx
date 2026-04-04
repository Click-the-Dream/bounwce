import React, { useState } from 'react';
import {
    LayoutDashboard, ShoppingBag, DollarSign, Package,
    Clock, Truck, ChevronDown, Bell, Search, UserCircle, Settings
} from 'lucide-react'; // Basic icons
import ProfileDropdown from '../../components/ProfileDropdown';

// Example Data
const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, active: true },
    { name: 'My Orders', icon: <ShoppingBag size={18} /> },
    { name: 'Spending Analysis', icon: <DollarSign size={18} /> },
    { name: 'Vendors', icon: <UserCircle size={18} /> },
    { name: 'Settings', icon: <Settings size={18} /> },
];

const stats = [
    { name: 'Total Spent', value: '$12,450.00', change: '+5.2%', icon: <DollarSign className="text-blue-600" /> },
    { name: 'Active Orders', value: '7', change: '2 Shipped', icon: <Package className="text-orange-600" /> },
    { name: 'Pending Approvals', value: '3', change: '1 Urgent', icon: <Clock className="text-amber-600" /> },
    { name: 'Completed Items', value: '145', change: '+12 this month', icon: <Truck className="text-emerald-600" /> },
];

const recentOrders = [
    { id: 'ORD-9901', item: 'MacBook Pro 14"', vendor: 'Apple Inc.', date: 'Oct 24, 2023', amount: '$1,999.00', status: 'Shipped' },
    { id: 'ORD-9888', item: 'Office Chairs (x10)', vendor: 'Steelcase', date: 'Oct 22, 2023', amount: '$4,500.00', status: 'Delivered' },
    { id: 'ORD-9855', item: 'Cloud Hosting (Oct)', vendor: 'AWS', date: 'Oct 15, 2023', amount: '$850.50', status: 'Delivered' },
    { id: 'ORD-9821', item: 'Adobe CC License', vendor: 'Adobe', date: 'Oct 12, 2023', amount: '$599.88', status: 'Processing' },
    { id: 'ORD-9799', item: 'Ergonomic Keyboard', vendor: 'Logitech', date: 'Oct 10, 2023', amount: '$149.99', status: 'Cancelled' },
];

const categorySpending = [
    { name: 'Hardware', amount: 6500, color: 'bg-blue-600' },
    { name: 'Software Licenses', amount: 3200, color: 'bg-emerald-600' },
    { name: 'Office Supplies', amount: 1800, color: 'bg-amber-600' },
    { name: 'Services', amount: 950, color: 'bg-rose-600' },
];

const BuyerDashboard = () => {
    const totalCategorySpent = categorySpending.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="min-h-screen flex bg-neutral-50 text-neutral-900 font-sans antialiased">

            {/* 1. Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col p-6 space-y-10">
                <div className="flex items-center gap-2 text-[#FF4B2B] font-bold text-2xl tracking-tight">
                    <ShoppingBag />
                    <span>Buyer<span className="font-light text-neutral-800">Hub</span></span>
                </div>
                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href="#"
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 ${item.active
                                ? 'bg-neutral-100 text-black font-semibold'
                                : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </a>
                    ))}
                </nav>
                <div className="bg-neutral-950 text-white p-5 rounded-2xl text-center space-y-3">
                    <Package className="mx-auto text-[#FF4B2B]" size={30} />
                    <h4 className="font-semibold text-sm">Need Help?</h4>
                    <p className="text-xs text-neutral-400">Contact our procurement support team.</p>
                    <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full w-full">Contact Support</button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">

                {/* 2. Top Header */}
                <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-between px-10">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <input
                            type="search"
                            placeholder="Search orders, vendors, or items..."
                            className="w-full pl-11 pr-4 py-2.5 bg-neutral-100 rounded-full text-sm border border-neutral-200 focus:ring-2 focus:ring-[#FF4B2B]/20 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-neutral-500 hover:text-black">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF4B2B] rounded-full"></span>
                        </button>

                        <ProfileDropdown fullMode={true} />
                    </div>
                </header>

                {/* 3. Dashboard Grid Content */}
                <main className="flex-1 p-10 space-y-10">

                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight text-black">Welcome back, Alex</h1>
                        <button className="bg-[#FF4B2B] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-orange-500/20 hover:bg-[#E64426] transition-colors">
                            + New Purchase Request
                        </button>
                    </div>

                    {/* Key Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {stats.map((stat) => (
                            <div key={stat.name} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex items-start gap-5">
                                <div className="p-3 bg-neutral-100 rounded-xl flex-shrink-0">
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-500 font-medium">{stat.name}</p>
                                    <p className="text-2xl font-bold text-black mt-1">{stat.value}</p>
                                    <p className="text-xs text-neutral-400 mt-1.5">{stat.change}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                        {/* 4. Recent Orders Table (2/3 width) */}
                        <div className="xl:col-span-2 bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-black">Recent Orders</h3>
                                <a href="#" className="text-sm font-medium text-[#FF4B2B] hover:underline">View All Orders</a>
                            </div>

                            <div className="space-y-4">
                                {recentOrders.map((order) => {
                                    const statusColors = {
                                        'Shipped': 'bg-blue-100 text-blue-800',
                                        'Delivered': 'bg-emerald-100 text-emerald-800',
                                        'Processing': 'bg-amber-100 text-amber-800',
                                        'Cancelled': 'bg-neutral-100 text-neutral-800',
                                    }
                                    return (
                                        <div key={order.id} className="grid grid-cols-5 items-center gap-4 p-4 rounded-xl border border-neutral-100 hover:bg-neutral-50 transition-colors">
                                            <div className="col-span-2">
                                                <p className="font-semibold text-sm text-black">{order.item}</p>
                                                <p className="text-xs text-neutral-500 mt-1">{order.id} &bull; {order.vendor}</p>
                                            </div>
                                            <div className="text-sm text-neutral-600">{order.date}</div>
                                            <div className="text-sm font-bold text-black text-right">{order.amount}</div>
                                            <div className="text-right">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* 5. Spending Breakdown (1/3 width) */}
                        <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm flex flex-col">
                            <h3 className="text-lg font-semibold text-black mb-8">Spending by Category</h3>
                            <div className="flex-1 space-y-6">
                                {categorySpending.map(cat => {
                                    const percentage = Math.round((cat.amount / totalCategorySpent) * 100);
                                    return (
                                        <div key={cat.name} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <p className="font-medium text-black">{cat.name}</p>
                                                <p className="text-neutral-500 font-mono">${cat.amount.toLocaleString()} ({percentage}%)</p>
                                            </div>
                                            <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden relative">
                                                <div className={`absolute inset-y-0 left-0 rounded-full ${cat.color}`} style={{ width: `${percentage}%` }}></div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <button className="mt-8 w-full border border-neutral-200 text-neutral-700 text-sm font-semibold py-3 rounded-xl hover:bg-neutral-50 transition-colors">
                                View Full Report
                            </button>
                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
};

export default BuyerDashboard;
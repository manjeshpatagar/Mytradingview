'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  FileText, 
  Newspaper, 
  Users, 
  Settings, 
  Plus,
  TrendingUp,
  Calendar,
  Eye,
  Edit,
  Trash2,
  LogOut,
  DollarSign,
  Globe,
  Target
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { title: 'Total News', value: '24', icon: Newspaper, color: 'bg-blue-500' },
    { title: 'Stock News', value: '12', icon: TrendingUp, color: 'bg-green-500' },
    { title: 'Market News', value: '8', icon: BarChart3, color: 'bg-purple-500' },
    { title: 'Users', value: '1,234', icon: Users, color: 'bg-orange-500' },
  ];

  const recentNews = [
    { id: 1, title: 'Apple Stock Surges After Q4 Earnings', category: 'Stock News', date: '2024-01-15', status: 'Published' },
    { id: 2, title: 'Federal Reserve Announces Rate Decision', category: 'Market News', date: '2024-01-14', status: 'Draft' },
    { id: 3, title: 'Tesla Reports Record Deliveries', category: 'Stock News', date: '2024-01-13', status: 'Published' },
    { id: 4, title: 'Global Markets React to Economic Data', category: 'Market News', date: '2024-01-12', status: 'Published' },
  ];

  const adminMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, href: '/admin' },
    { id: 'news', label: 'News Management', icon: Newspaper, href: '/admin/news' },
    { id: 'stock-news', label: 'Stock News', icon: TrendingUp, href: '/admin/stock-news' },
    { id: 'market-news', label: 'Market News', icon: FileText, href: '/admin/market-news' },
    { id: 'results', label: 'Results & Events', icon: DollarSign, href: '/admin/results' },
    { id: 'intraday-picks', label: 'Intraday Picks', icon: Target, href: '/admin/intraday-picks' },
    { id: 'users', label: 'User Management', icon: Users, href: '/admin/users' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                {adminMenu.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                <Link
                  href="/admin/news/new"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <Plus className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Add News</p>
                    <p className="text-sm text-gray-600">Create new article</p>
                  </div>
                </Link>
                <Link
                  href="/admin/stock-news/new"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Add Stock News</p>
                    <p className="text-sm text-gray-600">Company updates</p>
                  </div>
                </Link>
                <Link
                  href="/admin/market-news/new"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Add Market News</p>
                    <p className="text-sm text-gray-600">Market updates</p>
                  </div>
                </Link>
                <Link
                  href="/admin/stock-news"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Manage Stock News</p>
                    <p className="text-sm text-gray-600">Company updates</p>
                  </div>
                </Link>
                <Link
                  href="/admin/market-news"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <Globe className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Manage Market News</p>
                    <p className="text-sm text-gray-600">Global updates</p>
                  </div>
                </Link>
                <Link
                  href="/admin/results"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
                >
                  <DollarSign className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-900">Manage Results</p>
                    <p className="text-sm text-gray-600">Earnings & events</p>
                  </div>
                </Link>
                <Link
                  href="/admin/intraday-picks"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <Target className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Manage Intraday Picks</p>
                    <p className="text-sm text-gray-600">Trading signals</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent News */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent News</h2>
                <Link
                  href="/admin/news"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentNews.map((news) => (
                      <tr key={news.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{news.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {news.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {news.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            news.status === 'Published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {news.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
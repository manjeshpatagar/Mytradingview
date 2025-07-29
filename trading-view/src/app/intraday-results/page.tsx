'use client';

import { motion } from 'framer-motion';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  DollarSign,
  Info
} from 'lucide-react';

export default function IntradayResults() {
  const performanceData = [
    {
      date: '2024-01-24',
      totalPicks: 8,
      successful: 7,
      failed: 1,
      successRate: 87.5,
      avgReturn: 3.2,
      totalReturn: 25.6
    },
    {
      date: '2024-01-23',
      totalPicks: 6,
      successful: 5,
      failed: 1,
      successRate: 83.3,
      avgReturn: 2.8,
      totalReturn: 16.8
    },
    {
      date: '2024-01-22',
      totalPicks: 7,
      successful: 6,
      failed: 1,
      successRate: 85.7,
      avgReturn: 3.5,
      totalReturn: 24.5
    },
    {
      date: '2024-01-21',
      totalPicks: 5,
      successful: 4,
      failed: 1,
      successRate: 80.0,
      avgReturn: 2.9,
      totalReturn: 14.5
    },
    {
      date: '2024-01-20',
      totalPicks: 9,
      successful: 8,
      failed: 1,
      successRate: 88.9,
      avgReturn: 3.8,
      totalReturn: 34.2
    }
  ];

  const topPerformers = [
    {
      symbol: 'RELIANCE',
      company: 'Reliance Industries',
      entry: 2450,
      exit: 2520,
      return: 2.86,
      status: 'Success',
      profit: 'Buy Side'
    },
     {
      symbol: 'RELIANCE',
      company: 'Reliance Industries',
      entry: 200,
      exit: 197,
      return: 2.86,
      status: 'Success',
      profit: 'Sell Side'
    },
    {
      symbol: 'TCS',
      company: 'Tata Consultancy Services',
      entry: 3850,
      exit: 3950,
      return: 2.6,
      status: 'Success',
      profit: 'Buy Side'
    },
    {
      symbol: 'HDFC',
      company: 'HDFC Bank',
      entry: 1720,
      exit: 1620,
      return: 3.49,
      status: 'Success',
      profit: 'Sell Side'
    },
   
  ];

  const stats = [
    { title: 'Total Picks', value: '35', change: '+12%', icon: Activity },
    { title: 'Success Rate', value: '85.7%', change: '+2.3%', icon: TrendingUp },
    { title: 'Avg Return', value: '3.2%', change: '+0.5%', icon: DollarSign },
    { title: 'Total Return', value: '₹115.6', change: '+18.2%', icon: BarChart3 }

  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
              <p className="text-gray-600">Historical performance data and trading results</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Top Performers</h2>
              <p className="text-gray-600">Best performing picks from today's trades</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exit</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topPerformers.map((stock, index) => (
                  <motion.tr
                    key={stock.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{stock.symbol}</div>
                        <div className="text-sm text-gray-500">{stock.company}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">₹{stock.entry}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">₹{stock.exit}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${stock.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.return >= 0 ? '+' : ''}{stock.return}%
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        stock.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {stock.status === 'Success' ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {stock.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${stock.profit === 'Buy Side' ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.profit}
                      </span>
                    </td>
                   


                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Daily Performance</h2>
              <p className="text-gray-600">Last 5 trading days performance</p>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">Last 5 Days</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Picks</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Return</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Return</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {performanceData.map((day, index) => (
                  <motion.tr
                    key={day.date}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatDate(day.date)}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{day.totalPicks}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                            style={{ width: `${day.successRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{day.successRate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{day.avgReturn}%</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">₹{day.totalReturn}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom Disclaimer */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md shadow-sm mt-6">
          <div className="flex">
            <Info className="w-5 h-5 mr-2 mt-1 text-yellow-500" />
            <div className="text-sm">
              <p className="font-semibold">Disclaimer:</p>
              <p>
                The "Buy Above" or "Sell Below" levels shared are for educational purposes only. Once the price crosses the level, you may consider entering — but we do not guarantee target achievement.
                <br />
                It is recommended to book <strong>2–3% profit</strong> and exit if the stock shows resistance or lacks momentum.
                The same logic applies to <strong>Sell</strong> setups.
                <br />
                We are <strong>not SEBI-registered advisors</strong>. Please trade responsibly and always use a stop-loss.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

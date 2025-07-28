'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, TrendingDown, DollarSign, Target, ArrowRight } from 'lucide-react';

export default function IntradayPicks() {
  const today = new Date();
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  // 7 Dates for filtering
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today.getTime() - i * 86400000);
    return formatDate(d);
  });

  const [selectedDate, setSelectedDate] = useState(formatDate(today));

  const allPicks = [
    {
      id: 1,
      date: formatDate(today),
      symbol: 'AAPL',
      company: 'Apple Inc.',
      entry: 185.5,
      target: 192.0,
      stopLoss: 182.0,
      direction: 'BUY',
    },
      {
      id: 1,
      date: formatDate(today),
      symbol: 'AAPL',
      company: 'Apple Inc.',
      entry: 185.5,
      target: 192.0,
      stopLoss: 182.0,
      direction: 'BUY',
    },
      {
      id: 1,
      date: formatDate(today),
      symbol: 'AAPL',
      company: 'Apple Inc.',
      entry: 185.5,
      target: 192.0,
      stopLoss: 182.0,
      direction: 'BUY',
    },
    {
      id: 2,
      date: formatDate(today),
      symbol: 'TSLA',
      company: 'Tesla Inc.',
      entry: 245.8,
      target: 252.0,
      stopLoss: 242.0,
      direction: 'BUY',
    },
    {
      id: 3,
      date: formatDate(new Date(today.getTime() - 1 * 86400000)),
      symbol: 'GOOGL',
      company: 'Alphabet Inc.',
      entry: 142.5,
      target: 138.0,
      stopLoss: 145.0,
      direction: 'SELL',
    },
    {
      id: 4,
      date: formatDate(new Date(today.getTime() - 2 * 86400000)),
      symbol: 'MSFT',
      company: 'Microsoft Corp.',
      entry: 378.2,
      target: 385.0,
      stopLoss: 375.0,
      direction: 'BUY',
    },
    {
      id: 5,
      date: formatDate(new Date(today.getTime() - 3 * 86400000)),
      symbol: 'AMZN',
      company: 'Amazon.com Inc.',
      entry: 155.8,
      target: 162.0,
      stopLoss: 153.0,
      direction: 'BUY',
    },
  ];

  const filteredPicks = allPicks.filter(p => p.date === selectedDate);

  const stats = [
    {
      label: 'Total Picks',
      value: allPicks.length.toString(),
      icon: Target,
      color: 'text-blue-600',
    },
    {
      label: 'Success Rate',
      value: '87%',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      label: 'Avg Return',
      value: '+4.2%',
      icon: DollarSign,
      color: 'text-purple-600',
    },
    {
      label: 'Active Signals',
      value: filteredPicks.length.toString(),
      icon: Clock,
      color: 'text-orange-600',
    },
  ];

  const getDirectionColor = (direction: string) => {
    return direction === 'BUY' ? 'text-green-600' : 'text-red-600';
  };

  const getDirectionBg = (direction: string) => {
    return direction === 'BUY' ? 'bg-green-100' : 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Intraday Trading Picks</h1>
              <p className="text-gray-600">Real-time trading signals for the past 7 days</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Last updated: 11:30 AM IST</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Date Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {last7Days.map(date => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                selectedDate === date
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {date}
            </button>
          ))}
        </div>

        {/* Picks Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Trading Signals for {selectedDate}</h2>
            <p className="text-gray-600 text-sm mt-1">Click on any pick for detailed analysis</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Entry</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Target</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Stop Loss</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Direction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPicks.length > 0 ? (
                  filteredPicks.map((pick, index) => (
                    <motion.tr
                      key={pick.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">{pick.symbol}</div>
                        <div className="text-sm text-gray-500">{pick.company}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">${pick.entry.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600">${pick.target.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm font-medium text-red-600">${pick.stopLoss.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDirectionBg(pick.direction)} ${getDirectionColor(pick.direction)}`}>
                          {pick.direction === 'BUY' ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {pick.direction}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-6">
                      No picks available for this date.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

         {/* Disclaimer */}
      <div className="p-4 text-sm text-gray-600 bg-yellow-100 border border-yellow-300 rounded mt-6">
  <strong>Disclaimer:</strong> The stock picks and levels (entry, target, and stop loss) shared on this page are for educational and informational purposes only. We are not SEBI-registered investment advisors. Trading and investing involve significant financial risk. Always consult with a registered financial advisor before making any trading decisions.
</div>


        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Trading?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get access to our premium trading signals and advanced analytics to maximize your trading potential.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Premium Access <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}









  
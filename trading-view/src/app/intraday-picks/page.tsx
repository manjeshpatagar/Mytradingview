'use client';
import { motion } from 'framer-motion';
import { Target, TrendingUp, TrendingDown, Clock, DollarSign, BarChart3, ArrowRight } from 'lucide-react';

export default function IntradayPicks() {
  const picks = [
    {
      id: 1,
      symbol: 'AAPL',
      company: 'Apple Inc.',
      entry: 185.50,
      target: 192.00,
      stopLoss: 182.00,
      direction: 'BUY',
      confidence: 'High',
      status: 'Active',
      time: '09:30 AM'
    },
    {
      id: 2,
      symbol: 'TSLA',
      company: 'Tesla Inc.',
      entry: 245.80,
      target: 252.00,
      stopLoss: 242.00,
      direction: 'BUY',
      confidence: 'Medium',
      status: 'Active',
      time: '09:45 AM'
    },
    {
      id: 3,
      symbol: 'MSFT',
      company: 'Microsoft Corp.',
      entry: 378.20,
      target: 385.00,
      stopLoss: 375.00,
      direction: 'BUY',
      confidence: 'High',
      status: 'Active',
      time: '10:00 AM'
    },
    {
      id: 4,
      symbol: 'GOOGL',
      company: 'Alphabet Inc.',
      entry: 142.50,
      target: 138.00,
      stopLoss: 145.00,
      direction: 'SELL',
      confidence: 'Medium',
      status: 'Active',
      time: '10:15 AM'
    },
    {
      id: 5,
      symbol: 'AMZN',
      company: 'Amazon.com Inc.',
      entry: 155.80,
      target: 162.00,
      stopLoss: 153.00,
      direction: 'BUY',
      confidence: 'High',
      status: 'Active',
      time: '10:30 AM'
    },
    {
      id: 6,
      symbol: 'NVDA',
      company: 'NVIDIA Corp.',
      entry: 890.50,
      target: 905.00,
      stopLoss: 885.00,
      direction: 'BUY',
      confidence: 'High',
      status: 'Active',
      time: '10:45 AM'
    }
  ];

  const stats = [
    {
      label: 'Total Picks',
      value: '156',
      icon: Target,
      color: 'text-blue-600'
    },
    {
      label: 'Success Rate',
      value: '87%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      label: 'Avg Return',
      value: '+4.2%',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      label: 'Active Signals',
      value: '12',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const getDirectionColor = (direction: string) => {
    return direction === 'BUY' ? 'text-green-600' : 'text-red-600';
  };

  const getDirectionBg = (direction: string) => {
    return direction === 'BUY' ? 'bg-green-100' : 'bg-red-100';
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Intraday Trading Picks</h1>
              <p className="text-gray-600">Real-time trading signals for today's market opportunities</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Last updated: 11:30 AM EST</span>
              </div>
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

        {/* Picks Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Today's Trading Signals</h2>
            <p className="text-gray-600 text-sm mt-1">Click on any pick for detailed analysis</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stop Loss</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Direction</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {picks.map((pick, index) => (
                  <motion.tr
                    key={pick.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{pick.symbol}</div>
                        <div className="text-sm text-gray-500">{pick.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">${pick.entry.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-green-600">${pick.target.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-red-600">${pick.stopLoss.toFixed(2)}</div>
                    </td>
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
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConfidenceColor(pick.confidence)}`}>
                        {pick.confidence}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-600">
                        {pick.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{pick.time}</div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Risk Disclaimer</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Trading involves substantial risk of loss and is not suitable for all investors. 
                  Past performance does not guarantee future results. Always conduct your own research 
                  and consider your financial situation before making any investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Trading?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get access to our premium trading signals and advanced analytics to maximize your trading potential.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Premium Access
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
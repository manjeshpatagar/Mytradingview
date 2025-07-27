'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Calendar,
  Filter,
  Search,
  ArrowUp,
  ArrowDown,
  Target,
  AlertTriangle,
  DollarSign,
  Percent,
  Volume,
  Clock,
  Star,
  Eye,
  Download
} from 'lucide-react';

export default function EODResults() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const performanceData = [
    {
      id: 1,
      symbol: 'AAPL',
      company: 'Apple Inc.',
      currentPrice: 185.64,
      previousClose: 178.50,
      change: 7.14,
      changePercent: 4.00,
      volume: 45678900,
      marketCap: '2.89T',
      breakout: true,
      shortSell: false,
      resistance: 190.00,
      support: 175.00,
      rsi: 65,
      volumeRatio: 1.2,
      sector: 'Technology',
      rating: 'Strong Buy',
      targetPrice: 200.00,
      stopLoss: 170.00
    },
    {
      id: 2,
      symbol: 'TSLA',
      company: 'Tesla Inc.',
      currentPrice: 245.30,
      previousClose: 258.90,
      change: -13.60,
      changePercent: -5.25,
      volume: 23456700,
      marketCap: '780.5B',
      breakout: false,
      shortSell: true,
      resistance: 260.00,
      support: 240.00,
      rsi: 35,
      volumeRatio: 0.8,
      sector: 'Automotive',
      rating: 'Sell',
      targetPrice: 220.00,
      stopLoss: 250.00
    },
    {
      id: 3,
      symbol: 'MSFT',
      company: 'Microsoft Corp.',
      currentPrice: 415.80,
      previousClose: 408.20,
      change: 7.60,
      changePercent: 1.86,
      volume: 18923400,
      marketCap: '3.09T',
      breakout: true,
      shortSell: false,
      resistance: 420.00,
      support: 405.00,
      rsi: 72,
      volumeRatio: 1.5,
      sector: 'Technology',
      rating: 'Buy',
      targetPrice: 450.00,
      stopLoss: 395.00
    },
    {
      id: 4,
      symbol: 'NVDA',
      company: 'NVIDIA Corp.',
      currentPrice: 890.45,
      previousClose: 875.30,
      change: 15.15,
      changePercent: 1.73,
      volume: 34567800,
      marketCap: '2.19T',
      breakout: true,
      shortSell: false,
      resistance: 900.00,
      support: 870.00,
      rsi: 68,
      volumeRatio: 1.8,
      sector: 'Technology',
      rating: 'Strong Buy',
      targetPrice: 950.00,
      stopLoss: 850.00
    },
    {
      id: 5,
      symbol: 'AMZN',
      company: 'Amazon.com Inc.',
      currentPrice: 165.20,
      previousClose: 172.80,
      change: -7.60,
      changePercent: -4.40,
      volume: 56789000,
      marketCap: '1.72T',
      breakout: false,
      shortSell: true,
      resistance: 175.00,
      support: 160.00,
      rsi: 28,
      volumeRatio: 0.9,
      sector: 'Consumer Discretionary',
      rating: 'Hold',
      targetPrice: 155.00,
      stopLoss: 170.00
    },
    {
      id: 6,
      symbol: 'GOOGL',
      company: 'Alphabet Inc.',
      currentPrice: 142.50,
      previousClose: 138.90,
      change: 3.60,
      changePercent: 2.59,
      volume: 23456700,
      marketCap: '1.79T',
      breakout: true,
      shortSell: false,
      resistance: 145.00,
      support: 140.00,
      rsi: 58,
      volumeRatio: 1.1,
      sector: 'Technology',
      rating: 'Buy',
      targetPrice: 155.00,
      stopLoss: 135.00
    }
  ];

  const filters = [
    { id: 'all', label: 'All Stocks', icon: BarChart3 },
    { id: 'breakout', label: 'Breakouts', icon: TrendingUp },
    { id: 'shortsell', label: 'Short Sell', icon: TrendingDown },
    { id: 'gainers', label: 'Top Gainers', icon: ArrowUp },
    { id: 'losers', label: 'Top Losers', icon: ArrowDown }
  ];

  const filteredData = performanceData.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    switch (selectedFilter) {
      case 'breakout':
        matchesFilter = stock.breakout;
        break;
      case 'shortsell':
        matchesFilter = stock.shortSell;
        break;
      case 'gainers':
        matchesFilter = stock.changePercent > 0;
        break;
      case 'losers':
        matchesFilter = stock.changePercent < 0;
        break;
      default:
        matchesFilter = true;
    }
    
    return matchesSearch && matchesFilter;
  });

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeBgColor = (change: number) => {
    return change >= 0 ? 'bg-green-100' : 'bg-red-100';
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Strong Buy': return 'bg-green-100 text-green-800';
      case 'Buy': return 'bg-blue-100 text-blue-800';
      case 'Hold': return 'bg-yellow-100 text-yellow-800';
      case 'Sell': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">EOD Results</h1>
              <p className="text-gray-600 mt-1">End of Day Stock Performance Analysis</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <button className="btn-secondary">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stocks</p>
                <p className="text-2xl font-bold text-gray-900">{performanceData.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Breakouts</p>
                <p className="text-2xl font-bold text-green-600">
                  {performanceData.filter(s => s.breakout).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Short Sell</p>
                <p className="text-2xl font-bold text-red-600">
                  {performanceData.filter(s => s.shortSell).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-500">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Gain</p>
                <p className="text-2xl font-bold text-green-600">
                  {((performanceData.reduce((sum, stock) => sum + stock.changePercent, 0) / performanceData.length) || 0).toFixed(2)}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500">
                <Percent className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{filter.label}</span>
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Stock Performance Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Signals
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technical
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((stock, index) => (
                  <motion.tr
                    key={stock.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{stock.symbol}</div>
                        <div className="text-sm text-gray-500">{stock.company}</div>
                        <div className="text-xs text-gray-400">{stock.sector}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">${stock.currentPrice}</div>
                      <div className="text-xs text-gray-500">Prev: ${stock.previousClose}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-semibold ${getChangeColor(stock.change)}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                      </div>
                      <div className={`text-xs ${getChangeColor(stock.changePercent)}`}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatVolume(stock.volume)}</div>
                      <div className="text-xs text-gray-500">Ratio: {stock.volumeRatio}x</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {stock.breakout && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Breakout
                          </span>
                        )}
                        {stock.shortSell && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            Short
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">RSI: {stock.rsi}</div>
                      <div className="text-xs text-gray-500">
                        R: ${stock.resistance} | S: ${stock.support}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRatingColor(stock.rating)}`}>
                        {stock.rating}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Target: ${stock.targetPrice}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Target className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BarChart3 className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No stocks found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 
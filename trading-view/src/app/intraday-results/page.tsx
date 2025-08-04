'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Calendar,
  Info
} from 'lucide-react';
import { getIntradayResults } from '../../services/intradyresultService';

type IntradayResult = {
  _id: string;
  stockName: string;
  entry: number;
  exit: number;
  return: number;
  status: 'success' | 'failure';
  profit: 'bye side' | 'sell side';
};

export default function IntradayResults() {
  const [results, setResults] = useState<IntradayResult[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchResults = async (showLoader = false) => {
    if (showLoader) setInitialLoading(true);
    try {
      const response = await getIntradayResults();
      setResults(response.data);
    } catch (error) {
      console.error("Failed to fetch intraday results:", error);
    } finally {
      if (showLoader) setInitialLoading(false);
    }
  };

  useEffect(() => {
    // Fetch once on mount with loader
    fetchResults(true);

    // Then every 5 seconds, refresh without loader
    const interval = setInterval(() => {
      fetchResults(false);
    }, 5000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Performance Analytics</h1>
              <p className="text-sm text-gray-600">Historical performance data and trading results</p>
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
            {initialLoading ? (
              <div className="text-center text-gray-500 py-8">Loading results...</div>
            ) : (
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
                  {results.length > 0 ? (
                    results.map((stock, index) => (
                      <motion.tr
                        key={stock._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4 whitespace-nowrap font-semibold text-gray-900">{stock.stockName}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">₹{stock.entry}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">₹{stock.exit}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`text-sm font-semibold ${stock.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.return >= 0 ? '+' : ''}{stock.return}%
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stock.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {stock.status === 'success' ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {stock.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold">
                          <span className={`${stock.profit === 'bye side' ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.profit}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        No results available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full z-50 bg-yellow-100 border-t-4 border-yellow-500 text-yellow-800 px-6 py-4 shadow-md">
          <div className="max-w-6xl mx-auto flex">
            <Info className="w-5 h-5 mr-3 mt-1 text-yellow-500" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Disclaimer:</p>
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

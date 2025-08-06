'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { getIntradayPicks } from "../../services/intradayService";

// Define a type for the intraday pick data from the API
type IntradayPick = {
  _id: string;
  stockSymbol: string;
  price: number;
  date: string; // This is a UTC ISO string from the API
  buyAbove: number;
  buyTarget: number;
  sellBelow: number;
  sellTarget: number;
};

export default function IntradayPicks() {
  const today = new Date();
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [allPicks, setAllPicks] = useState<IntradayPick[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPicks = async (showLoader = true) => {
      if (showLoader) setLoading(true);
      try {
        const response = await getIntradayPicks();
        let picksArray = [];
        if (response.data && Array.isArray(response.data.data)) {
          picksArray = response.data.data;
        } else if (Array.isArray(response.data)) {
          picksArray = response.data;
        } else {
          console.error("API response is not a valid array structure.");
          setError("Invalid data format from server.");
          if (showLoader) setLoading(false);
          return;
        }
        setAllPicks(picksArray);
      } catch (err) {
        console.error("Error fetching intraday picks:", err);
        setError("Failed to load picks. Please try again later.");
      } finally {
        if (showLoader) setLoading(false);
      }
    };

    fetchPicks(true);

    const interval = setInterval(() => {
      fetchPicks(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today.getTime() - i * 86400000);
    return formatDate(d);
  });

  const filteredPicks = allPicks.filter(p => p.date.split('T')[0] === selectedDate);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Loading intraday picks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 mb-1">Intraday Trading Picks</h1>
              <p className="text-sm text-gray-600">Real-time trading signals for the past 7 days</p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500 mt-2 sm:mt-0">
              <Clock className="w-4 h-4" />
              <span>
                Last updated: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Date Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {last7Days.map(date => {
            const isToday = date === formatDate(today);
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${selectedDate === date
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {isToday ? 'Today' : date}
              </button>
            );
          })}
        </div>

        {/* Picks Display */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Trading Signals for {selectedDate}</h2>
            <p className="text-gray-600 text-sm mt-1">Click on any pick for detailed analysis</p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-700 uppercase">Stock</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-600 uppercase">
                    <DollarSign className="inline w-4 h-4 mr-1" />Price
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-green-700 uppercase" title="Price to trigger a Buy trade">
                    <TrendingUp className="inline w-4 h-4 mr-1" />Buy Above
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-green-700 uppercase" title="Expected upside target">
                    🎯 Target
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-red-700 uppercase" title="Price to trigger a Sell trade">
                    <TrendingDown className="inline w-4 h-4 mr-1" />Sell Below
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-red-700 uppercase" title="Expected downside target">
                    🎯 Target
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPicks.length > 0 ? (
                  filteredPicks.map((pick, index) => (
                    <motion.tr
                      key={pick._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 text-md font-semibold text-gray-900">{pick.stockSymbol}</td>
                      <td className="px-6 py-4 text-md text-blue-600">₹{pick.price}</td>
                      <td className="px-6 py-4 text- text-green-700 font-medium">₹{pick.buyAbove}</td>
                      <td className="px-6 py-4 text-md text-green-700 font-medium">₹{pick.buyTarget}</td>
                      <td className="px-6 py-4 text-md text-red-600 font-medium">₹{pick.sellBelow}</td>
                      <td className="px-6 py-4 text-md text-red-600 font-medium">₹{pick.sellTarget}</td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-6">
                      No picks available for this date.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden p-4">
            {filteredPicks.length > 0 ? (
              <div className="space-y-4">
                {filteredPicks.map((pick, index) => (
                  <motion.div
                    key={pick._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{pick.stockSymbol}</h3>
                      <span className="text-lg font-semibold text-blue-600">
                        ₹{pick.price}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Buy Section */}
                      <div>
                        <div className="flex items-center text-green-700 mb-1">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          <span className="font-semibold">Buy</span>
                        </div>
                        <div className="ml-6 text-sm text-gray-600">
                          <p>Above: <span className="font-medium text-gray-900">₹{pick.buyAbove}</span></p>
                          <p>Target: <span className="font-medium text-gray-900">₹{pick.buyTarget}</span></p>
                        </div>
                      </div>

                      {/* Sell Section */}
                      <div>
                        <div className="flex items-center text-red-600 mb-1">
                          <TrendingDown className="w-4 h-4 mr-2" />
                          <span className="font-semibold">Sell</span>
                        </div>
                        <div className="ml-6 text-sm text-gray-600">
                          <p>Below: <span className="font-medium text-gray-900">₹{pick.sellBelow}</span></p>
                          <p>Target: <span className="font-medium text-gray-900">₹{pick.sellTarget}</span></p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-6">
                No picks available for this date.
              </p>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-100 border-t border-yellow-300 text-gray-800 text-sm p-4 shadow-md rounded-md">
          <div className="max-w-7xl mx-auto">
            <p>
              <strong>Disclaimer:</strong> The "Buy Above" or "Sell Below" levels are provided for educational purposes only.
              When a stock crosses the Buy Above or Sell Below price, it's a potential trade opportunity — but hitting the full target is not guaranteed.
              We suggest booking <strong>2–3% profit</strong> if momentum weakens. Use stop-loss and risk management.
              We are <strong>not SEBI-registered advisors</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
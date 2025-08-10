'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from 'lucide-react';
import { getIntradayPicks } from "../../services/intradayService";

type IntradayPick = {
  _id: string;
  stockSymbol: string;
  price: number;
  date: string;
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
        let picksArray: IntradayPick[] = [];

        if (response.data && Array.isArray(response.data.data)) {
          picksArray = response.data.data;
        } else if (Array.isArray(response.data)) {
          picksArray = response.data;
        } else {
          throw new Error("Invalid data format from server.");
        }

        setAllPicks(picksArray);
        setError(null);
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

  const filteredPicks = allPicks.filter(
    p => p.date.split('T')[0] === selectedDate
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 mb-1">Intraday Trading Picks</h1>
            <p className="text-sm text-gray-600">Real-time trading signals for the past 7 days</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-2 sm:mt-0">
            <Clock className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Date Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {last7Days.map(date => {
            const isToday = date === formatDate(today);
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  selectedDate === date
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {isToday ? 'Today' : date}
              </button>
            );
          })}
        </div>

        {/* Picks Table */}
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
                  <th className="px-6 py-4 text-left text-lg font-medium text-green-700 uppercase">
                    <TrendingUp className="inline w-4 h-4 mr-1" />Buy Above
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-green-700 uppercase">🎯 Target</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-red-700 uppercase">
                    <TrendingDown className="inline w-4 h-4 mr-1" />Sell Below
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-red-700 uppercase">🎯 Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      Loading intraday picks...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-red-600 font-medium">
                      {error}
                    </td>
                  </tr>
                ) : filteredPicks.length > 0 ? (
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
                      <td className="px-6 py-4">
                        <span className="text-black bg-green-400 font-medium px-2 py-1 rounded">₹{pick.buyAbove}</span>
                      </td>
                      <td className="px-6 py-4 text-md text-green-700 font-medium">₹{pick.buyTarget}</td>
                      <td className="px-6 py-4">
                        <span className="text-black bg-red-400 font-medium px-2 py-1 rounded">₹{pick.sellBelow}</span>
                      </td>
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
            {loading ? (
              <p className="text-center text-gray-500 py-6">Loading intraday picks...</p>
            ) : error ? (
              <p className="text-center text-red-600 py-6">{error}</p>
            ) : filteredPicks.length > 0 ? (
              <div className="space-y-4">
                {filteredPicks.map((pick, index) => (
                  <motion.div
                    key={pick._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{pick.stockSymbol}</h3>
                      <span className="text-lg font-semibold text-blue-600">₹{pick.price}</span>
                    </div>
                    <div className="flex flex-col gap-[15px]">
                      <div>
                        <div className="flex items-center text-green-700 mb-1">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          <span className="font-semibold">Buy</span>
                        </div>
                        <div className="ml-6 text-sm text-gray-600 space-y-3">
                          <p>Above: <span className="font-large text-black bg-green-400 px-2 py-1 rounded">₹{pick.buyAbove}</span></p>
                          <p>Target: <span className="font-medium text-gray-900">₹{pick.buyTarget}</span></p>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center text-red-600 mb-1 ">
                          <TrendingDown className="w-4 h-4 mr-2" />
                          <span className="font-semibold">Sell</span>
                        </div>
                        <div className="ml-6 text-sm text-gray-600 space-y-3">
                          <p>Below: <span className="font-medium text-black bg-red-400 px-2 py-1 rounded">₹{pick.sellBelow}</span></p>
                          <p>Target: <span className="font-medium text-gray-900">₹{pick.sellTarget}</span></p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-6">No picks available for this date.</p>
            )}
          </div>
        </div>

        {/* Quick Guide */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
          <h3 className="text-md font-semibold text-blue-800 mb-2">📘 Quick Guide</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li><strong>Buy Above:</strong> If the stock trades above this price, consider a <span className="text-green-700 font-medium">Buy</span> position.</li>
            <li><strong>Buy Target:</strong> Expected upside after Buy Above trigger. Book profits gradually at 2–3% gains.</li>
            <li><strong>Sell Below:</strong> If the stock falls below this price, consider a <span className="text-red-600 font-medium">Sell</span> position.</li>
            <li><strong>Sell Target:</strong> Expected downside after Sell Below trigger. Lock profits early if momentum slows.</li>
            <li>Always use a Stop Loss. Targets are indicative, not guaranteed.</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-100 border-t border-yellow-300 text-gray-800 text-sm p-4 shadow-md rounded-md">
          <p>
            <strong>Disclaimer:</strong> The provided levels are for educational purposes only.
            Full targets are not guaranteed. Book 2–3% gains when possible, and always manage risk.
            We are <strong>not SEBI-registered advisors</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

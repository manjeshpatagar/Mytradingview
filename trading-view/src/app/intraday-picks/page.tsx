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
    const fetchPicks = async () => {
      try {
        const response = await getIntradayPicks();
        console.log("Raw API Response:", response);
        
        let picksArray = [];
        // Handle both possible API response structures
        if (response.data && Array.isArray(response.data.data)) {
          picksArray = response.data.data;
        } else if (Array.isArray(response.data)) {
          picksArray = response.data;
        } else {
          console.error("API response is not a valid array structure.");
          setError("Invalid data format from server.");
          setLoading(false);
          return;
        }

        console.log("Parsed picksArray:", picksArray);
        setAllPicks(picksArray);
      } catch (err) {
        console.error("Error fetching intraday picks:", err);
        setError("Failed to load picks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPicks();
  }, []);

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today.getTime() - i * 86400000);
    return formatDate(d);
  });

  // Corrected filtering logic: Format the API date string directly
  // This avoids timezone conversion issues
  const filteredPicks = allPicks.filter(p => p.date.split('T')[0] === selectedDate);
  console.log("Filtered Picks for", selectedDate, ":", filteredPicks);

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
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Intraday Trading Picks</h1>
              <p className="text-gray-600">Real-time trading signals for the past 7 days</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} IST</span>
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

          <div className="overflow-x-auto">
            <table className="w-full">
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
                      <td className="px-6 py-4 text-md text-green-700 font-medium">₹{pick.buyAbove}</td>
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
        </div>

        {/* Disclaimer */}
        <div className="p-4 text-md text-gray-600 bg-yellow-100 border border-yellow-300 rounded mt-6">
          <strong>Disclaimer:</strong> The "Buy Above" or "Sell Below" levels are provided for educational purposes only.
          When a stock crosses the Buy Above or Sell Below price, it's a potential trade opportunity — but hitting the full target is not guaranteed.
          We suggest booking 2–3% profit if momentum weakens. Use stop-loss and risk management. We are not SEBI-registered advisors.
        </div>

        {/* Premium CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Upgrade for Daily Accurate Picks</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get real-time alerts, detailed chart analysis, and exclusive trading setups. Start your 7-day free trial now!
            </p>
            <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Premium Access <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

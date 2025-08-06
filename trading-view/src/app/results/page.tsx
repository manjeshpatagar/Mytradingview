'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import { getAllResults } from "../../services/resultsService";

// Define a type for the event data from the API.
// This type is a slight variation of what you had, aligning with a common API response structure.
type Event = {
  _id?: string;
  type: 'earnings' | 'dividend' | 'event';
  importance: 'high' | 'medium' | 'low';
  companyName: string;
  symbol: string;
  date: string;
  time: string;
  description: string;
  expectedEPS?: number;
  previousEPS?: number;
  dividend?: number;
  exDate?: string;
};

export default function Results() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to format a date string to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to get the color for importance based on the value
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get the color for the event type
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'earnings': return 'bg-blue-100 text-blue-800';
      case 'dividend': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await getAllResults();
        const resultsData = res.data?.data || res.data;
        if (!resultsData) {
          throw new Error("No data received from server.");
        }
        if (Array.isArray(resultsData)) {
          const today = new Date();
          const todayStr = today.toISOString().split('T')[0]; // 'YYYY-MM-DD'

          const todaysEvents = resultsData.filter((event: Event) => {
            const eventDateStr = new Date(event.date).toISOString().split('T')[0];
            return eventDateStr === todayStr;
          });

          setEvents(todaysEvents);
        } else {
          setError("Invalid data format from server.");
        }
      } catch (err) {
        console.error("Failed to fetch results", err);
        setError("Failed to load results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults(); // Initial fetch

    const interval = setInterval(fetchResults, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Loading corporate events...</p>
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
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4"> {/* Reduced py-8 to py-4 */}
          <div className="flex items-center space-x-3 mb-2"> {/* mb-4 to mb-2 */}
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" /> {/* Slightly smaller icon */}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Results & Events</h1> {/* text-3xl → text-2xl */}
              <p className="text-sm text-gray-600">Today's earnings, dividends, and corporate events</p> {/* Smaller text */}
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Events Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Today's Events</h2>
            <p className="text-gray-600">Corporate events and announcements</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Importance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <motion.tr
                      key={event._id || `${event.symbol}-${event.date}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{event.companyName}</div>
                          <div className="text-sm text-gray-500">{event.symbol}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{formatDate(event.date)}</div>
                        <div className="text-sm text-gray-500">{event.time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{event.description}</div>
                        {event.type === 'earnings' && event.expectedEPS && event.previousEPS && (
                          <div className="text-sm text-gray-500 mt-1">
                            Expected: ₹{event.expectedEPS} | Previous: ₹{event.previousEPS} |
                            Growth: {((event.expectedEPS - event.previousEPS) / event.previousEPS * 100).toFixed(1)}%
                          </div>
                        )}
                        {event.type === 'dividend' && event.dividend && (
                          <div className="text-sm text-gray-500 mt-1">
                            Dividend: ₹{event.dividend} per share
                            {event.exDate && ` | Ex-Date: ${formatDate(event.exDate)}`}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImportanceColor(event.importance)}`}>
                          {event.importance}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-6">
                      No events available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-100 border-t border-yellow-300 text-gray-800 text-sm p-4 shadow-md rounded-md">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Important Notice</h3>
                <div className="mt-1 text-sm text-blue-700">
                  <p>
                    This information is for reference purposes only. Please verify all dates and details
                    from official company announcements. Market reactions to these events may vary.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

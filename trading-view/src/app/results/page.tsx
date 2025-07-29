'use client';

import { motion } from 'framer-motion';
import { Calendar, TrendingUp, DollarSign, Clock, AlertTriangle } from 'lucide-react';

type Event = {
  type: 'Earnings' | 'Dividend' | 'Event';
  company: string;
  symbol: string;
  date: string;
  time: string;
  importance: 'High' | 'Medium' | 'Low';
  expectedEPS?: number;
  previousEPS?: number;
  dividend?: number;
  exDate?: string;
  description?: string;
};

export default function Results() {
  const events: Event[] = [
    {
      type: 'Earnings',
      company: 'Reliance Industries',
      symbol: 'RELIANCE',
      date: '2024-01-25',
      time: 'After Market',
      importance: 'High',
      expectedEPS: 25.5,
      previousEPS: 23.2,
      description: 'Q3 FY24 Earnings Release'
    },
    {
      type: 'Dividend',
      company: 'TCS',
      symbol: 'TCS',
      date: '2024-01-26',
      time: 'Record Date',
      importance: 'Medium',
      dividend: 24,
      exDate: '2024-01-24',
      description: 'Interim Dividend ₹24 per share'
    },
    {
      type: 'Earnings',
      company: 'Infosys',
      symbol: 'INFY',
      date: '2024-01-27',
      time: 'Before Market',
      importance: 'High',
      expectedEPS: 18.7,
      previousEPS: 17.9,
      description: 'Q3 FY24 Earnings Release'
    },
    {
      type: 'Event',
      company: 'HDFC Bank',
      symbol: 'HDFC',
      date: '2024-01-28',
      time: '10:00 AM',
      importance: 'Medium',
      description: 'Board Meeting - Fund Raising'
    },
    {
      type: 'Dividend',
      company: 'ITC',
      symbol: 'ITC',
      date: '2024-01-29',
      time: 'Record Date',
      importance: 'Low',
      dividend: 6.25,
      exDate: '2024-01-27',
      description: 'Interim Dividend ₹6.25 per share'
    },
    {
      type: 'Earnings',
      company: 'Wipro',
      symbol: 'WIPRO',
      date: '2024-01-30',
      time: 'After Market',
      importance: 'High',
      expectedEPS: 12.3,
      previousEPS: 11.8,
      description: 'Q3 FY24 Earnings Release'
    }
  ];

  const stats = [
    { title: 'Earnings', value: '12', change: '+3', icon: TrendingUp },
    { title: 'Dividends', value: '8', change: '+2', icon: DollarSign },
    { title: 'Events', value: '15', change: '+5', icon: Calendar },
    { title: 'This Week', value: '6', change: '+1', icon: Clock }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Earnings': return 'bg-blue-100 text-blue-800';
      case 'Dividend': return 'bg-green-100 text-green-800';
      case 'Event': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Results & Events</h1>
              <p className="text-gray-600">Toady earnings, dividends, and corporate events</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
      

        {/* Events Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Today Events</h2>
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
                {events.map((event, index) => (
                  <motion.tr
                    key={`${event.symbol}-${event.date}`}
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
                        <div className="text-sm font-semibold text-gray-900">{event.company}</div>
                        <div className="text-sm text-gray-500">{event.symbol}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{formatDate(event.date)}</div>
                      <div className="text-sm text-gray-500">{event.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{event.description}</div>
                      {event.type === 'Earnings' && event.expectedEPS && event.previousEPS && (
                        <div className="text-sm text-gray-500 mt-1">
                          Expected: ₹{event.expectedEPS} | Previous: ₹{event.previousEPS} | 
                          Growth: {((event.expectedEPS - event.previousEPS) / event.previousEPS * 100).toFixed(1)}%
                        </div>
                      )}
                      {event.type === 'Dividend' && event.dividend && (
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Important Notice</h3>
              <div className="mt-2 text-sm text-blue-700">
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
  );
} 
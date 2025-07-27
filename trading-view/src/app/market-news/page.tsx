'use client';

import { motion } from 'framer-motion';
import { Globe, Clock, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';

export default function MarketNews() {
  const news = [
    {
      id: 1,
      title: 'Sensex Hits New All-Time High Amid Strong Global Cues',
      category: 'Markets',
      summary: 'Indian markets surge to record levels as global risk sentiment improves and foreign investors continue buying.',
      sentiment: 'Positive',
      time: '1 hour ago',
      source: 'Economic Times',
      impact: 'High',
      url: '#'
    },
    {
      id: 2,
      title: 'RBI Maintains Repo Rate at 6.5% in Latest Policy Meet',
      category: 'Policy',
      summary: 'Reserve Bank of India keeps interest rates unchanged while maintaining accommodative stance for growth.',
      sentiment: 'Neutral',
      time: '3 hours ago',
      source: 'Business Standard',
      impact: 'High',
      url: '#'
    },
    {
      id: 3,
      title: 'Global Oil Prices Fall on Demand Concerns',
      category: 'Commodities',
      summary: 'Crude oil prices decline as concerns over global economic slowdown weigh on demand outlook.',
      sentiment: 'Negative',
      time: '5 hours ago',
      source: 'Financial Express',
      impact: 'Medium',
      url: '#'
    },
    {
      id: 4,
      title: 'US Fed Signals Potential Rate Cuts in 2024',
      category: 'Global',
      summary: 'Federal Reserve officials indicate possible interest rate reductions as inflation shows signs of cooling.',
      sentiment: 'Positive',
      time: '7 hours ago',
      source: 'Reuters',
      impact: 'High',
      url: '#'
    },
    {
      id: 5,
      title: 'Rupee Strengthens Against Dollar',
      category: 'Forex',
      summary: 'Indian rupee gains ground against US dollar supported by strong foreign fund inflows.',
      sentiment: 'Positive',
      time: '9 hours ago',
      source: 'Mint',
      impact: 'Medium',
      url: '#'
    },
    {
      id: 6,
      title: 'Gold Prices Hit Record High',
      category: 'Commodities',
      summary: 'Gold prices surge to all-time high as investors seek safe haven amid market volatility.',
      sentiment: 'Positive',
      time: '11 hours ago',
      source: 'Economic Times',
      impact: 'Medium',
      url: '#'
    }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive': return 'bg-green-100 text-green-800';
      case 'Negative': return 'bg-red-100 text-red-800';
      case 'Neutral': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Markets': return 'bg-blue-100 text-blue-800';
      case 'Policy': return 'bg-purple-100 text-purple-800';
      case 'Commodities': return 'bg-yellow-100 text-yellow-800';
      case 'Global': return 'bg-indigo-100 text-indigo-800';
      case 'Forex': return 'bg-green-100 text-green-800';
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
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Market News</h1>
              <p className="text-gray-600">Global market headlines and economic updates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(item.sentiment)}`}>
                      {item.sentiment === 'Positive' ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : item.sentiment === 'Negative' ? (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      ) : null}
                      {item.sentiment}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {item.impact} Impact
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.time}
                    </div>
                    <span>{item.source}</span>
                  </div>
                  <a 
                    href={item.url}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Read More
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
            Load More News
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-800">Market News Disclaimer</h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  Market news is sourced from various financial publications. This information is for 
                  educational purposes only and should not be considered as investment advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
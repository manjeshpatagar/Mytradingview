'use client';

import { motion } from 'framer-motion';
import { Newspaper, Clock, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';

export default function StockNews() {
  const news = [
    {
      id: 1,
      title: 'Reliance Industries Q3 Results Beat Estimates',
      company: 'RELIANCE',
      summary: 'Reliance Industries reported better-than-expected Q3 results with strong performance in retail and digital services.',
      sentiment: 'Positive',
      time: '2 hours ago',
      source: 'Economic Times',
      impact: 'High',
      url: '#'
    },
    {
      id: 2,
      title: 'TCS Announces New AI Partnership',
      company: 'TCS',
      summary: 'Tata Consultancy Services partners with leading AI firm to enhance digital transformation capabilities.',
      sentiment: 'Positive',
      time: '4 hours ago',
      source: 'Business Standard',
      impact: 'Medium',
      url: '#'
    },
    {
      id: 3,
      title: 'Infosys Faces Client Project Delays',
      company: 'INFY',
      summary: 'Infosys reports delays in some client projects due to macroeconomic uncertainties.',
      sentiment: 'Negative',
      time: '6 hours ago',
      source: 'Financial Express',
      impact: 'Medium',
      url: '#'
    },
    {
      id: 4,
      title: 'HDFC Bank Expands Digital Banking Services',
      company: 'HDFC',
      summary: 'HDFC Bank launches new digital banking features to enhance customer experience.',
      sentiment: 'Positive',
      time: '8 hours ago',
      source: 'Mint',
      impact: 'Low',
      url: '#'
    },
    {
      id: 5,
      title: 'Wipro Wins Major IT Contract',
      company: 'WIPRO',
      summary: 'Wipro secures a significant IT services contract from a Fortune 500 company.',
      sentiment: 'Positive',
      time: '10 hours ago',
      source: 'Economic Times',
      impact: 'High',
      url: '#'
    },
    {
      id: 6,
      title: 'ITC Reports Strong FMCG Growth',
      company: 'ITC',
      summary: 'ITC shows robust growth in FMCG segment with improved market share.',
      sentiment: 'Positive',
      time: '12 hours ago',
      source: 'Business Standard',
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
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
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Stock News</h1>
              <p className="text-gray-600">Latest company-specific news and updates</p>
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
                    <span className="text-sm font-semibold text-gray-900">{item.company}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(item.sentiment)}`}>
                      {item.sentiment === 'Positive' ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : item.sentiment === 'Negative' ? (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      ) : null}
                      {item.sentiment}
                    </span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(item.impact)}`}>
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
              <Newspaper className="h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-800">News Disclaimer</h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  News content is aggregated from various sources for informational purposes only. 
                  Please verify information from official sources before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
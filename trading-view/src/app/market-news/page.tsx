'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Clock, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { getAllMarketNews } from '@/services/marketNewsService';

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

const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const then = new Date(dateString);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return `${Math.floor(interval)} years ago`;
  interval = seconds / 2592000;
  if (interval > 1) return `${Math.floor(interval)} months ago`;
  interval = seconds / 86400;
  if (interval > 1) return `${Math.floor(interval)} days ago`;
  interval = seconds / 3600;
  if (interval > 1) return `${Math.floor(interval)} hours ago`;
  interval = seconds / 60;
  if (interval > 1) return `${Math.floor(interval)} minutes ago`;
  return `${Math.floor(seconds)} seconds ago`;
};

export default function MarketNewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = async (isInitial = false) => {
    try {
      if (isInitial) setInitialLoading(true);
      const response = await getAllMarketNews();
      const articles = response.data || [];

      const today = new Date().toDateString();
      const todayNews = articles.filter((item: any) =>
        new Date(item.createdAt).toDateString() === today
      );

      setNews(todayNews);
    } catch (err) {
      console.error('Error loading news:', err);
      setError('Unable to load market news.');
    } finally {
      if (isInitial) setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadNews(true); // Load initially
    const interval = setInterval(() => {
      loadNews(false); // Silent refresh
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative pb-28">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Market News</h1>
              <p className="text-gray-600 text-sm">Auto-refresh every 5 seconds • Today only</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {initialLoading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-gray-600">Loading market news...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-red-600">{error}</p>
          </div>
        ) : news.length > 0 ? (
          <div className="space-y-6">
            {news.map((item, index) => {
              const sentiment = item.sentiment?.[0]?.toUpperCase() + item.sentiment?.slice(1).toLowerCase();
              const category = item.category?.[0]?.toUpperCase() + item.category?.slice(1).toLowerCase();

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col lg:flex-row"
                >
                  <img
                    src={item.image || 'https://via.placeholder.com/400x200.png?text=Market+News'}
                    alt={item.title}
                    className="w-full lg:w-64 h-48 lg:h-auto object-cover"
                  />

                  <div className="p-6 flex flex-col justify-between w-full">
                    <div>
                      <div className="flex items-center flex-wrap gap-2 mb-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                          {category}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(sentiment)}`}>
                          {sentiment === 'Positive' ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : sentiment === 'Negative' ? (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          ) : null}
                          {sentiment}
                        </span>
                      </div>

                  <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1" title={item.title}>
                    {item.title.length > 30 ? item.title.slice(0, 30) + '...' : item.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={item.summary}>
                    {item.summary.length > 50 ? item.summary.slice(0, 100) + '...' : item.summary}
                  </p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatTimeAgo(item.createdAt)}
                      </div>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Read More
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10 min-h-[50vh]">
            <p>No news available for today.</p>
          </div>
        )}
      </div>

      {/* Fixed bottom disclaimer */}
      <div className="fixed bottom-0 inset-x-0 bg-yellow-50 border-t border-yellow-300 shadow-inner z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Globe className="h-5 w-5 text-yellow-500 mt-1" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-yellow-800">Market News Disclaimer</h3>
            <p className="text-sm text-yellow-700 mt-1">
              News is aggregated from various sources for informational purposes only. Please verify from official sources before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

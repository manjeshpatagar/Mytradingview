'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Newspaper,
  Clock,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Minus,
} from 'lucide-react';
import { getAllStockNews } from '../../services/stockNewsService';

// Define the type for the news item
type NewsItem = {
  _id: string;
  title: string;
  company: string;
  symbol: string;
  summary: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  createdAt: string;
  url: string;
  image?: string;
};

// Helper to color-code sentiment
const getSentimentColor = (sentiment: string) => {
  switch (sentiment.toLowerCase()) {
    case 'positive':
      return 'bg-green-100 text-green-700';
    case 'negative':
      return 'bg-red-100 text-red-700';
    case 'neutral':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// Format time ago
const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const then = new Date(dateString);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  return Math.floor(seconds) + ' seconds ago';
};

export default function StockNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getAllStockNews();
        const newsData = res.data?.data || res.data;

        if (Array.isArray(newsData)) {
          const today = new Date().toISOString().split('T')[0];
          const todaysNews = newsData.filter((item: NewsItem) => {
            const createdDate = new Date(item.createdAt).toISOString().split('T')[0];
            return createdDate === today;
          });

          setNews(todaysNews);
        } else {
          setError('Invalid data format from server.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load news.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Loading stock news...</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Stock News</h1>
              <p className="text-sm text-gray-600">Today’s company updates & sentiments</p>
            </div>
          </div>
        </div>
      </div>

      {/* News List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-6">
          {news.length > 0 ? (
            news.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition-shadow flex flex-col sm:flex-row"
              >
                {/* Image */}
                <div className="sm:w-48 w-full h-48 sm:h-auto flex-shrink-0">
                  <img
                    src={
                      item.image ||
                      `https://placehold.co/400x400/E5E7EB/6B7280?text=${item.company}+News`
                    }
                    alt={item.title}
                    className="w-full h-full object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-4 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{item.company}</span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(
                        item.sentiment
                      )}`}
                    >
                      {item.sentiment.toLowerCase() === 'positive' && (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      )}
                      {item.sentiment.toLowerCase() === 'negative' && (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {item.sentiment.toLowerCase() === 'neutral' && (
                        <Minus className="w-3 h-3 mr-1" />
                      )}
                      {item.sentiment}
                    </span>
                  </div>

                  <h3
                    className="text-base font-semibold text-gray-900 mb-1 line-clamp-1"
                    title={item.title}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="text-sm text-gray-600 mb-3 line-clamp-2"
                    title={item.summary}
                  >
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatTimeAgo(item.createdAt)}
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Read More
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              <p>No news available today.</p>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 bg-yellow-100 border-t border-yellow-300 text-gray-800 text-sm p-4 shadow-md rounded-md">
        <div className="max-w-3xl mx-auto p-4">
          <div className="flex items-start gap-3">
            <Newspaper className="h-5 w-5 text-yellow-500 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-yellow-800">
                News Disclaimer
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                News content is aggregated from various sources for informational purposes only.
                Verify with official sources before investing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

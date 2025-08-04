'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Clock, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { getAllStockNews } from "../../services/stockNewsService";

// Define a type for the news data from the API
type NewsItem = {
  _id: string; // The unique ID from the database
  title: string;
  company: string;
  symbol: string; // Added symbol field for consistency with other components
  summary: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  createdAt: string; // Using createdAt timestamp from the API
  url: string;
  image?: string; // Optional image URL
};

export default function StockNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to get the color for sentiment
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive': return 'bg-green-100 text-green-800';
      case 'Negative': return 'bg-red-100 text-red-800';
      case 'Neutral': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to format the time since the news was posted
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const then = new Date(dateString);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };

  // Fetch news data on component mount
 useEffect(() => {
  const fetchNews = async () => {
    try {
      const res = await getAllStockNews();
      const newsData = res.data?.data || res.data;

      if (Array.isArray(newsData)) {
        const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

        const todaysNews = newsData.filter((item: NewsItem) => {
          const createdDate = new Date(item.createdAt).toISOString().split('T')[0];
          return createdDate === today;
        });

        setNews(todaysNews);
      } else {
        console.error("API response is not a valid array structure.");
        setError("Invalid data format from server.");
      }
    } catch (err) {
      console.error("Failed to fetch stock news", err);
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  fetchNews(); // Initial load

  const interval = setInterval(fetchNews, 5000); // Refresh every 5 seconds

  return () => clearInterval(interval); // Cleanup on unmount
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
          {news.length > 0 ? (
            news.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img 
                    src={item.image || `https://placehold.co/600x400/E5E7EB/6B7280?text=${item.company}+News`}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
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
                        {formatTimeAgo(item.createdAt)}
                      </div>
                    </div>
                    <a 
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Read More
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="lg:col-span-2 text-center text-gray-500 py-10">
              <p>No news articles available at the moment.</p>
            </div>
          )}
        </div>
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
  );
}

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
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">Stock News</h1>
              <p className="text-sm text-gray-600 leading-snug">Latest company-specific news and updates</p>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* News Grid */}
        <div className="flex flex-col gap-6 mb-8">
          {news.length > 0 ? (
            news.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex"
              >
                {/* Left: Image */}
                <div className="w-48 h-auto flex-shrink-0">
                  <img
                    src={item.image || `https://placehold.co/400x400/E5E7EB/6B7280?text=${item.company}+News`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right: Content */}
                <div className="flex flex-col justify-between p-6 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{item.company}</span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(
                        item.sentiment
                      )}`}
                    >
                      {item.sentiment === 'Positive' ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : null}
                      {item.sentiment === 'Negative' ? (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      ) : null}
                      {item.sentiment}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1" title={item.title}>
                    {item.title.length > 30 ? item.title.slice(0, 30) + '...' : item.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2" title={item.summary}>
                    {item.summary.length > 50 ? item.summary.slice(0, 100) + '...' : item.summary}
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
              <p>No news articles available at the moment.</p>
            </div>
          )}

        </div>
      </div>

      {/* Disclaimer */}
      <div className="fixed bottom-0 w-full z-40 bg-yellow-50 border-t border-yellow-300">
        <div className="flex justify-center">
          <div className="rounded-xl p-4 w-full max-w-3xl shadow-sm m-2 ">
            <div className="flex">
              <div className="flex-shrink-0">
                <Newspaper className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-yellow-800">News Disclaimer</h3>
                <div className="mt-1 text-sm text-yellow-700">
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


    </div>
  );
}

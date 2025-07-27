'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  Tag,
  MoreVertical,
  ArrowLeft
} from 'lucide-react';

export default function NewsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const newsData = [
    {
      id: 1,
      title: 'Apple Stock Surges After Q4 Earnings Beat',
      excerpt: 'Apple Inc. reported better-than-expected quarterly earnings, sending shares up 5% in after-hours trading.',
      category: 'Stock News',
      status: 'Published',
      author: 'John Smith',
      date: '2024-01-15',
      views: 1247,
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Federal Reserve Announces Interest Rate Decision',
      excerpt: 'The Federal Reserve maintained current interest rates while signaling potential future adjustments.',
      category: 'Market News',
      status: 'Draft',
      author: 'Sarah Johnson',
      date: '2024-01-14',
      views: 0,
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Tesla Reports Record Vehicle Deliveries',
      excerpt: 'Tesla delivered a record number of vehicles in Q4, exceeding analyst expectations.',
      category: 'Stock News',
      status: 'Published',
      author: 'Mike Wilson',
      date: '2024-01-13',
      views: 892,
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      title: 'Global Markets React to Economic Data',
      excerpt: 'Major indices worldwide responded to the latest economic indicators with mixed results.',
      category: 'Market News',
      status: 'Published',
      author: 'Lisa Chen',
      date: '2024-01-12',
      views: 567,
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      title: 'Microsoft Cloud Services Revenue Soars',
      excerpt: 'Microsoft reported strong growth in cloud services, driving overall revenue higher.',
      category: 'Stock News',
      status: 'Scheduled',
      author: 'David Brown',
      date: '2024-01-11',
      views: 0,
      image: '/api/placeholder/300/200'
    }
  ];

  const categories = ['all', 'Stock News', 'Market News', 'Analysis', 'Breaking News'];
  const statuses = ['all', 'Published', 'Draft', 'Scheduled', 'Archived'];

  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || news.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Stock News': return 'bg-blue-100 text-blue-800';
      case 'Market News': return 'bg-purple-100 text-purple-800';
      case 'Analysis': return 'bg-orange-100 text-orange-800';
      case 'Breaking News': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
            </div>
            <Link
              href="/admin/news/new"
              className="btn-primary"
            >
              <Plus className="w-4 h-4" />
              Add News
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-end">
              <span className="text-sm text-gray-600">
                {filteredNews.length} of {newsData.length} articles
              </span>
            </div>
          </div>
        </div>

        {/* News List */}
        <div className="space-y-6">
          {filteredNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{news.title}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(news.status)}`}>
                        {news.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(news.category)}`}>
                        {news.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{news.excerpt}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{news.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="w-4 h-4" />
                        <span>{news.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{news.views} views</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/admin/news/${news.id}/edit`}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No news found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
            <Link
              href="/admin/news/new"
              className="btn-primary"
            >
              <Plus className="w-4 h-4" />
              Add First News
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 
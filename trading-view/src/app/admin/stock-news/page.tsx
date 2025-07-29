'use client';

import { motion } from 'framer-motion';
import { 
  Newspaper, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  ExternalLink,
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Eye,
  Filter,
  Search
} from 'lucide-react';
import { useState } from 'react';

type NewsItem = {
  id: string;
  title: string;
  company: string;
  summary: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  time: string;
  url: string;
  category: string;
  image: string;
};

export default function AdminStockNews() {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'Reliance Industries Q3 Results Beat Estimates',
      company: 'RELIANCE',
      summary: 'Reliance Industries reported better-than-expected Q3 results with strong performance in retail and digital services.',
      sentiment: 'Positive',
      time: '2 hours ago',
      url: '#',
      category: 'Earnings',
      image: '/images/reliance-earnings.jpg'
    },
    {
      id: '2',
      title: 'TCS Announces New AI Partnership',
      company: 'TCS',
      summary: 'Tata Consultancy Services partners with leading AI firm to enhance digital transformation capabilities.',
      sentiment: 'Positive',
      time: '4 hours ago',
      url: '#',
      category: 'Partnership',
      image: '/images/tcs-ai.jpg'
    },
    {
      id: '3',
      title: 'Infosys Faces Client Project Delays',
      company: 'INFY',
      summary: 'Infosys reports delays in some client projects due to macroeconomic uncertainties.',
      sentiment: 'Negative',
      time: '6 hours ago',
      url: '#',
      category: 'Business Update',
      image: '/images/infosys-delays.jpg'
    },
    {
      id: '4',
      title: 'HDFC Bank Expands Digital Banking Services',
      company: 'HDFC',
      summary: 'HDFC Bank launches new digital banking features to enhance customer experience.',
      sentiment: 'Positive',
      time: '8 hours ago',
      url: '#',
      category: 'Product Launch',
      image: '/images/hdfc-digital.jpg'
    },
    {
      id: '5',
      title: 'Wipro Wins Major IT Contract',
      company: 'WIPRO',
      summary: 'Wipro secures a significant IT services contract from a Fortune 500 company.',
      sentiment: 'Positive',
      time: '10 hours ago',
      url: '#',
      category: 'Contract',
      image: '/images/wipro-contract.jpg'
    },
    {
      id: '6',
      title: 'ITC Reports Strong FMCG Growth',
      company: 'ITC',
      summary: 'ITC shows robust growth in FMCG segment with improved market share.',
      sentiment: 'Positive',
      time: '12 hours ago',
      url: '#',
      category: 'Business Update',
      image: '/images/itc-fmcg.jpg'
    }
  ]);

  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterCompany, setFilterCompany] = useState<string>('All');

  const [searchTerm, setSearchTerm] = useState<string>('');

  const stats = [
    { title: 'Total News', value: news.length.toString(), change: '+3', icon: Newspaper },
    { title: 'Positive', value: news.filter(n => n.sentiment === 'Positive').length.toString(), change: '+2', icon: TrendingUp },
    { title: 'Negative', value: news.filter(n => n.sentiment === 'Negative').length.toString(), change: '+1', icon: TrendingDown },
    { title: 'Neutral', value: news.filter(n => n.sentiment === 'Neutral').length.toString(), change: '+0', icon: Clock }
  ];

  const companies = ['All', 'RELIANCE', 'TCS', 'INFY', 'HDFC', 'WIPRO', 'ITC'];
  const categories = ['Earnings', 'Partnership', 'Business Update', 'Product Launch', 'Contract', 'Regulatory'];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive': return 'bg-green-100 text-green-800';
      case 'Negative': return 'bg-red-100 text-red-800';
      case 'Neutral': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };



  const filteredNews = news.filter(item => {
    const companyMatch = filterCompany === 'All' || item.company === filterCompany;
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.company.toLowerCase().includes(searchTerm.toLowerCase());
    return companyMatch && searchMatch;
  });

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews({ ...newsItem });
  };

  const handleSave = () => {
    if (editingNews) {
      setNews(news.map(n => n.id === editingNews.id ? editingNews : n));
      setEditingNews(null);
    }
  };

  const handleCancel = () => {
    setEditingNews(null);
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this news article?')) {
      setNews(news.filter(n => n.id !== id));
    }
  };

  const handleAdd = (newNews: Omit<NewsItem, 'id'>) => {
    const newsItem: NewsItem = {
      ...newNews,
      id: Date.now().toString()
    };
    setNews([...news, newsItem]);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin - Stock News</h1>
                <p className="text-gray-600">Manage company-specific news and updates</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add News</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change} from last week</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            <select
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>

            <div className="flex items-center space-x-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* News Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Manage Stock News</h2>
            <p className="text-gray-600">Edit, delete, and manage company news articles</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNews.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder.jpg';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{item.company}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{item.title}</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">{item.summary}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(item.sentiment)}`}>
                        {item.sentiment === 'Positive' ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : item.sentiment === 'Negative' ? (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        ) : null}
                        {item.sentiment}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{item.category}</span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-green-600 hover:text-green-800 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editingNews && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Edit News Article</h3>
                <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      value={editingNews.company}
                      onChange={(e) => setEditingNews({...editingNews, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={editingNews.category}
                      onChange={(e) => setEditingNews({...editingNews, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sentiment</label>
                    <select
                      value={editingNews.sentiment}
                      onChange={(e) => setEditingNews({...editingNews, sentiment: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                      <option value="Neutral">Neutral</option>
                    </select>
                  </div>

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingNews.title}
                    onChange={(e) => setEditingNews({...editingNews, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                  <textarea
                    value={editingNews.summary}
                    onChange={(e) => setEditingNews({...editingNews, summary: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={editingNews.image}
                    onChange={(e) => setEditingNews({...editingNews, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    value={editingNews.url}
                    onChange={(e) => setEditingNews({...editingNews, url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add News Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add New News Article</h3>
                <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      placeholder="Company symbol"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sentiment</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="Positive">Positive</option>
                      <option value="Negative">Negative</option>
                      <option value="Neutral">Neutral</option>
                    </select>
                  </div>

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="News title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                  <textarea
                    placeholder="News summary"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/news"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add News</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Newspaper className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Admin Guidelines</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Verify news accuracy before publishing</li>
                  <li>Use appropriate sentiment analysis for market impact</li>
                  <li>Keep summaries concise and informative</li>
                  <li>Schedule important news in advance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
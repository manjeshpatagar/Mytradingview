'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Calendar,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Info
} from 'lucide-react';


type IntradayPick = {
  id: number;
  symbol: string;
  company: string;
  entry: number;
  exit: number;
  return: number;
  status: 'Success' | 'Failure';
  profit: 'Buy Side' | 'Sell Side';
};

export default function AdminIntradayResult() {
  const [results, setResults] = useState<IntradayPick[]>([
    {
      id: 1,
      symbol: 'RELIANCE',
      company: 'Reliance Industries',
      entry: 2450,
      exit: 2520,
      return: 2.86,
      status: 'Success',
      profit: 'Buy Side',
    },
    {
      id: 2,
      symbol: 'RELIANCE',
      company: 'Reliance Industries',
      entry: 200,
      exit: 197,
      return: -1.5,
      status: 'Failure',
      profit: 'Sell Side',
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<IntradayPick, 'id'>>({
    symbol: '',
    company: '',
    entry: 0,
    exit: 0,
    return: 0,
    status: 'Success',
    profit: 'Buy Side',
  });

  const resetForm = () => {
    setForm({
      symbol: '',
      company: '',
      entry: 0,
      exit: 0,
      return: 0,
      status: 'Success',
      profit: 'Buy Side',
    });
    setEditingId(null);
  };

  const handleAdd = () => {
    const newItem = {
      ...form,
      id: Date.now(),
      return: +(((form.exit - form.entry) / form.entry) * 100).toFixed(2),
    };
    setResults([newItem, ...results]);
    resetForm();
  };

  const handleEdit = (item: IntradayPick) => {
    setEditingId(item.id);
    setForm({
      symbol: item.symbol,
      company: item.company,
      entry: item.entry,
      exit: item.exit,
      return: item.return,
      status: item.status,
      profit: item.profit,
    });
  };

  const handleUpdate = () => {
    setResults(prev =>
      prev.map(item =>
        item.id === editingId
          ? {
              ...item,
              ...form,
              return: +(((form.exit - form.entry) / form.entry) * 100).toFixed(2),
            }
          : item
      )
    );
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this result?')) {
      setResults(results.filter(r => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Intraday Results</h1>
              <p className="text-gray-600">Manage today's stock pick performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add / Edit Form */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editingId ? 'Edit Result' : 'Add New Result'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Symbol"
              className="border px-3 py-2 rounded-md"
              value={form.symbol}
              onChange={e => setForm({ ...form, symbol: e.target.value })}
            />
            <input
              type="text"
              placeholder="Company"
              className="border px-3 py-2 rounded-md"
              value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
            />
            <input
              type="number"
              placeholder="Entry Price"
              className="border px-3 py-2 rounded-md"
              value={form.entry}
              onChange={e => setForm({ ...form, entry: parseFloat(e.target.value) || 0 })}
            />
            <input
              type="number"
              placeholder="Exit Price"
              className="border px-3 py-2 rounded-md"
              value={form.exit}
              onChange={e => setForm({ ...form, exit: parseFloat(e.target.value) || 0 })}
            />
            <select
              className="border px-3 py-2 rounded-md"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value as 'Success' | 'Failure' })}
            >
              <option value="Success">Success</option>
              <option value="Failure">Failure</option>
            </select>
            <select
              className="border px-3 py-2 rounded-md"
              value={form.profit}
              onChange={e => setForm({ ...form, profit: e.target.value as 'Buy Side' | 'Sell Side' })}
            >
              <option value="Buy Side">Buy Side</option>
              <option value="Sell Side">Sell Side</option>
            </select>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={editingId ? handleUpdate : handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
            >
              {editingId ? <Save size={16} /> : <Plus size={16} />}
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md flex items-center gap-2"
              >
                <X size={16} /> Cancel
              </button>
            )}
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Top Performers</h2>
              <p className="text-gray-600">Today's trades</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-4 py-3">Entry</th>
                  <th className="px-4 py-3">Exit</th>
                  <th className="px-4 py-3">Return</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Profit</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((stock, index) => (
                  <motion.tr
                    key={stock.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {stock.symbol}
                      <div className="text-sm text-gray-500">{stock.company}</div>
                    </td>
                    <td className="px-4 py-4 text-sm">₹{stock.entry}</td>
                    <td className="px-4 py-4 text-sm">₹{stock.exit}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-green-600">
                      {stock.return >= 0 ? '+' : ''}
                      {stock.return}%
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          stock.status === 'Success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {stock.status === 'Success' ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {stock.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold">
                      <span className={stock.profit === 'Buy Side' ? 'text-green-600' : 'text-red-600'}>
                        {stock.profit}
                      </span>
                    </td>
                    <td className="px-4 py-4 flex gap-2">
                      <button onClick={() => handleEdit(stock)} className="text-blue-600 hover:text-blue-800">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(stock.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md shadow-sm mt-6">
          <div className="flex">
            <Info className="w-5 h-5 mr-2 mt-1 text-yellow-500" />
            <div className="text-sm">
              <p className="font-semibold">Disclaimer:</p>
              <p>
                These intraday trade results are for educational purposes only. Book 2–3% profit and use stop-loss as needed. We are not SEBI-registered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

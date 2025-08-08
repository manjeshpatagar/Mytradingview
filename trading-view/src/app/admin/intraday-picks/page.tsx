'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, X, Save } from 'lucide-react';
import {
  getIntradayPicks,
  addIntradayPick,
  updateIntradayPick,
  deleteIntradayPick,
} from '@/services/intradayService';


export default function AdminIntradayPicks() {
  const today = new Date();
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today.getTime() - i * 86400000);
    return formatDate(d);
  });

  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [picks, setPicks] = useState<any[]>([]);
  const [editingPick, setEditingPick] = useState<any | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPick, setNewPick] = useState({
    date: selectedDate,
    symbol: '',
    price: '',
    buyAbove: '',
    buyTarget: '',
    sellBelow: '',
    sellTarget: '',
  });

  useEffect(() => {
    fetchPicks();
  }, [selectedDate]);

  const fetchPicks = async () => {
    try {
      const res = await getIntradayPicks();
      if (!res.data) {
        console.error('No data returned from API');
        return;
      }
      const allPicks = res.data.map((p: any) => ({
        _id: p._id,
        symbol: p.stockSymbol,
        price: p.price,
        date: p.date.split('T')[0], // convert ISO date to YYYY-MM-DD
        buyAbove: p.buyAbove,
        buyTarget: p.buyTarget,
        sellBelow: p.sellBelow,
        sellTarget: p.sellTarget,
      }));
      setPicks(allPicks);
    } catch (err) {
      console.error('Failed to fetch picks', err);
    }
  };

  const handleEdit = (pick: any) => setEditingPick({ ...pick });

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteIntradayPick(id);
      fetchPicks();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleSave = async () => {
    if (!editingPick?._id) return;
    try {
      await updateIntradayPick(editingPick._id, {
        stockSymbol: editingPick.symbol,
        price: editingPick.price,
        date: editingPick.date,
        buyAbove: editingPick.buyAbove,
        buyTarget: editingPick.buyTarget,
        sellBelow: editingPick.sellBelow,
        sellTarget: editingPick.sellTarget,
      });
      setEditingPick(null);
      fetchPicks();
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleCancel = () => setEditingPick(null);

  const handleAdd = async () => {
    try {
      await addIntradayPick({
        stockSymbol: newPick.symbol,
        price: Number(newPick.price),
        date: newPick.date,
        buyAbove: Number(newPick.buyAbove),
        buyTarget: Number(newPick.buyTarget),
        sellBelow: Number(newPick.sellBelow),
        sellTarget: Number(newPick.sellTarget),
      });
      setShowAddForm(false);
      setNewPick({
        date: selectedDate,
        symbol: '',
        price: '',
        buyAbove: '',
        buyTarget: '',
        sellBelow: '',
        sellTarget: '',
      });
      fetchPicks();
    } catch (err) {
      console.error('Add failed', err);
    }
  };

  const filteredPicks = picks.filter(p => p.date === selectedDate);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin: Intraday Trading Picks</h1>
              <p className="text-gray-600">Manage real-time trading signals for the past 7 days</p>
            </div>
            <button
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="w-4 h-4" />
              <span>Add Pick</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
    
        {/* Date Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {last7Days.map(date => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${selectedDate === date
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {date}
            </button>
          ))}
        </div>

        {/* Picks Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Trading Signals for {selectedDate}</h2>
              <p className="text-gray-600 text-sm mt-1">Click edit to modify, or delete to remove a pick</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-700 uppercase">Stock Symbol</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-blue-600 uppercase">Price</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-green-700 uppercase">Buy Above</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-green-700 uppercase">Buy Target</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-red-700 uppercase">Sell Below</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-red-700 uppercase">Sell Target</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPicks.length > 0 ? (
                  filteredPicks.map((pick, index) => (
                    <motion.tr
                      key={pick._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{pick.symbol}</td>
                      <td className="px-6 py-4 text-sm text-blue-600">₹{pick.price}</td>
                      <td className="px-6 py-4 text-sm text-green-700 font-medium">₹{pick.buyAbove}</td>
                      <td className="px-6 py-4 text-sm text-green-700 font-medium">₹{pick.buyTarget}</td>
                      <td className="px-6 py-4 text-sm text-red-600 font-medium">₹{pick.sellBelow}</td>
                      <td className="px-6 py-4 text-sm text-red-600 font-medium">₹{pick.sellTarget}</td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-green-600 hover:text-green-900 mr-2" onClick={() => handleEdit(pick)} title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(pick._id)} title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center text-gray-500 py-6">
                      No picks available for this date.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editingPick && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Edit Pick</h3>
                <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Symbol</label>
                  <input
                    type="text"
                    value={editingPick.symbol}
                    onChange={e => setEditingPick({ ...editingPick, symbol: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      value={editingPick.price}
                      onChange={e => setEditingPick({ ...editingPick, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={editingPick.date}
                      onChange={e => setEditingPick({ ...editingPick, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Buy Above</label>
                    <input
                      type="number"
                      value={editingPick.buyAbove}
                      onChange={e => setEditingPick({ ...editingPick, buyAbove: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Buy Target</label>
                    <input
                      type="number"
                      value={editingPick.buyTarget}
                      onChange={e => setEditingPick({ ...editingPick, buyTarget: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SellDDDDD Below</label>
                    <input
                      type="number"
                      value={editingPick.sellBelow}
                      onChange={e => setEditingPick({ ...editingPick, sellBelow: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sell Target</label>
                    <input
                      type="number"
                      value={editingPick.sellTarget}
                      onChange={e => setEditingPick({ ...editingPick, sellTarget: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button onClick={handleCancel} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-2">
                  <Save className="w-4 h-4 mr-1" /> Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add New Pick</h3>
                <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Symbol</label>
                  <input
                    type="text"
                    value={newPick.symbol}
                    onChange={e => setNewPick({ ...newPick, symbol: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      value={newPick.price}
                      onChange={e => setNewPick({ ...newPick, price: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={newPick.date}
                      onChange={e => setNewPick({ ...newPick, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Buy Above</label>
                    <input
                      type="number"
                      value={newPick.buyAbove}
                      onChange={e => setNewPick({ ...newPick, buyAbove: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Buy Target</label>
                    <input
                      type="number"
                      value={newPick.buyTarget}
                      onChange={e => setNewPick({ ...newPick, buyTarget: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sell Below</label>
                    <input
                      type="number"
                      value={newPick.sellBelow}
                      onChange={e => setNewPick({ ...newPick, sellBelow: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sell Target</label>
                    <input
                      type="number"
                      value={newPick.sellTarget}
                      onChange={e => setNewPick({ ...newPick, sellTarget: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
                <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-2">
                  <Save className="w-4 h-4 mr-1" /> Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
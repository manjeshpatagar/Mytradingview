"use client";
import React, { useEffect, useState } from "react";
import {
  getAllResults,
  createResult,
  updateResult,
  deleteResult,
} from "@/services/resultsService";
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  Filter,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "earnings":
      return "bg-blue-100 text-blue-800";
    case "dividend":
      return "bg-green-100 text-green-800";
    case "event":
    default:
      return "bg-purple-100 text-purple-800";
  }
};

const getImportanceColor = (importance: string) => {
  switch (importance) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
    default:
      return "bg-gray-100 text-gray-800";
  }
};

type ResultType = {
  _id?: string;
  type: "earnings" | "dividend" | "event";
  importance: "high" | "medium" | "low";
  companyName: string;
  symbol: string;
  date: string;
  time: string;
  description: string;
};

const ResultsAdminPage = () => {
  const [results, setResults] = useState<ResultType[]>([]);
  const [formData, setFormData] = useState<ResultType>({
    type: "event",
    importance: "medium",
    companyName: "",
    symbol: "",
    date: "",
    time: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterType, setFilterType] = useState("All");

  const fetchResults = async () => {
    try {
      const res = await getAllResults();
      setResults(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch results", err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateResult(editingId, formData);
      } else {
        await createResult(formData);
      }
      fetchResults();
      resetForm();
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: "event",
      importance: "medium",
      companyName: "",
      symbol: "",
      date: "",
      time: "",
      description: "",
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleEdit = (item: ResultType) => {
    setFormData(item);
    setEditingId(item._id || null);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await deleteResult(id);
    fetchResults();
  };

  const filteredResults =
    filterType === "All"
      ? results
      : results.filter((r) => r.type === filterType.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin - Results & Events
              </h1>
              <p className="text-gray-600">
                Manage earnings, dividends, and corporate events
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Result</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Types</option>
              <option value="earnings">Earnings</option>
              <option value="dividend">Dividend</option>
              <option value="event">Event</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Manage Events</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Importance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResults.map((event, index) => (
                  <motion.tr
                    key={event._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="font-semibold text-gray-900">
                        {event.companyName}
                      </div>
                      <div className="text-gray-500">{event.symbol}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div>{formatDate(event.date)}</div>
                      <div className="text-gray-500">{event.time}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {event.description}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full ${getImportanceColor(
                          event.importance
                        )}`}
                      >
                        {event.importance}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
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

        {/* Add/Edit Modal */}
        {(showAddForm || editingId) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {editingId ? "Edit Result" : "Add Result"}
                </h3>
                <button onClick={handleCancel}>
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="earnings">Earnings</option>
                    <option value="dividend">Dividend</option>
                    <option value="event">Event</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Importance</label>
                  <select
                    name="importance"
                    value={formData.importance}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg"
                />
                <input
                  name="symbol"
                  placeholder="Symbol"
                  value={formData.symbol}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg"
                />
                <input
                  name="time"
                  placeholder="Time"
                  value={formData.time}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="mt-4 w-full px-3 py-2 border rounded-lg"
              ></textarea>
              <div className="flex justify-end mt-4 space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingId ? <><Save className="w-4 h-4 inline mr-1" /> Save</> : <><Plus className="w-4 h-4 inline mr-1" /> Add</>}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <AlertTriangle className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <h4 className="text-sm font-medium text-blue-800">Admin Guidelines</h4>
              <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
                <li>Verify all event details before saving</li>
                <li>Use clear descriptions</li>
                <li>Use appropriate importance levels</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsAdminPage;
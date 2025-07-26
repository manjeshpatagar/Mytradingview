'use client';
import React, { useState } from 'react';
import './page.css';

type Trade = {
  stock: string;
  buyPrice: number;
  highOfDay: number;
  gainLoss: string;
  notes: string;
};

export default function IntradayResults() {
  const [trades, setTrades] = useState<Trade[]>([
    {
      stock: 'XYZ',
      buyPrice: 120,
      highOfDay: 128,
      gainLoss: '+6.7%',
      notes: 'Strong breakout',
    },
    {
      stock: 'GHI',
      buyPrice: 150,
      highOfDay: 145,
      gainLoss: '+3.2%',
      notes: 'Strong breakdown',
    },
  ]);

  const [form, setForm] = useState<Trade>({
    stock: '',
    buyPrice: 0,
    highOfDay: 0,
    gainLoss: '',
    notes: '',
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'buyPrice' || name === 'highOfDay' ? Number(value) : value });
  };

  const handleSubmit = () => {
    if (!form.stock || !form.notes) return alert('Stock name and notes are required.');
    if (editIndex !== null) {
      const updated = [...trades];
      updated[editIndex] = form;
      setTrades(updated);
      setEditIndex(null);
    } else {
      setTrades([...trades, form]);
    }
    setForm({ stock: '', buyPrice: 0, highOfDay: 0, gainLoss: '', notes: '' });
  };

  const handleEdit = (index: number) => {
    setForm(trades[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    if (confirm('Delete this trade?')) {
      const updated = trades.filter((_, i) => i !== index);
      setTrades(updated);
    }
  };

  const getTradeType = (notes: string) => {
    const lower = notes.toLowerCase();
    return lower.includes('breakdown') || lower.includes('short sell') ? 'breakdown' : 'breakout';
  };

  const getNotesStyle = (notes: string) => {
    const lower = notes.toLowerCase();
    return lower.includes('breakdown') || lower.includes('short sell') ? 'red-note' : 'green-note';
  };

  return (
    <div className="results-container">
      <h1>Admin: Manage Intraday Stocks</h1>

      <div className="form-container">
        <input type="text" name="stock" placeholder="Stock Name" value={form.stock} onChange={handleChange} />
        <input type="number" name="buyPrice" placeholder="Buy/Sell Price" value={form.buyPrice} onChange={handleChange} />
        <input type="number" name="highOfDay" placeholder="High of Day" value={form.highOfDay} onChange={handleChange} />
        <input type="text" name="gainLoss" placeholder="Gain/Loss (e.g., +5.4%)" value={form.gainLoss} onChange={handleChange} />
        <select name="notes" value={form.notes} onChange={handleChange}>
          <option value="">-- Select Trade Type --</option>
          <option value="Strong breakout">Strong breakout</option>
          <option value="Strong breakdown">Strong breakdown</option>
          <option value="Short sell breakout">Short sell breakout</option>
        </select>
        <button onClick={handleSubmit}>{editIndex !== null ? 'Update' : 'Add'} Trade</button>
      </div>

      <table className="results-table">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Buy/Sell Price</th>
            <th>High of Day</th>
            <th>Gain</th>
            <th>Trade Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => {
            const type = getTradeType(trade.notes);
            const icon = type === 'breakout' ? '📈' : '📉';
            return (
              <tr key={index}>
                <td className="stock-name">{trade.stock}</td>
                <td className={type === 'breakdown' ? 'sell-price' : 'buy-price'}>₹{trade.buyPrice}</td>
                <td className="high-day">₹{trade.highOfDay}</td>
                <td className="gain">{trade.gainLoss}</td>
                <td className={getNotesStyle(trade.notes)}>{icon} {trade.notes}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>✏️</button>
                  <button onClick={() => handleDelete(index)}>🗑️</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

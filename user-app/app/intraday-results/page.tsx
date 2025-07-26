'use client';
import React, { useState } from 'react';
import './page.css';

type Trade = {
  stock: string;
  buyPrice: number;
  highOfDay: number;
  targetHit: boolean;
  gainLoss: string;
  notes: string;
};

const getLast7Dates = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    return d.toISOString().split('T')[0];
  });
};

const sampleResultsByDate: Record<string, Trade[]> = {
  [getLast7Dates()[0]]: [
    {
      stock: 'XYZ',
      buyPrice: 120,
      highOfDay: 128,
      targetHit: true,
      gainLoss: '+6.7%',
      notes: 'Strong breakout',
    },
    {
      stock: 'GHI',
      buyPrice: 150,
      highOfDay: 145,
      targetHit: true,
      gainLoss: '+3.2%',
      notes: 'Strong breakdown',
    },
  ],
  [getLast7Dates()[1]]: [
    {
      stock: 'DEF',
      buyPrice: 220,
      highOfDay: 230,
      targetHit: true,
      gainLoss: '+4.5%',
      notes: 'Short sell breakout',
    },
  ],
  // Add more dates and trades as needed
};

export default function IntradayResults() {
  const [selectedDate, setSelectedDate] = useState(getLast7Dates()[0]);
  const [filter, setFilter] = useState<'all' | 'breakout' | 'breakdown'>('all');

  const getTradeType = (notes: string) => {
    const lower = notes.toLowerCase();
    return lower.includes('breakdown') || lower.includes('short sell') ? 'breakdown' : 'breakout';
  };

  const getNotesStyle = (notes: string) => {
    const lower = notes.toLowerCase();
    return lower.includes('breakdown') || lower.includes('short sell') ? 'red-note' : 'green-note';
  };

  const trades = sampleResultsByDate[selectedDate] || [];

  const filteredTrades = trades.filter((trade) => {
    const type = getTradeType(trade.notes);
    return trade.targetHit && (filter === 'all' || type === filter);
  });

  return (
    <div className="results-container">
      <h1>Intraday Profitable Stocks</h1>
      <p className="market-note">📢 These stocks achieved profit targets after market close.</p>

      {/* 7-Day Date Selector */}
      <div style={{ display: 'flex', overflowX: 'auto', padding: '10px 0', gap: '10px', marginBottom: '10px' }}>
        {getLast7Dates().map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            style={{
              padding: '8px 12px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: date === selectedDate ? '#2563eb' : '#e5e7eb',
              color: date === selectedDate ? '#fff' : '#1f2937',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {new Date(date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
          </button>
        ))}
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('breakout')} className={filter === 'breakout' ? 'active' : ''}>📈 Breakout</button>
        <button onClick={() => setFilter('breakdown')} className={filter === 'breakdown' ? 'active' : ''}>📉 Breakdown</button>
      </div>

      {/* Table */}
      <table className="results-table">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Buy/Sell Price</th>
            <th>High of Day</th>
            <th>Gain</th>
            <th>Trade Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrades.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>
                No results for selected date and filter.
              </td>
            </tr>
          ) : (
            filteredTrades.map((result, index) => {
              const type = getTradeType(result.notes);
              const icon = type === 'breakout' ? '📈' : '📉';
              const isBreakdown = type === 'breakdown';
              return (
                <tr key={index} className={type}>
                  <td className="stock-name">{result.stock}</td>
                  <td className={isBreakdown ? 'sell-price' : 'buy-price'}>₹{result.buyPrice}</td>
                  <td className="high-day">₹{result.highOfDay}</td>
                  <td className="gain">{result.gainLoss}</td>
                  <td className={getNotesStyle(result.notes)}>{icon} {result.notes}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

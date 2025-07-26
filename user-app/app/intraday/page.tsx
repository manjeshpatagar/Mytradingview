"use client";

import React, { useState } from "react";
import "./page.css";

const stockData = [
  // Example data - you can group this by date later
  {
    date: new Date().toISOString().split("T")[0], // today
    stocks: [
      {
        name: "TATA MOTORS",
        price: 950,
        buyAbove: 960,
        buyTarget: 985,
        sellBelow: 945,
        sellTarget: 920,
      },
      {
        name: "RELIANCE",
        price: 2850,
        buyAbove: 2875,
        buyTarget: 2920,
        sellBelow: 2825,
        sellTarget: 2780,
      },
      {
        name: "INFY",
        price: 1500,
        buyAbove: 1515,
        buyTarget: 1540,
        sellBelow: 1480,
        sellTarget: 1455,
      },
           {
        name: "TATA MOTORS",
        price: 950,
        buyAbove: 960,
        buyTarget: 985,
        sellBelow: 945,
        sellTarget: 920,
      },
      {
        name: "RELIANCE",
        price: 2850,
        buyAbove: 2875,
        buyTarget: 2920,
        sellBelow: 2825,
        sellTarget: 2780,
      },
      {
        name: "INFY",
        price: 1500,
        buyAbove: 1515,
        buyTarget: 1540,
        sellBelow: 1480,
        sellTarget: 1455,
      },
    ],
  },
  // You can later add more date groups...
];

const getLast7Days = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
};

const Intraday: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(getLast7Days()[0]); // default to today
  const dates = getLast7Days();

  const selectedStocks = stockData.find((entry) => entry.date === selectedDate)?.stocks || [];

  return (
    <div className="intraday-container">
      <header className="intraday-header">
        <h1>📈 Intraday Picks</h1>
        <p>Trade with precision using real-time stock levels</p>
      </header>

      {/* Date Selector */}
      <div style={{ display: "flex", overflowX: "auto", padding: "10px", gap: "10px", margin: "10px 0" }}>
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: date === selectedDate ? "#2563eb" : "#e5e7eb",
              color: date === selectedDate ? "#fff" : "#1f2937",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {new Date(date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
          </button>
        ))}
      </div>

      <div className="stock-grid">
        {selectedStocks.length > 0 ? (
          selectedStocks.map((stock, index) => (
            <div key={index} className="stock-card">
              <h2>{stock.name}</h2>
              <p>🔵Current Price: ₹{stock.price}</p>
              <p>🟢 Buy Above: ₹{stock.buyAbove}</p>
              <p>🎯 Buy Target: ₹{stock.buyTarget}</p>
              <p>🔴 Sell Below: ₹{stock.sellBelow}</p>
              <p>🎯 Sell Target: ₹{stock.sellTarget}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "20px" }}>No intraday picks for this date.</p>
        )}
      </div>

      <div>
        <footer className="intrady-disclaimer">
          📢 <strong>Disclaimer:</strong> This information is for educational purposes only and not financial advice. Please consult a registered financial advisor before investing.
        </footer>
      </div>
    </div>
  );
};

export default Intraday;

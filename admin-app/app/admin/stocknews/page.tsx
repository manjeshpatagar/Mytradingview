'use client';
import React, { useState } from "react";
import "./page.css";

type StockNewsItem = {
  stockName: string;
  symbol: string;
  price: string;
  change: string;
  newsTitle: string;
  description: string;
  date: string;
  time: string;
  image: string;
};

const initialNewsData: StockNewsItem[] = [
  {
    stockName: "Tata Motors",
    symbol: "TATAMOTORS",
    price: "₹982.40",
    change: "+12.30 (1.27%)",
    newsTitle: "Tata Motors launches new EV in India",
    description:
      "Tata Motors has officially launched its new electric vehicle, which is expected to boost its EV market share significantly.",
    date: "23 July 2025",
    time: "11:00 AM",
    image: "https://images.moneycontrol.com/static-mcnews/2023/07/tatamotors-ev.jpg",
  },
  {
    stockName: "Maruti Suzuki",
    symbol: "MARUTI",
    price: "₹10,540.75",
    change: "-45.60 (0.43%)",
    newsTitle: "Maruti to set up new plant in Gujarat",
    description:
      "Maruti Suzuki is investing ₹12,000 crore in a new manufacturing plant to expand its production capacity.",
    date: "23 July 2025",
    time: "09:30 AM",
    image: "https://images.moneycontrol.com/static-mcnews/2023/07/maruti-plant.jpg",
  },
];

const StockNewsAdmin: React.FC = () => {
  const [newsData, setNewsData] = useState<StockNewsItem[]>(initialNewsData);
  const [form, setForm] = useState<StockNewsItem>({
    stockName: "",
    symbol: "",
    price: "",
    change: "",
    newsTitle: "",
    description: "",
    date: "",
    time: "",
    image: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updated = [...newsData];
      updated[editIndex] = form;
      setNewsData(updated);
      setEditIndex(null);
    } else {
      setNewsData(prev => [form, ...prev]);
    }
    setForm({
      stockName: "",
      symbol: "",
      price: "",
      change: "",
      newsTitle: "",
      description: "",
      date: "",
      time: "",
      image: "",
    });
  };

  const handleEdit = (index: number) => {
    setForm(newsData[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const filtered = newsData.filter((_, i) => i !== index);
    setNewsData(filtered);
  };

  return (
    <div className="stock-news-container">
      <h2 className="stock-news-title">📢 Admin Stock News</h2>

      {/* Form Section */}
      <div className="stock-news-form">
        <input type="text" name="stockName" value={form.stockName} onChange={handleChange} placeholder="Stock Name" />
        <input type="text" name="symbol" value={form.symbol} onChange={handleChange} placeholder="Symbol" />
        <input type="text" name="price" value={form.price} onChange={handleChange} placeholder="Price (₹)" />
        <input type="text" name="change" value={form.change} onChange={handleChange} placeholder="Change" />
        <input type="text" name="newsTitle" value={form.newsTitle} onChange={handleChange} placeholder="News Title" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input type="text" name="date" value={form.date} onChange={handleChange} placeholder="Date (e.g. 23 July 2025)" />
        <input type="text" name="time" value={form.time} onChange={handleChange} placeholder="Time (e.g. 11:00 AM)" />
        <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
        <button onClick={handleSubmit}>{editIndex !== null ? "Update" : "Add"} News</button>
      </div>

      {/* Display Section */}
      {newsData.map((item, index) => (
        <div className="stock-news-card" key={index}>
          <img src={item.image} alt="stock" className="stock-news-image" />
          <div className="stock-news-content">
            <div className="stock-news-header">
              <span className="stock-name">{item.stockName} ({item.symbol})</span>
              <span className="stock-price">{item.price}</span>
            </div>
            <div className={`stock-change ${item.change.startsWith("+") ? "up" : "down"}`}>
              {item.change}
            </div>
            <h3 className="stock-news-headline">{item.newsTitle}</h3>
            <p className="stock-news-description">{item.description}</p>
            <div className="stock-news-meta">
              <span>{item.date}</span>
              <span>{item.time}</span>
            </div>
            <div className="admin-actions">
              <button onClick={() => handleEdit(index)}>✏️ Edit</button>
              <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockNewsAdmin;

import React from "react";
import "./page.css";

const stockNewsData = [
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

const stocknews: React.FC = () => {
  return (
    <div className="stock-news-container">
      <h2 className="stock-news-title">📢 Stock-Based News</h2>
      {stockNewsData.map((item, index) => (
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default stocknews;

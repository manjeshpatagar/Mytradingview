import React from "react";
import "./page.css";

const mockNews = [
  {
    title: "Sensex jumps 400 points amid strong earnings",
    description: "The BSE Sensex surged 400 points as major companies posted better-than-expected Q1 results The BSE Sensex surged 400 points as major companies posted better-than-expected Q1 results The BSE Sensex surged 400 points as major companies posted better-than-expected Q1 results The BSE Sensex surged 400 points as major companies posted better-than-expected Q1 results.",
    date: "23 July 2025",
    time: "09:30 AM",
    image:
      "https://images.moneycontrol.com/static-mcnews/2023/07/sensex-nifty-stockmarket-bull-770x433.jpg",
  },
  {
    title: "RBI may revise repo rate in upcoming policy",
    description: "Analysts expect the Reserve Bank of India to revise the repo rate due to rising inflation trends.",
    date: "22 July 2025",
    time: "05:00 PM",
    image:
      "https://images.moneycontrol.com/static-mcnews/2024/05/rbi-policy-1-770x433.jpg",
  },
  {
    title: "Infosys announces annual results",
    description: "Infosys reported a 12% YoY growth in net profit with a strong outlook for FY26.",
    date: "22 July 2025",
    time: "01:15 PM",
    image:
      "https://images.moneycontrol.com/static-mcnews/2023/07/infosys-1-770x433.jpg",
  },
];

const News: React.FC = () => {
  return (
    <div className="news-container">
      <h2 className="news-title">📈 Market News</h2>
      {mockNews.map((news, index) => (
        <div key={index} className="news-card">
          <img src={news.image} alt="news" className="news-image" />
          <div className="news-content">

            <div className="news-headline">{news.title}</div>
            <p className="news-description">{news.description}</p>
            <div className="news-header">
              <span className="news-date">{news.date}</span>
              <span className="news-time">{news.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;

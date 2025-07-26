"use client";

import React from "react";
import Link from "next/link";
import "./page.css";

const features = [
    {
        title: "Intraday",
        path: "/intraday",
        image: "/assets/intraday.jpg",
    },
    {
        title: "Results Stocks",
        path: "/result",
        image: "/assets/result.jpg",
    },
    {
        title: "Stock News",
        path: "/stock-news",
        image: "/assets/futures.jpg",
    },
    {
        title: "Market News",
        path: "/news",
        image: "/assets/news.jpg",
    },
    {
        title: "Trade Plan",
        path: "/trade-plan",
        image: "/assets/plan.jpg",
    },

     {
        title: "Intraday Results",
        path: "/intraday-results",
        image: "/assets/plan.jpg",
    },
];

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <div className="feature-grid">
                {features.map((feature) => (
                    <Link href={feature.path} key={feature.title} className="feature-card">
                        <img src={feature.image} alt={feature.title} className="feature-image" />
                        <div className="feature-overlay">
                            <span className="feature-title">{feature.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <div>
                <section className="about-section">
                    <div className="card">
                        <h2>About Us</h2>
                        <p>
                            <strong>SmartStock Insights</strong> is a stock market analysis platform built for traders and investors who seek simplified, real-time, and research-backed insights. Our goal is to deliver timely intraday picks, result updates, market news, and structured trade plans that reduce decision-making stress and risk.
                        </p>
                    </div>

                    <div className="card">
                        <h3>🔍 What Is This Website?</h3>
                        <p>This application provides daily curated stock ideas for intraday trading, future stock investments, and other key updates relevant to the Indian stock market.</p>
                    </div>

                    <div className="card">
                        <h3>📈 What's the Use?</h3>
                        <ul>
                            <li>⚡ Daily Intraday Buy/Sell Ideas with Target & Stoploss</li>
                            <li>📰 Important Result Announcements & News</li>
                            <li>💡 Future Stock Watchlist with Strong Fundamentals</li>
                            <li>🧭 Beginner-Friendly Trade Planning Guide</li>
                        </ul>
                    </div>

                    <div className="card">
                        <h3>🌟 Key Features</h3>
                        <ul>
                            <li>✅ Intraday Picks (Updated Daily)</li>
                            <li>📅 Company Results & Earnings Alerts</li>
                            <li>🔔 Stock Market News Highlights</li>
                            <li>📊 Future Stock Analysis (Mid/Long Term)</li>
                            <li>🧠 Simple Trade Plan for Risk Management</li>
                        </ul>
                    </div>

                    <div className="card">
                        <h3>👤 Who Should Use This?</h3>
                        <p>
                            This platform is ideal for:
                            <br />
                            ✅ Beginner traders<br />
                            ✅ Swing/intraday traders<br />
                            ✅ Long-term investors looking for insights<br />
                            ✅ Anyone interested in following market events
                        </p>
                    </div>

                    <div className="card">
                        <h3>🎯 Our Mission</h3>
                        <p>
                            To help Indian traders and investors make confident, informed decisions with easy-to-follow stock suggestions and market intelligence.
                        </p>
                    </div>

                    <div className="card disclaimer">
                        <h3>⚠️ Disclaimer</h3>
                        <p>
                            The content provided on this website is for informational and educational purposes only. We are not SEBI-registered advisors. All trades and investments are at your own risk. Please consult a professional financial advisor before making any trading decisions.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Home;

import React from "react";
import "./page.css";

const TradePlan: React.FC = () => {
  return (
    <div className="trade-plan-page">
      <h1 className="page-title">📊 Trade Plan</h1>

      <section className="plan-section">
        <h2 className="section-title">1. Intraday Trade Plan</h2>
        <p className="plan-description">
          Next day watchlist is updated daily and includes an indicative level above or below which the stock may trade.
          The screenshot of the best stock for intraday tomorrow is shown below, generated every day on the Intradayscreener app.
          This makes it easier for traders to choose the best intraday stocks with a single click.
        </p>
        <p className="plan-description">
          <strong>Example:</strong> Let us take “TANLA”. After analysis, this stock entered our watchlist with a buy level of ₹1392. 
          It crossed ₹1461.8 and turned green, indicating a breakout. Such top 15 stocks are valid for the next 4–5 days.
        </p>
        <p className="plan-description">
          The algorithm filters stocks based on breakout levels (weekly, monthly, yearly) and volume surges. 
          We initiate buy/sell with a 1% stop loss or 5% for stocks above ₹400.
        </p>
      </section>

      <section className="plan-section">
        <h2 className="section-title">2. Result-Based Stocks Trade Plan</h2>
        <p className="plan-description">
          Stocks reacting to earnings (quarterly results) are monitored. Breakouts after positive results can be good short-term opportunities. 
          For example, if a company beats profit expectations, its stock is added to the result watchlist.
        </p>
      </section>

      <section className="plan-section">
        <h2 className="section-title">3. News-Based Stocks Trade Plan</h2>
        <p className="plan-description">
          These are stocks influenced by news events, like product launches, government policy, or partnerships.
          Example: If Tata Motors launches a new EV, the stock might show a price spike. Such stocks are added to news watchlists.
        </p>
      </section>

      <section className="plan-section">
        <h2 className="section-title">4. Market News Trade Plan</h2>
        <p className="plan-description">
          Based on global or local news such as RBI announcements, crude oil prices, or geopolitical events. These affect the entire market trend.
        </p>
      </section>

      <section className="disclaimer-section">
        <h3>📌 Disclaimer</h3>
        <p>
          This content is for educational purposes only. Always do your own research before investing or trading. 
          Trading in financial markets involves risk of capital loss.
        </p>
      </section>
    </div>
  );
};

export default TradePlan;

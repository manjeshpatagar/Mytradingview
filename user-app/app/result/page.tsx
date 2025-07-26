import React from "react";
import "./page.css";

const mockData = [
  {
    date: "23 Jul, Wed",
    today: true,
    items: [
      {
        company: "Advanced Enzyme",
        event: "Dividend-Ex date",
        detail: "₹1.20 per share",
        type: "dividend",
      },
      {
        company: "Mahindra Logistics",
        event: "Rights-Ex date",
        detail: "Ratio 3:8",
        type: "rights",
      },
      {
        company: "Force Motors",
        event: "Results",
        detail: "Quarterly",
        type: "results",
      },
      {
        company: "Infosys",
        event: "Results",
        detail: "Annual",
        type: "results",
      },
    ],
  },
];

const ResultsPage: React.FC = () => {
  return (
    <div className="results-container">
      <h2 className="results-title">📈 Stock Events</h2>
      <div className="results-header">
        <div className="col company">Company</div>
        <div className="col event">Events</div>
        <div className="col detail">Details</div>
      </div>

      {mockData.map((section, index) => (
        <div key={index} className="results-section">
          <div className="section-date">
            <strong>{section.date}</strong>
            {section.today && <span className="today-badge">Today</span>}
          </div>

          {section.items.map((item, idx) => (
            <div className="result-row" key={idx}>
              <div className="col company">
                <span className="mobile-label">Company:</span> {item.company}
              </div>
              <div className="col event">
                <span className="mobile-label">Event:</span>
                <span className={`badge ${item.type}`}>{item.event}</span>
              </div>
              <div className="col detail">
                <span className="mobile-label">Detail:</span> {item.detail}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;

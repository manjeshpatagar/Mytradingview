'use client';

import React, { useState } from "react";
import "./page.css";

type NewsItem = {
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
};

const initialNews: NewsItem[] = [
  {
    title: "Sensex jumps 400 points amid strong earnings",
    description:
      "The BSE Sensex surged 400 points as major companies posted better-than-expected Q1 results.",
    date: "23 July 2025",
    time: "09:30 AM",
    image:
      "https://images.moneycontrol.com/static-mcnews/2023/07/sensex-nifty-stockmarket-bull-770x433.jpg",
  },
  {
    title: "Infosys announces annual results",
    description:
      "Infosys reported a 12% YoY growth in net profit with a strong outlook for FY26.",
    date: "22 July 2025",
    time: "01:15 PM",
    image:
      "https://images.moneycontrol.com/static-mcnews/2023/07/infosys-1-770x433.jpg",
  },
];

const AdminNews: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>(initialNews);
  const [form, setForm] = useState<NewsItem>({
    title: "",
    description: "",
    date: "",
    time: "",
    image: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editIndex !== null) {
      const updated = [...newsList];
      updated[editIndex] = form;
      setNewsList(updated);
      setEditIndex(null);
    } else {
      setNewsList([...newsList, form]);
    }

    setForm({
      title: "",
      description: "",
      date: "",
      time: "",
      image: "",
    });
  };

  const handleEdit = (index: number) => {
    setForm(newsList[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    setNewsList(newsList.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-news-container">
      <h1>📰 Admin - Market News</h1>

      <div className="news-form">
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter news title"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter news description"
          ></textarea>
        </div>

        <div>
          <label>Date</label>
          <input
            type="text"
            name="date"
            value={form.date}
            onChange={handleChange}
            placeholder="e.g. 23 July 2025"
          />
        </div>

        <div>
          <label>Time</label>
          <input
            type="text"
            name="time"
            value={form.time}
            onChange={handleChange}
            placeholder="e.g. 09:30 AM"
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        <div style={{ gridColumn: "span 2" }}>
          <button onClick={handleAddOrUpdate}>
            {editIndex !== null ? "Update News" : "Add News"}
          </button>
        </div>
      </div>

      <div className="admin-news-list">
        {newsList.map((news, index) => (
          <div key={index} className="admin-news-card">
            <img src={news.image} alt="news" className="admin-news-img" />
            <div className="admin-news-details">
              <h3>{news.title}</h3>
              <p>{news.description}</p>
              <div className="admin-news-meta">
                <span>{news.date}</span>
                <span>{news.time}</span>
              </div>
              <div className="admin-news-actions">
                <button onClick={() => handleEdit(index)}>✏️ Edit</button>
                <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNews;

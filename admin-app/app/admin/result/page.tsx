'use client';

import React, { useState } from "react";
import "./page.css";

type EventItem = {
    company: string;
    event: string;
    detail: string;
    type: "dividend" | "rights" | "results";
};

type Section = {
    date: string;
    today: boolean;
    items: EventItem[];
};

const initialData: Section[] = [
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
                company: "Infosys",
                event: "Results",
                detail: "Annual",
                type: "results",
            },
        ],
    },
];

const AdminResults: React.FC = () => {
    const [data, setData] = useState<Section[]>(initialData);
    const [form, setForm] = useState<EventItem>({
        company: "",
        event: "",
        detail: "",
        type: "results",
    });
    const [sectionDate, setSectionDate] = useState<string>("23 Jul, Wed");
    const [isToday, setIsToday] = useState<boolean>(false);
    const [editIndex, setEditIndex] = useState<{ section: number; item: number } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddOrUpdate = () => {
        const sectionIndex = data.findIndex((d) => d.date === sectionDate);
        const updatedItem = { ...form };

        if (editIndex) {
            const updatedData = [...data];
            updatedData[editIndex.section].items[editIndex.item] = updatedItem;
            setData(updatedData);
            setEditIndex(null);
        } else {
            if (sectionIndex > -1) {
                const updated = [...data];
                updated[sectionIndex].items.push(updatedItem);
                setData(updated);
            } else {
                setData([...data, { date: sectionDate, today: isToday, items: [updatedItem] }]);
            }
        }

        // Reset form
        setForm({ company: "", event: "", detail: "", type: "results" });
        setSectionDate("23 Jul, Wed");
        setIsToday(false);
    };

    const handleEdit = (sectionIdx: number, itemIdx: number) => {
        const selected = data[sectionIdx].items[itemIdx];
        setForm(selected);
        setSectionDate(data[sectionIdx].date);
        setIsToday(data[sectionIdx].today);
        setEditIndex({ section: sectionIdx, item: itemIdx });
    };

    const handleDelete = (sectionIdx: number, itemIdx: number) => {
        const updated = [...data];
        updated[sectionIdx].items.splice(itemIdx, 1);
        if (updated[sectionIdx].items.length === 0) {
            updated.splice(sectionIdx, 1); // remove entire section if empty
        }
        setData(updated);
    };

    return (
        <div className="admin-results-container">
            <h1>🛠 Admin - Stock Events</h1>

            <div className="results-form">
                <div className="results-form-title">
                    <label>Company</label>
                    <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="e.g., Infosys"
                    />
                </div>

                <div className="results-form-title">
                    <label>Event</label>
                    <input
                        name="event"
                        value={form.event}
                        onChange={handleChange}
                        placeholder="e.g., Results"
                    />
                </div>

                <div className="results-form-title">
                    <label>Detail</label>
                    <input
                        name="detail"
                        value={form.detail}
                        onChange={handleChange}
                        placeholder="e.g., Annual or ₹1.20/share"
                    />
                </div>

                <div className="results-form-title">
                    <label>Type</label>
                    <select name="type" value={form.type} onChange={handleChange}>
                        <option value="results">Results</option>
                        <option value="dividend">Dividend</option>
                        <option value="rights">Rights</option>
                    </select>
                </div>

                <div className="results-form-title">
                    <label>Date</label>
                    <input
                        value={sectionDate}
                        onChange={(e) => setSectionDate(e.target.value)}
                        placeholder="e.g., 25 Jul, Fri"
                    />
                </div>

                <div style={{ display: "flex", gap: "20px" }}>

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={isToday}
                                onChange={() => setIsToday(!isToday)}
                            />
                            Mark as Today
                        </label>
                    </div>

                    <div style={{ gridColumn: "span 2" }}>
                        <button onClick={handleAddOrUpdate}>
                            {editIndex ? "Update Event" : "Add Event"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="admin-results-list">
                {data.map((section, sIdx) => (
                    <div key={sIdx} className="results-section">
                        <div className="section-date">
                            <strong>{section.date}</strong>
                            {section.today && <span className="today-badge">Today</span>}
                        </div>

                        {section.items.map((item, iIdx) => (
                            <div className="result-row" key={iIdx}>
                                <div className="col company">{item.company}</div>
                                <div className="col event">
                                    <span className={`badge ${item.type}`}>{item.event}</span>
                                </div>
                                <div className="col detail">{item.detail}</div>
                                <div className="col action">
                                    <button onClick={() => handleEdit(sIdx, iIdx)}>✏️</button>
                                    <button onClick={() => handleDelete(sIdx, iIdx)}>🗑️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminResults;

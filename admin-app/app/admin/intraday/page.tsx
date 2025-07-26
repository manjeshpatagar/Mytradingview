'use client';

import React, { useState } from "react";
import "./page.css";

type Stock = {
    name: string;
    price: number;
    buyAbove: number;
    buyTarget: number;
    sellBelow: number;
    sellTarget: number;
};

const initialStockData: Stock[] = [
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
];

const AdminIntraday: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>(initialStockData);
    const [form, setForm] = useState<Stock>({
        name: "",
        price: 0,
        buyAbove: 0,
        buyTarget: 0,
        sellBelow: 0,
        sellTarget: 0,
    });
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddOrUpdate = () => {
        const updated = {
            ...form,
            price: +form.price,
            buyAbove: +form.buyAbove,
            buyTarget: +form.buyTarget,
            sellBelow: +form.sellBelow,
            sellTarget: +form.sellTarget,
        };

        if (editIndex !== null) {
            const updatedStocks = [...stocks];
            updatedStocks[editIndex] = updated;
            setStocks(updatedStocks);
            setEditIndex(null);
        } else {
            setStocks([...stocks, updated]);
        }

        setForm({
            name: "",
            price: 0,
            buyAbove: 0,
            buyTarget: 0,
            sellBelow: 0,
            sellTarget: 0,
        });
    };

    const handleEdit = (index: number) => {
        setForm(stocks[index]);
        setEditIndex(index);
    };

    const handleDelete = (index: number) => {
        const updatedStocks = stocks.filter((_, i) => i !== index);
        setStocks(updatedStocks);
    };

    return (
        <div className="admin-container">
            <h1>🛠 Admin - Intraday Picks</h1>

            <div className="form-section">
                <div>
                    <label>Stock Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter stock name"
                    />
                </div>

                <div>
                    <label>Current Market Price</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Enter current price"
                    />
                </div>

                <div>
                    <label>🟢 Buy Above</label>
                    <input
                        type="number"
                        name="buyAbove"
                        value={form.buyAbove}
                        onChange={handleChange}
                        placeholder="Enter Buy Above price"
                    />
                </div>

                <div>
                    <label>🎯 Buy Target</label>
                    <input
                        type="number"
                        name="buyTarget"
                        value={form.buyTarget}
                        onChange={handleChange}
                        placeholder="Enter Buy Target"
                    />
                </div>

                <div>
                    <label>🔴 Sell Below</label>
                    <input
                        type="number"
                        name="sellBelow"
                        value={form.sellBelow}
                        onChange={handleChange}
                        placeholder="Enter Sell Below price"
                    />
                </div>

                <div>
                    <label>🎯 Sell Target</label>
                    <input
                        type="number"
                        name="sellTarget"
                        value={form.sellTarget}
                        onChange={handleChange}
                        placeholder="Enter Sell Target"
                    />
                </div>

                <div style={{ gridColumn: "span 2" }}>
                    <button onClick={handleAddOrUpdate}>
                        {editIndex !== null ? "Update" : "Add"}
                    </button>
                </div>
            </div>



            <div className="admin-stock-list">
                {stocks.map((stock, index) => (
                    <div key={index} className="admin-stock-card">
                        <h2>{stock.name}</h2>
                        <p>Price: ₹{stock.price}</p>
                        <p>Buy Above: ₹{stock.buyAbove}</p>
                        <p>Buy Target: ₹{stock.buyTarget}</p>
                        <p>Sell Below: ₹{stock.sellBelow}</p>
                        <p>Sell Target: ₹{stock.sellTarget}</p>
                        <div className="admin-actions">
                            <button onClick={() => handleEdit(index)}>✏️ Edit</button>
                            <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminIntraday;

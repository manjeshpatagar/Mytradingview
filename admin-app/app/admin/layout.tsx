// app/admin/layout.tsx
import React, { ReactNode } from "react";
import Link from "next/link";
import "./adminLayout.css"; // Import the CSS file

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h3>Admin Panel</h3>
        <ul>
          <li><Link href="/admin/home">Home</Link></li>
          <li><Link href="/admin/intraday">Intraday</Link></li>
          <li><Link href="/admin/news">News</Link></li>
          <li><Link href="/admin/result">Result</Link></li>
            <li><Link href="/admin/stocknews">StockNews</Link></li>
            <li><Link href="/admin/intradayresults">Intraday Results</Link></li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="admin-main">{children}</div>
    </div>
  );
}

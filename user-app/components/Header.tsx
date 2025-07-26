'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Header.css";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Intraday Picks", path: "/intraday" },
    { name: "Results", path: "/result" },
    { name: "News", path: "/news" },
    { name: "Stock News", path: "/stock-news" },
     {name: "Intrday Results", path: "intraday-results"},
    { name: "Trade Plan", path: "/trade-plan" },
    
  ];

  return (
    <header className="header-box">
      <div className="header-container">
        <Link href="/" className="header-link">
          <div style={{ padding: "3px 7px" }}>
            <img src="/assets/tradinglogo.jpg" alt="Logo" className="logo" />
          </div>
          <div style={{justifyItems:"baseline"}}>
            <h1 className="app-title">JustTrade</h1>
            <div className="tagline">
              <span className="tagline-smart">Smarter Trading</span>
              <span className="tagline-picks">Daily Picks</span>
              <span className="tagline-results">Real Results</span>
            </div>
          </div>
        </Link>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
        </div>

        {/* Nav Links */}
        <nav className={`nav-links ${menuOpen ? 'show' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={pathname === item.path ? "nav-item active" : "nav-item"}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

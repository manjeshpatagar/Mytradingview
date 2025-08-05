
'use client';
import React, { useState } from "react";
import { login } from "../../../services/loginService";

const LoginPage = () => {
  const [email, setEmail] = useState("admin"); // default for test
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });

      // ✅ Save token to localStorage
      localStorage.setItem("token", res.token);
      console.log("Login successful:", res.user);

      // Optional: redirect to dashboard
      window.location.href = "/admin";
    } catch (err: any) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <input
          type="text"
          placeholder="Username or Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

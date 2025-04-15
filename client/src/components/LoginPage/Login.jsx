import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const [pen, setPen] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_XCELL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        pen,
        password,
      });
      const token = response.data.token;
      const decoded = jwtDecode(token);
      localStorage.setItem("token", token);
      localStorage.setItem("role", decoded.role);
      navigate("/dashboard");
      toast.success(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
      toast.success(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="w-full max-w-md rounded-2xl backdrop-blur-md bg-white/70 dark:bg-opacity-70 p-8 shadow-[-4px_-4px_38px_6px_rgba(0,_0,_0,_0.5)] border border-white/20 "
        style={{ backgroundColor: "#F5EFFF" }}>
        <div className="text-center mb-6">
          <img className="mx-auto w-20" src="kplogo.png" alt="logo" />
          <h4 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-800">
            Login to SMPMS
          </h4>
          <p className="text-sm text-gray-600 font-semibold dark:text-gray-800 mt-1">
            Social Media Profile Management System
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-bold text-gray-700 dark:text-gray-800">
              PEN
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your PEN"
              value={pen}
              onChange={(e) => setPen(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-bold text-gray-700 dark:text-gray-800">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 transition duration-150">
            Log in
          </button>

          <div className="flex justify-between items-center mt-4 text-sm">
            <a href="#" className="text-blue-700 hover:underline font-bold">
              Forgot password?
            </a>
            <a
              href="/register"
              className="text-gray-600 font-bold hover:text-gray-800">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

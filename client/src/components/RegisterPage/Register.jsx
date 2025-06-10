import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [pen, setPen] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [unit, setUnit] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_XCELL;

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/auth/register`,
        {
          pen,
          password,
          role,
          unit,
          name
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message || "Registered successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="w-full max-w-md rounded-2xl backdrop-blur-md bg-white/70 dark:bg-opacity-70 p-8 shadow-[-4px_-4px_38px_6px_rgba(0,_0,_0,_0.5)] border border-white/20"
        style={{ backgroundColor: "#F5EFFF" }}>
        <div className="text-center mb-6">
          <img className="mx-auto w-20" src="kplogo.png" alt="logo" />
          <h1 className="mt-4 text-2xl font-semibold text-gray-800">SMPMS</h1>
          <h4 className="mt-3 text-xl font-semibold text-gray-800">
            User Registration
          </h4>
          <p className="text-sm text-gray-600 font-semibold">
            Create your account
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-bold text-gray-700">
              PEN
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter PEN"
              value={pen}
              onChange={(e) => setPen(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-bold text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-bold text-gray-700">
              Role
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={role}
              onChange={(e) => setRole(e.target.value)}>
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-bold text-gray-700">
              Unit
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}>
              <option value="">Select a unit</option>
              <option value="SSB HQ">SSB HQ</option>
              <option value="TVM C">TVM C</option>
              <option value="KLM C">KLM C</option>
              <option value="EKM C">EKM C</option>
              <option value="TSR C">TSR C</option>
              <option value="KKD C">KKD C</option>
              <option value="KNR C">KNR C</option>
              <option value="TVM R">TVM R</option>
              <option value="KLM R">KLM R</option>
              <option value="PTA">PTA</option>
              <option value="ALP">ALP</option>
              <option value="KTM">KTM</option>
              <option value="IDK">IDK</option>
              <option value="EKM R">EKM R</option>
              <option value="TSR R">TSR R</option>
              <option value="PKD">PKD</option>
              <option value="MLP">MLP</option>
              <option value="KKD R">KKD R</option>
              <option value="WYD">WYD</option>
              <option value="KNR R">KNR R</option>
              <option value="KSD">KSD</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-bold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 transition duration-150">
            Register
          </button>

          <div className="mt-4 text-base text-center">
            <a
              href="/dashboard"
              class=" w-full h-15 overflow-hidden rounded bg-red-700 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2">
              <span class="relative">Cancel Registration</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

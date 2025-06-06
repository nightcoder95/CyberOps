import "./chart-style.css";
import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Colors,
} from "chart.js";

// Register necessary components for chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Colors
);

function TopDataCharts() {
  const [smNameData, setSmNameData] = useState(null); // Initially set to null
  const [fromData, setFromData] = useState(null); // Initially set to null

  const API_URL = import.meta.env.VITE_BACKEND_XCELL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/chart_data`);

        // Process response data for Bar chart
        const smNames = response.data.topSMNames.map((item) => item._id);
        const smNameCounts = response.data.topSMNames.map((item) => item.count);

        // Process response data for Pie chart
        const fromNames = response.data.topFrom.map((item) => item._id);
        const fromCounts = response.data.topFrom.map((item) => item.count);

        setSmNameData({
          labels: smNames,
          datasets: [
            {
              label: "Top 20 SM Accounts",
              data: smNameCounts,
              backgroundColor: "#FF6384",
              borderColor: "#FF6384",
              borderWidth: 1,
            },
          ],
        });

        setFromData({
          labels: fromNames,
          datasets: [
            {
              label: "Top From Data",
              data: fromCounts,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
              borderColor: "#fff",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.log("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="charts-container">
      {smNameData && (
        <div className="chart-wrapper">
          <h3>Most Reported Social Media Accounts</h3>
          <Bar data={smNameData} options={{ maintainAspectRatio: false }} />
        </div>
      )}
      {fromData && (
        <div className="chart-wrapper">
          <h3>SSB Units</h3>
          <Pie data={fromData} options={{ maintainAspectRatio: false }} />
        </div>
      )}
    </div>
  );
}

export default TopDataCharts;

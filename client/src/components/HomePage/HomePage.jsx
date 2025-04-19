import React, { useState, useEffect } from "react";
import "./homepage.css";
import "./homepage-responsive.css";
import AllRecords from "../AllRecords/AllRecords";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import TopDataCharts from "../Charts/TopDataCharts";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [isNavClosed, setIsNavClosed] = useState(false);
  const [totalRecords, setTotalRecords] = useState(null);
  const [totalAccounts, setTotalAccounts] = useState(null);
  const [lastReportDate, setLastReportDate] = useState(null);
  const [lastUpdateDate, setLastUpdateDate] = useState(null);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_XCELL;

  // Effect for getting total records
  useEffect(() => {
    axios
      .get(`${API_URL}/api/total_records`)
      .then((response) => {
        setTotalRecords(response.data.totalRecords);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  // Effect for getting total distinct social media accounts
  useEffect(() => {
    axios
      .get(`${API_URL}/api//total_accounts`)
      .then((response) => {
        setTotalAccounts(response.data.totalNames);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  // Effect to get the latest report date
  useEffect(() => {
    axios
      .get(`${API_URL}/api/last_report_date/`)
      .then((response) => {
        setLastReportDate(response.data.lastReportDate);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Effect for getting last updated date
  useEffect(() => {
    axios
      .get(`${API_URL}/api/last_updated_date/`)
      .then((response) => {
        setLastUpdateDate(response.data.lastUpdatedDate);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  // Toggle navigation menu
  const handleMenuClick = () => {
    setIsNavClosed(!isNavClosed);
  };

  // Handle option selection

  return (
    <>
      {/* header part */}
      <Navbar handleMenuClick={handleMenuClick} />

      <div className="main-container">
        {/* SideBar  */}

        <Sidebar isNavClosed={isNavClosed} />
        {/* Hero Section */}
        <div className="main">
          {/* Cards */}
          <div className="box-container">
            <div className="box box1" onClick={() => navigate("/data-table")}>
              <div className="text">
                <h2 className="text-2xl font-black ">{totalRecords}</h2>
                <h2 className="topic">Records</h2>
              </div>

              <img src="/records.png" alt="Views" />
            </div>

            <div className="box box2" onClick={() => navigate("/all-profiles")}>
              <div className="text">
                <h2 className="text-2xl font-black ">{totalAccounts}</h2>
                <h2 className="topic">Unique SM Accounts</h2>
              </div>

              <img src="/account.png" alt="likes" />
            </div>

            <div className="box box3">
              <div className="text">
                <h2 className="text-2xl font-black ">{lastReportDate}</h2>
                <h2 className="topic">Last Report Date</h2>
              </div>

              <img src="/date.png" alt="comments" />
            </div>

            <div className="box box4">
              <div className="text">
                <h2 className="text-2xl font-black ">{lastUpdateDate}</h2>
                <h2 className="topic">Last Updated</h2>
              </div>

              <img src="/updation.png" alt="published" />
            </div>
          </div>
          {/* Charts Section */}
          <div className="chart-container">
            {/* <h3>Data Insights</h3> */}
            <TopDataCharts /> {/* Render TopDataCharts here */}
          </div>
          {/* Table */}
          {/* <div className="report-container">
            <div className="report-header">
              <h1 className="recent-Articles">Data Table</h1>
            </div>
            <AllRecords />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default HomePage;

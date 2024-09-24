import React, { useState, useEffect } from "react";
import "./homepage.css";
import "./homepage-responsive.css";
import AllRecords from "../AllRecords/AllRecords";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import TopDataCharts from "../Charts/TopDataCharts";

function HomePage() {
  const [isNavClosed, setIsNavClosed] = useState(false);
  const [totalRecords, setTotalRecords] = useState(null);
  const [totalAccounts, setTotalAccounts] = useState(null);

  // Effect for getting total records
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/total_records")
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
      .get("http://localhost:3000/api//total_accounts")
      .then((response) => {
        setTotalAccounts(response.data.totalNames);
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
            <div className="box box1">
              <div className="text">
                <h2 className="topic-heading">{totalRecords}</h2>
                <h2 className="topic">Records</h2>
              </div>

              <img src="/records.png" alt="Views" />
            </div>

            <div className="box box2">
              <div className="text">
                <h2 className="topic-heading">{totalAccounts}</h2>
                <h2 className="topic">Social Media Accounts</h2>
              </div>

              <img
                src="/account.png"
                alt="likes"
              />
            </div>

            <div className="box box3">
              <div className="text">
                <h2 className="topic-heading">320</h2>
                <h2 className="topic">Comments</h2>
              </div>

              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(32).png"
                alt="comments"
              />
            </div>

            <div className="box box4">
              <div className="text">
                <h2 className="topic-heading">70</h2>
                <h2 className="topic">Published</h2>
              </div>

              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185029/13.png"
                alt="published"
              />
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

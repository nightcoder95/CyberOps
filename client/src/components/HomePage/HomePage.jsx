import React, { useState, useEffect } from "react";
import "./homepage.css";
import "./homepage-responsive.css";
import AllRecords from "../AllRecords/AllRecords";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function HomePage() {
  const [isNavClosed, setIsNavClosed] = useState(false);

  // Toggle navigation menu
  const handleMenuClick = () => {
    setIsNavClosed(!isNavClosed);
  };

  // Handle option selection

  return (
    <>
      {/* header part */}
      <Navbar handleMenuClick={handleMenuClick}/>

      <div className="main-container">
        {/* SideBar  */}
        
        <Sidebar isNavClosed={isNavClosed}/>
        {/* Hero Section */}
        <div className="main">
          {/* Cards */}
          <div className="box-container">
            <div className="box box1">
              <div className="text">
                <h2 className="topic-heading">60.5k</h2>
                <h2 className="topic">Article Views</h2>
              </div>

              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(31).png"
                alt="Views"
              />
            </div>

            <div className="box box2">
              <div className="text">
                <h2 className="topic-heading">150</h2>
                <h2 className="topic">Likes</h2>
              </div>

              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185030/14.png"
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

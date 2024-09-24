import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ isNavClosed }) {
  const [activeOption, setActiveOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  return (
    <>
      <div className={`navcontainer ${isNavClosed ? "navclose" : ""}`}>
        <nav className="nav ">
          <div className="nav-upper-options">
            <div
              className={`nav-option ${
                activeOption === "option1" ? "active" : ""
              }`}
              onClick={() => {
                handleOptionClick("option1");
                navigate("/");
              }}
            >
              <img src="/dashboard.png" className="nav-img" alt="dashboard" />
              <h3>Dashboard</h3>
            </div>

            <div
              className={`nav-option ${
                activeOption === "option2" ? "active" : ""
              }`}
              onClick={() => {
                handleOptionClick("option2");
                navigate("/create-record");
              }}
            >
              <img src="/create.png" className="nav-img" alt="articles" />
              <h3>Create Record</h3>
            </div>

            <div
              className={`nav-option ${
                activeOption === "option3" ? "active" : ""
              }`}
              onClick={() => {handleOptionClick("option3")
                navigate("/data-table");
              }}
            >
              <img
                src="/dataTable.png"
                className="nav-img"
                alt="report"
              />
              <h3>Data Table</h3>
            </div>

            {/* <div className="nav-option option4" onclick="selectOption(this)">
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                className="nav-img"
                alt="institution"
              />
              <h3>Institution</h3>
            </div>

            <div className="nav-option option5" onClick="selectOption(this)">
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                className="nav-img"
                alt="blog"
              />
              <h3>Profile</h3>
            </div>

            <div className="nav-option option6" onClick="selectOption(this)">
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/4.png"
                className="nav-img"
                alt="settings"
              />
              <h3>Settings</h3>
            </div>

            <div className="nav-option logout">
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                className="nav-img"
                alt="logout"
              />
              <h3>Logout</h3>
            </div> */}
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;

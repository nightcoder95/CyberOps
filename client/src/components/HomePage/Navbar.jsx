import React from "react";
import { Link } from "react-router-dom";

function Navbar({ handleMenuClick }) {
  // const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <header>
        <div className="logosec">
          <div className="logo">SMP MS</div>
          <img
            src="/hamburger.png"
            className="icn menuicn {`navcontainer ${isSidebarOpen ? '' : 'navclose'}`}"
            id="menuicn"
            alt="menu-icon"
            onClick={handleMenuClick}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-wide text-center text-transparent text-gray-800 uppercase transition-all duration-500 ease-in-out sm:text-xl md:text-2xl lg:text-3xl md:tracking-wider bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 bg-clip-text animate-pulse hover:animate-none hover:text-blue-600 md:text-left">
            Social Media Profile Monitoring System
          </h1>
        </div>

        {/* <div className="searchbar">
          <input type="text" placeholder="Search" />
          <div className="searchbtn">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
              className="icn srchicn"
              alt="search-icon"
            />
          </div>
        </div> */}

        {/* <div className="notification">
          {user.role === "admin" && <Link to="/register">Create New User</Link>}
        </div> */}

        <div className="message">
          <div className="dp">
            <img src="/user.png" className="dpicn" alt="dp" />
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;

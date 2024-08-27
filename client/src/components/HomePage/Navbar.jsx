import React from "react";

function Navbar({handleMenuClick}) {
  return (
    <>
      <header>
        <div className="logosec">
          <div className="logo">CyberOps</div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
            className="icn menuicn {`navcontainer ${isSidebarOpen ? '' : 'navclose'}`}"
            id="menuicn"
            alt="menu-icon"
            onClick={handleMenuClick}
          />
        </div>

        <div className="searchbar">
          <input type="text" placeholder="Search" />
          <div className="searchbtn">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
              className="icn srchicn"
              alt="search-icon"
            />
          </div>
        </div>

        <div className="message">
          <div className="dp">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
              className="dpicn"
              alt="dp"
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;

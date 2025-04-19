import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Navbar from "../HomePage/Navbar";
import Sidebar from "../HomePage/Sidebar";
import { InputText } from "primereact/inputtext";

const AllProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [isNavClosed, setIsNavClosed] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_XCELL;

  // State for global filtering
  const [globalFilter, setGlobalFilter] = useState("");
  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  const handleMenuClick = () => {
    setIsNavClosed(!isNavClosed);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.get(`${API_URL}/api/total_accounts`);
        console.log(response.data);
        setProfiles(response.data.data);
      } catch (error) {
        console.log("Error is: ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar handleMenuClick={handleMenuClick} />
      <div className="main-container">
        <Sidebar isNavClosed={isNavClosed} />

        <div className="main">
          <div className="report-container">
            <div className="report-header">
              <h1 className="recent-Articles">All Profiles</h1>
            </div>
            <div className="custom-datatable">
              <div className="p-inputgroup global-search">
                <span className="p-inputgroup-addon search-icon">
                  <img src="/search.png" alt="" />
                </span>
                <InputText
                  type="search"
                  value={globalFilter}
                  onChange={onGlobalFilterChange}
                  placeholder="Search Profiles"
                />
              </div>
              <DataTable
                globalFilter={globalFilter}
                value={profiles}
                resizableColumns
                showGridlines
                paginator
                rows={5}
                removableSort
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                tableStyle={{ minWidth: "50rem" }}
                className="styled-table"
                paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink">
                <Column
                  sortable
                  field="totalRecords"
                  header="Total Records"
                  bodyStyle={{ padding: "10px", textAlign: "left" }}
                  body={(rowData) => (
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "50px", // Adjust this width as needed
                      }}
                      title={rowData.totalRecords} // Tooltip on hover
                    >
                      {rowData.totalRecords}
                    </div>
                  )}
                />
                <Column
                  sortable
                  field="sm_name"
                  header="SM Account"
                  bodyStyle={{ padding: "10px", textAlign: "left" }}
                  body={(rowData) => (
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "400px", // Adjust this width as needed
                      }}
                      title={rowData.sm_name} // Tooltip on hover
                    >
                      {rowData.sm_name}
                    </div>
                  )}
                />
                <Column
                  sortable
                  field="link"
                  header="Link"
                  bodyStyle={{ padding: "10px", textAlign: "left" }}
                  body={(rowData) => (
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "680px", // Adjust this width as needed
                      }}
                      title={rowData.link} // Tooltip on hover
                    >
                      {rowData.link}
                    </div>
                  )}
                />
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProfiles;

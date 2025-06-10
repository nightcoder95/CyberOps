import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Navbar from "../HomePage/Navbar";
import Sidebar from "../HomePage/Sidebar";
import { InputText } from "primereact/inputtext";
import { data } from "autoprefixer";

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
        const response = await axios.get(`${API_URL}/api/total_accounts`);
        // To add SL to the table, we need to map the response data and add the index to it because we don't have a sl field in the database
        const dataWithSL = response.data.data.map((item, index) => ({
          ...item,
          sl: index + 1, //So for each item,we add a new sl to it so that we can use it in the datatable
        }));
        setProfiles(dataWithSL);
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
              <h1 className="recent-Articles">Unique Social Media Profiles</h1>
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
                rows={10}
                removableSort
                rowsPerPageOptions={[10, 25, 50, 100]}
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                tableStyle={{ minWidth: "50rem" }}
                className="styled-table"
                paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink">
                <Column
                  sortable
                  field="sl"
                  header="SL"
                  style={{ width: "80px", textAlign: "left" }}
                />

                <Column
                  sortable
                  field="sm_name"
                  header="Social Media Profiles"
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
                      <Link
                        to={`/profile/${encodeURIComponent(rowData.sm_name)}`}
                        style={{
                          color: "#3A59D1",
                          textDecoration: "underline",
                        }}>
                        {rowData.sm_name}
                      </Link>
                    </div>
                  )}
                />
                <Column
                  sortable
                  field="totalRecords"
                  header="Count"
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
                {/* <Column
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
                /> */}
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProfiles;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./CustomDataTable.css";
import Navbar from "../HomePage/Navbar";
import Sidebar from "../HomePage/Sidebar";
import { InputText } from "primereact/inputtext";

function AllRecords() {
  const [records, setRecords] = useState([]); // Stores the records fetched from the backend
  const [isNavClosed, setIsNavClosed] = useState(false);
  const navigate = useNavigate();

  // State for global filtering
  const [globalFilter, setGlobalFilter] = useState("");
  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };


  //function to change date to dd-MM-yyyy
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const handleMenuClick = () => {
    setIsNavClosed(!isNavClosed);
  };

  //Get data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.get(
          "http://localhost:3000/api/get_records"
        );
        // Update state with the fetched records and total pages
        setRecords(response.data.records);
        console.log(records);
        // setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log("Error is: ", error);
      }
    };
    fetchData();
  }, []); // Re-run the effect when currentPage changes

  // Custom template for the action buttons(view, edit, delete)
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="card flex justify-content-center">
        {/* Since rowData contains all the data from the backend, rowData._id is necessary instead of mapping through records */}
        <Button
          label="View"
          link
          onClick={() => navigate(`/record-detail/` + rowData._id)}
          style={{ marginRight: "15px" }}
        />
        <Button
          label="Edit"
          link
          onClick={() => navigate(`/update-record/` + rowData._id)}
          style={{ marginRight: "15px" }}
        />
        {/* <Button
          label="Delete"
          link
          onClick={() => navigate(`/delete-record/` + rowData._id)}
        /> */}
      </div>
    );
  };

  // Example edit and delete functions
  // const editRecord = (rowData) => {
  //   console.log("Editing", rowData);
  //   // Add your edit logic here
  // };

  // Function for global search

  return (
    <>
      {/* header part */}
      <Navbar handleMenuClick={handleMenuClick} />

      <div className="main-container">
        {/* SideBar  */}
        <Sidebar isNavClosed={isNavClosed} />

        {/* Hero Section */}
        <div className="main">
          {/* Table */}
          <div className="report-container">
            <div className="report-header">
              <h1 className="recent-Articles">Data Table</h1>
            </div>
            <div className="custom-datatable">
              <div className="p-inputgroup global-search">
                <span className="p-inputgroup-addon search-icon">
                  <img src="/search.png" />
                </span>
                <InputText
                  type="search"
                  value={globalFilter}
                  onChange={onGlobalFilterChange}
                  placeholder="Search this table"
                />
              </div>
              <DataTable
                globalFilter={globalFilter}
                value={records}
                resizableColumns
                showGridlines
                paginator
                rows={5}
                removableSort
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                tableStyle={{ minWidth: "60rem" }}
                className="styled-table"
                paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink">
                <Column
                  sortable
                  field="record_id"
                  header="ID"
                  bodyStyle={{ padding: "10px", textAlign: "left" }}></Column>
                <Column
                  sortable
                  field="report_date"
                  header="Date"
                  dateFormat="dd/mm/yyyy"></Column>
                <Column
                  sortable
                  field="from"
                  header="From"
                  bodyStyle={{ padding: "10px", textAlign: "left" }}></Column>
                <Column
                  sortable
                  field="sm_name"
                  header="Social Media Name"
                  bodyStyle={{
                    maxWidth: "50px",
                    padding: "10px",
                    textAlign: "left",
                  }}></Column>
                <Column
                  sortable
                  field="reference"
                  header="Reference"
                  bodyStyle={{ padding: "10px", textAlign: "left" }}></Column>
                <Column
                  header="Action"
                  body={actionBodyTemplate}
                  bodyStyle={{ padding: "10px", textAlign: "left" }}></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllRecords;

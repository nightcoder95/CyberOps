import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Navbar from "../HomePage/Navbar";
import Sidebar from "../HomePage/Sidebar";

const ProfileLinks = () => {
  const { sm_name } = useParams();
  const [links, setLinks] = useState([]);
  const [isNavClosed, setIsNavClosed] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_XCELL;

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/links/${encodeURIComponent(sm_name)}`
        );
        const linkWithSL = response.data.links.map((item, index) => ({
          ...item,
          sl: index + 1,
        }));
        setLinks(linkWithSL);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLinks();
  }, [sm_name]);

  const handleMenuClick = () => {
    setIsNavClosed(!isNavClosed);
  };

  return (
    <>
      <Navbar handleMenuClick={handleMenuClick} />
      <div className="main-container">
        <Sidebar isNavClosed={isNavClosed} />
        <div className="main">
          <div className="report-container">
            <div className="report-header">
              <h1 className="recent-Articles">
                {decodeURIComponent(sm_name)} - Social Media Links
              </h1>
            </div>
            <div className="custom-datatable">
              <DataTable
                value={Array.isArray(links) ? links : []}
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25, 50, 100]}
                className="styled-table"
                showGridlines>
                <Column
                  sortable
                  field="sl"
                  header="SL"
                  style={{ width: "80px", textAlign: "center" }}
                />
                <Column
                  sortable
                  header="Link"
                  body={(rowData) => (
                    <div style={{ textAlign: "left", padding: "10px" }}>
                      <a
                        href={rowData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#3A59D1",
                          textDecoration: "underline",
                        }}>
                        {rowData.link}
                      </a>
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

export default ProfileLinks;

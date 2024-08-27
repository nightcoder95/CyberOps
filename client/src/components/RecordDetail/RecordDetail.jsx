import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./recorddetail.css";
import Navbar from "../HomePage/Navbar";
import Sidebar from "../HomePage/Sidebar";


function RecordDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialFormData = {
    record_id: "",
    smm_link: "",
    type: "",
    pp_id: "",
    dbid: "",
    type_01: "",
    type_02: "",
    type_03: "",
    platform: "",
    from: "",
    report_date: "",
    reference: "",
    organization: "",
    sm_name: "",
    mobile: "",
    link: "",
    social: "",
    remarks: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  //Using useEffect for getting the user by ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/get_record/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const [isNavClosed, setIsNavClosed] = useState(false);

  // Toggle navigation menu
  const handleMenuClick = () => {
    setIsNavClosed(!isNavClosed);
  };

  //For Delete button
  

  return (
    <>
      {/* header part */}
      <Navbar handleMenuClick={handleMenuClick} />

      <div className="main-container">
        {/* SideBar */}
        <Sidebar isNavClosed={isNavClosed} />
        {/* Hero Section */}
        <div className="main">
          <div className="container">
            <div className="header">
              <h1>Record Details</h1>
              <h4>Record ID: {formData.record_id}</h4>
            </div>

            <div className="content">
              <div className="image-container">
                <img
                  src={`/${formData.record_id}.jpg`}
                  alt="Image missing"
                  className="image"
                />
              </div>
              <div className="details-container">
                <div className="section-1">
                  <div className="section">
                    <h2>Basic Information</h2>
                    <p>
                      <span>Platform:</span> {formData.platform}
                    </p>
                    <p>
                      <span>Type 01:</span> {formData.type_01}
                    </p>
                    <p>
                      <span>Type 02:</span> {formData.type_02}
                    </p>
                    <p>
                      <span>Type 03:</span> {formData.type_03}
                    </p>
                  </div>

                  <div className="section">
                    <h2>Additional Details</h2>
                    <p>
                      <span>Report Date:</span> {formData.report_date}
                    </p>
                    <p>
                      <span>From:</span> {formData.from}
                    </p>
                    <p>
                      <span>Reference:</span> {formData.reference}
                    </p>
                    <p>
                      <span>Organization:</span> {formData.organization}
                    </p>
                  </div>
                </div>
                <div className="section-2">
                  <div className="section">
                    <h2>Social Media & Links</h2>
                    <p>
                      <span>Social Media Name:</span> {formData.sm_name}
                    </p>
                    <p>
                      <span>Link:</span>{" "}
                      <a href="https://example.com" target="_blank">
                        {formData.link}
                      </a>
                    </p>
                    <p>
                      <span>SMM Link:</span> {formData.smm_link}
                    </p>
                  </div>

                  <div className="section">
                    <h2>Remarks & Additional Information</h2>
                    <p>
                      <span>Remarks:</span> {formData.remarks}
                    </p>
                  </div>
                </div>

                <div className="actions">
                  <Link to="/" className="button">
                    Go Back
                  </Link>
                  {/* <Link to={`/delete-record/` + formData._id} className="button delete-button" >Delete</Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecordDetail;

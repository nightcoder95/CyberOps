import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./recorddetail.css";
import Navbar from "../HomePage/Navbar";
import Sidebar from "../HomePage/Sidebar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import FileViewer from "./FileViewer";
// import "../../fonts/NotoSansMalayalam";

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
    dat: "",
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

  const API_URL = import.meta.env.VITE_BACKEND_XCELL;

  //Using useEffect for getting the user by ID
  useEffect(() => {
    axios
      .get(`${API_URL}/api/get_record/${id}`)
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

  // Function to generate the PDF without image
  // const generatePDF = () => {
  //   const doc = new jsPDF();

  //   // Title
  //   doc.text("Record Details", 20, 10);

  //   // Data
  //   const recordData = [
  //     ["Record ID", formData.record_id],
  //     ["Platform", formData.platform],
  //     ["Type 01", formData.type_01],
  //     ["Type 02", formData.type_02],
  //     ["Type 03", formData.type_03],
  //     ["Report Date", formData.report_date],
  //     ["From", formData.from],
  //     ["Reference", formData.reference],
  //     ["Organization", formData.organization],
  //     ["Social Media Name", formData.sm_name],
  //     ["Link", formData.link],
  //     ["SMM Link", formData.smm_link],
  //     ["Remarks", formData.remarks],
  //   ];

  //   // Add the table to the PDF
  //   doc.autoTable({
  //     head: [["Field", "Value"]],
  //     body: recordData,
  //     startY: 20,
  //   });

  //   // Save the PDF
  //   doc.save(`record-${formData.record_id}.pdf`);
  // };

  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Record Details", 20, 15);

    try {
      const imgUrl = `/SMM/${formData.record_id}.jpg`;
      const response = await fetch(imgUrl);

      if (!response.ok) throw new Error("Image not found");

      const imgBlob = await response.blob();

      const reader = new FileReader();
      reader.readAsDataURL(imgBlob);
      reader.onloadend = () => {
        const base64data = reader.result;

        const img = new Image();
        img.src = base64data;
        img.onload = () => {
          const imgWidth = 100;
          const imgHeight = 100;
          const pageWidth = doc.internal.pageSize.getWidth();
          const xPos = (pageWidth - imgWidth) / 2;

          doc.addImage(base64data, "JPEG", xPos, 20, imgWidth, imgHeight);

          const recordData = [
            ["Record ID", formData.record_id],
            ["Platform", formData.platform],
            ["Type 01", formData.type_01],
            ["Type 02", formData.type_02],
            ["dat", formData.dat],
            ["Report Date", formData.report_date],
            ["From", formData.from],
            ["Reference", formData.reference],
            ["Organization", formData.organization],
            ["Social Media Name", formData.sm_name],
            ["Social Media Data", formData.social],
            ["Link", formData.link],
            ["SMM Link", formData.smm_link],
            ["Remarks", formData.remarks],
          ];

          autoTable(doc, {
            head: [["Field", "Value"]],
            body: recordData,
            startY: 20 + imgHeight + 20,
          });

          doc.save(`SMPMS-${formData.record_id}.pdf`);
        };
      };
    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast.error("Could not generate PDF. Image might be missing.");
    }
  };

  //To get date in DD/MM/YYYY format
  const formatDate = (value) => {
    if (!value) return ""; // In case the date is null or undefined
    const date = new Date(value);
    return date.toLocaleDateString("en-GB"); // 'en-GB' formats date as 'dd/mm/yyyy'
  };

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
              {/* <div className="image-container">
                <img
                  src={`/SMM/${formData.record_id}.jpg`}
                  alt="Image missing"
                  className="image"
                />
              </div> */}
              <FileViewer recordId={formData.record_id} />

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
                      <span>DAT: </span> {formData.dat}
                    </p>
                    {/* <p>
                      <span>Type:</span> {formData.type}
                    </p> */}
                    <p>
                      <span>PP ID:</span> {formData.pp_id}
                    </p>
                    <p>
                      <span>DB ID:</span> {formData.dbid}
                    </p>
                  </div>

                  <div className="section">
                    <h2>Additional Details</h2>
                    <p>
                      <span>Report Date:</span>{" "}
                      {formatDate(formData.report_date)}
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
                    <p>
                      <span>Mobile:</span> {formData.mobile}
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
                      <a
                        href={formData.link}
                        target="_blank"
                        rel="noopener noreferrer">
                        {formData.link}
                      </a>
                    </p>
                    <p>
                      <span>SMM Link:</span> {formData.smm_link}
                    </p>
                    <p>
                      <span>Data SM/Report:</span> {formData.social}
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
                  <Link to="/data-table" className="button">
                    Go Back
                  </Link>
                  <button onClick={generatePDF} className="button">
                    Download PDF
                  </button>
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

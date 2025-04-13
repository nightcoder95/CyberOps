import React, { useState, useEffect } from "react";
import Navbar from "../HomePage/Navbar";
import Sidebar from "../HomePage/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./updaterecord.css";

function UpdateRecord() {
  const [isNavClosed, setIsNavClosed] = useState(false);

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
  // function to store the user entered form data to the state variable
  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Function for handling form submission
  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`${API_URL}/api/update_record/${id}`, formData)
      .then((response) => {
        toast.success(response.data.message);
        navigate("/data-table");
        setFormData(initialFormData);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Uh oh...Something went wrong.");
      });
  };

  // Toggle navigation menu
  const handleMenuClick = () => {
    setIsNavClosed(!isNavClosed);
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
          <div className="form-container">
            <h2 className="edit-heading">Edit Record</h2>
            <form className="data-form" onSubmit={submitForm}>
              <div className="group-1">
                <div className="form-group">
                  <label htmlFor="record_id">Record ID</label>
                  <input
                    onChange={inputHandler}
                    type="text"
                    id="record_id"
                    name="record_id"
                    value={formData.record_id}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="smm_link">SMM Link</label>
                  <input
                    onChange={inputHandler}
                    type="number"
                    id="smm_link"
                    name="smm_link"
                    onWheel={(e) => e.target.blur()}
                    value={formData.smm_link}
                  />
                </div>
                {/* <div className="form-group">
            <label htmlFor="type">Type</label>
            <input
              onChange={inputHandler}
              type="text"
              id="type"
              name="type"
              value={formData.type}

            />
          </div> */}
                <div className="form-group">
                  <label htmlFor="pp_id">PP ID</label>
                  <input
                    onChange={inputHandler}
                    type="number"
                    id="pp_id"
                    name="pp_id"
                    value={formData.pp_id}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dbid">DBID</label>
                  <input
                    onChange={inputHandler}
                    type="number"
                    id="dbid"
                    name="dbid"
                    onWheel={(e) => e.target.blur()}
                    value={formData.dbid}
                  />
                </div>
              </div>
              <div className="group-2">
                <div className="form-group">
                  <label htmlFor="type_01">Type 01</label>
                  <select
                    onChange={inputHandler}
                    value={formData.type_01}
                    id="type_01"
                    name="type_01">
                    <option value="null"></option>
                    <option value="Social Media Operative">
                      Social Media Operative
                    </option>
                    <option value="Cyber Internal Security Suspects">
                      Cyber Internal Security Suspects
                    </option>
                    <option value="Communal">Communal</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="type_02">Type 02</label>
                  <select
                    onChange={inputHandler}
                    value={formData.type_02}
                    id="type_02"
                    name="type_02">
                    <option value="null"></option>
                    <option value="Radical / Fundaments">
                      Radical / Fundaments
                    </option>
                    <option value="LWE">LWE</option>
                    <option value="Organized Crimes">Organized Crimes</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="type_03">Type 03</label>
                  <select
                    onChange={inputHandler}
                    id="type_03"
                    value={formData.type_03}
                    name="type_03">
                    <option value="null"></option>
                    <option value="	Defamatory post which may cause L/O issue">
                      {" "}
                      Defamatory post which may cause L/O issue
                    </option>
                    <option value="Posts that are detrimental to communal harmony">
                      Posts that are detrimental to communal harmony
                    </option>
                    <option value="Cyber Frauds">Cyber Frauds</option>
                    <option value="Sexually abusive">Sexually abusive</option>
                  </select>
                </div>
              </div>
              <div className="group-3">
                <div className="form-group">
                  <label htmlFor="platform">Platform</label>
                  <select
                    onChange={inputHandler}
                    id="platform"
                    value={formData.platform}
                    name="platform">
                    <option value="null"></option>
                    <option value="facebook">Facebook</option>
                    <option value="signal">Signal</option>
                    <option value="skype">skype</option>
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter</option>
                    <option value="zoom">Zoom</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="reddit">Reddit</option>
                    <option value="pinterest">Pinterest</option>
                    <option value="snapchat">Snapchat</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="discord">Discord</option>
                    <option value="telegram">Telegram</option>
                    <option value="medium">Medium</option>
                    <option value="tumblr">Tumblr</option>
                    <option value="flickr">Flickr</option>
                    <option value="botim">BOTIM</option>
                    <option value="soundcloud">SoundCloud</option>
                    <option value="quora">Quora</option>
                    <option value="blogger">Blogger</option>
                    <option value="amazon">Amazon</option>
                    <option value="ebay">eBay</option>
                    <option value="olx">OLX</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="report_date">Report Date</label>
                  <input
                    value={formData.report_date}
                    onChange={inputHandler}
                    type="date"
                    name="report_date"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="from">From</label>
                  <input
                    value={formData.from}
                    onChange={inputHandler}
                    type="text"
                    id="from"
                    name="from"
                    required
                  />
                </div>
              </div>
              <div className="group-4">
                <div className="form-group">
                  <label htmlFor="reference">Reference</label>
                  <input
                    value={formData.reference}
                    onChange={inputHandler}
                    type="text"
                    id="reference"
                    name="reference"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="organization">Organization</label>
                  <input
                    value={formData.organization}
                    onChange={inputHandler}
                    type="text"
                    id="organization"
                    name="organization"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sm_name">SM Name</label>
                  <input
                    value={formData.sm_name}
                    onChange={inputHandler}
                    type="text"
                    id="sm_name"
                    name="sm_name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">Mobile</label>
                  <input
                    value={formData.mobile}
                    onChange={inputHandler}
                    type="number"
                    id="mobile"
                    name="mobile"
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
              </div>
              <div className="group-5">
                <div className="form-group">
                  <label htmlFor="link">Link</label>
                  <input
                    value={formData.link}
                    onChange={inputHandler}
                    type="text"
                    id="link"
                    name="link"
                  />
                </div>
              </div>
              <div className="group-6">
                <div className="form-group">
                  <label htmlFor="social">Social</label>
                  <textarea
                    value={formData.social}
                    onChange={inputHandler}
                    type="text"
                    id="social"
                    name="social"
                  />
                </div>
              </div>
              <div className="group-7">
                <div className="form-group">
                  <label htmlFor="remarks">Remarks</label>
                  <textarea
                    value={formData.remarks}
                    onChange={inputHandler}
                    id="remarks"
                    name="remarks"></textarea>
                </div>
              </div>
              <div className="form-group update-btn">
                <button className="submit-btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateRecord;

import React, { useState, useEffect } from "react";
import Navbar from "../HomePage/Navbar";
import Sidebar from "../HomePage/Sidebar";
import "./createrecord.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function CreateRecord() {
  const [isNavClosed, setIsNavClosed] = useState(false);
  const [lastRecord, setLastRecord] = useState(null);
  const navigate = useNavigate();

  const initialFormData = {
    // Initially the lastRecord has the value null
    record_id: lastRecord,
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

  // function to store the user entered form data to the state variable
  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle navigation menu
  const handleMenuClick = () => {
    setIsNavClosed(!isNavClosed);
  };

  // effect for getting the last record_id
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.get(
          "http://localhost:3000/api/last_record"
        );
        // Update state with the fetched records and total pages
        const result = response.data.lastRecord;
        setLastRecord(result + 1);
        // console.log("Result: ", (result));
        // console.log("Last Record: ", lastRecord);
      } catch (error) {
        console.log("Error is: ", error);
      }
    };
    fetchData();
  }, []); // Re-run the effect when currentPage changes

  //Function for handling form submission
  const submitForm = async (e) => {
    e.preventDefault();
    // dataToSend is needed because this function runs as asynchronous, and this is need to change the value of record_id to lastRecord
    const dataToSend = { ...formData, record_id: lastRecord };
    console.log(dataToSend);
    await axios
      .post("http://localhost:3000/api/create_record", dataToSend)
      .then((response) => {
        toast.success(response.data.message);
        navigate("/");
        setFormData(initialFormData);
      })
      .catch((err) => {
        console.log(err);
      });
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
          {/* Form */}
          <div className="form-container">
            <h2 className="create-heading">Create Record</h2>
            <form className="data-form" onSubmit={submitForm}>
              <div className="group-1">
                <div className="form-group">
                  <label for="record_id">Record ID</label>
                  <input
                    type="text"
                    id="record_id"
                    name="record_id"
                    value={lastRecord}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label for="smm_link">SMM Link</label>
                  <input
                    onChange={inputHandler}
                    type="number"
                    id="smm_link"
                    name="smm_link"
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
                <div className="form-group">
                  <label for="type">Type</label>
                  <input
                    onChange={inputHandler}
                    type="text"
                    id="type"
                    name="type"
                  />
                </div>
                <div className="form-group">
                  <label for="pp_id">PP ID</label>
                  <input
                    onChange={inputHandler}
                    type="number"
                    id="pp_id"
                    name="pp_id"
                  />
                </div>
                <div className="form-group">
                  <label for="dbid">DBID</label>
                  <input
                    onChange={inputHandler}
                    type="number"
                    id="dbid"
                    name="dbid"
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
              </div>
              <div className="group-2">
                <div className="form-group">
                  <label for="type_01">Type 01</label>
                  <select onChange={inputHandler} id="type_01" name="type_01">
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
                  <label for="type_02">Type 02</label>
                  <select onChange={inputHandler} id="type_02" name="type_02">
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
                  <label for="type_03">Type 03</label>
                  <select onChange={inputHandler} id="type_03" name="type_03">
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
                  <label for="platform">Platform</label>
                  <select onChange={inputHandler} id="platform" name="platform"  defaultValue="facebook">
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
                  <label for="report_date">Report Date</label>
                  <input
                    onChange={inputHandler}
                    type="date"
                    name="report_date"
                    required
                  />
                </div>
              </div>
              <div className="group-4">
                <div className="form-group">
                  <label for="from">From</label>
                  <input
                    onChange={inputHandler}
                    type="text"
                    id="from"
                    name="from"
                    required
                  />
                </div>

                <div className="form-group">
                  <label for="reference">Reference</label>
                  <input
                    onChange={inputHandler}
                    type="text"
                    id="reference"
                    name="reference"
                  />
                </div>
                <div className="form-group">
                  <label for="organization">Organization</label>
                  <input
                    onChange={inputHandler}
                    type="text"
                    id="organization"
                    name="organization"
                  />
                </div>
              </div>
              <div className="group-5">
                <div className="form-group">
                  <label for="sm_name">SM Name</label>
                  <input
                    onChange={inputHandler}
                    type="text"
                    id="sm_name"
                    name="sm_name"
                  />
                </div>
                <div className="form-group">
                  <label for="mobile">Mobile</label>
                  <input
                    onChange={inputHandler}
                    type="number"
                    id="mobile"
                    name="mobile"
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
                <div className="form-group">
                  <label for="link">Link</label>
                  <input
                    onChange={inputHandler}
                    type="text"
                    id="link"
                    name="link"
                  />
                </div>
              </div>
              <div className="group-7">
                <div className="form-group">
                  <label for="social">Social</label>
                  <input
                    onChange={inputHandler}
                    type="text"
                    id="social"
                    name="social"
                  />
                </div>
                <div className="form-group">
                  <label for="remarks">Remarks</label>
                  <textarea id="remarks" name="remarks"></textarea>
                </div>
              </div>
              <div className="form-group">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateRecord;

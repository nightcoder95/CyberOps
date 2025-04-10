import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "../HomePage/Navbar";
import './deleterecord.css'

function DeleteRecord() {
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteRecord = async () => {
    await axios
      .delete(`http://172.18.20.63:3000/api/delete_record/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="delete-container">
        <div className="warning-card">
          <h3 className="warning-title">Warning</h3>
          <p className="warning-message">
            You are about to delete this record. This action is irreversible.
          </p>
          <div className="actions">
            <button type="button" className="btn btn-danger" onClick={() => deleteRecord(id)}>
              Proceed
            </button>
            <a href="/" className="btn btn-primary">
              Go Back
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteRecord;

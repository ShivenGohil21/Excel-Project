import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MainPage.css";
import "./UploadedFiles.css"; // ⬅️ We'll create this for specific styling

const UploadedFiles = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("userEmail");

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios
      .get("api/uploads", {
        params: { user },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data && Array.isArray(res.data.files)) {
          setFiles(res.data.files);
        }
      })
      .catch((err) => {
        console.error("Error fetching files:", err);
      });
  }, [user, navigate]);

  const handleView = (file) => {
    localStorage.setItem(
      "excelData",
      JSON.stringify({ rows: file.data, columns: file.columns })
    );
    navigate("/dashboard", {
      state: { rows: file.data, columns: file.columns },
    });
  };

  return (
    <div className="main-container">
      <div className="sidebar">
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/Mainpage")}>Upload File</li>
          <li style={{ textDecoration: "underline" }}>Uploaded Files</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header">
          <h3>Uploaded Files</h3>
          <p>Here are your previously uploaded Excel files</p>
        </div>

        <div className="card">
          {files.length === 0 ? (
            <p>No uploaded files found.</p>
          ) : (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Size (bytes)</th>
                  <th>Date & Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index}>
                    <td>{file.fileName}</td>
                    <td>{file.size}</td>
                    <td>{new Date(file.date).toLocaleString()}</td>
                    <td>
                      <button className="view-btn" onClick={() => handleView(file)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadedFiles;

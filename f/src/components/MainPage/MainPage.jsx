import React, { useState } from "react";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
      setUploadMessage("Only .xls or .xlsx files are allowed.");
      return;
    }

    setUploadMessage("Uploading to server...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userEmail", localStorage.getItem("userEmail")?.trim());

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        credentials: "include", // Optional
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Upload failed response:", text);
        throw new Error("Server returned an error response");
      }

      const result = await res.json();

      if (result.success && result.data && result.data.length > 0) {
        const parsedRows = result.data;
        const parsedColumns = Object.keys(parsedRows[0]);

        localStorage.setItem(
          "excelData",
          JSON.stringify({ rows: parsedRows, columns: parsedColumns })
        );

        setUploadMessage("Upload successful! Redirecting...");
        setTimeout(() => {
          navigate("/dashboard", {
            state: {
              rows: parsedRows,
              columns: parsedColumns,
            },
          });
        }, 1000);
      } else {
        setUploadMessage(result.message || "Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadMessage("An error occurred during upload.");
    }
  };

  const triggerFileInput = () => {
    document.getElementById("hiddenFileInput").click();
  };

  const logoutHandler = () => {
    alert("Logged out!");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="sidebar">

        <ul className="sidebar-menu">
          <li style={{ textDecoration: "underline" }}>Upload File</li>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/uploaded-files")}>Uploaded Files</li>
          
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h3>Monitor History</h3>
          <p>Monitor your file access and deletion activity in real time</p>
        </div>

        <div className="card">
          
           
          <h5>No Files Found</h5>
          <p>You haven't uploaded any files yet. Upload a file to generate insights.</p>

          <input
            type="file"
            id="hiddenFileInput"
            accept=".xls,.xlsx"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />

          <button className="upload-btn" onClick={triggerFileInput}>
            Upload First File
          </button>

          {uploadMessage && (
            <p style={{ marginTop: "20px", fontWeight: "500", color: "#333" }}>
              {uploadMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

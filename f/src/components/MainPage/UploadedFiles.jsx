// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./MainPage.css";
// import "./UploadedFiles.css";

// const UploadedFiles = () => {
//   const navigate = useNavigate();
//   const user = localStorage.getItem("userEmail");
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     fetchFiles();
//   }, [user, navigate]);

//   const fetchFiles = async () => {
//     try {
//       const response = await axios.get("https://excel-project-1.onrender.com/api/uploads", {
//         params: { user },
//         withCredentials: true,
//       });
      
//       if (response.data && Array.isArray(response.data.files)) {
//         setFiles(response.data.files);
//       }
//     } catch (err) {
//       console.error("Error fetching files:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleView = (file) => {
//     localStorage.setItem(
//       "excelData",
//       JSON.stringify({ rows: file.data, columns: file.columns })
//     );
//     navigate("/dashboard", {
//       state: { rows: file.data, columns: file.columns },
//     });
//   };

//   const handleDelete = async (fileId) => {
//     if (!window.confirm("Are you sure you want to delete this file?")) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`https://excel-project-1.onrender.com/api/uploads/${fileId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });

//       // Remove file from local state
//       setFiles(files.filter(file => file._id !== fileId));
//       alert("File deleted successfully!");
//     } catch (err) {
//       console.error("Error deleting file:", err);
//       alert("Error deleting file. Please try again.");
//     }
//   };

//   const handleDownload = (file) => {
//     if (file.cloudinaryUrl) {
//       window.open(file.cloudinaryUrl, '_blank');
//     } else {
//       alert("Download link not available for this file.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="main-container">
//         <div className="sidebar">
//           <ul className="sidebar-menu">
//             <li onClick={() => navigate("/dashboard")}>Dashboard</li>
//             <li onClick={() => navigate("/Mainpage")}>Upload File</li>
//             <li style={{ textDecoration: "underline" }}>Uploaded Files</li>
//           </ul>
//         </div>
//         <div className="main-content">
//           <div className="header">
//             <h3>Uploaded Files</h3>
//             <p>Loading your files...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="main-container">
//       <div className="sidebar">
//         <ul className="sidebar-menu">
//           <li onClick={() => navigate("/dashboard")}>Dashboard</li>
//           <li onClick={() => navigate("/Mainpage")}>Upload File</li>
//           <li style={{ textDecoration: "underline" }}>Uploaded Files</li>
//         </ul>
//       </div>

//       <div className="main-content">
//         <div className="header">
//           <h3>Uploaded Files</h3>
//           <p>Here are your previously uploaded Excel files</p>
//         </div>

//         <div className="card">
//           {files.length === 0 ? (
//             <p>No uploaded files found.</p>
//           ) : (
//             <table className="custom-table">
//               <thead>
//                 <tr>
//                   <th>File Name</th>
//                   <th>Size (bytes)</th>
//                   <th>Date & Time</th>
//                   <th>Cloud Storage</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {files.map((file, index) => (
//                   <tr key={index}>
//                     <td>{file.fileName}</td>
//                     <td>{file.size}</td>
//                     <td>{new Date(file.date).toLocaleString()}</td>
//                     <td>
//                       {file.cloudinaryUrl ? (
//                         <span style={{ color: "green", fontWeight: "bold" }}>✓ Cloudinary</span>
//                       ) : (
//                         <span style={{ color: "orange", fontWeight: "bold" }}>Local</span>
//                       )}
//                     </td>
//                     <td>
//                       <div className="action-buttons">
//                         <button className="view-btn" onClick={() => handleView(file)}>
//                           View
//                         </button>
//                         {file.cloudinaryUrl && (
//                           <button className="download-btn" onClick={() => handleDownload(file)}>
//                             Download
//                           </button>
//                         )}
//                         <button className="delete-btn" onClick={() => handleDelete(file._id)}>
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadedFiles;


// UploadedFiles.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MainPage.css";
import "./UploadedFiles.css";

const UploadedFiles = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("userEmail");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchFiles();
  }, [user, navigate]);

  const fetchFiles = async () => {
    try {
      console.log("Fetching files for user:", user);
      const response = await axios.get(
        "https://excel-project-1.onrender.com/api/uploads",
        { params: { user }, withCredentials: true }
      );

      console.log("Files response:", response.data);
      if (response.data && Array.isArray(response.data.files)) {
        setFiles(response.data.files);
      } else {
        console.log("No files found or invalid response format");
        setFiles([]);
      }
    } catch (err) {
      console.error("Error fetching files:", err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (file) => {
    localStorage.setItem(
      "excelData",
      JSON.stringify({ rows: file.data, columns: file.columns })
    );
    navigate("/dashboard", {
      state: { rows: file.data, columns: file.columns },
    });
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://excel-project-1.onrender.com/api/uploads/${fileId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setFiles((prev) => prev.filter((file) => file._id !== fileId));
      alert("File deleted successfully!");
    } catch (err) {
      console.error("Error deleting file:", err);
      alert("Error deleting file. Please try again.");
    }
  };

  const handleDownload = (file) => {
    if (file.cloudinaryUrl) {
      // Directly open Cloudinary link
      window.open(file.cloudinaryUrl, "_blank");
    } else {
      alert("No Cloudinary link found for this file.");
    }
  };

  if (loading) {
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
            <p>Loading your files...</p>
          </div>
        </div>
      </div>
    );
  }

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
          <p>Your Excel files stored in Cloudinary</p>
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
                  <th>Cloud Storage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index}>
                    <td>{file.fileName}</td>
                    <td>{file.size}</td>
                    <td>{new Date(file.date).toLocaleString()}</td>
                    <td style={{ color: "green", fontWeight: "bold" }}>
                      ✓ Cloudinary
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="view-btn"
                          onClick={() => handleView(file)}
                        >
                          View
                        </button>
                        <button
                          className="download-btn"
                          onClick={() => handleDownload(file)}
                        >
                          Download
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(file._id)}
                        >
                          Delete
                        </button>
                      </div>
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

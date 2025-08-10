import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./MainPage.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#aa46be", "#FF4560", "#00E396", "#775DD0"];

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("excelData"));
  const rows = location.state?.rows || stored?.rows || [];
  const columns = location.state?.columns || stored?.columns || (rows.length > 0 ? Object.keys(rows[0]) : []);

  const [view, setView] = useState("table");
  const [selectedChart, setSelectedChart] = useState("bar2d");

  useEffect(() => {
    if (rows && rows.length > 0) {
      localStorage.setItem("excelData", JSON.stringify({ rows, columns }));
    } else {
      alert("No data found. Redirecting to upload page.");
      navigate("/Mainpage");
    }
  }, [rows, columns, navigate]);

  const handleViewToggle = (type) => setView(type);
  const handleChartSelect = (e) => setSelectedChart(e.target.value);

  // Extract data for profit/loss charts
  const profitLossData = rows
    .filter((row) => row["Year"] && (row["Profit"] || row["Loss"]))
    .map((row) => ({
      year: row["Year"],
      profit: parseFloat(row["Profit"]) || 0,
      loss: parseFloat(row["Loss"]) || 0,
    }));

  // Extract data for pie/branch charts
  const branchColumnName = columns.find((col) => col.toLowerCase().includes("branch")) || columns[0];
  const branchCounts = rows.reduce((acc, row) => {
    const branch = row[branchColumnName] || "Unknown";
    acc[branch] = (acc[branch] || 0) + 1;
    return acc;
  }, {});

  const branchData = Object.entries(branchCounts).map(([name, value]) => ({ name, value }));

  // Dynamic chart data selection
  let chartData = [];
  let xKey = "";
  let yKeys = [];

  if (selectedChart.startsWith("bar") || selectedChart === "stackedBar") {
    if (profitLossData.length > 0) {
      chartData = profitLossData;
      xKey = "year";
      yKeys = ["profit", "loss"];
    } else {
      chartData = branchData;
      xKey = "name";
      yKeys = ["value"];
    }
  } else if (selectedChart.startsWith("pie")) {
    chartData = branchData;
  }

  return (
    <div className="main-container">
      <div className="sidebar">
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/Mainpage")}>Upload File</li>
          <li style={{ textDecoration: "underline" }}>Dashboard</li>
          <li onClick={() => navigate("/uploaded-files")}>Uploaded Files</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header">
          <h3>Dashboard</h3>
          <p>View your uploaded Excel data in tabular and graphical form</p>
        </div>

        <div className="card">
          <div className="toggle-switch">
            <button className={`switch-btn ${view === "table" ? "active" : ""}`} onClick={() => handleViewToggle("table")}>
              Table
            </button>
            <button className={`switch-btn ${view === "chart" ? "active" : ""}`} onClick={() => handleViewToggle("chart")}>
              Chart
            </button>
          </div>

          {view === "table" && (
            <div className="table-container">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    {columns.map((col, idx) => (
                      <th key={idx}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows
                    .filter((row) => Object.values(row).some((val) => val && String(val).trim() !== ""))
                    .map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {columns.map((col, colIdx) => (
                          <td key={colIdx}>{row[col]}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {view === "chart" && (
            <div className="chart-wrapper">
              <label style={{ marginBottom: "10px", display: "block" }}>Select Chart Type:</label>
              <select value={selectedChart} onChange={handleChartSelect} style={{ padding: "5px" }}>
                <option value="bar2d">2D Bar Chart</option>
                <option value="pie2d">2D Pie Chart</option>
                <option value="bar3d">3D-like Bar Chart</option>
                <option value="pie3d">3D-like Pie Chart</option>
                <option value="stackedBar">Stacked Bar</option>
              </select>

              <div className="chart-container">
                {chartData.length === 0 ? (
                  <p style={{ marginTop: "20px", color: "red" }}>No chart data available to display.</p>
                ) : (
                  <>
                    {selectedChart === "bar2d" && (
                      <BarChart width={900} height={400} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {yKeys.map((key, i) => (
                          <Bar key={key} dataKey={key} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </BarChart>
                    )}

                    {selectedChart === "pie2d" && (
                      <PieChart width={800} height={500}>
                        <Tooltip />
                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          cx="40%"
                          cy="50%"
                          outerRadius={150}
                          label
                        >
                          {chartData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    )}

                    {selectedChart === "bar3d" && (
                      <BarChart width={900} height={400} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {yKeys.map((key, i) => (
                          <Bar
                            key={key}
                            dataKey={key}
                            fill={COLORS[i % COLORS.length]}
                            radius={[10, 10, 0, 0]}
                          />
                        ))}
                      </BarChart>
                    )}

                    {selectedChart === "pie3d" && (
                      <PieChart width={950} height={550}>  // instead of 800x500

                        <Tooltip />
                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          cx="40%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={150}
                          label
                        >
                          {chartData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    )}

                    {selectedChart === "stackedBar" && (
                      <BarChart width={900} height={400} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {yKeys.map((key, i) => (
                          <Bar key={key} dataKey={key} stackId="a" fill={COLORS[i % COLORS.length]} />
                        ))}
                      </BarChart>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



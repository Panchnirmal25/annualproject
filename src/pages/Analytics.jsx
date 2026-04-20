import React, { useState } from "react";
import {
  FaChartLine,
  FaUsers,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line, Doughnut } from "react-chartjs-2";

// ✅ Register charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [darkMode, setDarkMode] = useState(false);

  // ✅ SIMPLE SAFE DATA
  const dataLine = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Performance",
        data: [70, 75, 80, 78],
        borderColor: "blue",
        backgroundColor: "lightblue",
      },
    ],
  };

  const dataBar = {
    labels: ["CSE", "IT", "ME"],
    datasets: [
      {
        label: "Marks",
        data: [85, 78, 70],
        backgroundColor: ["blue", "green", "orange"],
      },
    ],
  };

  const dataPie = {
    labels: ["Pass", "Fail"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["green", "red"],
      },
    ],
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: darkMode ? "#111" : "#f5f5f5",
        color: darkMode ? "white" : "black",
      }}
    >
      {/* ✅ HEADER */}
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
        Analytics Dashboard
      </h1>

      {/* ✅ BUTTON */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          margin: "10px 0",
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Toggle Dark Mode
      </button>

      {/* ✅ CARDS */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={cardStyle}>
          <FaUsers size={30} />
          <h3>Students</h3>
          <p>962</p>
        </div>

        <div style={cardStyle}>
          <FaChartLine size={30} />
          <h3>Performance</h3>
          <p>78%</p>
        </div>

        <div style={cardStyle}>
          <FaCheckCircle size={30} />
          <h3>Pass Rate</h3>
          <p>87%</p>
        </div>

        <div style={cardStyle}>
          <FaExclamationTriangle size={30} />
          <h3>At Risk</h3>
          <p>89</p>
        </div>
      </div>

      {/* ✅ CHARTS */}
      <div style={{ marginTop: "40px" }}>
        <h2>Line Chart</h2>
        <Line data={dataLine} />
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Bar Chart</h2>
        <Bar data={dataBar} />
      </div>

      <div style={{ marginTop: "40px", width: "300px" }}>
        <h2>Pie Chart</h2>
        <Doughnut data={dataPie} />
      </div>
    </div>
  );
}

// ✅ CARD STYLE
const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  width: "150px",
  textAlign: "center",
};
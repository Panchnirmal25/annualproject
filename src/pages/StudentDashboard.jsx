import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaBookOpen, FaChalkboardTeacher, FaClipboardCheck, FaChartLine } from "react-icons/fa";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const user = (() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  })();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const studentName = user?.name || "Student User";

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((v) => !v)} />
      <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />

      <main className={`flex-1 transition-all duration-300 pt-16 overflow-x-auto ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Welcome, {studentName}</h1>
              <p className="text-sm text-gray-500">Student dashboard with role-safe access</p>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View Profile
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[
              { title: "Track Performance", desc: "View your performance trends and grades", icon: FaChartLine },
              { title: "View Marks", desc: "Access subject marks and progress graph", icon: FaBookOpen },
              { title: "Check Attendance", desc: "Monitor real-time attendance status", icon: FaClipboardCheck },
              { title: "View Prediction", desc: "See risk and pass/fail likelihood", icon: FaChartLine }
            ].map((card) => (
              <div key={card.title} className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
                <div className="flex items-center gap-3 mb-3">
                  <card.icon className="text-blue-600 dark:text-blue-300 text-xl" />
                  <h3 className="font-semibold">{card.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl mb-4 font-bold">Student actions (allowed)</h2>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {["Update Details", "Track Consistency", "Analyze Weakness", "Submit Assignments", "Attempt Quizzes", "Prepare Exams", "Join Classes", "Follow Study Plan", "Improve Weak Areas", "Practice Daily", "Set Goals", "Respond Alerts", "Improve Attendance", "Reduce Backlogs", "Access Resources", "Watch Lectures", "Revise Topics", "Learn Skills", "Ask Doubts", "Take Feedback", "Contact Teachers"].map((feature) => (
                <li key={feature} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm">{feature}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl mb-2 font-bold">Student limitations</h2>
            <ul className="space-y-1 list-disc list-inside text-sm text-red-500">
              {["No Edit Marks", "No Access Others", "No Prediction Control", "No Data Modification", "Limited Dashboard", "No Admin Access", "No Teacher Actions", "Dependent On System", "No Analytics Control"].map((limit) => (
                <li key={limit}>{limit}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border border-blue-200 dark:border-blue-700">
            <FaUserCircle className="inline-block mr-2" />
            You are logged in as a <strong>student</strong>. Only student-permitted actions are shown here.
          </div>
        </div>
      </main>
    </div>
  );
}

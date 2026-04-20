import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaUserGraduate, FaChartLine, FaBook, FaUsers, FaCalculator, FaRocket, FaCheckCircle, FaExclamationTriangle, FaDownload, FaUpload, FaClipboardList, FaBell, FaFileExcel, FaUserTie, FaChartBar, FaClock, FaAward, FaDatabase, FaLock, FaGraduationCap, FaUserShield, FaChalkboardTeacher, FaTrophy } from "react-icons/fa";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [inputData, setInputData] = useState({
    attendance: '',
    internalMarks: '',
    assignmentScore: '',
    labScore: '',
    previousMarks: '',
    branch: ''
  });
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('logistic');
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  const [studentsList, setStudentsList] = useState([
    { id: 1, name: 'John Doe', enrollment: 'ENG-001', performance: 'Excellent', attendance: 92, risk: 'None' },
    { id: 2, name: 'Jane Smith', enrollment: 'ENG-002', performance: 'Good', attendance: 85, risk: 'Low' },
    { id: 3, name: 'Mike Johnson', enrollment: 'ENG-003', performance: 'Average', attendance: 78, risk: 'Medium' },
    { id: 4, name: 'Sarah Williams', enrollment: 'ENG-004', performance: 'Poor', attendance: 65, risk: 'High' },
    { id: 5, name: 'Tom Brown', enrollment: 'ENG-005', performance: 'Good', attendance: 88, risk: 'None' },
  ]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!inputData.attendance) newErrors.attendance = 'Attendance is required';
    if (!inputData.internalMarks) newErrors.internalMarks = 'Internal marks are required';
    if (!inputData.assignmentScore) newErrors.assignmentScore = 'Assignment score is required';
    if (!inputData.labScore) newErrors.labScore = 'Lab score is required';
    if (!inputData.previousMarks) newErrors.previousMarks = 'Previous marks are required';
    if (!inputData.branch) newErrors.branch = 'Branch selection is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Management Feature Handlers
  const handleExportData = () => {
    alert('Exporting student data as CSV...');
    // Simulate CSV export
  };

  const handleImportData = () => {
    alert('Opening file import dialog...');
    // File import logic
  };

  const handleBulkAssignGrades = () => {
    alert('Opening bulk grade assignment interface...');
  };

  const handleMarkAttendance = () => {
    alert('Opening attendance marking interface...');
  };

  const handleGenerateReport = () => {
    alert('Generating comprehensive performance report...');
  };

  const handleNotifyStudents = () => {
    alert('Opening batch notification interface...');
  };

  const handleManageRisk = () => {
    alert('Opening at-risk student management panel...');
  };

  const handleViewAnalytics = () => {
    setActiveTab('analytics');
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-orange-600 bg-orange-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const predictPerformance = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const score = (
        (parseFloat(inputData.attendance) || 0) * 0.2 +
        (parseFloat(inputData.internalMarks) || 0) * 0.3 +
        (parseFloat(inputData.assignmentScore) || 0) * 0.2 +
        (parseFloat(inputData.labScore) || 0) * 0.15 +
        (parseFloat(inputData.previousMarks) || 0) * 0.15
      );

      let result = {};
      let adjustment = 0;

      switch (selectedAlgorithm) {
        case 'logistic':
          adjustment = Math.random() * 10 - 5;
          break;
        case 'decision':
          adjustment = score > 70 ? 5 : -5;
          break;
        case 'random':
          adjustment = Math.random() * 20 - 10;
          break;
        default:
          adjustment = 0;
      }

      const finalScore = Math.max(0, Math.min(100, score + adjustment));

      if (finalScore >= 60) {
        result.passFail = 'PASS';
        result.grade = finalScore >= 90 ? 'A+' : finalScore >= 80 ? 'A' : finalScore >= 70 ? 'B+' : 'B';
        result.performance = finalScore >= 85 ? 'Excellent' : finalScore >= 75 ? 'Good' : 'Average';
      } else {
        result.passFail = 'FAIL';
        result.grade = finalScore >= 50 ? 'C' : 'F';
        result.performance = 'Poor';
      }

      setPrediction(result);
      setIsLoading(false);
    }, 2000);
  };

  // Sample data for charts
  const barData = {
    labels: ['Math', 'Science', 'English', 'History', 'Geography'],
    datasets: [{
      label: 'Average Scores',
      data: [75, 82, 78, 85, 80],
      backgroundColor: darkMode
        ? 'rgba(59, 130, 246, 0.8)'
        : 'rgba(54, 162, 235, 0.6)',
      borderColor: darkMode
        ? 'rgba(59, 130, 246, 1)'
        : 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Performance Trend',
      data: [65, 70, 75, 80, 85, 88],
      borderColor: darkMode
        ? 'rgba(147, 51, 234, 1)'
        : 'rgba(75, 192, 192, 1)',
      backgroundColor: darkMode
        ? 'rgba(147, 51, 234, 0.2)'
        : 'rgba(75, 192, 192, 0.2)',
      tension: 0.1,
    }],
  };

  const pieData = {
    labels: ['Excellent', 'Good', 'Average', 'Poor'],
    datasets: [{
      data: [25, 35, 30, 10],
      backgroundColor: darkMode ? [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ] : [
        'rgba(34, 197, 94, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ],
    }],
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex">
        <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />

        <main className={`flex-1 transition-all duration-300 pt-16 overflow-x-auto ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="p-8">

            {/* ================== ADMIN DASHBOARD ================== */}
            {user?.role === 'admin' && (
              <>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                    <FaUserShield className="text-purple-600" /> Admin Dashboard
                  </h1>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    System analytics, user management, and platform controls
                  </p>
                </div>

                {/* Admin Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Users</p>
                        <p className="text-3xl font-bold text-purple-600">348</p>
                      </div>
                      <FaUsers className="text-purple-500 text-3xl" />
                    </div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Sessions</p>
                        <p className="text-3xl font-bold text-blue-600">87</p>
                      </div>
                      <FaCheckCircle className="text-blue-500 text-3xl" />
                    </div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>System Health</p>
                        <p className="text-3xl font-bold text-green-600">99.8%</p>
                      </div>
                      <FaDatabase className="text-green-500 text-3xl" />
                    </div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Reports Generated</p>
                        <p className="text-3xl font-bold text-orange-600">234</p>
                      </div>
                      <FaFileExcel className="text-orange-500 text-3xl" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ================== TEACHER DASHBOARD ================== */}
            {user?.role === 'teacher' && (
              <>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                    <FaChalkboardTeacher className="text-green-600" /> Teacher Dashboard
                  </h1>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Manage your students, grades, and performance predictions
                  </p>
                </div>

                {/* Teacher Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>My Students</p>
                        <p className="text-3xl font-bold text-green-600">45</p>
                      </div>
                      <FaUsers className="text-green-500 text-3xl" />
                    </div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Class Avg Grade</p>
                        <p className="text-3xl font-bold text-blue-600">A-</p>
                      </div>
                      <FaAward className="text-blue-500 text-3xl" />
                    </div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pass Rate</p>
                        <p className="text-3xl font-bold text-green-600">93%</p>
                      </div>
                      <FaCheckCircle className="text-green-500 text-3xl" />
                    </div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending Grades</p>
                        <p className="text-3xl font-bold text-orange-600">12</p>
                      </div>
                      <FaClipboardList className="text-orange-500 text-3xl" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ================== STUDENT DASHBOARD ================== */}
            {user?.role === 'student' && (
              <>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                    <FaUserGraduate className="text-blue-600" /> My Academic Dashboard
                  </h1>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Your performance analytics and predictions
                  </p>
                </div>

                {/* Student Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current CGPA</p>
                        <p className="text-3xl font-bold text-blue-600">3.75</p>
                      </div>
                      <FaChartLine className="text-blue-500 text-3xl" />
                    </div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Overall Grade</p>
                        <p className="text-3xl font-bold text-green-600">A</p>
                      </div>
                      <FaAward className="text-green-500 text-3xl" />
                    </div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Attendance</p>
                        <p className="text-3xl font-bold text-purple-600">91%</p>
                      </div>
                      <FaCheckCircle className="text-purple-500 text-3xl" />
                    </div>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Achievements</p>
                        <p className="text-3xl font-bold text-yellow-600">5</p>
                      </div>
                      <FaTrophy className="text-yellow-500 text-3xl" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ================== SHARED: MANAGEMENT SECTION (Admin & Teacher) ================== */}
            {(user?.role === 'admin' || user?.role === 'teacher') && (
              <div className="mb-8">
                {/* Management Section Header */}
                <h2 className="text-2xl font-bold mb-4">Student Management Hub</h2>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <button onClick={handleMarkAttendance} className={`${
                    darkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'
                  } p-4 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 text-left group`}>
                    <div className="flex items-center gap-3 mb-2">
                      <FaClock className="text-orange-500 text-2xl group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">Mark Attendance</span>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Record daily attendance</p>
                  </button>

                  <button onClick={handleBulkAssignGrades} className={`${
                    darkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'
                  } p-4 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 text-left group`}>
                    <div className="flex items-center gap-3 mb-2">
                      <FaAward className="text-blue-500 text-2xl group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">Assign Grades</span>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bulk grade assignment</p>
                  </button>

                  <button onClick={handleExportData} className={`${
                    darkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'
                  } p-4 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 text-left group`}>
                    <div className="flex items-center gap-3 mb-2">
                      <FaDownload className="text-green-500 text-2xl group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">Export Data</span>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Download as Excel/CSV</p>
                  </button>

                  <button onClick={handleNotifyStudents} className={`${
                    darkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'
                  } p-4 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 text-left group`}>
                    <div className="flex items-center gap-3 mb-2">
                      <FaBell className="text-purple-500 text-2xl group-hover:scale-110 transition-transform" />
                      <span className="font-semibold">Send Notifications</span>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Batch notifications</p>
                  </button>
                </div>

                {/* Admin-Only Features */}
                {user?.role === 'admin' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <button onClick={handleImportData} className={`${
                      darkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'
                    } p-4 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 text-left group`}>
                      <div className="flex items-center gap-3 mb-2">
                        <FaUpload className="text-indigo-500 text-2xl group-hover:scale-110 transition-transform" />
                        <span className="font-semibold">Import Data</span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bulk student import</p>
                    </button>

                    <button onClick={handleGenerateReport} className={`${
                      darkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'
                    } p-4 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 text-left group`}>
                      <div className="flex items-center gap-3 mb-2">
                        <FaFileExcel className="text-red-500 text-2xl group-hover:scale-110 transition-transform" />
                        <span className="font-semibold">Generate Report</span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Comprehensive reports</p>
                    </button>

                    <button onClick={handleManageRisk} className={`${
                      darkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'
                    } p-4 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 text-left group`}>
                      <div className="flex items-center gap-3 mb-2">
                        <FaExclamationTriangle className="text-red-500 text-2xl group-hover:scale-110 transition-transform" />
                        <span className="font-semibold">Risk Management</span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>At-risk students</p>
                    </button>

                    <button onClick={handleViewAnalytics} className={`${
                      darkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'
                    } p-4 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 text-left group`}>
                      <div className="flex items-center gap-3 mb-2">
                        <FaChartBar className="text-cyan-500 text-2xl group-hover:scale-110 transition-transform" />
                        <span className="font-semibold">Analytics</span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Detailed analytics</p>
                    </button>
                  </div>
                )}

                {/* Student List Management */}
                <div className={`${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } p-6 rounded-xl shadow-lg border mb-8`}>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaUsers className="text-blue-500" />
                    Student Management List
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'} border-b`}>
                          <th className="px-4 py-3 text-left font-semibold">Name</th>
                          <th className="px-4 py-3 text-left font-semibold">Enrollment</th>
                          <th className="px-4 py-3 text-left font-semibold">Performance</th>
                          <th className="px-4 py-3 text-left font-semibold">Attendance</th>
                          <th className="px-4 py-3 text-left font-semibold">Risk Level</th>
                          <th className="px-4 py-3 text-left font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentsList.map((student) => (
                          <tr key={student.id} className={`${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} border-b transition-colors`}>
                            <td className="px-4 py-3 font-medium">{student.name}</td>
                            <td className="px-4 py-3">{student.enrollment}</td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                student.performance === 'Excellent' ? 'bg-green-100 text-green-800' :
                                student.performance === 'Good' ? 'bg-blue-100 text-blue-800' :
                                student.performance === 'Average' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {student.performance}
                              </span>
                            </td>
                            <td className="px-4 py-3">{student.attendance}%</td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(student.risk)}`}>
                                {student.risk}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button className="text-blue-500 hover:text-blue-700 text-xs font-semibold mr-2">Edit</button>
                              <button className="text-red-500 hover:text-red-700 text-xs font-semibold">Remove</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Advanced Features */}
                <div className={`${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } p-6 rounded-xl shadow-lg border mb-8`}>
                  <h3 className="text-xl font-bold mb-4">Advanced Management Features</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <FaDatabase className="text-blue-500" />
                        Data Management
                      </h4>
                      <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>✓ Database Backup & Recovery</li>
                        <li>✓ Data Validation & Cleaning</li>
                        <li>✓ Bulk Data Operations</li>
                        <li>✓ Archive Old Records</li>
                      </ul>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <FaLock className="text-purple-500" />
                        Access Control
                      </h4>
                      <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>✓ Role-Based Access</li>
                        <li>✓ Permission Management</li>
                        <li>✓ Audit Logs</li>
                        <li>✓ Security Settings</li>
                      </ul>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <FaGraduationCap className="text-green-500" />
                        Academic Tools
                      </h4>
                      <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>✓ Grade Sheet Management</li>
                        <li>✓ Performance Analytics</li>
                        <li>✓ Curriculum Mapping</li>
                        <li>✓ Assessment Tracking</li>
                      </ul>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <FaBell className="text-orange-500" />
                        Communication
                      </h4>
                      <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>✓ Announcement System</li>
                        <li>✓ Email Integration</li>
                        <li>✓ SMS Alerts</li>
                        <li>✓ Parent Notifications</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {user?.role === 'admin' && (
              <div className="bg-white/80 dark:bg-gray-800 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Admin-Only Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {[
                    'AddStudents', 'UpdateStudents', 'DeleteStudents', 'ImportData', 'ExportData',
                    'EnterMarks', 'ManageAttendance', 'UploadAssignments', 'RecordExams', 'RunPrediction',
                    'ViewPredictions', 'AnalyzeResults', 'MonitorRisk', 'GenerateInsights', 'IdentifyAtRisk',
                    'SendAlerts', 'NotifyUsers', 'TrackDropouts', 'ViewDashboard', 'MonitorPerformance',
                    'CompareStudents', 'TrackTrends', 'GenerateReports', 'AddTeachers', 'ManageUsers',
                    'AssignRoles', 'ControlAccess', 'SuggestImprovements', 'RecommendResources', 'PlanInterventions',
                    'ManageSettings', 'BackupData', 'EnsureSecurity', 'MaintainSystem'
                  ].map((feature) => (
                    <span key={feature} className="px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900 dark:text-blue-100 text-blue-800 text-xs font-semibold">{feature}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Input Form */}
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaRocket className="text-blue-500" />
                  Student Data Input
                </h2>

                <div className="space-y-6">
                  <div className="relative">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Attendance (%)
                    </label>
                    <input
                      type="number"
                      name="attendance"
                      value={inputData.attendance}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } ${errors.attendance ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter attendance percentage"
                      min="0"
                      max="100"
                    />
                    {errors.attendance && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {errors.attendance}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Internal Marks
                    </label>
                    <input
                      type="number"
                      name="internalMarks"
                      value={inputData.internalMarks}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } ${errors.internalMarks ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter internal marks"
                      min="0"
                      max="100"
                    />
                    {errors.internalMarks && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {errors.internalMarks}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Assignment Score
                    </label>
                    <input
                      type="number"
                      name="assignmentScore"
                      value={inputData.assignmentScore}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } ${errors.assignmentScore ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter assignment score"
                      min="0"
                      max="100"
                    />
                    {errors.assignmentScore && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {errors.assignmentScore}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Lab Score
                    </label>
                    <input
                      type="number"
                      name="labScore"
                      value={inputData.labScore}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } ${errors.labScore ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter lab score"
                      min="0"
                      max="100"
                    />
                    {errors.labScore && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {errors.labScore}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Previous Semester Marks
                    </label>
                    <input
                      type="number"
                      name="previousMarks"
                      value={inputData.previousMarks}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } ${errors.previousMarks ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter previous semester marks"
                      min="0"
                      max="100"
                    />
                    {errors.previousMarks && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {errors.previousMarks}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Branch
                    </label>
                    <select
                      name="branch"
                      value={inputData.branch}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } ${errors.branch ? 'border-red-500 focus:ring-red-500' : ''}`}
                    >
                      <option value="">Select Branch</option>
                      <option value="CE">CE – Computer Engineering</option>
                      <option value="CSE">CSE – Computer Science Engineering</option>
                      <option value="IT">IT – Information Technology</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                      <option value="Electrical">Electrical</option>
                      <option value="AI">AI / Data Science</option>
                    </select>
                    {errors.branch && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <FaExclamationTriangle className="text-xs" />
                        {errors.branch}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      ML Algorithm
                    </label>
                    <select
                      value={selectedAlgorithm}
                      onChange={(e) => setSelectedAlgorithm(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="logistic">Logistic Regression</option>
                      <option value="decision">Decision Tree</option>
                      <option value="random">Random Forest</option>
                    </select>
                  </div>

                  <button
                    onClick={predictPerformance}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Predicting...
                      </div>
                    ) : (
                      'Predict Performance'
                    )}
                  </button>
                </div>
              </div>

              {/* Prediction Results */}
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaChartLine className="text-purple-500" />
                  Prediction Results
                </h2>

                {prediction ? (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border-2 ${
                      prediction.passFail === 'PASS'
                        ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700'
                        : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'
                    }`}>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <FaCheckCircle className={prediction.passFail === 'PASS' ? 'text-green-600' : 'text-red-600'} />
                        Pass/Fail Prediction
                      </h3>
                      <p className={`text-2xl font-bold ${
                        prediction.passFail === 'PASS' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {prediction.passFail}
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'
                    }`}>
                      <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Grade Prediction</h3>
                      <p className="text-2xl font-bold text-blue-600">{prediction.grade}</p>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-purple-50 border-purple-200'
                    }`}>
                      <h3 className="text-lg font-semibold mb-2 text-purple-600 dark:text-purple-400">Performance Level</h3>
                      <p className={`text-2xl font-bold ${
                        prediction.performance === 'Excellent' ? 'text-green-600' :
                        prediction.performance === 'Good' ? 'text-blue-600' :
                        prediction.performance === 'Average' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {prediction.performance}
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <h3 className="text-lg font-semibold mb-2 text-gray-600 dark:text-gray-400">Algorithm Used</h3>
                      <p className="text-lg text-gray-800 dark:text-gray-200">
                        {selectedAlgorithm === 'logistic' ? 'Logistic Regression' :
                         selectedAlgorithm === 'decision' ? 'Decision Tree' : 'Random Forest'}
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-indigo-50 border-indigo-200'
                    }`}>
                      <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Branch</h3>
                      <p className="text-lg text-indigo-600 dark:text-indigo-400">
                        {inputData.branch === 'CE' ? 'CE – Computer Engineering' :
                         inputData.branch === 'CSE' ? 'CSE – Computer Science Engineering' :
                         inputData.branch === 'IT' ? 'IT – Information Technology' :
                         inputData.branch === 'Mechanical' ? 'Mechanical' :
                         inputData.branch === 'Civil' ? 'Civil' :
                         inputData.branch === 'Electrical' ? 'Electrical' :
                         inputData.branch === 'AI' ? 'AI / Data Science' : 'Not Selected'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaCalculator className={`text-6xl mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Enter student data and click "Predict Performance" to see results
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <h3 className="text-xl font-bold mb-4 text-center">Subject-wise Performance</h3>
                <Bar
                  data={barData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        labels: { color: darkMode ? 'white' : 'black' }
                      }
                    },
                    scales: {
                      x: {
                        ticks: { color: darkMode ? 'white' : 'black' },
                        grid: { color: darkMode ? '#374151' : '#e5e7eb' }
                      },
                      y: {
                        ticks: { color: darkMode ? 'white' : 'black' },
                        grid: { color: darkMode ? '#374151' : '#e5e7eb' }
                      }
                    }
                  }}
                />
              </div>

              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <h3 className="text-xl font-bold mb-4 text-center">Performance Trend</h3>
                <Line
                  data={lineData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        labels: { color: darkMode ? 'white' : 'black' }
                      }
                    },
                    scales: {
                      x: {
                        ticks: { color: darkMode ? 'white' : 'black' },
                        grid: { color: darkMode ? '#374151' : '#e5e7eb' }
                      },
                      y: {
                        ticks: { color: darkMode ? 'white' : 'black' },
                        grid: { color: darkMode ? '#374151' : '#e5e7eb' }
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="mt-8">
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <h3 className="text-xl font-bold mb-4 text-center">Performance Distribution</h3>
                <div className="flex justify-center">
                  <div className="w-80 h-80">
                    <Pie
                      data={pieData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            labels: { color: darkMode ? 'white' : 'black' }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
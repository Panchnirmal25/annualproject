import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaSearch, FaFilter, FaEye, FaEdit, FaTrash, FaDownload, FaUser, FaGraduationCap,
  FaBook, FaChartLine, FaChevronLeft, FaChevronRight, FaExclamationTriangle,
  FaCheckCircle, FaTrophy, FaBrain, FaSort, FaSortUp, FaSortDown, FaSquare,
  FaCheckSquare, FaRocket, FaClock, FaStar, FaChartBar, FaChartPie, FaPlus,
  FaUsers, FaLayerGroup, FaCalendarAlt, FaUserPlus, FaUserShield, FaChalkboardTeacher,
  FaUserGraduate, FaToggleOn, FaToggleOff, FaEnvelope, FaLock, FaShieldAlt
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
// import { Bar, Line, Doughnut, Radar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   RadialLinearScale,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   ArcElement,
//   RadialLinearScale,
//   Title,
//   Tooltip,
//   Legend
// );

export default function Students() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedPerformance, setSelectedPerformance] = useState("");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // "list" or "semester"
 

  // AI-generated comprehensive student data
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const isTeacher = user?.role === "teacher";
  const canAddStudent = isAdmin || isTeacher;

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      enrollmentId: "EN2024001",
      branch: "CSE",
      semester: 6,
      studentType: "Regular Student",
      subjects: ["Data Structures", "Operating Systems", "DBMS", "Computer Networks"],
      attendance: 87,
      // New Theory/Practical structure
      theory: { midsem: 32, assignment: 18, endSemester: 35, total: 85, grade: "A" },
      practical: { midsem: 38, assignment: 19, endSemester: 34, total: 91, grade: "A+" },
      combinedTotal: 88,
      studyHours: 7,
      discipline: 8,
      participation: 9,
      backlogs: 0,
      consistency: 8,
      projects: 3,
      internships: "Completed 2 internships",
      gender: "Male",
      age: 21,
      predictionResult: "PASS",
      grade: "A",
      riskLevel: "Low",
      performanceScore: 88,
      aiInsights: ["Excellent attendance record", "Strong in programming subjects"],
      avatar: "RS"
    },
    {
      id: 2,
      name: "Priya Patel",
      enrollmentId: "EN2024002",
      branch: "IT",
      semester: 5,
      studentType: "Scholarship Student",
      subjects: ["Web Development", "Cloud Computing", "Cyber Security", "Data Analytics"],
      attendance: 94,
      theory: { midsem: 36, assignment: 19, endSemester: 38, total: 93, grade: "A+" },
      practical: { midsem: 39, assignment: 20, endSemester: 37, total: 96, grade: "A+" },
      combinedTotal: 94.5,
      studyHours: 8,
      discipline: 9,
      participation: 10,
      backlogs: 0,
      consistency: 9,
      projects: 4,
      internships: "Completed 3 internships",
      gender: "Female",
      age: 20,
      predictionResult: "PASS",
      grade: "A+",
      riskLevel: "Low",
      performanceScore: 94.5,
      aiInsights: ["Outstanding performance", "Leadership potential identified"],
      avatar: "PP"
    },
    {
      id: 3,
      name: "Amit Kumar",
      enrollmentId: "EN2024003",
      branch: "CE",
      semester: 4,
      studentType: "Backlog Student",
      subjects: ["Algorithms", "Software Engineering", "Microprocessors", "Data Structures"],
      attendance: 68,
      theory: { midsem: 22, assignment: 15, endSemester: 20, total: 57, grade: "C-" },
      practical: { midsem: 25, assignment: 16, endSemester: 23, total: 64, grade: "C" },
      combinedTotal: 60.5,
      studyHours: 4,
      discipline: 5,
      participation: 6,
      backlogs: 2,
      consistency: 5,
      projects: 1,
      internships: "None",
      gender: "Male",
      age: 22,
      predictionResult: "FAIL",
      grade: "C",
      riskLevel: "High",
      performanceScore: 60.5,
      aiInsights: ["Low attendance risk", "Needs academic support", "Irregular study pattern"],
      avatar: "AK"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      enrollmentId: "EN2024004",
      branch: "Mechanical",
      semester: 7,
      studentType: "Hostel Student",
      subjects: ["Thermodynamics", "Fluid Mechanics", "Machine Design", "Heat Transfer"],
      attendance: 82,
      theory: { midsem: 30, assignment: 17, endSemester: 32, total: 79, grade: "B+" },
      practical: { midsem: 33, assignment: 18, endSemester: 34, total: 85, grade: "A" },
      combinedTotal: 82,
      studyHours: 6,
      gender: "Female",
      age: 23,
      predictionResult: "PASS",
      grade: "B+",
      riskLevel: "Medium",
      performanceScore: 82,
      aiInsights: ["Good progress in practical subjects", "Could improve attendance"],
      avatar: "SR"
    },
    {
      id: 5,
      name: "Vikram Singh",
      enrollmentId: "EN2024005",
      branch: "CSE",
      semester: 3,
      studentType: "Day Scholar",
      subjects: ["Programming", "Mathematics", "Physics", "Chemistry"],
      attendance: 91,
      theory: { midsem: 33, assignment: 18, endSemester: 36, total: 87, grade: "A" },
      practical: { midsem: 35, assignment: 19, endSemester: 36, total: 90, grade: "A+" },
      combinedTotal: 88.5,
      studyHours: 7,
      gender: "Male",
      age: 19,
      predictionResult: "PASS",
      grade: "A",
      riskLevel: "Low",
      performanceScore: 88.5,
      aiInsights: ["Excellent foundation in basics", "Strong analytical skills"],
      avatar: "VS"
    },
    {
      id: 6,
      name: "Kavita Jain",
      enrollmentId: "EN2024006",
      branch: "IT",
      semester: 6,
      studentType: "Regular Student",
      subjects: ["Mobile Computing", "Network Security", "Software Testing", "DevOps"],
      attendance: 89,
      theory: { midsem: 31, assignment: 17, endSemester: 33, total: 81, grade: "A" },
      practical: { midsem: 36, assignment: 19, endSemester: 35, total: 90, grade: "A+" },
      combinedTotal: 85.5,
      studyHours: 6,
      gender: "Female",
      age: 21,
      predictionResult: "PASS",
      grade: "A",
      riskLevel: "Low",
      performanceScore: 85.5,
      aiInsights: ["Good technical skills", "Active in project work"],
      avatar: "KJ"
    },
    {
      id: 7,
      name: "Rohit Verma",
      enrollmentId: "EN2024007",
      branch: "CE",
      semester: 5,
      studentType: "Regular Student",
      subjects: ["Database Systems", "Web Technologies", "System Programming", "Computer Graphics"],
      attendance: 73,
      theory: { midsem: 26, assignment: 16, endSemester: 28, total: 70, grade: "B" },
      practical: { midsem: 29, assignment: 17, endSemester: 30, total: 76, grade: "B+" },
      combinedTotal: 73,
      studyHours: 5,
      gender: "Male",
      age: 20,
      predictionResult: "PASS",
      grade: "B",
      riskLevel: "Medium",
      performanceScore: 73,
      aiInsights: ["Average performance", "Needs to focus on theory subjects"],
      avatar: "RV"
    },
    {
      id: 8,
      name: "Anjali Nair",
      enrollmentId: "EN2024008",
      branch: "AI",
      semester: 4,
      studentType: "Scholarship Student",
      subjects: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision"],
      attendance: 96,
      theory: { midsem: 38, assignment: 20, endSemester: 37, total: 95, grade: "A+" },
      practical: { midsem: 39, assignment: 20, endSemester: 39, total: 98, grade: "A+" },
      combinedTotal: 96.5,
      studyHours: 9,
      gender: "Female",
      age: 20,
      predictionResult: "PASS",
      grade: "A+",
      riskLevel: "Low",
      performanceScore: 96.5,
      aiInsights: ["Exceptional in AI subjects", "Research potential", "Top performer"],
      avatar: "AN"
    },
    {
      id: 9,
      name: "Suresh Babu",
      enrollmentId: "EN2024009",
      branch: "Mechanical",
      semester: 6,
      studentType: "Regular Student",
      subjects: ["CAD/CAM", "Automotive Engineering", "Manufacturing Processes", "Engineering Mechanics"],
      attendance: 78,
      theory: { midsem: 28, assignment: 16, endSemester: 27, total: 71, grade: "B" },
      practical: { midsem: 32, assignment: 18, endSemester: 33, total: 83, grade: "A" },
      combinedTotal: 77,
      studyHours: 5,
      gender: "Male",
      age: 22,
      predictionResult: "PASS",
      grade: "B+",
      riskLevel: "Medium",
      performanceScore: 77,
      aiInsights: ["Good in practical subjects", "Could improve theoretical understanding"],
      avatar: "SB"
    },
    {
      id: 10,
      name: "Meera Joshi",
      enrollmentId: "EN2024010",
      branch: "CSE",
      semester: 7,
      studentType: "Hostel Student",
      subjects: ["Artificial Intelligence", "Big Data Analytics", "Cloud Computing", "Blockchain"],
      attendance: 85,
      theory: { midsem: 31, assignment: 17, endSemester: 32, total: 80, grade: "A" },
      practical: { midsem: 34, assignment: 19, endSemester: 33, total: 86, grade: "A" },
      combinedTotal: 83,
      studyHours: 6,
      gender: "Female",
      age: 22,
      predictionResult: "PASS",
      grade: "A",
      riskLevel: "Low",
      performanceScore: 83,
      aiInsights: ["Strong in advanced topics", "Good project work"],
      avatar: "MJ"
    },
    {
      id: 11,
      name: "Arun Prakash",
      enrollmentId: "EN2024011",
      branch: "IT",
      semester: 3,
      studentType: "Regular Student",
      subjects: ["Internet Technologies", "Database Management", "Software Engineering", "System Analysis"],
      attendance: 88,
      theory: { midsem: 32, assignment: 18, endSemester: 35, total: 85, grade: "A" },
      practical: { midsem: 35, assignment: 19, endSemester: 36, total: 90, grade: "A+" },
      combinedTotal: 87.5,
      studyHours: 7,
      gender: "Male",
      age: 19,
      predictionResult: "PASS",
      grade: "A",
      riskLevel: "Low",
      performanceScore: 87.5,
      aiInsights: ["Consistent performer", "Good understanding of concepts"],
      avatar: "AP"
    },
    {
      id: 12,
      name: "Divya Sharma",
      enrollmentId: "EN2024012",
      branch: "CE",
      semester: 8,
      studentType: "Regular Student",
      subjects: ["Advanced Algorithms", "Distributed Systems", "Cyber Security", "Mobile Computing"],
      attendance: 92,
      theory: { midsem: 34, assignment: 19, endSemester: 36, total: 89, grade: "A+" },
      practical: { midsem: 36, assignment: 19, endSemester: 37, total: 92, grade: "A+" },
      combinedTotal: 90.5,
      studyHours: 8,
      gender: "Female",
      age: 23,
      predictionResult: "PASS",
      grade: "A",
      riskLevel: "Low",
      performanceScore: 90.5,
      aiInsights: ["Excellent final year student", "Ready for placements"],
      avatar: "DS"
    }
  ]);

  const studentsPerPage = 10;

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

  // Reset pagination when filters/search change
  useEffect(() => {
    setCurrentPage(1); // eslint-disable-line react-hooks/set-state-in-effect
  }, [searchTerm, selectedBranch, selectedSemester, selectedPerformance, selectedRiskLevel, students]);

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.enrollmentId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBranch = selectedBranch === "" || student.branch === selectedBranch;
      const matchesSemester = selectedSemester === "" || student.semester.toString() === selectedSemester;
      const matchesPerformance = selectedPerformance === "" || student.predictionResult === selectedPerformance;
      const matchesRiskLevel = selectedRiskLevel === "" || student.riskLevel === selectedRiskLevel;

      return matchesSearch && matchesBranch && matchesSemester && matchesPerformance && matchesRiskLevel;
    });
  }, [students, searchTerm, selectedBranch, selectedSemester, selectedPerformance, selectedRiskLevel]);

  // Sort students
  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'performanceScore') {
        aValue = a.performanceScore;
        bValue = b.performanceScore;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredStudents, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedStudents = sortedStudents.slice(startIndex, startIndex + studentsPerPage);

  // Ensure current page is within range after filtering
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [currentPage, totalPages]);

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowEditModal(true);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter(student => student.id !== studentId));
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  const handleSaveEdit = (updatedStudent) => {
    setStudents(students.map(student =>
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    setShowEditModal(false);
    setEditingStudent(null);
  };

  const handleAddStudent = (newStudent) => {
    // Calculate performance score considering all prediction features
    const performanceScore = Math.round((
      newStudent.attendance * 0.15 +
      newStudent.internalMarks * 0.20 +
      newStudent.assignmentScore * 0.15 +
      newStudent.studyHours * 0.10 +
      newStudent.discipline * 0.10 +
      newStudent.participation * 0.10 +
      newStudent.consistency * 0.10 +
      (10 - newStudent.backlogs) * 0.05 +
      newStudent.projects * 0.03 +
      (newStudent.internships !== "None" ? 1 : 0) * 0.02
    ) * 10) / 10;

    // Determine risk level based on multiple factors
    let riskLevel = "Low";
    if (newStudent.attendance < 75 || newStudent.internalMarks < 50 || newStudent.backlogs > 1 || newStudent.consistency < 6) {
      riskLevel = "High";
    } else if (newStudent.attendance < 85 || newStudent.internalMarks < 70 || newStudent.discipline < 7) {
      riskLevel = "Medium";
    }

    // Generate AI insights based on prediction features
    const aiInsights = [];
    if (newStudent.attendance >= 90) aiInsights.push("Excellent attendance record");
    else if (newStudent.attendance < 75) aiInsights.push("Low attendance risk");

    if (newStudent.internalMarks >= 80) aiInsights.push("Strong academic performance");
    else if (newStudent.internalMarks < 60) aiInsights.push("Needs academic support");

    if (newStudent.discipline >= 8) aiInsights.push("High discipline level");
    else if (newStudent.discipline < 6) aiInsights.push("Discipline improvement needed");

    if (newStudent.participation >= 8) aiInsights.push("Active class participation");
    if (newStudent.consistency >= 8) aiInsights.push("Consistent performance");
    if (newStudent.backlogs === 0) aiInsights.push("No backlog history");
    if (newStudent.projects >= 2) aiInsights.push("Good project experience");
    if (newStudent.internships !== "None") aiInsights.push("Internship experience beneficial");

    const student = {
      ...newStudent,
      id: Math.max(...students.map(s => s.id)) + 1,
      enrollmentId: `EN${new Date().getFullYear()}${String(Math.max(...students.map(s => s.id)) + 1).padStart(4, '0')}`,
      predictionResult: performanceScore >= 60 ? "PASS" : "FAIL",
      grade: performanceScore >= 90 ? "A+" : performanceScore >= 80 ? "A" : performanceScore >= 70 ? "B+" : performanceScore >= 60 ? "B" : performanceScore >= 50 ? "C" : "F",
      riskLevel: riskLevel,
      performanceScore: performanceScore,
      aiInsights: aiInsights.length > 0 ? aiInsights : ["Average performance across all metrics"],
      avatar: newStudent.name.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    setStudents([...students, student]);
    setShowAddModal(false);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === paginatedStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(paginatedStudents.map(student => student.id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedStudents.length} students?`)) {
      setStudents(students.filter(student => !selectedStudents.includes(student.id)));
      setSelectedStudents([]);
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Name", "Enrollment ID", "Branch", "Semester", "Student Type",
      "Attendance", "Internal Marks", "Assignment Score", "Performance Score",
      "Study Hours", "Gender", "Age", "Prediction Result", "Grade", "Risk Level"
    ];
    const csvContent = [
      headers.join(","),
      ...filteredStudents.map(student => [
        student.name,
        student.enrollmentId,
        student.branch,
        student.semester,
        student.studentType,
        student.attendance,
        student.internalMarks,
        student.assignmentScore,
        student.performanceScore,
        student.studyHours,
        student.gender,
        student.age,
        student.predictionResult,
        student.grade,
        student.riskLevel
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "students.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'text-green-600';
    if (grade === 'B+' || grade === 'B') return 'text-blue-600';
    if (grade === 'C+' || grade === 'C') return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceBadge = (score) => {
    if (score >= 90) return { color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300', label: 'Excellent' };
    if (score >= 80) return { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', label: 'Good' };
    if (score >= 70) return { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300', label: 'Average' };
    return { color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300', label: 'Needs Attention' };
  };

  // Analytics data
  const analyticsData = useMemo(() => {
    const branchPerformance = {};
    const gradeDistribution = { 'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C+': 0, 'C': 0, 'F': 0 };
    const riskLevels = { 'Low': 0, 'Medium': 0, 'High': 0 };
    const semesterStats = {};

    students.forEach(student => {
      // Branch performance
      if (!branchPerformance[student.branch]) {
        branchPerformance[student.branch] = { total: 0, count: 0 };
      }
      branchPerformance[student.branch].total += student.performanceScore;
      branchPerformance[student.branch].count += 1;

      // Grade distribution
      gradeDistribution[student.grade] = (gradeDistribution[student.grade] || 0) + 1;

      // Risk levels
      riskLevels[student.riskLevel] = (riskLevels[student.riskLevel] || 0) + 1;

      // Semester stats
      if (!semesterStats[student.semester]) {
        semesterStats[student.semester] = {
          count: 0,
          totalPerformance: 0,
          passCount: 0,
          highRiskCount: 0,
          branches: new Set()
        };
      }
      semesterStats[student.semester].count += 1;
      semesterStats[student.semester].totalPerformance += student.performanceScore;
      semesterStats[student.semester].passCount += student.predictionResult === 'PASS' ? 1 : 0;
      semesterStats[student.semester].highRiskCount += student.riskLevel === 'High' ? 1 : 0;
      semesterStats[student.semester].branches.add(student.branch);
    });

    return {
      branchPerformance: Object.entries(branchPerformance).map(([branch, data]) => ({
        branch,
        average: Math.round(data.total / data.count * 100) / 100
      })),
      gradeDistribution,
      riskLevels,
      topStudents: [...students].sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5),
      atRiskStudents: students.filter(student => student.riskLevel === 'High'),
      semesterStats: Object.entries(semesterStats).map(([semester, data]) => ({
        semester: parseInt(semester),
        count: data.count,
        averagePerformance: Math.round(data.totalPerformance / data.count * 100) / 100,
        passRate: Math.round((data.passCount / data.count) * 100),
        highRiskCount: data.highRiskCount,
        branches: Array.from(data.branches)
      })).sort((a, b) => a.semester - b.semester)
    };
  }, [students]);

  // const chartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       labels: { color: darkMode ? 'white' : 'black' }
  //     }
  //   },
  //   scales: {
  //     y: {
  //       ticks: { color: darkMode ? 'white' : 'black' },
  //       grid: { color: darkMode ? '#374151' : '#e5e7eb' }
  //     },
  //     x: {
  //       ticks: { color: darkMode ? 'white' : 'black' },
  //       grid: { color: darkMode ? '#374151' : '#e5e7eb' }
  //     }
  //   }
  // };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex pt-16">
        <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />

        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} overflow-x-auto`}>
          <div className="p-8">

            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Student Management Dashboard</h1>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Comprehensive student analytics and management system
                </p>
              </div>
              <div className="flex gap-4">
                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      viewMode === "list"
                        ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                  >
                    <FaUsers className="inline mr-2" />
                    List View
                  </button>
                  <button
                    onClick={() => setViewMode("semester")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      viewMode === "semester"
                        ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                  >
                    <FaLayerGroup className="inline mr-2" />
                    Semester View
                  </button>
                </div>
                {/* Add Student Button */}
                {canAddStudent && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition duration-300 transform hover:scale-105"
                    title="Add student"
                  >
                    <FaPlus /> Add Student
                  </button>
                )}
              </div>
            </div>

            {/* Analytics Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Students
                    </p>
                    <p className="text-3xl font-bold">{students.length}</p>
                  </div>
                  <FaUser className="text-3xl text-blue-500" />
                </div>
                <div className="mt-2">
                  <span className="text-green-600 text-sm font-medium">+8.2%</span>
                  <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>from last semester</span>
                </div>
              </div>

              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Average Performance
                    </p>
                    <p className="text-3xl font-bold">
                      {Math.round(students.reduce((acc, s) => acc + s.performanceScore, 0) / students.length * 10) / 10}%
                    </p>
                  </div>
                  <FaChartLine className="text-3xl text-green-500" />
                </div>
                <div className="mt-2">
                  <span className="text-green-600 text-sm font-medium">+3.1%</span>
                  <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>improvement</span>
                </div>
              </div>

              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Pass Rate
                    </p>
                    <p className="text-3xl font-bold">
                      {Math.round((students.filter(s => s.predictionResult === 'PASS').length / students.length) * 100)}%
                    </p>
                  </div>
                  <FaCheckCircle className="text-3xl text-purple-500" />
                </div>
                <div className="mt-2">
                  <span className="text-green-600 text-sm font-medium">+2.4%</span>
                  <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>from last semester</span>
                </div>
              </div>

              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      At Risk Students
                    </p>
                    <p className="text-3xl font-bold">{analyticsData.atRiskStudents.length}</p>
                  </div>
                  <FaExclamationTriangle className="text-3xl text-red-500" />
                </div>
                <div className="mt-2">
                  <span className="text-red-600 text-sm font-medium">Needs attention</span>
                  <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>immediate action</span>
                </div>
              </div>
            </div>

            {/* Semester-wise Statistics */}
            {viewMode === "semester" && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaCalendarAlt className="text-purple-500" />
                  Semester-wise Statistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {analyticsData.semesterStats.map((semester) => (
                    <div key={semester.semester} className={`${
                      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    } p-6 rounded-xl shadow-lg border`}>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Semester {semester.semester}
                          </p>
                          <p className="text-2xl font-bold">{semester.count} Students</p>
                        </div>
                        <FaGraduationCap className="text-3xl text-purple-500" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Avg Performance</span>
                          <span className="font-semibold">{semester.averagePerformance}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Pass Rate</span>
                          <span className="font-semibold text-green-600">{semester.passRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">High Risk</span>
                          <span className="font-semibold text-red-600">{semester.highRiskCount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Students & At Risk Students */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

              {/* Top Students Leaderboard */}
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <FaTrophy className="text-yellow-500" />
                  Top Performers
                </h3>
                <div className="space-y-3">
                  {analyticsData.topStudents.map((student, index) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{student.branch} - Sem {student.semester}</div>
                        </div>
                      </div>
                      <span className="font-bold text-green-600">{student.performanceScore}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* At Risk Students */}
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <FaExclamationTriangle className="text-red-500" />
                  At Risk Students
                </h3>
                <div className="space-y-3">
                  {analyticsData.atRiskStudents.slice(0, 5).map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          !
                        </span>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{student.branch} - Sem {student.semester}</div>
                        </div>
                      </div>
                      <span className="font-bold text-red-600">{student.performanceScore}%</span>
                    </div>
                  ))}
                  {analyticsData.atRiskStudents.length === 0 && (
                    <p className="text-green-600 text-center py-4">No students currently at high risk! 🎉</p>
                  )}
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

              {/* Branch Performance Chart */}
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FaChartBar className="text-blue-500" />
                  Branch Performance
                </h3>
                <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="text-gray-500">Chart will be displayed here</p>
                </div>
              </div>

              {/* Grade Distribution */}
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FaChartPie className="text-purple-500" />
                  Grade Distribution
                </h3>
                <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="text-gray-500">Chart will be displayed here</p>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } p-6 rounded-xl shadow-lg border mb-6`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">

                {/* Search */}
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>

                {/* Branch Filter */}
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">All Branches</option>
                  <option value="CSE">CSE</option>
                  <option value="CE">CE</option>
                  <option value="IT">IT</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Electrical">Electrical</option>
                  <option value="AI">AI & Data Science</option>
                </select>

                {/* Semester Filter */}
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">All Semesters</option>
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <option key={sem} value={sem.toString()}>Semester {sem}</option>
                  ))}
                </select>

                {/* Performance Filter */}
                <select
                  value={selectedPerformance}
                  onChange={(e) => setSelectedPerformance(e.target.value)}
                  className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">All Performance</option>
                  <option value="PASS">PASS</option>
                  <option value="FAIL">FAIL</option>
                </select>

                {/* Risk Level Filter */}
                <select
                  value={selectedRiskLevel}
                  onChange={(e) => setSelectedRiskLevel(e.target.value)}
                  className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">All Risk Levels</option>
                  <option value="Low">Low Risk</option>
                  <option value="Medium">Medium Risk</option>
                  <option value="High">High Risk</option>
                </select>

                {/* Export Button */}
                <button
                  onClick={exportToCSV}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-300"
                >
                  <FaDownload /> Export CSV
                </button>
              </div>

              {/* Bulk Actions */}
              {selectedStudents.length > 0 && (
                <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <span className="text-blue-800 dark:text-blue-300 font-medium">
                    {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
                  </span>
                  {isAdmin ? (
                    <button
                      onClick={handleBulkDelete}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-300"
                    >
                      <FaTrash /> Delete Selected
                    </button>
                  ) : (
                    <span className="text-sm text-gray-600 dark:text-gray-300">Only admins can delete selected students.</span>
                  )}
                </div>
              )}

              {/* Results Count */}
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing {paginatedStudents.length} of {filteredStudents.length} students
              </div>
            </div>

            {/* Students Display */}
            {viewMode === "list" ? (
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } rounded-xl shadow-lg border overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          <button
                            onClick={handleSelectAll}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            {selectedStudents.length === paginatedStudents.length && paginatedStudents.length > 0 ? (
                              <FaCheckSquare />
                            ) : (
                              <FaSquare />
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          <button
                            onClick={() => handleSort('enrollmentId')}
                            className="flex items-center gap-1 hover:text-blue-600"
                          >
                            Enrollment ID
                            {sortBy === 'enrollmentId' && (
                              sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Branch</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Semester</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Attendance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Theory</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Practical</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Discipline</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Participation</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Backlogs</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Consistency</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Projects</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          <button
                            onClick={() => handleSort('performanceScore')}
                            className="flex items-center gap-1 hover:text-blue-600"
                          >
                            Performance
                            {sortBy === 'performanceScore' && (
                              sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">AI Prediction</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Risk Level</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                      {paginatedStudents.map((student) => (
                        <tr key={student.id} className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition duration-200`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleSelectStudent(student.id)}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              {selectedStudents.includes(student.id) ? (
                                <FaCheckSquare />
                              ) : (
                                <FaSquare />
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                  <span className="text-white text-sm font-bold">{student.avatar}</span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">{student.name}</div>
                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{student.studentType}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {student.enrollmentId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {student.branch}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {student.semester}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${student.attendance}%` }}
                                ></div>
                              </div>
                              <span className="text-sm">{student.attendance}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {student.theory.total}/100
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {student.practical.total}/100
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm mr-2">{student.discipline}/10</span>
                              <div className="w-12 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ width: `${(student.discipline / 10) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm mr-2">{student.participation}/10</span>
                              <div className="w-12 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${(student.participation / 10) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              student.backlogs === 0
                                ? (darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800')
                                : student.backlogs === 1
                                ? (darkMode ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-800')
                                : (darkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800')
                            }`}>
                              {student.backlogs}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm mr-2">{student.consistency}/10</span>
                              <div className="w-12 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-500 h-2 rounded-full"
                                  style={{ width: `${(student.consistency / 10) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
                              {student.projects}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-sm font-bold">{student.performanceScore}%</span>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPerformanceBadge(student.performanceScore).color}`}>
                                {getPerformanceBadge(student.performanceScore).label}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              student.predictionResult === 'PASS'
                                ? (darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800')
                                : (darkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800')
                            }`}>
                              {student.predictionResult}
                            </span>
                            <span className={`ml-2 text-sm font-medium ${getGradeColor(student.grade)}`}>
                              {student.grade}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(student.riskLevel)}`}>
                              {student.riskLevel}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleViewProfile(student)}
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                title="View Profile"
                              >
                                <FaEye />
                              </button>
                              {(isAdmin || isTeacher) && (
                                <button
                                  onClick={() => handleEditStudent(student)}
                                  className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                                  title="Edit Student"
                                >
                                  <FaEdit />
                                </button>
                              )}
                              {isAdmin && (
                                <button
                                  onClick={() => handleDeleteStudent(student.id)}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                  title="Delete Student"
                                >
                                  <FaTrash />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className={`px-6 py-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between`}>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Semester-wise View */
              <div className="space-y-8">
                {analyticsData.semesterStats.map((semester) => {
                  const semesterStudents = students.filter(s => s.semester === semester.semester);
                  return (
                    <div key={semester.semester} className={`${
                      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    } rounded-xl shadow-lg border overflow-hidden`}>
                      <div className={`px-6 py-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border-b`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <FaGraduationCap className="text-2xl text-purple-500" />
                            <div>
                              <h3 className="text-xl font-bold">Semester {semester.semester}</h3>
                              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {semester.count} Students • {semester.branches.join(', ')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-sm font-medium">Avg Performance</p>
                              <p className="text-lg font-bold text-blue-600">{semester.averagePerformance}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">Pass Rate</p>
                              <p className="text-lg font-bold text-green-600">{semester.passRate}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">High Risk</p>
                              <p className="text-lg font-bold text-red-600">{semester.highRiskCount}</p>
                            </div>
                            {canAddStudent && (
                              <button
                                onClick={() => setShowAddModal(true)}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-300"
                                title="Add Student to Semester"
                              >
                                <FaPlus /> Add Student
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {semesterStudents.map((student) => (
                            <div key={student.id} className={`${
                              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                            } p-4 rounded-lg border`}>
                              <div className="flex items-center gap-3 mb-3">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                  <span className="text-white text-sm font-bold">{student.avatar}</span>
                                </div>
                                <div>
                                  <h4 className="font-semibold">{student.name}</h4>
                                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {student.enrollmentId} • {student.branch}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Performance:</span>
                                  <span className="font-semibold">{student.performanceScore}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Grade:</span>
                                  <span className={`font-semibold ${getGradeColor(student.grade)}`}>{student.grade}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Risk:</span>
                                  <span className={`font-semibold ${getRiskColor(student.riskLevel)} px-2 py-1 rounded text-xs`}>
                                    {student.riskLevel}
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-end mt-3 space-x-2">
                                <button
                                  onClick={() => handleViewProfile(student)}
                                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                  title="View Profile"
                                >
                                  <FaEye />
                                </button>
                                {(isAdmin || isTeacher) && (
                                  <button
                                    onClick={() => handleEditStudent(student)}
                                    className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                                    title="Edit Student"
                                  >
                                    <FaEdit />
                                  </button>
                                )}
                                {isAdmin && (
                                  <button
                                    onClick={() => handleDeleteStudent(student.id)}
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                    title="Delete Student"
                                  >
                                    <FaTrash />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Student Profile Modal */}
      {showProfileModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-xl shadow-2xl border max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Student Profile</h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Student Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">{selectedStudent.avatar}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{selectedStudent.enrollmentId}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Branch</label>
                        <p className="text-lg">{selectedStudent.branch}</p>
                      </div>
                      <div>
                        <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Semester</label>
                        <p className="text-lg">{selectedStudent.semester}</p>
                      </div>
                      <div>
                        <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Student Type</label>
                        <p className="text-lg">{selectedStudent.studentType}</p>
                      </div>
                      <div>
                        <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gender</label>
                        <p className="text-lg">{selectedStudent.gender}</p>
                      </div>
                      <div>
                        <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Age</label>
                        <p className="text-lg">{selectedStudent.age} years</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Academic Performance</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Attendance</span>
                          <span className="text-sm font-bold">{selectedStudent.attendance}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${selectedStudent.attendance}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Internal Marks</span>
                          <span className="text-sm font-bold">{selectedStudent.internalMarks}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-green-600 h-3 rounded-full" style={{ width: `${selectedStudent.internalMarks}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Assignment Score</span>
                          <span className="text-sm font-bold">{selectedStudent.assignmentScore}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-purple-600 h-3 rounded-full" style={{ width: `${selectedStudent.assignmentScore}%` }}></div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Overall Performance</span>
                          <span className="text-xl font-bold text-blue-600">{selectedStudent.performanceScore}%</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-semibold">Grade</span>
                          <span className={`text-xl font-bold ${getGradeColor(selectedStudent.grade)}`}>{selectedStudent.grade}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-semibold">Prediction</span>
                          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                            selectedStudent.predictionResult === 'PASS'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                          }`}>
                            {selectedStudent.predictionResult}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prediction Features */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">📊 Prediction Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Discipline</span>
                        <span className="text-sm font-bold">{selectedStudent.discipline}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: `${(selectedStudent.discipline / 10) * 100}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Participation</span>
                        <span className="text-sm font-bold">{selectedStudent.participation}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${(selectedStudent.participation / 10) * 100}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Consistency</span>
                        <span className="text-sm font-bold">{selectedStudent.consistency}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-purple-500 h-3 rounded-full" style={{ width: `${(selectedStudent.consistency / 10) * 100}%` }}></div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500 mb-1">{selectedStudent.backlogs}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Backlogs</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-500 mb-1">{selectedStudent.projects}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm font-medium mb-1">Internships</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{selectedStudent.internships}</div>
                    </div>
                  </div>
                </div>

                {/* Subjects */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Subjects</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedStudent.subjects.map((subject, index) => (
                      <span key={index} className={`inline-flex px-3 py-1 text-sm rounded-full ${
                        darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FaBrain className="text-indigo-500" />
                    AI Insights
                  </h4>
                  <div className="space-y-3">
                    {selectedStudent.aiInsights.map((insight, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${
                        insight.includes('Excellent') || insight.includes('Outstanding') || insight.includes('Strong')
                          ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700'
                          : insight.includes('Low') || insight.includes('Needs') || insight.includes('Irregular')
                          ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'
                          : 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                      }`}>
                        <p className="text-sm">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="lg:col-span-1">
                <h4 className="text-lg font-semibold mb-4">Performance Overview</h4>
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${getRiskColor(selectedStudent.riskLevel)}`}>
                    <p className="text-sm font-medium mb-2">Risk Assessment</p>
                    <p className="text-2xl font-bold">{selectedStudent.riskLevel} Risk</p>
                  </div>

                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/50">
                    <p className="text-sm font-medium mb-2">Study Hours</p>
                    <p className="text-2xl font-bold">{selectedStudent.studyHours} hrs/day</p>
                  </div>

                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/50">
                    <p className="text-sm font-medium mb-4">Performance Breakdown</p>
                    <div className="h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
                      <p className="text-gray-500 text-sm">Chart will be displayed here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-xl shadow-2xl border max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add New Student</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <AddStudentForm
              onSave={handleAddStudent}
              onCancel={() => setShowAddModal(false)}
              darkMode={darkMode}
            />
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-xl shadow-2xl border max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Edit Student</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <EditStudentForm
              student={editingStudent}
              onSave={handleSaveEdit}
              onCancel={() => setShowEditModal(false)}
              darkMode={darkMode}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Edit Student Form Component
function EditStudentForm({ student, onSave, onCancel, darkMode }) {
  const [formData, setFormData] = useState({
    name: student.name,
    enrollmentId: student.enrollmentId,
    branch: student.branch,
    semester: student.semester,
    studentType: student.studentType,
    subjects: student.subjects.join(', '),
    attendance: student.attendance,
    theory: {
      midsem: student.theory?.midsem || 0,
      assignment: student.theory?.assignment || 0,
      endSemester: student.theory?.endSemester || 0,
      total: student.theory?.total || 0
    },
    practical: {
      midsem: student.practical?.midsem || 0,
      assignment: student.practical?.assignment || 0,
      endSemester: student.practical?.endSemester || 0,
      total: student.practical?.total || 0
    },
    studyHours: student.studyHours,
    discipline: student.discipline || 0,
    participation: student.participation || 0,
    backlogs: student.backlogs || 0,
    consistency: student.consistency || 0,
    projects: student.projects || 0,
    internships: student.internships || '',
    gender: student.gender,
    age: student.age
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate totals if not set
    const theoryTotal = formData.theory.total || Math.round((
      parseInt(formData.theory.midsem) + 
      parseInt(formData.theory.assignment) + 
      parseInt(formData.theory.endSemester)
    ) / 3);
    
    const practicalTotal = formData.practical.total || Math.round((
      parseInt(formData.practical.midsem) + 
      parseInt(formData.practical.assignment) + 
      parseInt(formData.practical.endSemester)
    ) / 3);

    const updatedStudent = {
      ...student,
      name: formData.name,
      enrollmentId: formData.enrollmentId,
      branch: formData.branch,
      semester: parseInt(formData.semester),
      studentType: formData.studentType,
      subjects: formData.subjects.split(',').map(s => s.trim()),
      attendance: parseInt(formData.attendance),
      theory: {
        midsem: parseInt(formData.theory.midsem) || 0,
        assignment: parseInt(formData.theory.assignment) || 0,
        endSemester: parseInt(formData.theory.endSemester) || 0,
        total: theoryTotal,
        grade: getGradeFromMarks(theoryTotal)
      },
      practical: {
        midsem: parseInt(formData.practical.midsem) || 0,
        assignment: parseInt(formData.practical.assignment) || 0,
        endSemester: parseInt(formData.practical.endSemester) || 0,
        total: practicalTotal,
        grade: getGradeFromMarks(practicalTotal)
      },
      combinedTotal: Math.round((theoryTotal + practicalTotal) / 2),
      studyHours: parseInt(formData.studyHours),
      discipline: parseInt(formData.discipline),
      participation: parseInt(formData.participation),
      backlogs: parseInt(formData.backlogs),
      consistency: parseInt(formData.consistency),
      projects: parseInt(formData.projects),
      internships: formData.internships,
      gender: formData.gender,
      age: parseInt(formData.age)
    };
    
    onSave(updatedStudent);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('theory.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        theory: {
          ...prev.theory,
          [field]: value
        }
      }));
    } else if (name.startsWith('practical.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        practical: {
          ...prev.practical,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const getGradeFromMarks = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    return "F";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="border-b pb-4">
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Student Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Enrollment ID
            </label>
            <input
              type="text"
              name="enrollmentId"
              value={formData.enrollmentId}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Branch
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="CE">CE</option>
              <option value="IT">IT</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Electrical">Electrical</option>
              <option value="AI">AI & Data Science</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Semester
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            >
              {[1,2,3,4,5,6,7,8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Student Type
            </label>
            <select
              name="studentType"
              value={formData.studentType}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            >
              <option value="Regular Student">Regular Student</option>
              <option value="Backlog Student">Backlog Student</option>
              <option value="Scholarship Student">Scholarship Student</option>
              <option value="Hostel Student">Hostel Student</option>
              <option value="Day Scholar">Day Scholar</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              min="16"
              max="30"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Subjects (comma separated)
            </label>
            <input
              type="text"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Subject1, Subject2, Subject3"
              required
            />
          </div>
        </div>
      </div>

      {/* Marks & Attendance */}
      <div className="border-b pb-4">
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Marks & Attendance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Attendance (%)
            </label>
            <input
              type="number"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              min="0"
              max="100"
              required
            />
          </div>
        </div>

        {/* Theory Marks */}
        <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
          <h4 className={`font-semibold mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
            Theory Marks (Edit marks and total will auto-calculate)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Mid-Semester (out of 40)
              </label>
              <input
                type="number"
                name="theory.midsem"
                value={formData.theory.midsem}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                min="0"
                max="40"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Assignment (out of 20)
              </label>
              <input
                type="number"
                name="theory.assignment"
                value={formData.theory.assignment}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                min="0"
                max="20"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                End Semester (out of 40)
              </label>
              <input
                type="number"
                name="theory.endSemester"
                value={formData.theory.endSemester}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                min="0"
                max="40"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Total (out of 100)
              </label>
              <input
                type="number"
                name="theory.total"
                value={formData.theory.total}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                min="0"
                max="100"
                placeholder="Auto-calculated"
              />
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Leave blank to auto-calculate average
              </p>
            </div>
          </div>
        </div>

        {/* Practical Marks */}
        <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
          <h4 className={`font-semibold mb-4 ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
            Practical Marks (Edit marks and total will auto-calculate)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Mid-Semester (out of 40)
              </label>
              <input
                type="number"
                name="practical.midsem"
                value={formData.practical.midsem}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                min="0"
                max="40"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Assignment (out of 20)
              </label>
              <input
                type="number"
                name="practical.assignment"
                value={formData.practical.assignment}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                min="0"
                max="20"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                End Semester (out of 40)
              </label>
              <input
                type="number"
                name="practical.endSemester"
                value={formData.practical.endSemester}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                min="0"
                max="40"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Total (out of 100)
              </label>
              <input
                type="number"
                name="practical.total"
                value={formData.practical.total}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                min="0"
                max="100"
                placeholder="Auto-calculated"
              />
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Leave blank to auto-calculate average
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Metrics */}
      <div className="border-b pb-4">
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          Academic Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Study Hours (per day)
            </label>
            <input
              type="number"
              name="studyHours"
              value={formData.studyHours}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              min="0"
              max="24"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Discipline (1-10)
            </label>
            <input
              type="number"
              name="discipline"
              value={formData.discipline}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              min="1"
              max="10"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Participation (1-10)
            </label>
            <input
              type="number"
              name="participation"
              value={formData.participation}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              min="1"
              max="10"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Backlogs
            </label>
            <input
              type="number"
              name="backlogs"
              value={formData.backlogs}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              min="0"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Consistency (1-10)
            </label>
            <input
              type="number"
              name="consistency"
              value={formData.consistency}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              min="1"
              max="10"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Projects Completed
            </label>
            <input
              type="number"
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              min="0"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Internships
            </label>
            <select
              name="internships"
              value={formData.internships}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            >
              <option value="">Select Internship Status</option>
              <option value="None">None</option>
              <option value="Currently doing internship">Currently doing internship</option>
              <option value="Completed 1 internship">Completed 1 internship</option>
              <option value="Completed 2 internships">Completed 2 internships</option>
              <option value="Completed 3 internships">Completed 3 internships</option>
              <option value="Completed more than 3 internships">Completed more than 3 internships</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className={`px-6 py-3 border rounded-lg transition duration-300 ${
            darkMode
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300 transform hover:scale-105"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

// Add Student Form Component
function AddStudentForm({ onSave, onCancel, darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    semester: '',
    studentType: 'Regular Student',
    subjects: [],
    attendance: '',
    internalMarks: '',
    assignmentScore: '',
    studyHours: '',
    discipline: '',
    participation: '',
    backlogs: 0,
    consistency: '',
    projects: '',
    internships: '',
    gender: 'Male',
    age: '',
    subjectsDetail: [],
    numSubjects: 0,
    backlogSubjects: [],
    performanceInsights: {
      averageMarks: 0,
      highestSubject: '',
      lowestSubject: '',
      weakSubject: '',
      strongSubject: ''
    },
    previousMarks: {},
    improvementStatus: 'Same',
    performanceTrend: 'Stable'
  });

  // Add new subject with Theory and Practical components
  const addSubject = () => {
    const newSubject = {
      id: Date.now(),
      name: '',
      code: '',
      attendance: 75,
      // Theory marks: Midsem (40) + Assignment (20) + End Semester (40) = 100
      theory: {
        midsem: 0,
        assignment: 0,
        endSemester: 0,
        total: 0
      },
      // Practical marks: Midsem (40) + Assignment (20) + End Semester (40) = 100
      practical: {
        midsem: 0,
        assignment: 0,
        endSemester: 0,
        total: 0
      },
      combinedTotal: 0,
      theoryGrade: 'A',
      practicalGrade: 'A',
      overallGrade: 'A',
      passFail: 'Pass',
      previousMarks: 0
    };
    setFormData(prev => ({
      ...prev,
      subjectsDetail: [...prev.subjectsDetail, newSubject],
      numSubjects: prev.numSubjects + 1
    }));
  };

  // Remove subject
  const removeSubject = (id) => {
    setFormData(prev => ({
      ...prev,
      subjectsDetail: prev.subjectsDetail.filter(s => s.id !== id),
      numSubjects: prev.numSubjects - 1,
      backlogSubjects: prev.backlogSubjects.filter(bs => bs !== id)
    }));
    calculatePerformanceInsights();
  };

  // Calculate grade based on marks out of 100
  const calculateGrade = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B+';
    if (marks >= 60) return 'B';
    if (marks >= 50) return 'C';
    if (marks >= 40) return 'C-';
    return 'F';
  };

  // Update subject with Theory and Practical marks
  const updateSubject = (id, type, field, value) => {
    setFormData(prev => ({
      ...prev,
      subjectsDetail: prev.subjectsDetail.map(s => {
        if (s.id === id) {
          let updated = { ...s };
          
          // Update theory or practical marks
          if (type === 'theory' || type === 'practical') {
            updated[type] = { ...updated[type], [field]: parseInt(value) || 0 };
            // Auto-calculate total: Midsem (40) + Assignment (20) + End Semester (40) = 100
            updated[type].total = updated[type].midsem + updated[type].assignment + updated[type].endSemester;
            updated[`${type}Grade`] = calculateGrade(updated[type].total);
          } else if (type === 'general') {
            // For name, code, attendance
            updated[field] = value;
          }
          
          // Calculate combined total and overall grade
          updated.combinedTotal = (updated.theory.total + updated.practical.total) / 2;
          updated.overallGrade = calculateGrade(updated.combinedTotal);
          updated.passFail = updated.combinedTotal >= 40 ? 'Pass' : 'Fail';
          
          return updated;
        }
        return s;
      })
    }));
    calculatePerformanceInsights();
  };

  // Calculate performance insights
  const calculatePerformanceInsights = () => {
    if (formData.subjectsDetail.length === 0) return;

    const subjects = formData.subjectsDetail;
    const totalMarks = subjects.reduce((sum, s) => sum + (s.combinedTotal || 0), 0);
    const averageMarks = (totalMarks / subjects.length).toFixed(2);
    
    const highest = subjects.reduce((max, s) => (s.combinedTotal || 0) > (max.combinedTotal || 0) ? s : max);
    const lowest = subjects.reduce((min, s) => (s.combinedTotal || 0) < (min.combinedTotal || 0) ? s : min);

    setFormData(prev => ({
      ...prev,
      performanceInsights: {
        averageMarks,
        highestSubject: highest.name || '',
        lowestSubject: lowest.name || '',
        weakSubject: prev.performanceInsights.weakSubject,
        strongSubject: prev.performanceInsights.strongSubject
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      ...formData,
      subjects: formData.subjectsDetail.map(s => s.name),
      attendance: parseInt(formData.attendance),
      internalMarks: parseInt(formData.internalMarks),
      assignmentScore: parseInt(formData.assignmentScore),
      studyHours: parseInt(formData.studyHours),
      discipline: parseInt(formData.discipline),
      participation: parseInt(formData.participation),
      backlogs: formData.backlogSubjects.length,
      consistency: parseInt(formData.consistency),
      projects: parseInt(formData.projects),
      age: parseInt(formData.age),
      semester: parseInt(formData.semester),
      subjectsDetail: formData.subjectsDetail
    };
    onSave(newStudent);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4 pb-6 border-b">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Student Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Branch
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="CE">CE</option>
              <option value="IT">IT</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Electrical">Electrical</option>
              <option value="AI">AI & Data Science</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Semester
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            >
              <option value="">Select Semester</option>
              {[1,2,3,4,5,6,7,8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Student Type
            </label>
            <select
              name="studentType"
              value={formData.studentType}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            >
              <option value="Regular Student">Regular Student</option>
              <option value="Backlog Student">Backlog Student</option>
              <option value="Scholarship Student">Scholarship Student</option>
              <option value="Hostel Student">Hostel Student</option>
              <option value="Day Scholar">Day Scholar</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              min="16"
              max="30"
              placeholder="20"
              required
            />
          </div>
        </div>
      </div>

      {/* Subjects & Performance */}
      <div className="space-y-4 pb-6 border-b">
        <div className="flex justify-between items-center">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Subjects & Performance ({formData.numSubjects})
          </h3>
          <button
            type="button"
            onClick={addSubject}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200 text-sm font-medium"
          >
            + Add Subject
          </button>
        </div>

        {formData.subjectsDetail.length === 0 ? (
          <div className={`p-6 rounded-lg text-center ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            <p className="mb-2">No subjects added yet</p>
            <p className="text-sm">Click the "+ Add Subject" button to start adding subjects</p>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.subjectsDetail.map((subject) => (
              <div
                key={subject.id}
                className={`p-6 rounded-lg border-2 transition-colors ${
                  subject.passFail === 'Fail'
                    ? 'border-red-500'
                    : 'border-green-500'
                } ${
                  darkMode
                    ? 'bg-gray-700'
                    : 'bg-gray-50'
                }`}
              >
                {/* Subject Header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Subject Name
                        </label>
                        <input
                          type="text"
                          value={subject.name}
                          onChange={(e) => updateSubject(subject.id, 'general', 'name', e.target.value)}
                          className={`w-full px-3 py-2 border rounded ${
                            darkMode
                              ? 'bg-gray-600 border-gray-500 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder="e.g., Data Structures"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Course Code
                        </label>
                        <input
                          type="text"
                          value={subject.code}
                          onChange={(e) => updateSubject(subject.id, 'general', 'code', e.target.value)}
                          className={`w-full px-3 py-2 border rounded ${
                            darkMode
                              ? 'bg-gray-600 border-gray-500 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder="e.g., CS201"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Attendance (%)
                        </label>
                        <input
                          type="number"
                          value={subject.attendance}
                          onChange={(e) => updateSubject(subject.id, 'general', 'attendance', parseInt(e.target.value))}
                          min="0"
                          max="100"
                          className={`w-full px-3 py-2 border rounded ${
                            darkMode
                              ? 'bg-gray-600 border-gray-500 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder="85"
                        />
                      </div>
                    </div>

                    {/* Theory Marks Distribution */}
                    <div className="mt-4 border-t pt-4">
                      <h4 className={`text-sm font-bold mb-3 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>📚 THEORY (Max 100)</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Midsem (40)
                          </label>
                          <input
                            type="number"
                            value={subject.theory.midsem}
                            onChange={(e) => updateSubject(subject.id, 'theory', 'midsem', e.target.value)}
                            min="0"
                            max="40"
                            className={`w-full px-2 py-2 border rounded text-sm ${
                              darkMode
                                ? 'bg-gray-600 border-gray-500 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Assignment (20)
                          </label>
                          <input
                            type="number"
                            value={subject.theory.assignment}
                            onChange={(e) => updateSubject(subject.id, 'theory', 'assignment', e.target.value)}
                            min="0"
                            max="20"
                            className={`w-full px-2 py-2 border rounded text-sm ${
                              darkMode
                                ? 'bg-gray-600 border-gray-500 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            End Sem (40)
                          </label>
                          <input
                            type="number"
                            value={subject.theory.endSemester}
                            onChange={(e) => updateSubject(subject.id, 'theory', 'endSemester', e.target.value)}
                            min="0"
                            max="40"
                            className={`w-full px-2 py-2 border rounded text-sm ${
                              darkMode
                                ? 'bg-gray-600 border-gray-500 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Total
                          </label>
                          <div className={`w-full px-2 py-2 rounded border text-center font-bold text-sm ${
                            darkMode
                              ? 'bg-gray-600 border-gray-500 text-blue-300'
                              : 'bg-blue-50 border-blue-300 text-blue-900'
                          }`}>
                            {subject.theory.total}/100
                          </div>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Theory Grade
                          </label>
                          <div className={`w-full px-2 py-2 rounded border text-center font-bold text-sm ${
                            darkMode
                              ? 'bg-gray-600 border-gray-500 text-white'
                              : 'bg-gray-100 border-gray-300 text-gray-900'
                          }`}>
                            {subject.theoryGrade}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Practical Marks Distribution */}
                    <div className="mt-4 border-t pt-4">
                      <h4 className={`text-sm font-bold mb-3 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>🔬 PRACTICAL (Max 100)</h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Midsem (40)
                          </label>
                          <input
                            type="number"
                            value={subject.practical.midsem}
                            onChange={(e) => updateSubject(subject.id, 'practical', 'midsem', e.target.value)}
                            min="0"
                            max="40"
                            className={`w-full px-2 py-2 border rounded text-sm ${
                              darkMode
                                ? 'bg-gray-600 border-gray-500 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Assignment (20)
                          </label>
                          <input
                            type="number"
                            value={subject.practical.assignment}
                            onChange={(e) => updateSubject(subject.id, 'practical', 'assignment', e.target.value)}
                            min="0"
                            max="20"
                            className={`w-full px-2 py-2 border rounded text-sm ${
                              darkMode
                                ? 'bg-gray-600 border-gray-500 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            End Sem (40)
                          </label>
                          <input
                            type="number"
                            value={subject.practical.endSemester}
                            onChange={(e) => updateSubject(subject.id, 'practical', 'endSemester', e.target.value)}
                            min="0"
                            max="40"
                            className={`w-full px-2 py-2 border rounded text-sm ${
                              darkMode
                                ? 'bg-gray-600 border-gray-500 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Total
                          </label>
                          <div className={`w-full px-2 py-2 rounded border text-center font-bold text-sm ${
                            darkMode
                              ? 'bg-gray-600 border-gray-500 text-purple-300'
                              : 'bg-purple-50 border-purple-300 text-purple-900'
                          }`}>
                            {subject.practical.total}/100
                          </div>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Practical Grade
                          </label>
                          <div className={`w-full px-2 py-2 rounded border text-center font-bold text-sm ${
                            darkMode
                              ? 'bg-gray-600 border-gray-500 text-white'
                              : 'bg-gray-100 border-gray-300 text-gray-900'
                          }`}>
                            {subject.practicalGrade}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overall Performance */}
                    <div className="mt-4 border-t pt-4 grid grid-cols-3 gap-3">
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Combined Avg
                        </label>
                        <div className={`w-full px-2 py-2 rounded border text-center font-bold ${
                          darkMode
                            ? 'bg-gray-600 border-gray-500 text-yellow-300'
                            : 'bg-yellow-50 border-yellow-300 text-yellow-900'
                        }`}>
                          {subject.combinedTotal.toFixed(1)}/100
                        </div>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Overall Grade
                        </label>
                        <div className={`w-full px-2 py-2 rounded border text-center font-bold ${
                          darkMode
                            ? 'bg-gray-600 border-gray-500 text-white'
                            : 'bg-gray-100 border-gray-300 text-gray-900'
                        }`}>
                          {subject.overallGrade}
                        </div>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Status
                        </label>
                        <div className={`w-full px-2 py-2 rounded border text-center font-bold text-sm ${
                          subject.passFail === 'Pass'
                            ? darkMode ? 'bg-green-900 border-green-700 text-green-200' : 'bg-green-50 border-green-300 text-green-900'
                            : darkMode ? 'bg-red-900 border-red-700 text-red-200' : 'bg-red-50 border-red-300 text-red-900'
                        }`}>
                          {subject.passFail}
                        </div>
                      </div>
                    </div>

                    {/* Status Row */}
                    <div className="mt-4 flex justify-between items-center pt-4 border-t">
                      <div className="flex gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          subject.passFail === 'Pass'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {subject.passFail} ({subject.combinedTotal.toFixed(1)}/100)
                        </span>
                        {subject.previousMarks > 0 && (
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            subject.combinedTotal > subject.previousMarks
                              ? 'bg-blue-100 text-blue-800'
                              : subject.combinedTotal < subject.previousMarks
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-gray-100'
                          }`}>
                            {subject.combinedTotal > subject.previousMarks ? '↑ Improved' : subject.combinedTotal < subject.previousMarks ? '↓ Declined' : '→ Same'}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSubject(subject.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Performance Insights */}
      {formData.subjectsDetail.length > 0 && (
        <div className="space-y-4 pb-6 border-b">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Performance Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
              <div className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Average Marks</div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>
                {formData.performanceInsights.averageMarks.toFixed(2)}
              </div>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900' : 'bg-green-50'}`}>
              <div className={`text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-600'}`}>Highest Subject</div>
              <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-green-900'}`}>
                {formData.performanceInsights.highestSubject || '-'}
              </div>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900' : 'bg-red-50'}`}>
              <div className={`text-sm font-medium ${darkMode ? 'text-red-300' : 'text-red-600'}`}>Lowest Subject</div>
              <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-red-900'}`}>
                {formData.performanceInsights.lowestSubject || '-'}
              </div>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-yellow-900' : 'bg-yellow-50'}`}>
              <div className={`text-sm font-medium ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>Backlogs</div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-yellow-900'}`}>
                {formData.backlogSubjects.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backlog & Performance Tracking */}
      <div className="space-y-4 pb-6 border-b">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Backlog & Performance Tracking
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Subjects with Backlogs
            </label>
            <div className="space-y-2">
              {formData.subjectsDetail.map((subject) => (
                <label key={subject.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.backlogSubjects.includes(subject.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          backlogSubjects: [...prev.backlogSubjects, subject.id]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          backlogSubjects: prev.backlogSubjects.filter(id => id !== subject.id)
                        }));
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {subject.name || 'Untitled'} ({subject.totalMarks})
                  </span>
                </label>
              ))}
              {formData.subjectsDetail.length === 0 && (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Add subjects first to mark backlogs
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Weak Subject
              </label>
              <select
                value={formData.performanceInsights.weakSubject}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  performanceInsights: {
                    ...prev.performanceInsights,
                    weakSubject: e.target.value
                  }
                }))}
                className={`w-full px-4 py-3 border rounded-lg ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">Select weak subject</option>
                {formData.subjectsDetail.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name || 'Untitled'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Strong Subject
              </label>
              <select
                value={formData.performanceInsights.strongSubject}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  performanceInsights: {
                    ...prev.performanceInsights,
                    strongSubject: e.target.value
                  }
                }))}
                className={`w-full px-4 py-3 border rounded-lg ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">Select strong subject</option>
                {formData.subjectsDetail.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name || 'Untitled'}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Improvement Status
                </label>
                <select
                  value={formData.improvementStatus}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    improvementStatus: e.target.value
                  }))}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="Improved">↑ Improved</option>
                  <option value="Same">→ Same</option>
                  <option value="Declined">↓ Declined</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Performance Trend
                </label>
                <select
                  value={formData.performanceTrend}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    performanceTrend: e.target.value
                  }))}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="Improving">📈 Improving</option>
                  <option value="Stable">→ Stable</option>
                  <option value="Declining">📉 Declining</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="space-y-4 pb-6 border-b">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Additional Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Study Hours (per day)
            </label>
            <input
              type="number"
              name="studyHours"
              value={formData.studyHours}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              min="0"
              max="24"
              placeholder="6"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Discipline (1-10)
            </label>
            <input
              type="number"
              name="discipline"
              value={formData.discipline}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              min="1"
              max="10"
              placeholder="8"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Participation (1-10)
            </label>
            <input
              type="number"
              name="participation"
              value={formData.participation}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              min="1"
              max="10"
              placeholder="9"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Consistency (1-10)
            </label>
            <input
              type="number"
              name="consistency"
              value={formData.consistency}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              min="1"
              max="10"
              placeholder="8"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Projects Completed
            </label>
            <input
              type="number"
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              min="0"
              placeholder="2"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Internship Status
            </label>
            <select
              name="internships"
              value={formData.internships}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Select Internship Status</option>
              <option value="None">None</option>
              <option value="Currently doing internship">Currently doing internship</option>
              <option value="Completed 1 internship">Completed 1 internship</option>
              <option value="Completed 2 internships">Completed 2 internships</option>
              <option value="Completed 3 internships">Completed 3 internships</option>
              <option value="Completed more than 3 internships">Completed more than 3 internships</option>
            </select>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className={`sticky bottom-0 flex justify-end space-x-4 pt-6 pb-2 ${
        darkMode
          ? 'bg-gray-800 border-t border-gray-700'
          : 'bg-white border-t border-gray-200'
      }`}>
        <button
          type="button"
          onClick={onCancel}
          className={`px-6 py-3 border rounded-lg transition duration-300 ${
            darkMode
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={formData.subjectsDetail.length === 0}
          className={`px-6 py-3 rounded-lg transition duration-300 transform ${
            formData.subjectsDetail.length === 0
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
          }`}
        >
          Add Student
        </button>
      </div>
    </form>
  );
}

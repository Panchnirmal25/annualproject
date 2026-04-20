import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaDownload, FaEye, FaBook, FaGraduationCap, FaClock, FaChalkboardTeacher } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Subjects() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "Data Structures and Algorithms",
      code: "CSE101",
      branch: "Computer Science Engineering",
      branchCode: "CSE",
      semester: 3,
      credits: 4,
      type: "Core",
      faculty: "Dr. Rajesh Kumar",
      totalStudents: 85,
      status: "Active"
    },
    {
      id: 2,
      name: "Database Management Systems",
      code: "CSE201",
      branch: "Computer Science Engineering",
      branchCode: "CSE",
      semester: 5,
      credits: 3,
      type: "Core",
      faculty: "Dr. Priya Sharma",
      totalStudents: 82,
      status: "Active"
    },
    {
      id: 3,
      name: "Thermodynamics",
      code: "ME101",
      branch: "Mechanical Engineering",
      branchCode: "ME",
      semester: 3,
      credits: 4,
      type: "Core",
      faculty: "Dr. Amit Singh",
      totalStudents: 78,
      status: "Active"
    },
    {
      id: 4,
      name: "Fluid Mechanics",
      code: "ME201",
      branch: "Mechanical Engineering",
      branchCode: "ME",
      semester: 5,
      credits: 3,
      type: "Core",
      faculty: "Dr. Sunita Patel",
      totalStudents: 76,
      status: "Active"
    },
    {
      id: 5,
      name: "Circuit Analysis",
      code: "EE101",
      branch: "Electrical Engineering",
      branchCode: "EE",
      semester: 3,
      credits: 4,
      type: "Core",
      faculty: "Dr. Vikram Rao",
      totalStudents: 71,
      status: "Active"
    },
    {
      id: 6,
      name: "Power Systems",
      code: "EE201",
      branch: "Electrical Engineering",
      branchCode: "EE",
      semester: 5,
      credits: 3,
      type: "Core",
      faculty: "Dr. Meera Jain",
      totalStudents: 69,
      status: "Active"
    },
    {
      id: 7,
      name: "Structural Analysis",
      code: "CE101",
      branch: "Civil Engineering",
      branchCode: "CE",
      semester: 3,
      credits: 4,
      type: "Core",
      faculty: "Dr. Ramesh Gupta",
      totalStudents: 65,
      status: "Active"
    },
    {
      id: 8,
      name: "Web Development",
      code: "IT101",
      branch: "Information Technology",
      branchCode: "IT",
      semester: 3,
      credits: 3,
      type: "Elective",
      faculty: "Dr. Anjali Desai",
      totalStudents: 58,
      status: "Active"
    }
  ]);

  const [branches] = useState([
    { code: "CSE", name: "Computer Science Engineering" },
    { code: "ME", name: "Mechanical Engineering" },
    { code: "EE", name: "Electrical Engineering" },
    { code: "CE", name: "Civil Engineering" },
    { code: "IT", name: "Information Technology" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterBranch, setFilterBranch] = useState("All");
  const [filterSemester, setFilterSemester] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [newSubject, setNewSubject] = useState({
    name: "",
    code: "",
    branch: "",
    branchCode: "",
    semester: 1,
    credits: 3,
    type: "Core",
    faculty: "",
    status: "Active"
  });
  const [errors, setErrors] = useState({});

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

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = filterBranch === "All" || subject.branchCode === filterBranch;
    const matchesSemester = filterSemester === "All" || subject.semester === parseInt(filterSemester);
    const matchesType = filterType === "All" || subject.type === filterType;
    const matchesStatus = filterStatus === "All" || subject.status === filterStatus;
    return matchesSearch && matchesBranch && matchesSemester && matchesType && matchesStatus;
  });

  const validateForm = () => {
    const newErrors = {};
    if (!newSubject.name.trim()) newErrors.name = "Subject name is required";
    if (!newSubject.code.trim()) newErrors.code = "Subject code is required";
    else if (!/^[A-Z]{2,4}\d{3}$/.test(newSubject.code)) newErrors.code = "Code format: BRANCH### (e.g., CSE101)";
    if (!newSubject.branch) newErrors.branch = "Branch selection is required";
    if (!newSubject.faculty.trim()) newErrors.faculty = "Faculty name is required";
    if (newSubject.credits < 1 || newSubject.credits > 6) newErrors.credits = "Credits must be between 1-6";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBranchChange = (branchCode) => {
    const branch = branches.find(b => b.code === branchCode);
    setNewSubject({
      ...newSubject,
      branch: branch ? branch.name : "",
      branchCode: branchCode,
      code: branchCode ? `${branchCode}${newSubject.semester}01` : ""
    });
  };

  const handleSemesterChange = (semester) => {
    setNewSubject({
      ...newSubject,
      semester: parseInt(semester),
      code: newSubject.branchCode ? `${newSubject.branchCode}${semester}01` : ""
    });
  };

  const handleAddSubject = () => {
    if (!validateForm()) return;

    const subject = {
      ...newSubject,
      id: subjects.length + 1,
      totalStudents: 0
    };

    setSubjects([...subjects, subject]);
    setShowAddModal(false);
    setNewSubject({
      name: "",
      code: "",
      branch: "",
      branchCode: "",
      semester: 1,
      credits: 3,
      type: "Core",
      faculty: "",
      status: "Active"
    });
    setErrors({});
  };

  const handleEditSubject = () => {
    if (!validateForm()) return;

    setSubjects(subjects.map(subject =>
      subject.id === selectedSubject.id ? { ...selectedSubject, ...newSubject } : subject
    ));
    setShowEditModal(false);
    setSelectedSubject(null);
    setErrors({});
  };

  const handleDeleteSubject = (id) => {
    if (window.confirm("Are you sure you want to delete this subject? This action cannot be undone.")) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

  const openEditModal = (subject) => {
    setSelectedSubject(subject);
    setNewSubject({
      name: subject.name,
      code: subject.code,
      branch: subject.branch,
      branchCode: subject.branchCode,
      semester: subject.semester,
      credits: subject.credits,
      type: subject.type,
      faculty: subject.faculty,
      status: subject.status
    });
    setShowEditModal(true);
  };

  const openViewModal = (subject) => {
    setSelectedSubject(subject);
    setShowViewModal(true);
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Subject Name", "Code", "Branch", "Semester", "Credits", "Type", "Faculty", "Students", "Status"],
      ...filteredSubjects.map(subject => [
        subject.name,
        subject.code,
        subject.branch,
        subject.semester,
        subject.credits,
        subject.type,
        subject.faculty,
        subject.totalStudents,
        subject.status
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subjects.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Core': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'Elective': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Lab': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Inactive': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex">
        <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />

        <main className={`flex-1 transition-all duration-300 pt-16 overflow-x-auto ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="p-8">

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Subject Management</h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Manage academic subjects across all engineering branches
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Subjects
                    </p>
                    <p className="text-3xl font-bold">{subjects.length}</p>
                  </div>
                  <FaBook className="text-3xl text-blue-500" />
                </div>
              </div>

              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Core Subjects
                    </p>
                    <p className="text-3xl font-bold">
                      {subjects.filter(subject => subject.type === 'Core').length}
                    </p>
                  </div>
                  <FaGraduationCap className="text-3xl text-green-500" />
                </div>
              </div>

              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Elective Subjects
                    </p>
                    <p className="text-3xl font-bold">
                      {subjects.filter(subject => subject.type === 'Elective').length}
                    </p>
                  </div>
                  <FaChalkboardTeacher className="text-3xl text-purple-500" />
                </div>
              </div>

              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Students
                    </p>
                    <p className="text-3xl font-bold">
                      {subjects.reduce((sum, subject) => sum + subject.totalStudents, 0)}
                    </p>
                  </div>
                  <FaClock className="text-3xl text-orange-500" />
                </div>
              </div>

              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Active Subjects
                    </p>
                    <p className="text-3xl font-bold">
                      {subjects.filter(subject => subject.status === 'Active').length}
                    </p>
                  </div>
                  <FaClock className="text-3xl text-red-500" />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <select
                  value={filterBranch}
                  onChange={(e) => setFilterBranch(e.target.value)}
                  className={`px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="All">All Branches</option>
                  {branches.map(branch => (
                    <option key={branch.code} value={branch.code}>{branch.code}</option>
                  ))}
                </select>

                <select
                  value={filterSemester}
                  onChange={(e) => setFilterSemester(e.target.value)}
                  className={`px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="All">All Semesters</option>
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={`px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="All">All Types</option>
                  <option value="Core">Core</option>
                  <option value="Elective">Elective</option>
                  <option value="Lab">Lab</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <button
                  onClick={exportToCSV}
                  className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <FaDownload />
                  Export
                </button>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  <FaPlus />
                  Add Subject
                </button>
              </div>
            </div>

            {/* Subjects Table */}
            <div className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-xl shadow-lg border overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Subject Details</th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Branch & Semester</th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Credits & Type</th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Faculty</th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Students</th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Status</th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredSubjects.map((subject) => (
                      <tr key={subject.id} className={`hover:${
                        darkMode ? 'bg-gray-700' : 'bg-gray-50'
                      } transition-colors duration-200`}>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold">{subject.name}</div>
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Code: {subject.code}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium">{subject.branchCode}</div>
                            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Semester {subject.semester}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium w-fit">
                              {subject.credits} Credits
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded w-fit ${getTypeColor(subject.type)}`}>
                              {subject.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{subject.faculty}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {subject.totalStudents}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(subject.status)}`}>
                            {subject.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openViewModal(subject)}
                              className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => openEditModal(subject)}
                              className="p-2 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 rounded-lg transition-colors duration-200"
                              title="Edit Subject"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteSubject(subject.id)}
                              className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                              title="Delete Subject"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredSubjects.length === 0 && (
                <div className="text-center py-12">
                  <FaBook className={`text-6xl mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    No subjects found matching your criteria
                  </p>
                </div>
              )}
            </div>

            {/* Add Subject Modal */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className={`${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } p-8 rounded-xl shadow-2xl border max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto`}>
                  <h2 className="text-2xl font-bold mb-6">Add New Subject</h2>

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Subject Name *
                      </label>
                      <input
                        type="text"
                        value={newSubject.name}
                        onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter subject name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Branch *
                      </label>
                      <select
                        value={newSubject.branchCode}
                        onChange={(e) => handleBranchChange(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } ${errors.branch ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select Branch</option>
                        {branches.map(branch => (
                          <option key={branch.code} value={branch.code}>{branch.name}</option>
                        ))}
                      </select>
                      {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Semester
                        </label>
                        <select
                          value={newSubject.semester}
                          onChange={(e) => handleSemesterChange(e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            darkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          {[1,2,3,4,5,6,7,8].map(sem => (
                            <option key={sem} value={sem}>Semester {sem}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Credits
                        </label>
                        <input
                          type="number"
                          value={newSubject.credits}
                          onChange={(e) => setNewSubject({...newSubject, credits: parseInt(e.target.value)})}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            darkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          } ${errors.credits ? 'border-red-500' : ''}`}
                          min="1"
                          max="6"
                        />
                        {errors.credits && <p className="text-red-500 text-sm mt-1">{errors.credits}</p>}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Subject Code *
                      </label>
                      <input
                        type="text"
                        value={newSubject.code}
                        onChange={(e) => setNewSubject({...newSubject, code: e.target.value.toUpperCase()})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } ${errors.code ? 'border-red-500' : ''}`}
                        placeholder="Auto-generated: BRANCHSEM01"
                      />
                      {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Subject Type
                      </label>
                      <select
                        value={newSubject.type}
                        onChange={(e) => setNewSubject({...newSubject, type: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="Core">Core</option>
                        <option value="Elective">Elective</option>
                        <option value="Lab">Lab</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Faculty Name *
                      </label>
                      <input
                        type="text"
                        value={newSubject.faculty}
                        onChange={(e) => setNewSubject({...newSubject, faculty: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } ${errors.faculty ? 'border-red-500' : ''}`}
                        placeholder="Enter faculty name"
                      />
                      {errors.faculty && <p className="text-red-500 text-sm mt-1">{errors.faculty}</p>}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Status
                      </label>
                      <select
                        value={newSubject.status}
                        onChange={(e) => setNewSubject({...newSubject, status: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => {
                        setShowAddModal(false);
                        setNewSubject({
                          name: "",
                          code: "",
                          branch: "",
                          branchCode: "",
                          semester: 1,
                          credits: 3,
                          type: "Core",
                          faculty: "",
                          status: "Active"
                        });
                        setErrors({});
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddSubject}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Add Subject
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Subject Modal */}
            {showEditModal && selectedSubject && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className={`${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } p-8 rounded-xl shadow-2xl border max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto`}>
                  <h2 className="text-2xl font-bold mb-6">Edit Subject</h2>

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Subject Name *
                      </label>
                      <input
                        type="text"
                        value={newSubject.name}
                        onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter subject name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Branch *
                      </label>
                      <select
                        value={newSubject.branchCode}
                        onChange={(e) => handleBranchChange(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } ${errors.branch ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select Branch</option>
                        {branches.map(branch => (
                          <option key={branch.code} value={branch.code}>{branch.name}</option>
                        ))}
                      </select>
                      {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Semester
                        </label>
                        <select
                          value={newSubject.semester}
                          onChange={(e) => handleSemesterChange(e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            darkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          {[1,2,3,4,5,6,7,8].map(sem => (
                            <option key={sem} value={sem}>Semester {sem}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Credits
                        </label>
                        <input
                          type="number"
                          value={newSubject.credits}
                          onChange={(e) => setNewSubject({...newSubject, credits: parseInt(e.target.value)})}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            darkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          } ${errors.credits ? 'border-red-500' : ''}`}
                          min="1"
                          max="6"
                        />
                        {errors.credits && <p className="text-red-500 text-sm mt-1">{errors.credits}</p>}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Subject Code *
                      </label>
                      <input
                        type="text"
                        value={newSubject.code}
                        onChange={(e) => setNewSubject({...newSubject, code: e.target.value.toUpperCase()})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } ${errors.code ? 'border-red-500' : ''}`}
                        placeholder="Auto-generated: BRANCHSEM01"
                      />
                      {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Subject Type
                      </label>
                      <select
                        value={newSubject.type}
                        onChange={(e) => setNewSubject({...newSubject, type: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="Core">Core</option>
                        <option value="Elective">Elective</option>
                        <option value="Lab">Lab</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Faculty Name *
                      </label>
                      <input
                        type="text"
                        value={newSubject.faculty}
                        onChange={(e) => setNewSubject({...newSubject, faculty: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } ${errors.faculty ? 'border-red-500' : ''}`}
                        placeholder="Enter faculty name"
                      />
                      {errors.faculty && <p className="text-red-500 text-sm mt-1">{errors.faculty}</p>}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Status
                      </label>
                      <select
                        value={newSubject.status}
                        onChange={(e) => setNewSubject({...newSubject, status: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => {
                        setShowEditModal(false);
                        setSelectedSubject(null);
                        setErrors({});
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditSubject}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Update Subject
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View Subject Modal */}
            {showViewModal && selectedSubject && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className={`${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } p-8 rounded-xl shadow-2xl border max-w-2xl w-full mx-4`}>
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold">{selectedSubject.name}</h2>
                    <button
                      onClick={() => setShowViewModal(false)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Subject Code
                        </label>
                        <p className="text-lg font-semibold">{selectedSubject.code}</p>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Branch
                        </label>
                        <p className="text-lg">{selectedSubject.branch}</p>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Semester
                        </label>
                        <p className="text-lg">Semester {selectedSubject.semester}</p>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Credits
                        </label>
                        <p className="text-lg">{selectedSubject.credits}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Subject Type
                        </label>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getTypeColor(selectedSubject.type)}`}>
                          {selectedSubject.type}
                        </span>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Faculty
                        </label>
                        <p className="text-lg font-semibold">{selectedSubject.faculty}</p>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Total Students
                        </label>
                        <p className="text-lg text-blue-600 font-semibold">{selectedSubject.totalStudents}</p>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Status
                        </label>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedSubject.status)}`}>
                          {selectedSubject.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4">Subject Statistics</h3>
                    <div className="grid grid-cols-4 gap-4">
                      <div className={`p-4 rounded-lg ${
                        darkMode ? 'bg-gray-700' : 'bg-blue-50'
                      } text-center`}>
                        <div className="text-2xl font-bold text-blue-600">{selectedSubject.credits}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Credits</div>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        darkMode ? 'bg-gray-700' : 'bg-green-50'
                      } text-center`}>
                        <div className="text-2xl font-bold text-green-600">{selectedSubject.totalStudents}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Students</div>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        darkMode ? 'bg-gray-700' : 'bg-purple-50'
                      } text-center`}>
                        <div className="text-2xl font-bold text-purple-600">Sem {selectedSubject.semester}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Semester</div>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        darkMode ? 'bg-gray-700' : 'bg-orange-50'
                      } text-center`}>
                        <div className="text-2xl font-bold text-orange-600">{selectedSubject.type}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Type</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
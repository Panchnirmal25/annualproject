import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaDownload, FaEye, FaBook, FaGraduationCap, FaUsers, FaClock } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Branches() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [branches, setBranches] = useState([
    {
      id: 1,
      name: "Computer Science Engineering",
      code: "CSE",
      duration: "4 Years",
      totalSemesters: 8,
      totalStudents: 245,
      subjects: 42,
      hod: "Dr. Rajesh Kumar",
      established: "2010",
      status: "Active"
    },
    {
      id: 2,
      name: "Mechanical Engineering",
      code: "ME",
      duration: "4 Years",
      totalSemesters: 8,
      totalStudents: 198,
      subjects: 38,
      hod: "Dr. Priya Sharma",
      established: "2008",
      status: "Active"
    },
    {
      id: 3,
      name: "Electrical Engineering",
      code: "EE",
      duration: "4 Years",
      totalSemesters: 8,
      totalStudents: 176,
      subjects: 36,
      hod: "Dr. Amit Singh",
      established: "2009",
      status: "Active"
    },
    {
      id: 4,
      name: "Civil Engineering",
      code: "CE",
      duration: "4 Years",
      totalSemesters: 8,
      totalStudents: 154,
      subjects: 34,
      hod: "Dr. Sunita Patel",
      established: "2011",
      status: "Active"
    },
    {
      id: 5,
      name: "Information Technology",
      code: "IT",
      duration: "4 Years",
      totalSemesters: 8,
      totalStudents: 189,
      subjects: 40,
      hod: "Dr. Vikram Rao",
      established: "2012",
      status: "Active"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [newBranch, setNewBranch] = useState({
    name: "",
    code: "",
    duration: "4 Years",
    totalSemesters: 8,
    hod: "",
    established: "",
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

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.hod.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || branch.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const validateForm = () => {
    const newErrors = {};
    if (!newBranch.name.trim()) newErrors.name = "Branch name is required";
    if (!newBranch.code.trim()) newErrors.code = "Branch code is required";
    else if (newBranch.code.length > 10) newErrors.code = "Code must be 10 characters or less";
    if (!newBranch.hod.trim()) newErrors.hod = "HOD name is required";
    if (!newBranch.established.trim()) newErrors.established = "Established year is required";
    else if (!/^\d{4}$/.test(newBranch.established)) newErrors.established = "Enter valid year (YYYY)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddBranch = () => {
    if (!validateForm()) return;

    const branch = {
      ...newBranch,
      id: branches.length + 1,
      totalStudents: 0,
      subjects: 0
    };

    setBranches([...branches, branch]);
    setShowAddModal(false);
    setNewBranch({
      name: "",
      code: "",
      duration: "4 Years",
      totalSemesters: 8,
      hod: "",
      established: "",
      status: "Active"
    });
    setErrors({});
  };

  const handleEditBranch = () => {
    if (!validateForm()) return;

    setBranches(branches.map(branch =>
      branch.id === selectedBranch.id ? { ...selectedBranch, ...newBranch } : branch
    ));
    setShowEditModal(false);
    setSelectedBranch(null);
    setErrors({});
  };

  const handleDeleteBranch = (id) => {
    if (window.confirm("Are you sure you want to delete this branch? This action cannot be undone.")) {
      setBranches(branches.filter(branch => branch.id !== id));
    }
  };

  const openEditModal = (branch) => {
    setSelectedBranch(branch);
    setNewBranch({
      name: branch.name,
      code: branch.code,
      duration: branch.duration,
      totalSemesters: branch.totalSemesters,
      hod: branch.hod,
      established: branch.established,
      status: branch.status
    });
    setShowEditModal(true);
  };

  const openViewModal = (branch) => {
    setSelectedBranch(branch);
    setShowViewModal(true);
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Branch Name", "Code", "Duration", "Semesters", "Students", "Subjects", "HOD", "Established", "Status"],
      ...filteredBranches.map(branch => [
        branch.name,
        branch.code,
        branch.duration,
        branch.totalSemesters,
        branch.totalStudents,
        branch.subjects,
        branch.hod,
        branch.established,
        branch.status
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'branches.csv';
    a.click();
    window.URL.revokeObjectURL(url);
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
              <h1 className="text-3xl font-bold mb-2">Branch Management</h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Manage engineering branches and their academic programs
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Branches
                    </p>
                    <p className="text-3xl font-bold">{branches.length}</p>
                  </div>
                  <FaGraduationCap className="text-3xl text-blue-500" />
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
                      {branches.reduce((sum, branch) => sum + branch.totalStudents, 0)}
                    </p>
                  </div>
                  <FaUsers className="text-3xl text-green-500" />
                </div>
              </div>

              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Subjects
                    </p>
                    <p className="text-3xl font-bold">
                      {branches.reduce((sum, branch) => sum + branch.subjects, 0)}
                    </p>
                  </div>
                  <FaBook className="text-3xl text-purple-500" />
                </div>
              </div>

              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Active Branches
                    </p>
                    <p className="text-3xl font-bold">
                      {branches.filter(branch => branch.status === 'Active').length}
                    </p>
                  </div>
                  <FaClock className="text-3xl text-orange-500" />
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
                  placeholder="Search branches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div className="flex gap-3">
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
                  Add Branch
                </button>
              </div>
            </div>

            {/* Branches Table */}
            <div className={`${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-xl shadow-lg border overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Branch Details</th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Duration</th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Students</th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Subjects</th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>HOD</th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Status</th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredBranches.map((branch) => (
                      <tr key={branch.id} className={`hover:${
                        darkMode ? 'bg-gray-700' : 'bg-gray-50'
                      } transition-colors duration-200`}>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold">{branch.name}</div>
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Code: {branch.code} | Est: {branch.established}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div>{branch.duration}</div>
                            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {branch.totalSemesters} Semesters
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {branch.totalStudents}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                            {branch.subjects}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{branch.hod}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(branch.status)}`}>
                            {branch.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openViewModal(branch)}
                              className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => openEditModal(branch)}
                              className="p-2 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 rounded-lg transition-colors duration-200"
                              title="Edit Branch"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteBranch(branch.id)}
                              className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                              title="Delete Branch"
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

              {filteredBranches.length === 0 && (
                <div className="text-center py-12">
                  <FaGraduationCap className={`text-6xl mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    No branches found matching your criteria
                  </p>
                </div>
              )}
            </div>

            {/* Add Branch Modal */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className={`${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } p-8 rounded-xl shadow-2xl border max-w-md w-full mx-4`}>
                  <h2 className="text-2xl font-bold mb-6">Add New Branch</h2>

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Branch Name *
                      </label>
                      <input
                        type="text"
                        value={newBranch.name}
                        onChange={(e) => setNewBranch({...newBranch, name: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter branch name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Branch Code *
                      </label>
                      <input
                        type="text"
                        value={newBranch.code}
                        onChange={(e) => setNewBranch({...newBranch, code: e.target.value.toUpperCase()})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } ${errors.code ? 'border-red-500' : ''}`}
                        placeholder="e.g., CSE, ME, EE"
                      />
                      {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Duration
                        </label>
                        <select
                          value={newBranch.duration}
                          onChange={(e) => setNewBranch({...newBranch, duration: e.target.value})}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            darkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="4 Years">4 Years</option>
                          <option value="3 Years">3 Years</option>
                          <option value="5 Years">5 Years</option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Semesters
                        </label>
                        <input
                          type="number"
                          value={newBranch.totalSemesters}
                          onChange={(e) => setNewBranch({...newBranch, totalSemesters: parseInt(e.target.value)})}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            darkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          min="1"
                          max="12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Head of Department *
                      </label>
                      <input
                        type="text"
                        value={newBranch.hod}
                        onChange={(e) => setNewBranch({...newBranch, hod: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } ${errors.hod ? 'border-red-500' : ''}`}
                        placeholder="Enter HOD name"
                      />
                      {errors.hod && <p className="text-red-500 text-sm mt-1">{errors.hod}</p>}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Established Year *
                      </label>
                      <input
                        type="text"
                        value={newBranch.established}
                        onChange={(e) => setNewBranch({...newBranch, established: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } ${errors.established ? 'border-red-500' : ''}`}
                        placeholder="YYYY"
                      />
                      {errors.established && <p className="text-red-500 text-sm mt-1">{errors.established}</p>}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Status
                      </label>
                      <select
                        value={newBranch.status}
                        onChange={(e) => setNewBranch({...newBranch, status: e.target.value})}
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
                        setNewBranch({
                          name: "",
                          code: "",
                          duration: "4 Years",
                          totalSemesters: 8,
                          hod: "",
                          established: "",
                          status: "Active"
                        });
                        setErrors({});
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddBranch}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Add Branch
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Branch Modal */}
            {showEditModal && selectedBranch && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className={`${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } p-8 rounded-xl shadow-2xl border max-w-md w-full mx-4`}>
                  <h2 className="text-2xl font-bold mb-6">Edit Branch</h2>

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Branch Name *
                      </label>
                      <input
                        type="text"
                        value={newBranch.name}
                        onChange={(e) => setNewBranch({...newBranch, name: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter branch name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Branch Code *
                      </label>
                      <input
                        type="text"
                        value={newBranch.code}
                        onChange={(e) => setNewBranch({...newBranch, code: e.target.value.toUpperCase()})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } ${errors.code ? 'border-red-500' : ''}`}
                        placeholder="e.g., CSE, ME, EE"
                      />
                      {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Duration
                        </label>
                        <select
                          value={newBranch.duration}
                          onChange={(e) => setNewBranch({...newBranch, duration: e.target.value})}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            darkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="4 Years">4 Years</option>
                          <option value="3 Years">3 Years</option>
                          <option value="5 Years">5 Years</option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Semesters
                        </label>
                        <input
                          type="number"
                          value={newBranch.totalSemesters}
                          onChange={(e) => setNewBranch({...newBranch, totalSemesters: parseInt(e.target.value)})}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            darkMode
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          min="1"
                          max="12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Head of Department *
                      </label>
                      <input
                        type="text"
                        value={newBranch.hod}
                        onChange={(e) => setNewBranch({...newBranch, hod: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } ${errors.hod ? 'border-red-500' : ''}`}
                        placeholder="Enter HOD name"
                      />
                      {errors.hod && <p className="text-red-500 text-sm mt-1">{errors.hod}</p>}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Established Year *
                      </label>
                      <input
                        type="text"
                        value={newBranch.established}
                        onChange={(e) => setNewBranch({...newBranch, established: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } ${errors.established ? 'border-red-500' : ''}`}
                        placeholder="YYYY"
                      />
                      {errors.established && <p className="text-red-500 text-sm mt-1">{errors.established}</p>}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Status
                      </label>
                      <select
                        value={newBranch.status}
                        onChange={(e) => setNewBranch({...newBranch, status: e.target.value})}
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
                        setSelectedBranch(null);
                        setErrors({});
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditBranch}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Update Branch
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View Branch Modal */}
            {showViewModal && selectedBranch && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className={`${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } p-8 rounded-xl shadow-2xl border max-w-2xl w-full mx-4`}>
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold">{selectedBranch.name}</h2>
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
                          Branch Code
                        </label>
                        <p className="text-lg font-semibold">{selectedBranch.code}</p>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Duration
                        </label>
                        <p className="text-lg">{selectedBranch.duration}</p>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Total Semesters
                        </label>
                        <p className="text-lg">{selectedBranch.totalSemesters}</p>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Established
                        </label>
                        <p className="text-lg">{selectedBranch.established}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Head of Department
                        </label>
                        <p className="text-lg font-semibold">{selectedBranch.hod}</p>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Total Students
                        </label>
                        <p className="text-lg text-blue-600 font-semibold">{selectedBranch.totalStudents}</p>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Total Subjects
                        </label>
                        <p className="text-lg text-purple-600 font-semibold">{selectedBranch.subjects}</p>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Status
                        </label>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedBranch.status)}`}>
                          {selectedBranch.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-4">Branch Statistics</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg ${
                        darkMode ? 'bg-gray-700' : 'bg-blue-50'
                      } text-center`}>
                        <div className="text-2xl font-bold text-blue-600">{selectedBranch.totalStudents}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Students</div>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        darkMode ? 'bg-gray-700' : 'bg-purple-50'
                      } text-center`}>
                        <div className="text-2xl font-bold text-purple-600">{selectedBranch.subjects}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Subjects</div>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        darkMode ? 'bg-gray-700' : 'bg-green-50'
                      } text-center`}>
                        <div className="text-2xl font-bold text-green-600">{selectedBranch.totalSemesters}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Semesters</div>
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
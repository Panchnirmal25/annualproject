import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield, FaEnvelope, FaLock, FaUser, FaPhone, FaMapMarkerAlt, FaBook, FaCalendarAlt, FaIdBadge, FaBriefcase, FaGraduationCap, FaCheckCircle } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("student");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    // Common fields
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    
    // Student-specific
    branch: "",
    semester: "",
    
    // Teacher-specific
    employeeId: "",
    subject: "",
    department: "",
    experience: "",
    
    // Admin-specific
    adminId: "",
    roleType: "sub-admin",
    accessLevel: "basic"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = "Phone must be 10 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    // Role-specific validations
    if (selectedRole === "student") {
      if (!formData.branch.trim()) newErrors.branch = "Branch is required";
      if (!formData.semester) newErrors.semester = "Semester is required";
    } else if (selectedRole === "teacher") {
      if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
      if (!formData.subject.trim()) newErrors.subject = "Subject is required";
      if (!formData.department.trim()) newErrors.department = "Department is required";
      if (!formData.experience) newErrors.experience = "Experience is required";
    } else if (selectedRole === "admin") {
      if (!formData.adminId.trim()) newErrors.adminId = "Admin ID is required";
      if (!formData.roleType) newErrors.roleType = "Role Type is required";
      if (!formData.accessLevel) newErrors.accessLevel = "Access Level is required";
    }

    return newErrors;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare user data
    const userData = {
      id: selectedRole === "student" ? formData.email.split("@")[0] : formData.employeeId || formData.adminId,
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      role: selectedRole,
      ...(selectedRole === "student" && {
        branch: formData.branch,
        semester: parseInt(formData.semester)
      }),
      ...(selectedRole === "teacher" && {
        employeeId: formData.employeeId,
        subject: formData.subject,
        department: formData.department,
        experience: formData.experience
      }),
      ...(selectedRole === "admin" && {
        adminId: formData.adminId,
        roleType: formData.roleType,
        accessLevel: formData.accessLevel
      })
    };

    // Save to localStorage (in real app, this would be API call)
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      setSuccessMessage(`✓ ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} account created successfully!`);
      
      // Reset form
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrors({ submit: "Failed to create account. Please try again." });
    }
  };

  const getRoleColor = () => {
    switch (selectedRole) {
      case "student":
        return "from-blue-500 to-cyan-500";
      case "teacher":
        return "from-green-500 to-emerald-500";
      case "admin":
        return "from-purple-500 to-pink-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getBackgroundGradient = () => {
    switch (selectedRole) {
      case "student":
        return "from-blue-50 via-cyan-50 to-white";
      case "teacher":
        return "from-green-50 via-emerald-50 to-white";
      case "admin":
        return "from-purple-50 via-pink-50 to-white";
      default:
        return "from-gray-50 to-white";
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getBackgroundGradient()} p-4`}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl">
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${getRoleColor()} text-white p-8 rounded-t-3xl`}>
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-white/90">Join our platform and get started</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 m-6 rounded-lg flex items-center gap-2">
            <FaCheckCircle /> {successMessage}
          </div>
        )}

        {/* Role Selection */}
        <div className="p-8 border-b-2 border-gray-200">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Select Your Role</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Student Role */}
            <button
              onClick={() => setSelectedRole("student")}
              className={`p-4 rounded-xl border-2 transition transform hover:scale-105 ${
                selectedRole === "student"
                  ? "border-blue-500 bg-blue-50 shadow-lg"
                  : "border-gray-200 bg-gray-50 hover:border-blue-300"
              }`}
            >
              <FaUserGraduate className={`text-3xl mx-auto mb-2 ${selectedRole === "student" ? "text-blue-500" : "text-gray-400"}`} />
              <div className="font-bold text-gray-800">Student</div>
              <div className="text-xs text-gray-600">Learn & Grow</div>
            </button>

            {/* Teacher Role */}
            <button
              onClick={() => setSelectedRole("teacher")}
              className={`p-4 rounded-xl border-2 transition transform hover:scale-105 ${
                selectedRole === "teacher"
                  ? "border-green-500 bg-green-50 shadow-lg"
                  : "border-gray-200 bg-gray-50 hover:border-green-300"
              }`}
            >
              <FaChalkboardTeacher className={`text-3xl mx-auto mb-2 ${selectedRole === "teacher" ? "text-green-500" : "text-gray-400"}`} />
              <div className="font-bold text-gray-800">Teacher</div>
              <div className="text-xs text-gray-600">Teach & Lead</div>
            </button>

            {/* Admin Role */}
            <button
              onClick={() => setSelectedRole("admin")}
              className={`p-4 rounded-xl border-2 transition transform hover:scale-105 ${
                selectedRole === "admin"
                  ? "border-purple-500 bg-purple-50 shadow-lg"
                  : "border-gray-200 bg-gray-50 hover:border-purple-300"
              }`}
            >
              <FaUserShield className={`text-3xl mx-auto mb-2 ${selectedRole === "admin" ? "text-purple-500" : "text-gray-400"}`} />
              <div className="font-bold text-gray-800">Admin</div>
              <div className="text-xs text-gray-600">Manage & Control</div>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="p-8 space-y-6">
          
          {/* Common Fields */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaUser /> Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.fullName ? "border-red-500 focus:border-red-600 bg-red-50" : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaEnvelope /> Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.email ? "border-red-500 focus:border-red-600 bg-red-50" : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaPhone /> Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.phone ? "border-red-500 focus:border-red-600 bg-red-50" : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaMapMarkerAlt /> Address *
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Your Address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.address ? "border-red-500 focus:border-red-600 bg-red-50" : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaLock /> Password *
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.password ? "border-red-500 focus:border-red-600 bg-red-50" : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaLock /> Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                    errors.confirmPassword ? "border-red-500 focus:border-red-600 bg-red-50" : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Student-Specific Fields */}
          {selectedRole === "student" && (
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-blue-500" /> Academic Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Branch */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaBook /> Branch *
                  </label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.branch ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
                    }`}
                  >
                    <option value="">Select Branch</option>
                    <option value="CSE">Computer Science Engineering (CSE)</option>
                    <option value="ECE">Electronics & Communication Engineering (ECE)</option>
                    <option value="ME">Mechanical Engineering (ME)</option>
                    <option value="CE">Civil Engineering (CE)</option>
                    <option value="EE">Electrical Engineering (EE)</option>
                  </select>
                  {errors.branch && <p className="text-red-600 text-sm mt-1">{errors.branch}</p>}
                </div>

                {/* Semester */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaCalendarAlt /> Semester *
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.semester ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"
                    }`}
                  >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                  {errors.semester && <p className="text-red-600 text-sm mt-1">{errors.semester}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Teacher-Specific Fields */}
          {selectedRole === "teacher" && (
            <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaChalkboardTeacher className="text-green-500" /> Professional Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Employee ID */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaIdBadge /> Employee ID *
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    placeholder="EMP12345"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.employeeId ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-green-500"
                    }`}
                  />
                  {errors.employeeId && <p className="text-red-600 text-sm mt-1">{errors.employeeId}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaBook /> Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g., Mathematics, Physics"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.subject ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-green-500"
                    }`}
                  />
                  {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaBriefcase /> Department *
                  </label>
                  <input
                    type="text"
                    name="department"
                    placeholder="e.g., Science, Engineering"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.department ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-green-500"
                    }`}
                  />
                  {errors.department && <p className="text-red-600 text-sm mt-1">{errors.department}</p>}
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaCalendarAlt /> Years of Experience *
                  </label>
                  <input
                    type="number"
                    name="experience"
                    placeholder="5"
                    min="0"
                    value={formData.experience}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.experience ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-green-500"
                    }`}
                  />
                  {errors.experience && <p className="text-red-600 text-sm mt-1">{errors.experience}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Admin-Specific Fields */}
          {selectedRole === "admin" && (
            <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaUserShield className="text-purple-500" /> Admin Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Admin ID */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaIdBadge /> Admin ID *
                  </label>
                  <input
                    type="text"
                    name="adminId"
                    placeholder="ADM12345"
                    value={formData.adminId}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.adminId ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-purple-500"
                    }`}
                  />
                  {errors.adminId && <p className="text-red-600 text-sm mt-1">{errors.adminId}</p>}
                </div>

                {/* Role Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaUserShield /> Role Type *
                  </label>
                  <select
                    name="roleType"
                    value={formData.roleType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.roleType ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-purple-500"
                    }`}
                  >
                    <option value="super-admin">Super Admin (Full Access)</option>
                    <option value="sub-admin">Sub Admin (Limited Access)</option>
                  </select>
                  {errors.roleType && <p className="text-red-600 text-sm mt-1">{errors.roleType}</p>}
                </div>

                {/* Access Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaLock /> Access Level *
                  </label>
                  <select
                    name="accessLevel"
                    value={formData.accessLevel}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.accessLevel ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-purple-500"
                    }`}
                  >
                    <option value="basic">Basic (Read Only)</option>
                    <option value="advanced">Advanced (Read & Write)</option>
                    <option value="full">Full Access (All Operations)</option>
                  </select>
                  {errors.accessLevel && <p className="text-red-600 text-sm mt-1">{errors.accessLevel}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-bold text-white transition transform hover:scale-105 bg-gradient-to-r ${getRoleColor()} shadow-lg`}
          >
            Create {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Account
          </button>
        </form>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 rounded-b-3xl border-t-2 border-gray-200 text-center">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link to="/" className="font-bold text-blue-600 hover:text-blue-800">
              Return to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
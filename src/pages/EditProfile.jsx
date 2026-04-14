import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaEdit,
  FaSave,
  FaTimes,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaCamera
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { user: authUser } = useAuth();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        name: storedUser.name || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        address: storedUser.address || "",
        branch: storedUser.branch || "",
        semester: storedUser.semester || "",
        position: storedUser.position || "",
        department: storedUser.department || "",
        bio: storedUser.bio || "",
      });
    }
  }, []);

  if (!user) {
    return <div className="text-center mt-10 text-lg">No user data found</div>;
  }

  // Get Role Icon
  const getRoleIcon = () => {
    if (user.role === "admin") return <FaUserShield />;
    if (user.role === "teacher") return <FaChalkboardTeacher />;
    return <FaUserGraduate />;
  };

  // Get Role Color
  const getRoleColor = () => {
    if (user.role === "admin") return "from-red-500 to-pink-500";
    if (user.role === "teacher") return "from-green-500 to-emerald-500";
    return "from-blue-500 to-cyan-500";
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Save Changes
  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Cancel Editing
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      branch: user.branch || "",
      semester: user.semester || "",
      position: user.position || "",
      department: user.department || "",
      bio: user.bio || "",
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl">
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${getRoleColor()} p-8 rounded-t-3xl text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`}
                alt="avatar"
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <FaUser /> {user.name}
                </h1>
                <p className="text-white/90 flex items-center gap-2 mt-1">
                  {getRoleIcon()} {user.role.toUpperCase()}
                </p>
              </div>
            </div>
            <button
              onClick={() => (isEditing ? handleCancel() : setIsEditing(!isEditing))}
              className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 flex items-center gap-2 transition"
            >
              {isEditing ? <><FaTimes /> Cancel</> : <><FaEdit /> Edit</>}
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 m-6 rounded">
            ✓ {successMessage}
          </div>
        )}

        {/* Content */}
        <div className="p-8 space-y-6">
          
          {/* Basic Information */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FaUser className="text-blue-500" /> Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition ${
                    isEditing
                      ? "border-blue-400 focus:border-blue-600 bg-white"
                      : "border-gray-300 bg-gray-50 text-gray-600"
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition ${
                    isEditing
                      ? "border-blue-400 focus:border-blue-600 bg-white"
                      : "border-gray-300 bg-gray-50 text-gray-600"
                  }`}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  <FaPhone className="inline mr-1" /> Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition ${
                    isEditing
                      ? "border-blue-400 focus:border-blue-600 bg-white"
                      : "border-gray-300 bg-gray-50 text-gray-600"
                  }`}
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  <FaMapMarkerAlt className="inline mr-1" /> Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition ${
                    isEditing
                      ? "border-blue-400 focus:border-blue-600 bg-white"
                      : "border-gray-300 bg-gray-50 text-gray-600"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Role-Specific Information */}
          {user.role === "student" && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-purple-500" /> Academic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Branch *</label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition ${
                      isEditing
                        ? "border-blue-400 focus:border-blue-600 bg-white"
                        : "border-gray-300 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Semester *</label>
                  <input
                    type="number"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition ${
                      isEditing
                        ? "border-blue-400 focus:border-blue-600 bg-white"
                        : "border-gray-300 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {(user.role === "teacher" || user.role === "admin") && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaBriefcase className="text-green-500" /> Professional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {user.role === "teacher" ? "Subject/Department" : "Department"}
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition ${
                      isEditing
                        ? "border-blue-400 focus:border-blue-600 bg-white"
                        : "border-gray-300 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Position/Designation</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition ${
                      isEditing
                        ? "border-blue-400 focus:border-blue-600 bg-white"
                        : "border-gray-300 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bio */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About You</h2>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Write a short bio about yourself..."
              rows="4"
              className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition ${
                isEditing
                  ? "border-blue-400 focus:border-blue-600 bg-white"
                  : "border-gray-300 bg-gray-50 text-gray-600"
              }`}
            />
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 pt-4 border-t-2">
              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-600 transition"
              >
                <FaSave /> Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-400 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-500 transition"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          )}

          {/* Back Button */}
          <div className="pt-4 border-t-2">
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-gray-600 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
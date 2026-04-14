  import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser, FaLock, FaEye, FaEyeSlash,
  FaUserShield, FaChalkboardTeacher, FaUserGraduate,
  FaSpinner, FaExclamationTriangle, FaPhone, FaMapMarkerAlt, FaBook
} from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [isSignup, setIsSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    role: "student",
    name: "",
    phoneNumber: "",
    address: "",
    branch: "",
    semester: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // ✅ Demo Users
  const usersDemo = [
    { email: "admin@gmail.com", password: "admin123", role: "admin" },
    { email: "teacher@gmail.com", password: "teacher123", role: "teacher" },
    { email: "student@gmail.com", password: "student123", role: "student" },
  ];

  // Signup input
  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  // Create account
  const handleCreateAccount = () => {
    setError("");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      (u) => u.email === signupData.email
    );

    if (userExists) {
      setError("User already exists!");
      return;
    }

    users.push(signupData);
    localStorage.setItem("users", JSON.stringify(users));

    setShowSuccessPopup(true);
  };

  // 🔐 LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = [...users, ...usersDemo];

    const foundUser = users.find(
      (u) =>
        u.email === email &&
        u.password === password &&
        u.role === role
    );

    if (!foundUser) {
      setError("Invalid email, password, or role");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // ✅ ADD FULL USER DATA HERE
      const userData = {
        id: 
          foundUser.role === "admin"
            ? "ADM001"
            : foundUser.role === "teacher"
            ? "TCH001"
            : "STU001",
        email: foundUser.email,
        role: foundUser.role,

        // 👇 Dynamic name based on role
        name:
          foundUser.role === "admin"
            ? "Admin User"
            : foundUser.role === "teacher"
            ? "Teacher User"
            : "Student User",

        // 👇 Only for students
        branch: foundUser.role === "student" ? "CSE" : "",
        semester: foundUser.role === "student" ? 3 : ""
      };

      // ✅ SAVE USER
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/dashboard");
    }, 1000);
  };

  // 🌐 Google Login
  const handleGoogleLogin = () => {
    const googleUser = {
      id: "STU001",
      email: "googleuser@gmail.com",
      role: "student",
      name: "Google User",
      branch: "CSE",
      semester: 3
    };

    localStorage.setItem("user", JSON.stringify(googleUser));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 text-center max-w-md shadow-2xl animate-bounce">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Account Created!</h3>
            <p className="text-gray-700 mb-6">
              Your account has been successfully created. You can now login with your credentials.
            </p>
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                setIsSignup(false);
                setSignupData({
                  email: "",
                  password: "",
                  role: "student",
                  name: "",
                  phoneNumber: "",
                  address: "",
                  branch: "",
                  semester: ""
                });
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleLogin}
        className={`bg-white/20 backdrop-blur-xl p-8 rounded-3xl w-full max-w-md shadow-xl space-y-5 ${
          isSignup ? "max-h-[90vh] overflow-y-auto" : ""
        }`}
      >
        <h2 className="text-2xl text-white text-center font-bold">
          {isSignup ? "Create Account" : "Login System"}
        </h2>

        {/* Email */}
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-white" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full pl-10 py-3 rounded-xl"
            value={isSignup ? signupData.email : email}
            onChange={(e) =>
              isSignup
                ? handleSignupChange(e)
                : setEmail(e.target.value)
            }
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-white" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 rounded-xl"
            value={isSignup ? signupData.password : password}
            onChange={(e) =>
              isSignup
                ? handleSignupChange(e)
                : setPassword(e.target.value)
            }
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Additional Fields - Only show in Signup */}
        {isSignup && (
          <>
            {/* Full Name */}
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-white" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full pl-10 py-3 rounded-xl"
                value={signupData.name}
                onChange={handleSignupChange}
              />
            </div>

            {/* Phone Number */}
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-white" />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                className="w-full pl-10 py-3 rounded-xl"
                value={signupData.phoneNumber}
                onChange={handleSignupChange}
              />
            </div>

            {/* Address */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-white" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full pl-10 py-3 rounded-xl"
                value={signupData.address}
                onChange={handleSignupChange}
              />
            </div>

            {/* Branch - Only for students */}
            {signupData.role === "student" && (
              <div className="relative">
                <FaBook className="absolute left-3 top-3 text-white" />
                <select
                  name="branch"
                  className="w-full pl-10 py-3 rounded-xl"
                  value={signupData.branch}
                  onChange={handleSignupChange}
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">Computer Science (CSE)</option>
                  <option value="ECE">Electronics (ECE)</option>
                  <option value="ME">Mechanical (ME)</option>
                  <option value="CE">Civil (CE)</option>
                </select>
              </div>
            )}

            {/* Semester - Only for students */}
            {signupData.role === "student" && (
              <div className="relative">
                <FaBook className="absolute left-3 top-3 text-white" />
                <select
                  name="semester"
                  className="w-full pl-10 py-3 rounded-xl"
                  value={signupData.semester}
                  onChange={handleSignupChange}
                >
                  <option value="">Select Semester</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                </select>
              </div>
            )}
          </>
        )}

        {/* Role */}
        <div className="flex justify-between gap-3">
          {["admin", "teacher", "student"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() =>
                isSignup
                  ? setSignupData({ ...signupData, role: r })
                  : setRole(r)
              }
              className={`flex-1 p-3 rounded-xl ${
                (isSignup ? signupData.role : role) === r
                  ? "bg-purple-600 text-white"
                  : "bg-white"
              }`}
            >
              {r === "admin" && <FaUserShield className="mx-auto" />}
              {r === "teacher" && <FaChalkboardTeacher className="mx-auto" />}
              {r === "student" && <FaUserGraduate className="mx-auto" />}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 flex items-center gap-2">
            <FaExclamationTriangle /> {error}
          </p>
        )}

        {/* Button */}
        <button
          type={isSignup ? "button" : "submit"}
          onClick={isSignup ? handleCreateAccount : null}
          className="w-full bg-black text-white py-3 rounded-xl"
        >
          {isSignup
            ? "Create Account"
            : loading
            ? <FaSpinner className="animate-spin mx-auto" />
            : "Login"}
        </button>

        {/* Toggle */}
        <p
          className="text-white text-center cursor-pointer"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Create Account"}
        </p>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded-xl"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
}
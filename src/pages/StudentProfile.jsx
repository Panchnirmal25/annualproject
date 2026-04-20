import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaUserGraduate, FaEnvelope, FaBook, FaCheckCircle, FaExclamationTriangle, FaDownload, FaCamera, FaFilePdf, FaChartBar, FaEdit, FaPhone, FaMapMarkerAlt, FaCalendar, FaTrophy, FaUsers, FaUserShield, FaChalkboardTeacher, FaBriefcase, FaClipboardList, FaLock, FaIdBadge, FaGraduationCap } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

// Example Student Data
const exampleStudent = {
  id: "STU001",
  role: "student",
  name: "Rahul Sharma",
  photo: "https://ui-avatars.com/api/?name=Rahul+Sharma",
  email: "rahul.sharma@example.com",
  phone: "+91-9876543210",
  address: "Delhi, India",
  branch: "CSE",
  enrollmentDate: "2022-07-15",
  overall_percentage: 81.5,
  semesters: [
    {
      semester_number: 1,
      resultType: "Regular",
      subjects: [
        { name: "Mathematics-I", marks: 85, credits: 4, grade: "A" },
        { name: "Physics", marks: 78, credits: 4, grade: "B+" },
        { name: "Chemistry", marks: 72, credits: 4, grade: "B" },
        { name: "Programming Fundamentals", marks: 88, credits: 3, grade: "A" },
      ],
      totalMarks: 323,
      totalCredits: 15,
      percentage: 80.75,
      cgpa: 3.7,
      backlogSubjects: [],
    },
    {
      semester_number: 2,
      resultType: "Regular",
      subjects: [
        { name: "Mathematics-II", marks: 82, credits: 4, grade: "A" },
        { name: "Data Structures", marks: 90, credits: 4, grade: "A+" },
        { name: "Database Systems", marks: 85, credits: 4, grade: "A" },
        { name: "Web Development Basics", marks: 88, credits: 3, grade: "A" },
      ],
      totalMarks: 345,
      totalCredits: 15,
      percentage: 86.25,
      cgpa: 3.85,
      backlogSubjects: [],
    },
    {
      semester_number: 3,
      resultType: "Regular",
      subjects: [
        { name: "Discrete Mathematics", marks: 80, credits: 4, grade: "A" },
        { name: "Algorithms", marks: 84, credits: 4, grade: "A" },
        { name: "Operating Systems", marks: 82, credits: 4, grade: "A" },
        { name: "Web Development Advanced", marks: 79, credits: 3, grade: "B+" },
      ],
      totalMarks: 325,
      totalCredits: 15,
      percentage: 81.25,
      cgpa: 3.8,
      backlogSubjects: [],
    },
  ],
  achievements: [
    { title: "Dean's List", date: "Semester 1", icon: "🏆" },
    { title: "Best Project Award", date: "Semester 2", icon: "⭐" },
    { title: "Programming Contest Winner", date: "Semester 3", icon: "🥇" },
  ],
  resultPhotos: [
    { url: "https://via.placeholder.com/150", type: "image" },
  ],
};

// Example Teacher Data
const exampleTeacher = {
  id: "TCH001",
  name: "Dr. Priya Verma",
  role: "teacher",
  photo: "https://ui-avatars.com/api/?name=Dr+Priya+Verma",
  email: "priya.verma@college.edu",
  phone: "+91-9876543211",
  address: "Bangalore, India",
  department: "Computer Science",
  subject: "Data Structures & Algorithms",
  employeeId: "EMP-2020-001",
  experience: 8,
  joiningDate: "2016-07-20",
  qualifications: ["B.Tech CSE", "M.Tech Computer Science", "PhD in Computer Science"],
  studentsTaught: 450,
  classRating: 4.8,
  publications: 12,
  achievements: [
    { title: "Best Teacher Award", date: "2023", icon: "🏆" },
    { title: "Research Excellence", date: "2022", icon: "📚" },
    { title: "Innovation in Teaching", date: "2021", icon: "💡" },
  ],
};

// Example Admin Data
const exampleAdmin = {
  id: "ADM001",
  name: "Admin User",
  role: "admin",
  photo: "https://ui-avatars.com/api/?name=Admin+User",
  email: "admin@college.edu",
  phone: "+91-9876543212",
  address: "Hyderabad, India",
  adminId: "ADM-2018-001",
  roletype: "Super Admin",
  accessLevel: "Full Access",
  joiningDate: "2018-03-15",
  yearsOfService: 6,
  department: "Administration",
  totalUsersManaged: 1250,
  systemUptime: "99.8%",
  achievements: [
    { title: "System Excellence", date: "2023", icon: "⚙️" },
    { title: "Data Security Award", date: "2022", icon: "🔒" },
    { title: "Operational Efficiency", date: "2021", icon: "✅" },
  ],
};

function getGradeColor(grade) {
  const colors = {
    "A+": "bg-green-600",
    "A": "bg-green-500",
    "B+": "bg-blue-400",
    "B": "bg-blue-500",
    "C+": "bg-yellow-400",
    "C": "bg-yellow-500",
    "D": "bg-orange-500",
    "F": "bg-red-500",
  };
  return colors[grade] || "bg-gray-500";
}

function getPerformanceStatus(percentage) {
  if (percentage >= 85) return { label: "Excellent", color: "bg-green-500" };
  if (percentage >= 70) return { label: "Good", color: "bg-blue-500" };
  if (percentage >= 55) return { label: "Average", color: "bg-yellow-500" };
  return { label: "Weak", color: "bg-red-500" };
}

function getAIPrediction(percentage, resultType) {
  if (resultType === "Backlog") return { text: "Risk of failing (Backlog)", color: "bg-red-600" };
  if (percentage >= 85) return { text: "High chance of passing", color: "bg-green-500" };
  if (percentage >= 70) return { text: "Good performance expected", color: "bg-blue-500" };
  if (percentage >= 55) return { text: "Needs improvement", color: "bg-yellow-500" };
  return { text: "Risk of failing", color: "bg-red-500" };
}

export default function StudentProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [showModal, setShowModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Determine which profile to show based on user role
  let profile = location.state?.student;
  
  if (!profile) {
    if (user?.role === 'student') {
      profile = exampleStudent;
    } else if (user?.role === 'teacher') {
      profile = exampleTeacher;
    } else if (user?.role === 'admin') {
      profile = exampleAdmin;
    }
  }

  if (!profile) {
    return <div className="text-center mt-10 text-xl">No profile data available</div>;
  }

  // Access Control: Students can only view their own profile
  useEffect(() => {
    // Skip check while loading
    if (!user) return;
    
    // If student and trying to view different student's profile, redirect
    if (user.role === 'student' && profile && profile.role === 'student' && profile.id !== user.id) {
      navigate("/dashboard");
      return;
    }
    
    // Teachers and admins can view any profile
    // Students can only view their own (which will have same role and id)
  }, [user, profile, navigate]);

  // Set initial semester to the latest one for student profiles
  useEffect(() => {
    if (profile?.role === 'student' && selectedSemester === null && profile.semesters?.length > 0) {
      setSelectedSemester(profile.semesters[profile.semesters.length - 1]);
    }
  }, [profile?.semesters, selectedSemester]);

  const currentSemester = selectedSemester || profile?.semesters?.[0];
  const performance = currentSemester ? getPerformanceStatus(currentSemester.percentage) : null;
  const aiPrediction = currentSemester ? getAIPrediction(currentSemester.percentage, currentSemester.resultType) : null;
  
  const canEdit = user && (user.role === 'admin' || user.role === 'teacher' || (user.role === 'student' && profile.id === user.id));

  // ================ STUDENT PROFILE VIEW ================
  if (profile?.role === 'student' || user?.role === 'student') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 p-8">
        <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 flex items-center gap-2">
          ← Back
        </button>

        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <img src={profile.photo} alt="avatar" className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-lg" />
                <div>
                  <h1 className="text-4xl font-bold flex items-center gap-2 mb-2">
                    <FaUserGraduate className="text-blue-500" /> {profile.name}
                  </h1>
                  <div className="space-y-1 text-gray-700">
                    <div className="flex items-center gap-2"><FaEnvelope className="text-blue-500" /> {profile.email}</div>
                    <div className="flex items-center gap-2"><FaPhone className="text-green-500" /> {profile.phone}</div>
                    <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-500" /> {profile.address}</div>
                    <div className="flex items-center gap-2"><FaCalendar className="text-purple-500" /> Joined: {new Date(profile.enrollmentDate).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2"><FaBook className="text-indigo-500" /> <strong>Branch:</strong> {profile.branch} | <strong>Overall: {profile.overall_percentage}%</strong></div>
                  </div>
                </div>
              </div>
              {canEdit && (
                <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-cyan-500 hover:to-blue-500 flex items-center gap-2">
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Semester Selector */}
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Academic History</h3>
            <div className="flex gap-2 flex-wrap">
              {profile.semesters?.map((sem) => (
                <button
                  key={sem.semester_number}
                  onClick={() => setSelectedSemester(sem)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    selectedSemester?.semester_number === sem.semester_number
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Semester {sem.semester_number}
                </button>
              ))}
            </div>
          </div>

          {currentSemester && (
            <>
              {/* Semester Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/80 backdrop-blur rounded-xl shadow-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2"><FaChartBar /> Percentage</div>
                  <div className="text-3xl font-bold text-blue-600">{currentSemester.percentage}%</div>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold text-white ${performance.color}`}>{performance.label}</span>
                </div>
                <div className="bg-white/80 backdrop-blur rounded-xl shadow-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2"><FaTrophy /> CGPA</div>
                  <div className="text-3xl font-bold text-purple-600">{currentSemester.cgpa}</div>
                </div>
                <div className="bg-white/80 backdrop-blur rounded-xl shadow-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2"><FaBook /> Total Credits</div>
                  <div className="text-3xl font-bold text-green-600">{currentSemester.totalCredits}</div>
                </div>
                <div className="bg-white/80 backdrop-blur rounded-xl shadow-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2"><FaCheckCircle /> AI Prediction</div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${aiPrediction.color}`}>{aiPrediction.text}</span>
                </div>
              </div>

              {/* Subjects Table */}
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaBook className="text-purple-500" /> Subjects - Semester {currentSemester.semester_number}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-100 to-cyan-100 border-b-2 border-blue-300">
                        <th className="p-3 text-left font-semibold">Subject Name</th>
                        <th className="p-3 text-center font-semibold">Marks</th>
                        <th className="p-3 text-center font-semibold">Grade</th>
                        <th className="p-3 text-center font-semibold">Credits</th>
                        <th className="p-3 text-center font-semibold">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSemester.subjects?.map((subject, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="p-3 font-medium">{subject.name}</td>
                          <td className="p-3 text-center font-semibold">{subject.marks}/100</td>
                          <td className="p-3 text-center">
                            <span className={`px-3 py-1 rounded-full text-white font-bold text-sm ${getGradeColor(subject.grade)}`}>
                              {subject.grade}
                            </span>
                          </td>
                          <td className="p-3 text-center">{subject.credits}</td>
                          <td className="p-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  subject.marks >= 85
                                    ? "bg-green-500"
                                    : subject.marks >= 70
                                    ? "bg-blue-500"
                                    : subject.marks >= 55
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${subject.marks}%` }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {currentSemester.backlogSubjects?.length > 0 && (
                <div className="bg-red-50 border-2 border-red-300 rounded-2xl shadow-lg p-6 mb-6">
                  <h3 className="text-xl font-bold mb-3 text-red-600 flex items-center gap-2"><FaExclamationTriangle /> Backlog Subjects</h3>
                  <ul className="space-y-2">
                    {currentSemester.backlogSubjects.map((subj, idx) => (
                      <li key={idx} className="text-red-700 font-medium">• {subj}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Achievements */}
          {profile.achievements?.length > 0 && (
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6 mb-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaTrophy className="text-yellow-500" /> Achievements & Awards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profile.achievements.map((achievement, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-200 text-center">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h4 className="font-bold text-lg">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Download Report */}
          <div className="flex justify-end gap-3 mb-6">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow hover:from-cyan-500 hover:to-blue-500 transition font-bold">
              <FaDownload /> Download Report Card
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================ TEACHER PROFILE VIEW ================
  if (profile?.role === 'teacher' || user?.role === 'teacher') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-8">
        <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 flex items-center gap-2">
          ← Back
        </button>

        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <img src={profile.photo} alt="avatar" className="w-28 h-28 rounded-full border-4 border-green-400 shadow-lg" />
                <div>
                  <h1 className="text-4xl font-bold flex items-center gap-2 mb-2">
                    <FaChalkboardTeacher className="text-green-500" /> {profile.name}
                  </h1>
                  <div className="space-y-1 text-gray-700">
                    <div className="flex items-center gap-2"><FaEnvelope className="text-green-500" /> {profile.email}</div>
                    <div className="flex items-center gap-2"><FaPhone className="text-blue-500" /> {profile.phone}</div>
                    <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-500" /> {profile.address}</div>
                    <div className="flex items-center gap-2"><FaCalendar className="text-purple-500" /> Joined: {new Date(profile.joiningDate).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2"><FaBriefcase className="text-indigo-500" /> <strong>Employee ID:</strong> {profile.employeeId}</div>
                  </div>
                </div>
              </div>
              {canEdit && (
                <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-emerald-500 hover:to-green-500 flex items-center gap-2">
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Professional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaBriefcase className="text-green-500" /> Professional Details</h3>
              <div className="space-y-3">
                <div><span className="font-semibold text-gray-700">Department:</span> {profile.department}</div>
                <div><span className="font-semibold text-gray-700">Subject:</span> {profile.subject}</div>
                <div><span className="font-semibold text-gray-700">Experience:</span> {profile.experience} years</div>
                <div><span className="font-semibold text-gray-700">Employee ID:</span> {profile.employeeId}</div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaUsers className="text-green-500" /> Teaching Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Students Taught:</span>
                  <span className="text-2xl font-bold text-green-600">{profile.studentsTaught}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Class Rating:</span>
                  <span className="text-2xl font-bold text-yellow-500">⭐ {profile.classRating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Publications:</span>
                  <span className="text-2xl font-bold text-blue-600">{profile.publications}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaGraduationCap className="text-green-500" /> Qualifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {profile.qualifications?.map((qual, idx) => (
                <div key={idx} className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                  <p className="font-semibold text-gray-800">{qual}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {profile.achievements?.length > 0 && (
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6 mb-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaTrophy className="text-yellow-500" /> Achievements & Awards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profile.achievements.map((achievement, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-200 text-center">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h4 className="font-bold text-lg">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ================ ADMIN PROFILE VIEW ================
  if (profile?.role === 'admin' || user?.role === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 p-8">
        <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 flex items-center gap-2">
          ← Back
        </button>

        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <img src={profile.photo} alt="avatar" className="w-28 h-28 rounded-full border-4 border-purple-400 shadow-lg" />
                <div>
                  <h1 className="text-4xl font-bold flex items-center gap-2 mb-2">
                    <FaUserShield className="text-purple-500" /> {profile.name}
                  </h1>
                  <div className="space-y-1 text-gray-700">
                    <div className="flex items-center gap-2"><FaEnvelope className="text-purple-500" /> {profile.email}</div>
                    <div className="flex items-center gap-2"><FaPhone className="text-blue-500" /> {profile.phone}</div>
                    <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-500" /> {profile.address}</div>
                    <div className="flex items-center gap-2"><FaCalendar className="text-purple-500" /> Joined: {new Date(profile.joiningDate).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2"><FaIdBadge className="text-indigo-500" /> <strong>Admin ID:</strong> {profile.adminId}</div>
                  </div>
                </div>
              </div>
              {canEdit && (
                <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-pink-500 hover:to-purple-500 flex items-center gap-2">
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Admin Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-xl p-6 border-2 border-purple-200">
              <div className="text-gray-700 mb-2 font-semibold">Admin Role Type</div>
              <div className="text-3xl font-bold text-purple-600">{profile.roletype}</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-xl p-6 border-2 border-pink-200">
              <div className="text-gray-700 mb-2 font-semibold">Access Level</div>
              <div className="text-3xl font-bold text-pink-600">{profile.accessLevel}</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-xl p-6 border-2 border-red-200">
              <div className="text-gray-700 mb-2 font-semibold">Years of Service</div>
              <div className="text-3xl font-bold text-red-600">{profile.yearsOfService} years</div>
            </div>
          </div>

          {/* System Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaUsers className="text-purple-500" /> System Management</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Total Users Managed:</span>
                  <span className="text-2xl font-bold text-purple-600">{profile.totalUsersManaged}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">System Uptime:</span>
                  <span className="text-2xl font-bold text-green-600">{profile.systemUptime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Department:</span>
                  <span className="text-lg font-semibold text-gray-800">{profile.department}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaLock className="text-purple-500" /> Security & Access</h3>
              <div className="space-y-3">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <span className="font-semibold text-gray-700">Role Type:</span> {profile.roletype}
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <span className="font-semibold text-gray-700">Access Level:</span> {profile.accessLevel}
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <span className="font-semibold text-gray-700">Admin ID:</span> {profile.adminId}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          {profile.achievements?.length > 0 && (
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6 mb-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaTrophy className="text-yellow-500" /> Achievements & Awards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profile.achievements.map((achievement, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-200 text-center">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h4 className="font-bold text-lg">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <div className="text-center mt-10 text-xl">Unable to determine profile type</div>;
}

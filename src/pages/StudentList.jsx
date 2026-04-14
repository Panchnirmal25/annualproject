
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useStudents } from "../context/StudentContext";


export default function StudentList() {
  const navigate = useNavigate();
  const { students, deleteStudent } = useStudents();
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);


  // Gather all unique subjects from all students
  const allSubjects = useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.subjects && Array.isArray(s.subjects)) {
        s.subjects.forEach((subj) => set.add(subj));
      }
    });
    return Array.from(set);
  }, [students]);

  // Calculate performance based on average of all subject marks (if available)
  const getPerformance = (student) => {
    let avg = 0;
    if (student.subjects && student.subjects.length > 0 && student.marks) {
      // If marks object exists, average all subject marks
      const marksArr = allSubjects.map((subj) => Number(student.marks?.[subj] ?? 0));
      avg = marksArr.reduce((a, b) => a + b, 0) / marksArr.length;
    } else if (student.internalMarks) {
      avg = Number(student.internalMarks);
    }
    if (avg >= 85) return { label: "Excellent", color: "bg-green-500" };
    if (avg >= 70) return { label: "Good", color: "bg-yellow-500" };
    return { label: "Weak", color: "bg-red-500" };
  };


  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(search.toLowerCase()) &&
      (branchFilter === "All" || student.branch === branchFilter)
    );
  });


  const totalStudents = students.length;
  const topStudents = students.filter((s) => getPerformance(s).label === "Excellent").length;
  const weakStudents = students.filter((s) => getPerformance(s).label === "Weak").length;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-10">

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-gray-500">Total Students</h3>
          <p className="text-3xl font-bold">{totalStudents}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-gray-500">Top Performers</h3>
          <p className="text-3xl font-bold text-green-600">{topStudents}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-gray-500">Weak Students</h3>
          <p className="text-3xl font-bold text-red-600">{weakStudents}</p>
        </div>

      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Student Records
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">

        <input
          type="text"
          placeholder="Search student..."
          className="p-3 border rounded-lg shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-3 border rounded-lg"
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
        >
          <option value="All">All Branches</option>
          <option value="CSE">CSE</option>
          <option value="CE">CE</option>
          <option value="IT">IT</option>
        </select>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3">Avatar</th>
              <th className="p-3">Name</th>
              <th className="p-3">Branch</th>
              <th className="p-3">Semester</th>
              {/* Dynamic subject columns */}
              {allSubjects.map((subj) => (
                <th key={subj} className="p-3">{subj}</th>
              ))}
              <th className="p-3">Performance</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => {
              const performance = getPerformance(student);
              return (
                <tr key={student.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${student.name}`}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-3 font-medium">{student.name}</td>
                  <td className="p-3">{student.branch}</td>
                  <td className="p-3">{student.semester}</td>
                  {/* Show marks for each subject */}
                  {allSubjects.map((subj) => (
                    <td key={subj} className="p-3">
                      {student.marks && student.marks[subj] !== undefined
                        ? student.marks[subj]
                        : student.subjects && student.subjects.includes(subj) && student.internalMarks
                        ? student.internalMarks
                        : "-"}
                    </td>
                  ))}
                  <td className="p-3">
                    <span className={`text-white px-3 py-1 rounded-full ${performance.color}`}>
                      {performance.label}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => navigate("/profile", { state: { student } })}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
                      title="View Profile"
                    >
                      <FaUser /> Profile
                    </button>
                    <button
                      onClick={() => deleteStudent(student.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">

            <h2 className="text-xl font-bold mb-4">Student Profile</h2>

            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Branch:</strong> {selectedStudent.branch}</p>
            <p><strong>Semester:</strong> {selectedStudent.semester}</p>
            <p><strong>Math:</strong> {selectedStudent.math}</p>
            <p><strong>Science:</strong> {selectedStudent.science}</p>

            <button
              onClick={() => setSelectedStudent(null)}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
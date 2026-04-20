import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Prediction from "./pages/Prediction";
import Branches from "./pages/Branches";
import Subjects from "./pages/Subjects";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import StudentProfile from "./pages/StudentProfile";
import EditProfile from "./pages/EditProfile";
import Students from "./pages/Students";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* keep student route for compatibility, but redirect to main dashboard */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/students"
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
                  <Students />
                </ProtectedRoute>
              }
            />

            <Route
              path="/branches"
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                  <Branches />
                </ProtectedRoute>
              }
            />

            <Route
              path="/subjects"
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                  <Subjects />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                  <Analytics />
                </ProtectedRoute>
              }
            />

            <Route
              path="/prediction"
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
                  <Prediction />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["student", "admin", "teacher"]}>
                  <StudentProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute allowedRoles={["student", "admin", "teacher"]}>
                  <EditProfile />
                </ProtectedRoute>
              }
            />

            <Route path="/settings" element={<ProtectedRoute allowedRoles={["student", "admin", "teacher"]}><Settings /></ProtectedRoute>} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
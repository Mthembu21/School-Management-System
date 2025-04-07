import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/admin/Dashboard';
import TeacherDashboard from './pages/teacher/Dashboard';
import StudentDashboard from './pages/student/Dashboard';
import Login from './pages/Login';
import Users from './pages/admin/Users';
import Classes from './pages/admin/Classes';
import Timetable from './pages/admin/Timetable';
import Announcements from './pages/admin/Announcements';
import Settings from './pages/admin/Settings';
import { useAuthStore } from './stores/authStore';

function App() {
  const { isAuthenticated, userRole } = useAuthStore();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/classes" element={<Classes />} />
        <Route path="/admin/timetable" element={<Timetable />} />
        <Route path="/admin/announcements" element={<Announcements />} />
        <Route path="/admin/settings" element={<Settings />} />
        
        {/* Teacher Routes */}
        <Route path="/teacher/*" element={<TeacherDashboard />} />
        
        {/* Student Routes */}
        <Route path="/student/*" element={<StudentDashboard />} />
        
        <Route
          path="/"
          element={
            <Navigate to={`/${userRole}`} replace />
          }
        />
      </Routes>
    </>
  );
}

export default App

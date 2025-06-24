import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { Users, BookOpen, Calendar, Bell, TrendingUp, School, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export default function AdminDashboard() {
  const { schoolInfo } = useAuthStore();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 pl-64">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome to {schoolInfo?.name}</h1>
              <p className="mt-1 text-gray-600">Here's what's happening in your school today</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Announcement
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-semibold text-gray-900">1,234</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-green-50 rounded-lg">
                  <School className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                  <p className="text-2xl font-semibold text-gray-900">86</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Classes</p>
                  <p className="text-2xl font-semibold text-gray-900">42</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">95%</p>
                </div>
              </div>
            </div>
          </div>

          {/* School Info Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-lg overflow-hidden">
                <img src={schoolInfo?.logo} alt="School logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">{schoolInfo?.name}</h2>
                <div className="mt-2 space-y-1 text-gray-600">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {schoolInfo?.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {schoolInfo?.phone}
                  </p>
                  {schoolInfo?.website && (
                    <p className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {schoolInfo.website}
                    </p>
                  )}
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {schoolInfo?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Announcements</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Bell className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">School Assembly Update</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Monthly assembly scheduled for next Monday at 8:00 AM.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/admin/users" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <Users className="h-6 w-6 text-blue-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Manage Users</h3>
                  <p className="text-sm text-gray-600 mt-1">Add or update user accounts</p>
                </Link>
                <Link to="/admin/timetable" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <Calendar className="h-6 w-6 text-green-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Schedule Classes</h3>
                  <p className="text-sm text-gray-600 mt-1">Manage class timetables</p>
                </Link>
                <Link to="/admin/classes" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <BookOpen className="h-6 w-6 text-purple-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Manage Classes</h3>
                  <p className="text-sm text-gray-600 mt-1">Update class information</p>
                </Link>
                <Link to="/admin/announcements" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <Bell className="h-6 w-6 text-yellow-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Announcements</h3>
                  <p className="text-sm text-gray-600 mt-1">Post new announcements</p>
                </Link>
                <Link to="/admin/communication" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <Mail className="h-6 w-6 text-indigo-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Send Communication</h3>
                  <p className="text-sm text-gray-600 mt-1">Send messages to parents</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Routes>
          {/* Add routes for admin features */}
        </Routes>
      </div>
    </div>
  );
}

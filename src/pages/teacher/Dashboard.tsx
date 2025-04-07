import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { BookOpen, Users, Clock, Calendar, Bell } from 'lucide-react';

export default function TeacherDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 pl-64">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, Teacher</h1>
              <p className="mt-1 text-gray-600">Your teaching schedule for today</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Assignment
            </button>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="ml-2 text-sm font-medium text-gray-600">9:00 AM - 10:30 AM</span>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Grade 10
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900">Mathematics</h3>
                  <p className="text-sm text-gray-600 mt-1">Room 301</p>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>32 students</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions and Announcements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <BookOpen className="h-6 w-6 text-blue-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Assignments</h3>
                  <p className="text-sm text-gray-600 mt-1">Create and grade assignments</p>
                </button>
                <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <Users className="h-6 w-6 text-green-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Attendance</h3>
                  <p className="text-sm text-gray-600 mt-1">Mark class attendance</p>
                </button>
                <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <Calendar className="h-6 w-6 text-purple-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Schedule</h3>
                  <p className="text-sm text-gray-600 mt-1">View your timetable</p>
                </button>
                <button className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                  <Bell className="h-6 w-6 text-yellow-600 mb-2" />
                  <h3 className="font-medium text-gray-900">Announcements</h3>
                  <p className="text-sm text-gray-600 mt-1">Post class announcements</p>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Assignment Submitted</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        15 students submitted the Math homework
                      </p>
                      <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Routes>
          {/* Add routes for teacher features */}
        </Routes>
      </div>
    </div>
  );
}
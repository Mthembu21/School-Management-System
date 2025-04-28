import React, { useState } from 'react';
import { BookOpen, Search, Plus, Users, Clock, Trash2, PencilLine } from 'lucide-react';
import BackButton from '../../components/BackButton';

interface Class {
  id: string;
  teachers: string[];
  grade: string;
  students: string[];
  schedule: string;
}

const mockClasses: Class[] = [
  { id: '1', teachers: ['John Doe', 'Jane Smith'], grade: 'Grade 1', students: ['Student A', 'Student B'], schedule: 'Mon, Wed 9:00 AM' },
  { id: '2', teachers: ['Mike Johnson', 'Emily Davis'], grade: 'Grade 1', students: ['Student C', 'Student D'], schedule: 'Tue, Thu 10:30 AM' },
  { id: '3', teachers: ['Chris Brown'], grade: 'Grade 2', students: ['Student E', 'Student F'], schedule: 'Mon, Fri 2:00 PM' },
  { id: '4', teachers: ['Sarah Wilson'], grade: 'Grade 3', students: ['Student G', 'Student H'], schedule: 'Tue, Thu 1:00 PM' },
  { id: '5', teachers: ['David Lee'], grade: 'Grade 3', students: ['Student I', 'Student J'], schedule: 'Mon, Wed 11:00 AM' },
  { id: '6', teachers: ['John Doe', 'Jane Smith'], grade: 'Grade 4', students: ['Student K', 'Student L'], schedule: 'Fri 10:00 AM' },
  { id: '7', teachers: ['Mike Johnson'], grade: 'Grade 5', students: ['Student M', 'Student N'], schedule: 'Mon, Wed 2:00 PM' },
];

export default function Classes() {
  const [showAddClass, setShowAddClass] = useState(false);

  return (
    <div className="p-8">
      <BackButton />
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            Classes Management
          </h1>
          <p className="mt-2 text-gray-600">Manage all classes and their assignments</p>
        </div>
        <button
          onClick={() => setShowAddClass(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Class
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search classes..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Grades</option>
          <option value="1">Grade 1</option>
          <option value="2">Grade 2</option>
          <option value="3">Grade 3</option>
          <option value="4">Grade 4</option>
          <option value="5">Grade 5</option>
          <option value="6">Grade 6</option>
          <option value="7">Grade 7</option>
        </select>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 gap-6">
        {Object.entries(mockClasses.reduce((acc: Record<string, Class[]>, classItem) => {
          const grade = classItem.grade;
          acc[grade] = acc[grade] || [];
          acc[grade].push(classItem);
          return acc;
        }, {} as Record<string, Class[]>)).map(([grade, classItems]) => (
          <div key={grade} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900">{grade} ({classItems.length} classes)</h2>
            {classItems.map((classItem) => (
              <div key={classItem.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900"></h3>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <PencilLine size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>Teachers: {classItem.teachers.join(', ')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="h-5 w-5 mr-2" />
                    <span>{classItem.grade}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{classItem.students.join(', ')} Students</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{classItem.schedule}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {showAddClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Class</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Class Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Grade Level</label>
                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="1">Grade 1</option>
                  <option value="2">Grade 2</option>
                  <option value="3">Grade 3</option>
                  <option value="4">Grade 4</option>
                  <option value="5">Grade 5</option>
                  <option value="6">Grade 6</option>
                  <option value="7">Grade 7</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Assign Teacher</label>
                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="1">John Doe</option>
                  <option value="2">Jane Smith</option>
                  <option value="3">Mike Johnson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Schedule</label>
                <div className="grid grid-cols-2 gap-4">
                  <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                  </select>
                  <input
                    type="time"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddClass(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

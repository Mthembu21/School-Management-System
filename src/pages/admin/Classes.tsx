import React, { useState } from 'react';
import { BookOpen, Search, Plus, Users, Trash2, PencilLine } from 'lucide-react';
import BackButton from '../../components/BackButton';

interface Class {
  id: string;
  teachers: string[];
  grade: string;
  section: string; // A, B, C, etc.
  students: number;
  venue: string;
}

const mockClasses: Class[] = [
  { id: '1', teachers: ['John Doe'], grade: 'Grade 1', section: 'A', students: 30, venue: 'Room 101' },
  { id: '2', teachers: ['Jane Smith'], grade: 'Grade 1', section: 'B', students: 28, venue: 'Room 102' },
  { id: '3', teachers: ['Amy Lee'], grade: 'Grade 1', section: 'C', students: 26, venue: 'Room 103' },
  { id: '4', teachers: ['Tom Ray'], grade: 'Grade 1', section: 'D', students: 29, venue: 'Room 104' },
  { id: '5', teachers: ['Linda Kim'], grade: 'Grade 1', section: 'E', students: 27, venue: 'Room 105' },
  { id: '6', teachers: ['Mike Johnson'], grade: 'Grade 2', section: 'A', students: 27, venue: 'Room 201' },
  { id: '7', teachers: ['Emily Davis'], grade: 'Grade 2', section: 'B', students: 26, venue: 'Room 202' },
  { id: '8', teachers: ['Craig Nolan'], grade: 'Grade 2', section: 'C', students: 30, venue: 'Room 203' },
  { id: '9', teachers: ['Ava Moore'], grade: 'Grade 2', section: 'D', students: 27, venue: 'Room 204' },
  { id: '10', teachers: ['Chris Brown'], grade: 'Grade 3', section: 'A', students: 25, venue: 'Room 301' },
  { id: '11', teachers: ['Nina Hart'], grade: 'Grade 3', section: 'B', students: 26, venue: 'Room 302' },
  { id: '12', teachers: ['Jack Lin'], grade: 'Grade 3', section: 'C', students: 27, venue: 'Room 303' },
  { id: '13', teachers: ['Sarah Wilson'], grade: 'Grade 4', section: 'A', students: 27, venue: 'Room 401' },
  { id: '14', teachers: ['Alan Parker'], grade: 'Grade 4', section: 'B', students: 28, venue: 'Room 402' },
  { id: '15', teachers: ['David Lee'], grade: 'Grade 5', section: 'A', students: 25, venue: 'Room 501' },
  { id: '16', teachers: ['Helen Shaw'], grade: 'Grade 5', section: 'B', students: 25, venue: 'Room 502' },
  { id: '17', teachers: ['Brian Stone'], grade: 'Grade 5', section: 'C', students: 25, venue: 'Room 503' },
  { id: '18', teachers: ['John Doe', 'Jane Smith'], grade: 'Grade 6', section: 'A', students: 29, venue: 'Room 601' },
  { id: '19', teachers: ['Rebecca Hall'], grade: 'Grade 6', section: 'B', students: 29, venue: 'Room 602' },
  { id: '20', teachers: ['Mike Johnson'], grade: 'Grade 7', section: 'A', students: 25, venue: 'Room 701' },
  { id: '21', teachers: ['Liam Hayes'], grade: 'Grade 7', section: 'B', students: 25, venue: 'Room 702' },
];

const gradeSummary = {
  'Grade 1': { totalStudents: 140, totalClasses: 5 },
  'Grade 2': { totalStudents: 110, totalClasses: 4 },
  'Grade 3': { totalStudents: 78, totalClasses: 3 },
  'Grade 4': { totalStudents: 55, totalClasses: 2 },
  'Grade 5': { totalStudents: 75, totalClasses: 3 },
  'Grade 6': { totalStudents: 58, totalClasses: 2 },
  'Grade 7': { totalStudents: 50, totalClasses: 2 },
};

const currentUserClassId = '3';

const Classes = () => {
  const [showUploader, setShowUploader] = useState(false);

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
        <div className="flex gap-4">
          <button
            onClick={() => setShowUploader(!showUploader)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            Upload Students
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Class
          </button>
        </div>
      </div>

      {showUploader ? (
        <div> {/* Placeholder for StudentUploader component if needed */} </div>
      ) : (
        <>
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

          <div className="grid grid-cols-1 gap-6">
            {Object.entries(
              mockClasses.reduce((acc: Record<string, Class[]>, classItem) => {
                const grade = classItem.grade;
                acc[grade] = acc[grade] || [];
                acc[grade].push(classItem);
                return acc;
              }, {} as Record<string, Class[]>)
            ).map(([grade, classItems]) => {
              const [showUploaderForGrade, setShowUploaderForGrade] = React.useState(false);

              return (
                <div
                  key={grade}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center p-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {grade} ({gradeSummary[grade].totalClasses} classes, {gradeSummary[grade].totalStudents} students)
                    </h2>
                    <button
                      onClick={() => setShowUploaderForGrade(!showUploaderForGrade)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Upload Students
                    </button>
                  </div>
                  {showUploaderForGrade ? (
                    <div> {/* Placeholder for uploader component if needed */} </div>
                  ) : (
                    <>
                      {classItems.map((classItem) => (
                        <div
                          key={classItem.id}
                          className={`p-6 ${
                            classItem.id === currentUserClassId ? 'bg-yellow-100 border border-yellow-400 rounded-lg' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {classItem.grade} - Section {classItem.section}
                            </h3>
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
                              <span>Number of Students: {classItem.students}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Users className="h-5 w-5 mr-2" />
                              <span>Teachers: {classItem.teachers.join(', ')}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <BookOpen className="h-5 w-5 mr-2" />
                              <span>Venue: {classItem.venue}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Classes;

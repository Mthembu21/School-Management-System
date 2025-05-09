import React, { useState } from 'react';
import { BookOpen, Search, Plus, Users, Clock, Trash2, PencilLine } from 'lucide-react';
import BackButton from '../../components/BackButton';

interface Class {
  id: string;
  name: string;
  teachers: string[];
  grade: string;
  students: string[];
  schedule: string;
  subjects: string[];
}

import * as XLSX from 'xlsx'; // Importing the xlsx library

const mockClasses: Class[] = [
  { id: '1', name: 'Class A', teachers: ['John Doe', 'Jane Smith'], grade: 'Grade 1', students: ['Student A', 'Student B'], schedule: 'Mon, Wed 9:00 AM', subjects: ['Math', 'Science'] },
  { id: '2', name: 'Class B', teachers: ['Mike Johnson', 'Emily Davis'], grade: 'Grade 1', students: ['Student C', 'Student D'], schedule: 'Tue, Thu 10:30 AM', subjects: ['English', 'History'] },
  { id: '3', name: 'Class C', teachers: ['Chris Brown'], grade: 'Grade 2', students: ['Student E', 'Student F'], schedule: 'Mon, Fri 2:00 PM', subjects: ['Math', 'Art'] },
  { id: '4', name: 'Class D', teachers: ['Sarah Wilson'], grade: 'Grade 3', students: ['Student G', 'Student H'], schedule: 'Tue, Thu 1:00 PM', subjects: ['Science', 'Music'] },
  { id: '5', name: 'Class E', teachers: ['David Lee'], grade: 'Grade 3', students: ['Student I', 'Student J'], schedule: 'Mon, Wed 11:00 AM', subjects: ['History', 'PE'] },
  { id: '6', name: 'Class F', teachers: ['John Doe', 'Jane Smith'], grade: 'Grade 4', students: ['Student K', 'Student L'], schedule: 'Fri 10:00 AM', subjects: ['Math', 'Science'] },
  { id: '7', name: 'Class G', teachers: ['Mike Johnson'], grade: 'Grade 5', students: ['Student M', 'Student N'], schedule: 'Mon, Wed 2:00 PM', subjects: ['English', 'History'] },
];

// Added currentUserClassId to indicate the class the user is in
const currentUserClassId = '3';

const Classes = () => {
  const [file, setFile] = useState<File | null>(null); // State to hold the uploaded file
  const [error, setError] = useState<string | null>(null); // State to hold error messages
  const [selectedClass, setSelectedClass] = useState<Class | null>(null); // State to hold selected class for details view

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    setError(null); // Reset any previous errors
    e.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const students = XLSX.utils.sheet_to_json(firstSheet);

      // Assuming students is an array of objects with student details
      console.log(students); // For debugging, log the student data

      // Here you would typically update the state or send the data to the server
      // For example, you could add the students to the selected class
      if (selectedClass) {
        const updatedClass = { ...selectedClass, students: [...selectedClass.students, ...students] };
        // Update the state or perform any necessary actions with updatedClass
      }
    };
    reader.readAsArrayBuffer(file);
  };

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
                  {grade} ({classItems.length} classes,{' '}
                  {classItems.reduce((total, item) => total + item.students.length, 0)} students)
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
                        <h3 className="text-xl font-semibold text-gray-900">{classItem.name}</h3>
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
                          <span>Number of Students: {classItem.students.length}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-5 w-5 mr-2" />
                          <span>Teachers: {classItem.teachers.join(', ')}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <BookOpen className="h-5 w-5 mr-2" />
                          <span>{classItem.grade}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-5 w-5 mr-2" />
                          <span>{classItem.schedule}</span>
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

      {/* Upload Students Form */}
      <form onSubmit={handleUpload} className="space-y-4 mt-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Students (Excel File)</label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={() => setSelectedClass(null)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Upload Students
          </button>
        </div>
      </form>
    </div>
  );
};

export default Classes;

import React, { useState } from 'react';
import { useStudentStore } from '../../stores/studentStore';

const EnrollStudent = () => {
  const [studentName, setStudentName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('1');
  const [selectedClass, setSelectedClass] = useState('');
  const addStudent = useStudentStore((state) => state.addStudent);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (studentName && selectedClass) {
      addStudent({ 
        name: studentName, 
        grade: selectedGrade, 
        className: selectedClass 
      });
      setStudentName('');
      setSelectedClass('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Enroll Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Student Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Grade</label>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((grade) => (
              <option key={grade} value={grade}>Grade {grade}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Class</label>
          <input
            type="text"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Enroll Student
        </button>
      </form>
    </div>
  );
};

export default EnrollStudent;

import React from 'react';
import { useStudentStore } from '../../stores/studentStore';

const StudentList = () => {
  const enrolledStudents = useStudentStore((state) => state.enrolledStudents);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4">Enrolled Students</h2>
      {enrolledStudents.length === 0 ? (
        <p>No students enrolled yet</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {enrolledStudents.map((student, index) => (
            <li key={index} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {student.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    Grade {student.grade}, Class {student.className}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;

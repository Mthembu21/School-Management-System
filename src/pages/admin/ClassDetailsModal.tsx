import React from 'react';

interface Class {
  id: string;
  name: string;
  teachers: string[];
  grade: string;
  students: string[];
  schedule: string;
  subjects: string[];
}

interface ClassDetailsModalProps {
  classItem: Class | null;
  onClose: () => void;
}

const ClassDetailsModal: React.FC<ClassDetailsModalProps> = ({ classItem, onClose }) => {
  if (!classItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{classItem.name} - {classItem.grade}</h2>
        <h3 className="text-lg font-semibold">Teachers:</h3>
        <p>{classItem.teachers.join(', ')}</p>
        <h3 className="text-lg font-semibold mt-4">Students:</h3>
        <p>{classItem.students.join(', ')}</p>
        <h3 className="text-lg font-semibold mt-4">Subjects:</h3>
        <p>{classItem.subjects.join(', ')}</p>
        <h3 className="text-lg font-semibold mt-4">Schedule:</h3>
        <p>{classItem.schedule}</p>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsModal;

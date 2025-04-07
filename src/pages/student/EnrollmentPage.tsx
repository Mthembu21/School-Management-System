import React from 'react';
import EnrollStudent from './EnrollStudent';
import StudentList from './StudentList';

const EnrollmentPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        <EnrollStudent />
        <StudentList />
      </div>
    </div>
  );
};

export default EnrollmentPage;

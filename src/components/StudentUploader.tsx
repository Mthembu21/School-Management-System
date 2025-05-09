import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface Student {
  Name: string;
  Grade: number;
  Age: number;
}

interface StudentUploaderProps {
  grade: string;
}

const StudentUploader = ({ grade }: StudentUploaderProps) => {
  const [students, setStudents] = useState<Student[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const binaryStr = evt.target?.result;
      if (!binaryStr || typeof binaryStr !== 'string') return;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      // Read the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON
      const data = XLSX.utils.sheet_to_json<Student>(sheet);

      // Filter: Only Grades 1 to 7
      const filteredStudents = data.filter((student) => {
        return student.Grade >= 1 && student.Grade <= 7;
      });

      setStudents(filteredStudents);
    };

    reader.readAsBinaryString(file);
  };

  const handleClearStudents = () => {
    setStudents([]);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Student Upload for {grade}</h1>

      <div className="flex items-center gap-4 mb-6">
        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Upload Excel
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        <button
          onClick={handleClearStudents}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Students
        </button>
      </div>

      {students.length === 0 ? (
        <p className="text-gray-500">No students uploaded yet.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Grade</th>
              <th className="border px-4 py-2">Age</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{student.Name}</td>
                <td className="border px-4 py-2">{student.Grade}</td>
                <td className="border px-4 py-2">{student.Age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const binaryStr = evt.target?.result;
      if (!binaryStr || typeof binaryStr !== 'string') return;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      // Read the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON
      const data = XLSX.utils.sheet_to_json<Student>(sheet);

      // Filter: Only Grades 1 to 7
      const filteredStudents = data.filter((student) => {
        return student.Grade >= 1 && student.Grade <= 7;
      });

      setStudents(filteredStudents);
    };

    reader.readAsBinaryString(file);
  };

  const handleClearStudents = () => {
    setStudents([]);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Student Upload</h1>

      <div className="flex items-center gap-4 mb-6">
        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Upload Excel
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        <button
          onClick={handleClearStudents}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Students
        </button>
      </div>

      {students.length === 0 ? (
        <p className="text-gray-500">No students uploaded yet.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Grade</th>
              <th className="border px-4 py-2">Age</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{student.Name}</td>
                <td className="border px-4 py-2">{student.Grade}</td>
                <td className="border px-4 py-2">{student.Age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentUploader;

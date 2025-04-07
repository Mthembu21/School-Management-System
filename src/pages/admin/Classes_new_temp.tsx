import React, { useState } from 'react';
import { BookOpen, Search, Plus, Users, Clock, Trash2, PencilLine } from 'lucide-react';
import BackButton from '../../components/BackButton';
import ClassDetailsModal from './ClassDetailsModal'; // Importing the modal

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
// ... existing mock classes
];

const Classes = () => {
    const [file, setFile] = useState<File | null>(null); // State to hold the uploaded file
    const [error, setError] = useState<string | null>(null); // State to hold error messages
    const [selectedClass, setSelectedClass] = useState<Class | null>(null); // State to hold selected class for details view
    const [showAddClass, setShowAddClass] = useState(false); // State to control the visibility of the Add Class modal

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
        {/* ... existing code */}
        <form onSubmit={handleUpload} className="space-y-4">
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
                    onClick={() => setShowAddClass(false)}
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
        {/* ... existing code */}
    </div>
);
};

export default Classes;

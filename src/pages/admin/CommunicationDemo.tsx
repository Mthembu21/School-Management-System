import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import { mockClasses } from '../../data/mockClasses';

interface Parent {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
}

interface Student {
  id: string;
  name: string;
  grade: string;
  parents: Parent[];
}

interface SGBMember {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
}

const dummyStudents: Student[] = [
  {
    id: 's1',
    name: 'John Doe',
    grade: 'Grade 1',
    parents: [
      { id: 'p1', name: 'Jane Doe', phone: '123-456-7890', whatsapp: '123-456-7890', email: 'jane.doe@example.com' },
      { id: 'p2', name: 'Jim Doe', phone: '123-456-7891', whatsapp: '123-456-7891', email: 'jim.doe@example.com' },
    ],
  },
  {
    id: 's2',
    name: 'Mary Smith',
    grade: 'Grade 1',
    parents: [
      { id: 'p3', name: 'Anna Smith', phone: '234-567-8901', whatsapp: '234-567-8901', email: 'anna.smith@example.com' },
    ],
  },
  {
    id: 's3',
    name: 'Peter Johnson',
    grade: 'Grade 2',
    parents: [
      { id: 'p4', name: 'Paul Johnson', phone: '345-678-9012', whatsapp: '345-678-9012', email: 'paul.johnson@example.com' },
    ],
  },
  {
    id: 's4',
    name: 'Lucy Brown',
    grade: 'Grade 3',
    parents: [
      { id: 'p5', name: 'Laura Brown', phone: '456-789-0123', whatsapp: '456-789-0123', email: 'laura.brown@example.com' },
    ],
  },
  // Add more students for grades 4 to 7 as needed
];

const grades = [
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
];

// Dummy SGB members list
const dummySGBMembers: SGBMember[] = [
  { id: 'sgb1', name: 'Alice Cooper', phone: '555-123-4567', whatsapp: '555-123-4567', email: 'alice.cooper@example.com' },
  { id: 'sgb2', name: 'Bob Marley', phone: '555-234-5678', whatsapp: '555-234-5678', email: 'bob.marley@example.com' },
  { id: 'sgb3', name: 'Charlie Chaplin', phone: '555-345-6789', whatsapp: '555-345-6789', email: 'charlie.chaplin@example.com' },
];

// Extract unique teachers from mockClasses
const uniqueTeachers = Array.from(
  new Set(
    mockClasses.flatMap((cls) => cls.teachers)
  )
).map((teacherName, index) => ({
  id: `t${index + 1}`,
  name: teacherName,
  phone: '', // Phone and other contact info can be added if available
  whatsapp: '',
  email: '',
}));

export default function CommunicationDemo() {
  const [selectedGrade, setSelectedGrade] = useState<string>(grades[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedParents, setSelectedParents] = useState<string[]>([]);
  const [methods, setMethods] = useState<{ sms: boolean; whatsapp: boolean; email: boolean }>({
    sms: false,
    whatsapp: false,
    email: false,
  });
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // New state for recipient groups
  const [sendToAllParents, setSendToAllParents] = useState(false);
  const [sendToSGBMembers, setSendToSGBMembers] = useState(false);
  const [sendToTeachers, setSendToTeachers] = useState(false);

  useEffect(() => {
    const filtered = dummyStudents.filter(
      (student) =>
        student.grade === selectedGrade &&
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
    setSelectedStudents([]);
    setSelectedParents([]);
  }, [selectedGrade, searchTerm]);

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };

  useEffect(() => {
    // Update selectedParents based on selectedStudents
    const parentsSet = new Set<string>();
    selectedStudents.forEach((studentId) => {
      const student = dummyStudents.find((s) => s.id === studentId);
      if (student) {
        student.parents.forEach((parent) => parentsSet.add(parent.id));
      }
    });
    setSelectedParents(Array.from(parentsSet));
  }, [selectedStudents]);

  const toggleMethod = (method: keyof typeof methods) => {
    setMethods((prev) => ({ ...prev, [method]: !prev[method] }));
  };

  const handleSend = () => {
    // Compile recipients based on selections
    let recipientsSet = new Set<string>();

    if (sendToAllParents) {
      dummyStudents.forEach((student) => {
        student.parents.forEach((parent) => recipientsSet.add(parent.id));
      });
    } else {
      selectedParents.forEach((parentId) => recipientsSet.add(parentId));
    }

    if (sendToSGBMembers) {
      dummySGBMembers.forEach((member) => recipientsSet.add(member.id));
    }

    if (sendToTeachers) {
      uniqueTeachers.forEach((teacher) => recipientsSet.add(teacher.id));
    }

    if (recipientsSet.size === 0) {
      alert('Please select at least one recipient group or student to send communication.');
      return;
    }
    if (!methods.sms && !methods.whatsapp && !methods.email) {
      alert('Please select at least one communication method.');
      return;
    }
    if (message.trim() === '') {
      alert('Please enter a message.');
      return;
    }

    // Here you would map recipient ids to actual contact info for sending
    // For demo, just show success message with counts
    let recipientCount = recipientsSet.size;
    let methodList = Object.entries(methods)
      .filter(([_, v]) => v)
      .map(([k]) => k.toUpperCase())
      .join(', ');

    setSuccessMessage(
      `Message sent to ${recipientCount} recipient(s) via ${methodList}.`
    );

    // Reset selections
    setSelectedStudents([]);
    setSelectedParents([]);
    setSendToAllParents(false);
    setSendToSGBMembers(false);
    setSendToTeachers(false);
    setMethods({ sms: false, whatsapp: false, email: false });
    setMessage('');
    setSearchTerm('');
    setFilteredStudents([]);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Communication</h1>
      <p className="mb-6 text-gray-600">
        Send communication to parents, SGB members, and teachers via SMS, WhatsApp, or Email.
      </p>

      {/* Recipient Groups */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Recipient Groups</h2>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={sendToAllParents}
              onChange={() => setSendToAllParents(!sendToAllParents)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>All Parents</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={sendToSGBMembers}
              onChange={() => setSendToSGBMembers(!sendToSGBMembers)}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span>SGB Members</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={sendToTeachers}
              onChange={() => setSendToTeachers(!sendToTeachers)}
              className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span>Teachers</span>
          </label>
        </div>
      </div>

      {/* Grade Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Grade</h2>
        <div className="flex gap-4">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => {
                setSelectedGrade(grade);
                setSearchTerm('');
              }}
              className={`px-4 py-2 rounded-lg border ${
                selectedGrade === grade ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Student Search */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Search Students in {selectedGrade}</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search students by name..."
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Student List */}
      <div className="mb-6 max-h-64 overflow-y-auto border border-gray-300 rounded p-4 bg-white">
        {filteredStudents.length === 0 ? (
          <p className="text-gray-600">No students found.</p>
        ) : (
          filteredStudents.map((student) => (
            <label key={student.id} className="flex items-center gap-3 cursor-pointer select-none mb-2">
              <input
                type="checkbox"
                checked={selectedStudents.includes(student.id)}
                onChange={() => toggleStudentSelection(student.id)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-800">{student.name}</span>
            </label>
          ))
        )}
      </div>

      {/* Communication Methods */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Communication Methods</h2>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={methods.sms}
              onChange={() => toggleMethod('sms')}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>SMS</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={methods.whatsapp}
              onChange={() => toggleMethod('whatsapp')}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span>WhatsApp</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={methods.email}
              onChange={() => toggleMethod('email')}
              className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span>Email</span>
          </label>
        </div>
      </div>

      {/* Message Input */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Message</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Type your message here..."
        />
      </div>

      {/* Send Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSend}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}
    </div>
  );
}

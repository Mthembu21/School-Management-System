import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';

interface Parent {
  id: string;
  name: string;
  grade: string;
  phone: string;
  whatsapp: string;
  email: string;
}

const dummyParents: Parent[] = [
  { id: '1', name: 'Alice Johnson', grade: 'Grade 1', phone: '123-456-7890', whatsapp: '123-456-7890', email: 'alice.johnson@example.com' },
  { id: '2', name: 'Bob Smith', grade: 'Grade 1', phone: '234-567-8901', whatsapp: '234-567-8901', email: 'bob.smith@example.com' },
  { id: '3', name: 'Carol Williams', grade: 'Grade 2', phone: '345-678-9012', whatsapp: '345-678-9012', email: 'carol.williams@example.com' },
  { id: '4', name: 'David Brown', grade: 'Grade 2', phone: '456-789-0123', whatsapp: '456-789-0123', email: 'david.brown@example.com' },
  { id: '5', name: 'Eva Davis', grade: 'Grade 3', phone: '567-890-1234', whatsapp: '567-890-1234', email: 'eva.davis@example.com' },
];

const grades = Array.from(new Set(dummyParents.map(p => p.grade)));

export default function CommunicationDemo() {
  const [selectedGrade, setSelectedGrade] = useState<string>(grades[0]);
  const [selectedParents, setSelectedParents] = useState<string[]>([]);
  const [methods, setMethods] = useState<{ sms: boolean; whatsapp: boolean; email: boolean }>({
    sms: false,
    whatsapp: false,
    email: false,
  });
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [allSelected, setAllSelected] = useState(false);

  const parentsInSelectedGrade = dummyParents.filter(p => p.grade === selectedGrade);

  useEffect(() => {
    setAllSelected(parentsInSelectedGrade.length > 0 && parentsInSelectedGrade.every(p => selectedParents.includes(p.id)));
  }, [selectedParents, selectedGrade]);

  const toggleParentSelection = (id: string) => {
    setSelectedParents((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleAllParents = () => {
    if (allSelected) {
      setSelectedParents((prev) => prev.filter(id => !parentsInSelectedGrade.some(p => p.id === id)));
    } else {
      const newSelections = parentsInSelectedGrade.map(p => p.id);
      setSelectedParents((prev) => Array.from(new Set([...prev, ...newSelections])));
    }
    setAllSelected(!allSelected);
  };

  const toggleMethod = (method: keyof typeof methods) => {
    setMethods((prev) => ({ ...prev, [method]: !prev[method] }));
  };

  const handleSend = () => {
    if (selectedParents.length === 0) {
      alert('Please select at least one parent.');
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
    setSuccessMessage(
      "Message sent to " + selectedParents.length + " parent(s) via " + Object.entries(methods)
        .filter(([_, v]) => v)
        .map(([k]) => k.toUpperCase())
        .join(", ") + "."
    );
    setSelectedParents([]);
    setMethods({ sms: false, whatsapp: false, email: false });
    setMessage('');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Communication</h1>
      <p className="mb-6 text-gray-600">
        Send communication to parents via SMS, WhatsApp, or Email.
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Grade</h2>
        <div className="flex gap-4">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => {
                setSelectedGrade(grade);
                setSelectedParents([]);
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

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Parents in {selectedGrade}</h2>
        <label className="flex items-center gap-3 cursor-pointer select-none mb-2">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleAllParents}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-800 font-semibold">All Parents</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-64 overflow-y-auto border border-gray-300 rounded p-4 bg-white">
          {parentsInSelectedGrade.map((parent) => (
            <label
              key={parent.id}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={selectedParents.includes(parent.id)}
                onChange={() => toggleParentSelection(parent.id)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-800">{parent.name}</span>
            </label>
          ))}
        </div>
      </div>

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

      <div className="flex justify-end">
        <button
          onClick={handleSend}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>

      {successMessage && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}
    </div>
  );
}

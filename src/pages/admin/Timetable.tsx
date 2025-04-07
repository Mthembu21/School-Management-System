import React, { useState } from 'react';
import { Calendar, Clock, Plus, BookOpen, Users } from 'lucide-react';
import BackButton from '../../components/BackButton';

const timeSlots = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'
];

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

interface ScheduleEvent {
  id: string;
  subject: string;
  teacher: string;
  grade: string;
  room: string;
}

const mockSchedule: Record<string, Record<string, ScheduleEvent>> = {
  'Monday': {
    '08:00 AM': { id: '1', subject: 'Mathematics', teacher: 'John Doe', grade: 'Grade 10', room: '301' },
    '10:00 AM': { id: '2', subject: 'Physics', teacher: 'Jane Smith', grade: 'Grade 11', room: '302' },
    '12:00 PM': { id: '5', subject: 'English', teacher: 'Alice Brown', grade: 'Grade 7', room: '305' },
  },
  'Wednesday': {
    '09:00 AM': { id: '3', subject: 'Chemistry', teacher: 'Mike Johnson', grade: 'Grade 12', room: '303' },
    '02:00 PM': { id: '4', subject: 'Biology', teacher: 'Sarah Wilson', grade: 'Grade 10', room: '304' },
  },
  'Tuesday': {
    '12:00 PM': { id: '5', subject: 'English', teacher: 'Alice Brown', grade: 'Grade 7', room: '305' },
  },
  'Thursday': {
    '10:00 AM': { id: '6', subject: 'History', teacher: 'Tom Green', grade: 'Grade 7', room: '306' },
  },
};

export default function Timetable() {
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [newSchedule, setNewSchedule] = useState({
    subject: '',
    teacher: '',
    day: '',
    time: '',
    grade: '',
    room: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate inputs
    if (!newSchedule.subject || !newSchedule.teacher || !newSchedule.day || !newSchedule.time || !newSchedule.grade || !newSchedule.room) {
      alert('Please fill in all fields.');
      return;
    }
    // Add new schedule to mockSchedule
    const updatedSchedule = { ...mockSchedule };
    updatedSchedule[newSchedule.day][newSchedule.time] = {
      id: Date.now().toString(),
      subject: newSchedule.subject,
      teacher: newSchedule.teacher,
      grade: newSchedule.grade,
      room: newSchedule.room,
    };
    // Reset form and close modal
    setNewSchedule({ subject: '', teacher: '', day: '', time: '', grade: '', room: '' });
    setShowAddSchedule(false);
  };

  return (
    <div className="p-8">
      <BackButton />
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Calendar className="h-8 w-8 text-blue-600" />
            School Timetable
          </h1>
          <p className="mt-2 text-gray-600">Manage and view the school's class schedule</p>
        </div>
        <div className="flex gap-4">
            <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
          >
            <option value="all">All Grades</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
          <button
            onClick={() => setShowAddSchedule(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add Schedule
          </button>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white rounded-lg shadow-sm overflow-auto">
        <div className="min-w-max">
          <div className="grid grid-cols-[120px_repeat(5,1fr)] border-b">
            <div className="p-4 font-medium text-gray-500">Time</div>
            {weekDays.map((day) => (
              <div key={day} className="p-4 font-medium text-gray-500 text-center border-l">{day}</div>
            ))}
          </div>

          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-[120px_repeat(5,1fr)] border-b">
              <div className="p-4 font-medium text-gray-500">{time}</div>
              {weekDays.map((day) => {
                const event = mockSchedule[day]?.[time];
                return (
                  <div key={`${day}-${time}`} className="p-2 border-l min-h-[100px]">
                    {event && (
                      <div className="h-full bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="font-medium text-blue-800">{event.subject}</div>
                        <div className="text-sm text-gray-600 mt-1 flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {event.teacher}
                        </div>
                        <div className="text-sm text-gray-600 mt-1 flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {event.grade}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Room {event.room}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Add Schedule Modal */}
      {showAddSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Schedule</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <select 
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newSchedule.subject}
                  onChange={(e) => setNewSchedule({ ...newSchedule, subject: e.target.value })}
                >
                  <option value="">Select Subject</option>
                  <option value="math">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teacher</label>
                <select 
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newSchedule.teacher}
                  onChange={(e) => setNewSchedule({ ...newSchedule, teacher: e.target.value })}
                >
                  <option value="">Select Teacher</option>
                  <option value="1">John Doe</option>
                  <option value="2">Jane Smith</option>
                  <option value="3">Mike Johnson</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Day</label>
                  <select 
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newSchedule.day}
                    onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
                  >
                    {weekDays.map((day) => (
                      <option key={day} value={day.toLowerCase()}>{day}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <select 
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newSchedule.time}
                    onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                  >
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Grade</label>
                  <select 
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newSchedule.grade}
                    onChange={(e) => setNewSchedule({ ...newSchedule, grade: e.target.value })}
                  >
                    <option value="1">Grade 1</option>
                    <option value="2">Grade 2</option>
                    <option value="3">Grade 3</option>
                    <option value="4">Grade 4</option>
                    <option value="5">Grade 5</option>
                    <option value="6">Grade 6</option>
                    <option value="7">Grade 7</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Room</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="301"
                    value={newSchedule.room}
                    onChange={(e) => setNewSchedule({ ...newSchedule, room: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddSchedule(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

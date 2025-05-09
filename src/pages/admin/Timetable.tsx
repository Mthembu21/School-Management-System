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

const initialSchedule: Record<string, Record<string, ScheduleEvent[]>> = {
  'Monday': {
    '08:00 AM': [
      { id: '1', subject: 'Mathematics', teacher: 'John Doe', grade: 'Grade 1', room: '301' },
      { id: '17', subject: 'English', teacher: 'Alice Brown', grade: 'Grade 1', room: '305' },
      { id: '101', subject: 'Mathematics', teacher: 'Jane Doe', grade: 'Grade 2', room: '201' },
      { id: '201', subject: 'Science', teacher: 'Mark Twain', grade: 'Grade 3', room: '101' }
    ],
    '10:00 AM': [
      { id: '2', subject: 'English', teacher: 'Alice Brown', grade: 'Grade 1', room: '305' },
      { id: '102', subject: 'English', teacher: 'Mary Jane', grade: 'Grade 2', room: '202' }
    ],
    '01:00 PM': [
      { id: '11', subject: 'Life Orientation', teacher: 'M. Lee', grade: 'Grade 1', room: '309' },
      { id: '103', subject: 'History', teacher: 'John Smith', grade: 'Grade 2', room: '203' }
    ],
  },
  'Tuesday': {
    '09:00 AM': [
      { id: '3', subject: 'Science', teacher: 'Mary White', grade: 'Grade 1', room: '301' },
      { id: '104', subject: 'Geography', teacher: 'Anna Bell', grade: 'Grade 2', room: '204' }
    ],
    '11:00 AM': [
      { id: '4', subject: 'History', teacher: 'Tom Green', grade: 'Grade 1', room: '306' },
      { id: '105', subject: 'Mathematics', teacher: 'Peter Pan', grade: 'Grade 2', room: '205' }
    ],
    '02:00 PM': [
      { id: '12', subject: 'Art', teacher: 'Emma Watson', grade: 'Grade 1', room: '308' },
      { id: '106', subject: 'Science', teacher: 'Bruce Wayne', grade: 'Grade 2', room: '206' }
    ],
  },
  'Wednesday': {
    '08:00 AM': [
      { id: '5', subject: 'Geography', teacher: 'Jane Smith', grade: 'Grade 1', room: '302' },
      { id: '107', subject: 'English', teacher: 'Clark Kent', grade: 'Grade 2', room: '207' }
    ],
    '10:00 AM': [
      { id: '13', subject: 'Afrikaans', teacher: 'L. Petersen', grade: 'Grade 1', room: '310' },
      { id: '108', subject: 'Physical Education', teacher: 'Diana Prince', grade: 'Grade 2', room: 'Gym' }
    ],
    '01:00 PM': [
      { id: '6', subject: 'Physical Education', teacher: 'Sarah Wilson', grade: 'Grade 1', room: 'Gym' },
      { id: '109', subject: 'Life Orientation', teacher: 'Barry Allen', grade: 'Grade 2', room: '208' }
    ],
  },
  'Thursday': {
    '10:00 AM': [
      { id: '7', subject: 'Life Orientation', teacher: 'Mike Johnson', grade: 'Grade 1', room: '307' },
      { id: '110', subject: 'Technology', teacher: 'Hal Jordan', grade: 'Grade 2', room: '209' }
    ],
    '02:00 PM': [
      { id: '8', subject: 'Technology', teacher: 'Paul White', grade: 'Grade 1', room: '309' },
      { id: '111', subject: 'Mathematics', teacher: 'Arthur Curry', grade: 'Grade 2', room: '210' }
    ],
    '03:00 PM': [
      { id: '15', subject: 'English', teacher: 'Alice Brown', grade: 'Grade 1', room: '305' },
      { id: '112', subject: 'Science', teacher: 'Victor Stone', grade: 'Grade 2', room: '211' }
    ],
  },
  'Friday': {
    '09:00 AM': [
      { id: '9', subject: 'Music', teacher: 'Robert Brown', grade: 'Grade 1', room: '310' },
      { id: '113', subject: 'History', teacher: 'Oliver Queen', grade: 'Grade 2', room: '212' }
    ],
    '11:00 AM': [
      { id: '14', subject: 'Mathematics', teacher: 'John Doe', grade: 'Grade 1', room: '301' },
      { id: '114', subject: 'English', teacher: 'Selina Kyle', grade: 'Grade 2', room: '213' }
    ],
    '01:00 PM': [
      { id: '16', subject: 'Social Science', teacher: 'K. Mbatha', grade: 'Grade 1', room: '306' },
      { id: '115', subject: 'Physical Education', teacher: 'Harley Quinn', grade: 'Grade 2', room: 'Gym' }
    ],
  },
};

export default function Timetable() {
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [scheduleData, setScheduleData] = useState(initialSchedule);
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
    if (!newSchedule.subject || !newSchedule.teacher || !newSchedule.day || !newSchedule.time || !newSchedule.grade || !newSchedule.room) {
      alert('Please fill in all fields.');
      alert('Please fill in all fields.');
      return;
    }
    const updatedSchedule = { ...scheduleData };
    if (!updatedSchedule[newSchedule.day]) {
      updatedSchedule[newSchedule.day] = {};
    }
    if (!updatedSchedule[newSchedule.day][newSchedule.time]) {
      updatedSchedule[newSchedule.day][newSchedule.time] = [];
    }
    updatedSchedule[newSchedule.day][newSchedule.time].push({
      id: Date.now().toString(),
      subject: newSchedule.subject,
      teacher: newSchedule.teacher,
      grade: newSchedule.grade,
      room: newSchedule.room,
    });
    setScheduleData(updatedSchedule);
    setNewSchedule({ subject: '', teacher: '', day: '', time: '', grade: '', room: '' });
    setShowAddSchedule(false);
  };

  const isGradeVisible = (event: ScheduleEvent) => {
    // Ensure selectedGrade is string and event.grade matches format
    if (selectedGrade === 'all') {
      return true;
    }
    // event.grade is like "Grade 1", selectedGrade is string number like "1"
    return event.grade === `Grade ${selectedGrade}`;
  };

  const grades = [...Array(7)].map((_, i) => i + 1);

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
            {grades.map((g) => <option key={g} value={g}>{`Grade ${g}`}</option>)}
            {[10, 11, 12].map((g) => <option key={g} value={g}>{`Grade ${g}`}</option>)}
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

      {selectedGrade === 'all' ? (
        <div className="grid grid-cols-3 gap-6">
          {grades.map((grade) => (
            <div
              key={grade}
              onClick={() => setSelectedGrade(grade.toString())}
              className="cursor-pointer bg-blue-50 rounded-lg p-6 border border-blue-200 hover:bg-blue-100 text-center text-blue-800 font-semibold"
            >
              {`Grade ${grade}`}
            </div>
          ))}
        </div>
      ) : (
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
                  const events = scheduleData[day]?.[time] || [];
                  return (
                    <div key={`${day}-${time}`} className="p-2 border-l min-h-[100px] space-y-2">
                      {events.filter(isGradeVisible).map((event) => (
                        <div key={event.id} className="h-full bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <div className="font-medium text-blue-800">{event.subject}</div>
                          <div className="text-sm text-gray-600 mt-1 flex items-center">
                            <Users className="h-4 w-4 mr-1" />{event.teacher}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />{event.grade}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">Room {event.room}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Schedule</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Subject</label>
                <input
                  type="text"
                  value={newSchedule.subject}
                  onChange={(e) => setNewSchedule({ ...newSchedule, subject: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Teacher</label>
                <input
                  type="text"
                  value={newSchedule.teacher}
                  onChange={(e) => setNewSchedule({ ...newSchedule, teacher: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Day</label>
                <select
                  value={newSchedule.day}
                  onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">Select a day</option>
                  {weekDays.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Time</label>
                <select
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Grade</label>
                <select
                  value={newSchedule.grade}
                  onChange={(e) => setNewSchedule({ ...newSchedule, grade: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">Select a grade</option>
                  {[...Array(7)].map((_, i) => (
                    <option key={i+1} value={`${i+1}`}>{`Grade ${i+1}`}</option>
                  ))}
                  {[10, 11, 12].map((g) => (
                    <option key={g} value={`${g}`}>{`Grade ${g}`}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddSchedule(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface TimetableEntry {
  id: string;
  subject: string;
  day: string;
  time: string;
  teacher: string;
}

interface Mark {
  id: string;
  subject: string;
  score: number;
  maxScore: number;
  grade: string;
}

const dummyAnnouncements: Announcement[] = [
  { id: 'a1', title: 'School Assembly', content: 'Monthly assembly scheduled for next Monday at 8:00 AM.', date: '2024-06-10' },
  { id: 'a2', title: 'Sports Day', content: 'Annual sports day will be held on June 20th.', date: '2024-06-05' },
];

const dummyTimetable: TimetableEntry[] = [
  { id: 't1', subject: 'Math', day: 'Monday', time: '9:00 AM - 10:00 AM', teacher: 'Mr. John Doe' },
  { id: 't2', subject: 'English', day: 'Tuesday', time: '10:15 AM - 11:15 AM', teacher: 'Ms. Jane Smith' },
  { id: 't3', subject: 'Science', day: 'Wednesday', time: '11:30 AM - 12:30 PM', teacher: 'Mr. Mike Johnson' },
];

const dummyMarks: Mark[] = [
  { id: 'm1', subject: 'Math', score: 85, maxScore: 100, grade: 'B' },
  { id: 'm2', subject: 'English', score: 92, maxScore: 100, grade: 'A' },
  { id: 'm3', subject: 'Science', score: 78, maxScore: 100, grade: 'C+' },
];

export default function StudentDashboard() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      {/* Announcements */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
        <div className="space-y-4">
          {dummyAnnouncements.map((announcement) => (
            <div key={announcement.id} className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
              <h3 className="text-xl font-semibold">{announcement.title}</h3>
              <p className="text-gray-700 mt-1">{announcement.content}</p>
              <p className="text-sm text-gray-500 mt-2">{announcement.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timetable */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Timetable</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Day</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Teacher</th>
            </tr>
          </thead>
          <tbody>
            {dummyTimetable.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{entry.day}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.time}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.subject}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Marks */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Marks</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Score</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Grade</th>
            </tr>
          </thead>
          <tbody>
            {dummyMarks.map((mark) => (
              <tr key={mark.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{mark.subject}</td>
                <td className="border border-gray-300 px-4 py-2">{mark.score} / {mark.maxScore}</td>
                <td className="border border-gray-300 px-4 py-2">{mark.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

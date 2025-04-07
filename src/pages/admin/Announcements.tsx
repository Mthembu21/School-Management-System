import React, { useState } from 'react';
import { Bell, Search, Plus, Calendar, UserCircle } from 'lucide-react';
import BackButton from '../../components/BackButton';

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  type: 'General' | 'Academic' | 'Event';
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'End of Term Examinations',
    content: 'The end of term examinations will begin next week. All students are required to check their examination schedules.',
    author: 'John Doe',
    date: '2025-03-15',
    type: 'Academic'
  },
  {
    id: '2',
    title: 'Annual Sports Day',
    content: 'The annual sports day will be held on March 20th. All students and teachers are expected to participate.',
    author: 'Jane Smith',
    date: '2025-03-10',
    type: 'Event'
  },
  {
    id: '3',
    title: 'Parent-Teacher Meeting',
    content: 'Parent-teacher meetings are scheduled for next Friday. Please check the schedule for your assigned time slots.',
    author: 'Mike Johnson',
    date: '2025-03-05',
    type: 'General'
  }
];

export default function Announcements() {
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);

  return (
    <div className="p-8">
      <BackButton />
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bell className="h-8 w-8 text-blue-600" />
            Announcements
          </h1>
          <p className="mt-2 text-gray-600">Manage and create school announcements</p>
        </div>
        <button
          onClick={() => setShowAddAnnouncement(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          New Announcement
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search announcements..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Types</option>
          <option value="general">General</option>
          <option value="academic">Academic</option>
          <option value="event">Event</option>
        </select>
      </div>

      {/* Announcements List */}
      <div className="space-y-6">
        {mockAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-start justify between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    announcement.type === 'Academic' ? 'bg-blue-100 text-blue-800' :
                    announcement.type === 'Event' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {announcement.type}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {announcement.date}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                <p className="text-gray-600">{announcement.content}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <UserCircle className="h-5 w-5 mr-2" />
                  Posted by {announcement.author}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Announcement Modal */}
      {showAddAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Create New Announcement</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter announcement title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="general">General</option>
                  <option value="academic">Academic</option>
                  <option value="event">Event</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter announcement content"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Target Audience</label>
                <div className="mt-2 space-y-2">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2">All Students</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2">All Teachers</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2">Parents</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddAnnouncement(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
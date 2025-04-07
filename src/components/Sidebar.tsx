import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BookOpen, 
  Calendar, 
  Bell, 
  LogOut,
  Settings,
  School
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

interface SidebarLink {
  icon: React.ElementType;
  label: string;
  path: string;
}

const adminLinks: SidebarLink[] = [
  { icon: Home, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: BookOpen, label: 'Classes', path: '/admin/classes' },
  { icon: Calendar, label: 'Timetable', path: '/admin/timetable' },
  { icon: Bell, label: 'Announcements', path: '/admin/announcements' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

const teacherLinks: SidebarLink[] = [
  { icon: Home, label: 'Dashboard', path: '/teacher' },
  { icon: BookOpen, label: 'My Classes', path: '/teacher/classes' },
  { icon: Calendar, label: 'Timetable', path: '/teacher/timetable' },
  { icon: Bell, label: 'Announcements', path: '/teacher/announcements' },
];

const studentLinks: SidebarLink[] = [
  { icon: Home, label: 'Dashboard', path: '/student' },
  { icon: BookOpen, label: 'My Classes', path: '/student/classes' },
  { icon: Calendar, label: 'Timetable', path: '/student/timetable' },
  { icon: Bell, label: 'Announcements', path: '/student/announcements' },
];

function Sidebar() {
  const location = useLocation();
  const { userRole, schoolInfo, signOut } = useAuthStore();
  
  const links = userRole === 'admin' 
    ? adminLinks 
    : userRole === 'teacher'
    ? teacherLinks
    : studentLinks;

  return (
    <div className="h-screen w-64 bg-blue-800 text-white fixed left-0 top-0 flex flex-col">
      <div className="p-4">
        <div className="flex items-center gap-3">
          {schoolInfo?.logo ? (
            <img src={schoolInfo.logo} alt="School logo" className="h-8 w-8 rounded" />
          ) : (
            <School className="h-8 w-8" />
          )}
          <h1 className="text-xl font-bold truncate">{schoolInfo?.name || 'School Manager'}</h1>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-900 text-white' 
                      : 'text-blue-100 hover:bg-blue-700'
                  }`}
                >
                  <Icon size={20} />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={signOut}
          className="flex items-center space-x-3 p-2 rounded-lg text-blue-100 hover:bg-blue-700 w-full"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
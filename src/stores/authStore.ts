import { create } from 'zustand';

interface SchoolInfo {
  name: string;
  logo: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

interface Student {
  name: string;
  grade: string;
  class: string;
}

interface AuthState {
  isAuthenticated: boolean;
  userRole: 'admin' | 'teacher' | 'student' | null;
  schoolInfo: SchoolInfo | null;
  enrolledStudents: Student[]; // New state for enrolled students
  setAuth: (isAuth: boolean, role: 'admin' | 'teacher' | 'student') => void;
  setSchoolInfo: (info: SchoolInfo) => void;
  signOut: () => void;
  addStudent: (student: Student) => void; // New method for adding students
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userRole: null,
  schoolInfo: null,
  enrolledStudents: [], // Initialize with an empty array
  setAuth: (isAuth, role) => {
    if (isAuth && role) {
      set({ isAuthenticated: isAuth, userRole: role });
    } else {
      console.error('Invalid authentication state or role');
    }
  },
  setSchoolInfo: (info) => {
    if (info) {
      set({ schoolInfo: info });
    } else {
      console.error('Invalid school information');
    }
  },
  signOut: () => set({ isAuthenticated: false, userRole: null, schoolInfo: null, enrolledStudents: [] }),
  addStudent: (student) => set((state) => ({
    enrolledStudents: [...state.enrolledStudents, student], // Add new student to the list
  })),
}));

import { create } from 'zustand';

interface Student {
  name: string;
  grade: string;
  className: string;
}

interface StudentState {
  enrolledStudents: Student[];
  addStudent: (student: Student) => void;
}

export const useStudentStore = create<StudentState>((set) => ({
  enrolledStudents: [],
  addStudent: (student) => {
    console.log('Adding student:', student);
    return set((state) => ({
      enrolledStudents: [...state.enrolledStudents, student]
    }));
  },
}));

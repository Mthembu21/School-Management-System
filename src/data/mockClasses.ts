export interface Class {
  id: string;
  teachers: string[];
  grade: string; // Full designation like 'Grade 1A'
  students: number;
  venue: string;
}

export const mockClasses: Class[] = [
  { id: '1', teachers: ['John Doe'], grade: 'Grade 1A', students: 30, venue: 'Room 101' },
  { id: '2', teachers: ['Jane Smith'], grade: 'Grade 1B', students: 28, venue: 'Room 102' },
  { id: '3', teachers: ['Amy Lee'], grade: 'Grade 1C', students: 26, venue: 'Room 103' },
  { id: '4', teachers: ['Tom Ray'], grade: 'Grade 1D', students: 29, venue: 'Room 104' },
  { id: '5', teachers: ['Linda Kim'], grade: 'Grade 1E', students: 27, venue: 'Room 105' },

  { id: '6', teachers: ['Mike Johnson'], grade: 'Grade 2A', students: 27, venue: 'Room 201' },
  { id: '7', teachers: ['Emily Davis'], grade: 'Grade 2B', students: 26, venue: 'Room 202' },
  { id: '8', teachers: ['Craig Nolan'], grade: 'Grade 2C', students: 30, venue: 'Room 203' },
  { id: '9', teachers: ['Ava Moore'], grade: 'Grade 2D', students: 27, venue: 'Room 204' },

  { id: '10', teachers: ['Chris Brown'], grade: 'Grade 3A', students: 25, venue: 'Room 301' },
  { id: '11', teachers: ['Nina Hart'], grade: 'Grade 3B', students: 26, venue: 'Room 302' },
  { id: '12', teachers: ['Jack Lin'], grade: 'Grade 3C', students: 27, venue: 'Room 303' },

  { id: '13', teachers: ['Sarah Wilson'], grade: 'Grade 4A', students: 27, venue: 'Room 401' },
  { id: '14', teachers: ['Alan Parker'], grade: 'Grade 4B', students: 28, venue: 'Room 402' },

  { id: '15', teachers: ['David Lee'], grade: 'Grade 5A', students: 25, venue: 'Room 501' },
  { id: '16', teachers: ['Helen Shaw'], grade: 'Grade 5B', students: 25, venue: 'Room 502' },
  { id: '17', teachers: ['Brian Stone'], grade: 'Grade 5C', students: 25, venue: 'Room 503' },

  { id: '18', teachers: ['John Doe', 'Jane Smith'], grade: 'Grade 6A', students: 29, venue: 'Room 601' },
  { id: '19', teachers: ['Rebecca Hall'], grade: 'Grade 6B', students: 29, venue: 'Room 602' },

  { id: '20', teachers: ['Mike Johnson'], grade: 'Grade 7A', students: 25, venue: 'Room 701' },
  { id: '21', teachers: ['Liam Hayes'], grade: 'Grade 7B', students: 25, venue: 'Room 702' },
];

export const gradeSummary = {
  'Grade 1': { totalStudents: 140, totalClasses: 5 },
  'Grade 2': { totalStudents: 110, totalClasses: 4 },
  'Grade 3': { totalStudents: 78, totalClasses: 3 },
  'Grade 4': { totalStudents: 55, totalClasses: 2 },
  'Grade 5': { totalStudents: 75, totalClasses: 3 },
  'Grade 6': { totalStudents: 58, totalClasses: 2 },
  'Grade 7': { totalStudents: 50, totalClasses: 2 },
};

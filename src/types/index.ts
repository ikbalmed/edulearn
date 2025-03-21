export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Class {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  imageUrl?: string;
  studentCount: number;
  createdAt: string;
}

export interface Lecture {
  id: string;
  title: string;
  description: string;
  classId: string;
  className: string;
  teacherId: string;
  teacherName: string;
  videoUrl?: string;
  documentUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  createdAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  classId: string;
  className: string;
  teacherId: string;
  teacherName: string;
  dueDate: string;
  points: number;
  attachmentUrl?: string;
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  content: string;
  attachmentUrl?: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
}

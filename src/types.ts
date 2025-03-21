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
  studentCount: number;
  createdAt: string;
  imageUrl: string;
} 
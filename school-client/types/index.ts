export interface StaffMember {
  id: number;
  name: string;
  nameNepali?: string;
  position: string;
  positionNepali: string;
  phone: string;
  email?: string;
  department: 'administration' | 'teaching' | 'board' | 'support';
  photo?: string;
  bio?: string;
  bioNepali?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Notice {
  id: number;
  title: string;
  titleNepali: string;
  description?: string;
  descriptionNepali?: string;
  date: Date;
  nepaliDate: string;
  category: 'general' | 'exam' | 'holiday' | 'urgent' | 'event';
  isActive: boolean;
  priority: number;
  attachments?: Array<{
    name: string;
    url: string;
    size: number;
  }>;
}

export interface Event {
  id: number;
  title: string;
  titleNepali: string;
  description?: string;
  descriptionNepali?: string;
  startDate: Date;
  endDate?: Date;
  nepaliDate: string;
  category: 'school' | 'plus2' | 'sports' | 'cultural' | 'academic';
  venue?: string;
  organizer?: string;
  isActive: boolean;
  featuredImage?: string;
}

export interface Download {
  id: number;
  title: string;
  titleNepali?: string;
  description?: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  category: 'syllabus' | 'form' | 'notice' | 'result' | 'other';
  downloadCount: number;
  publishedDate: Date;
  nepaliDate: string;
  isActive: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  response?: string;
  respondedAt?: Date;
  createdAt: Date;
}

export interface Attendance {
  date: Date;
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  totalTeachers: number;
  presentTeachers: number;
  absentTeachers: number;
  studentAttendanceRate: number;
  teacherAttendanceRate: number;
  remarks?: string;
  updatedBy?: string;
}
# Smart School (MERN)

A full-stack school management system with role-based dashboards for Admin, Teacher, and Student.

Stack
- Frontend: Next.js, React, Tailwind CSS, Redux Toolkit, React Query
- Backend: Express, MongoDB (Mongoose), JWT Auth, Multer uploads, Socket.io

## Project Structure
- `school-client/` Next.js frontend
- `school-server/` Express backend

## Setup

### 1) Backend

```bash
cd school-server
npm install
```

Create a `.env` file in `school-server/`:

```env
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/smart-school
JWT_SECRET=supersecretkey
```

Run the server:

```bash
npm run dev
```

Backend runs at `http://localhost:8080`.

### 2) Frontend

```bash
cd school-client
npm install
```

Create a `.env.local` file in `school-client/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Run the client:

```bash
npm run dev
```

Frontend runs at `http://localhost:3000`.

## Scripts

Backend (`school-server/package.json`)
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Frontend (`school-client/package.json`)
```json
"scripts": {
  "dev": "set NEXT_DISABLE_TURBOPACK=1&& next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

## Features

### Level 1: Core Systems

#### Authentication and Access
- [x] Role-Based Login (Admin / Teacher / Student)
- [x] Secure Authentication
- [x] Access Control

#### Attendance System
- [x] Live Attendance Tracking
- [x] Class-wise Attendance
- [x] Date-wise Attendance
- [x] Attendance History

#### Homework Management
- [x] Homework Scheduling
- [x] Deadline Management
- [x] Online Submission System

#### Application System
- [x] Online Applications
- [x] Leave Requests
- [x] Admin Approval
- [ ] Teacher Forwarding

#### Notices and Alerts
- [x] General Notices
- [x] Emergency Alerts
- [x] Instant Notifications

### Level 2: Role-Specific Panels

#### Admin Panel
- [x] Admin Dashboard
- [x] Teacher Management
- [x] Student Management
- [x] Notice Management
- [x] Emergency Notice Management
- [x] Attendance Monitoring
- [ ] Application Review and Forwarding

#### Teacher Panel
- [x] Teacher Login
- [x] Live Class Attendance
- [x] Student Attendance Management
- [x] Homework Scheduling
- [ ] Homework Review
- [ ] Class and Subject Management

#### Student Panel
- [x] Student Login
- [x] Live Attendance View
- [x] Homework Access
- [x] Online Homework Submission
- [x] Application Submission
- [x] Application Status Tracking

### Level 3: Analytics and Interface

#### Reports and Monitoring
- [ ] Attendance Reports
- [ ] Homework Reports
- [ ] Student Overview

#### General Features
- [x] Responsive Design
- [x] Real-Time Updates
- [x] User-Friendly Interface
- [x] Scalable Architecture

## Notes
- File uploads are stored in `school-server/public/uploads/`.
- Attendance updates are broadcast via Socket.io.

## API (Backend)

Base URL: `http://localhost:8080`

Auth
- `POST /auth/login`

Public
- `GET /public/school-page`

Students
- `POST /students`
- `GET /students`
- `GET /students/:id`
- `PUT /students/:id`
- `DELETE /students/:id`

Teachers
- `POST /teachers`
- `GET /teachers`
- `GET /teachers/:id`
- `PUT /teachers/:id`
- `DELETE /teachers/:id`

Grades
- `GET /grades`
- `GET /grades/:id`
- `POST /grades`
- `GET /grades/teacher/:teacherId/students`

Attendance
- `POST /attendance/teacherAttendance`
- `POST /attendance/student/mark`
- `GET /attendance/today`
- `PATCH /attendance/student/toggle/:studentId`
- `GET /attendance/student/class/:gradeId`

Attendance Code
- `GET /attendanceCode/code`

Assignments
- `POST /assignments`
- `GET /assignments`
- `GET /assignments/grade/:gradeId`
- `DELETE /assignments/:id`

Submissions
- `POST /submissions`
- `GET /submissions/assignment/:assignmentId`
- `GET /submissions/student/:studentId`
- `PUT /submissions/:id`

Applications
- `POST /applications`
- `GET /applications`
- `PUT /applications/:id/status`

Notices
- `POST /notices`
- `GET /notices`
- `GET /notices/:id`
- `DELETE /notices/:id`

Emergency Notices
- `POST /emergencyNotices`
- `GET /emergencyNotices`
- `DELETE /emergencyNotices/:id`

Schedule
- `POST /schedule/schedule`
- `GET /schedule/teacher/:teacherId`


##  Installation

```bash
npm install -g
```

```bash
npm create next-app@latest school-client --yes
npm install express
npm install mongoose
npm install bcryptjs jsonwebtoken dotenv cors

```

### Initialize the project

```bash
npm init
```

### Start the server locally:

```bash
node server.js
```
```bash
npm install --save-dev nodemon
```
```bash
npm run dev
```
You should see the following output:
```
Server is running at http://localhost:8080
```
###  Root Endpoint

```bash
curl http://localhost:8080/
```

```bash
curl http://localhost:8080/students
curl http://localhost:8080/teachers
```

##  Development

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```
## 🚀 Features

### Level 1: Core Systems

#### 🔐 Authentication & Access
- [x] Role-Based Login (Admin / Teacher / Student)
- [x] Secure Authentication
- [x] Access Control

#### 📝 Attendance System
- [x] Live Attendance Tracking
- [x] Class-wise Attendance
- [x] Date-wise Attendance
- [x] Attendance History

#### 📚 Homework Management
- [x] Homework Scheduling
- [x] Deadline Management
- [x] Online Submission System

#### 📩 Application System
- [x] Online Applications
- [x] Leave Requests
- [x] Admin Approval
- [] Teacher Forwarding

#### 🚨 Notices & Alerts
- [x] General Notices
- [x] Emergency Alerts
- [x] Instant Notifications

### Level 2: Role-Specific Panels

#### 👨‍💼 Admin Panel
- [x] Admin Dashboard
- [x] Teacher Management
- [x] Student Management
- [x] Notice Management
- [x] Emergency Notice Management
- [x] Attendance Monitoring
- [] Application Review & Forwarding

#### 👩‍🏫 Teacher Panel
- [x] Teacher Login
- [x] Live Class Attendance
- [x] Student Attendance Management
- [x] Homework Scheduling
- [] Homework Review
- [] Class & Subject Management

#### 🎓 Student Panel
- [x] Student Login
- [x] Live Attendance View
- [x] Homework Access
- [x] Online Homework Submission
- [x] Application Submission
- [x] Application Status Tracking

### Level 3: Analytics & Interface

#### 📊 Reports & Monitoring
- [] Attendance Reports
- [] Homework Reports
- [] Student Overview

#### 🌐 General Features
- [x] Responsive Design
- [x] Real-Time Updates
- [x] User-Friendly Interface
- [x] Scalable Architecture

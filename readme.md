
##  Installation

```bash
npm install -g
```
```bash
npm install express
npm install mongoose
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
- [ ] Role-Based Login (Admin / Teacher / Student)
- [ ] Secure Authentication
- [ ] Access Control

#### 📝 Attendance System
- [ ] Live Attendance Tracking
- [ ] Class-wise Attendance
- [ ] Date-wise Attendance
- [ ] Attendance History

#### 📚 Homework Management
- [ ] Homework Assignment
- [ ] Homework Scheduling
- [ ] Deadline Management
- [ ] Online Submission System

#### 📩 Application System
- [ ] Online Applications
- [ ] Leave Requests
- [ ] Admin Approval
- [ ] Teacher Forwarding

#### 🚨 Notices & Alerts
- [ ] General Notices
- [ ] Emergency Alerts
- [ ] Instant Notifications

---

### Level 2: Role-Specific Panels

#### 👨‍💼 Admin Panel
- [ ] Admin Dashboard
- [ ] Teacher Management
- [ ] Student Management
- [ ] Notice Management
- [ ] Emergency Notice Management
- [ ] Attendance Monitoring
- [ ] Application Review & Forwarding

#### 👩‍🏫 Teacher Panel
- [ ] Teacher Login
- [ ] Live Class Attendance
- [ ] Student Attendance Management
- [ ] Homework Scheduling
- [ ] Homework Review
- [ ] Class & Subject Management

#### 🎓 Student Panel
- [ ] Student Login
- [ ] Live Attendance View
- [ ] Homework Access
- [ ] Online Homework Submission
- [ ] Application Submission
- [ ] Application Status Tracking

---

### Level 3: Analytics & Interface

#### 📊 Reports & Monitoring
- [ ] Attendance Reports
- [ ] Homework Reports
- [ ] Student Overview

#### 🌐 General Features
- [ ] Responsive Design
- [ ] Real-Time Updates
- [ ] User-Friendly Interface
- [ ] Scalable Architecture
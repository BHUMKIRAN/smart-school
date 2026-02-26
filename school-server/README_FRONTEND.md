# School Server - Attendance System Integration

This document explains how to integrate the 6-digit code attendance system into the frontend.

## 1. Real-time Attendance Updates (Socket.io)
The server uses Socket.io to broadcast live attendance updates.

**Server URL:** `http://localhost:8080`

**Event to listen for:** `attendanceMarked`
- **Data received:** The populated attendance object (including teacher details).

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

socket.on("attendanceMarked", (data) => {
  console.log("New attendance marked:", data);
  // Update your home page / dashboard state here
});
```

## 2. API Endpoints

### Get Today's Attendance Code (Admin Only)
- **Endpoint:** `GET /admin/code`
- **Description:** Returns the 6-digit code generated for today.
- **Response Format:**
```json
{
  "_id": "...",
  "code": "123456",
  "date": "2026-02-26",
  "createdAt": "..."
}
```

### Get Today's Attendance List (Admin Only)
- **Endpoint:** `GET /admin/attendance`
- **Description:** Returns a list of all teachers who have marked their attendance today.
- **Response Format:** Array of attendance objects with populated teacher data.

### Mark Attendance (Teacher)
- **Endpoint:** `POST /attendance/mark`
- **Body:**
```json
{
  "teacherId": "TEACHER_MONGO_ID",
  "code": "123456"
}
```
- **Response:**
  - `200 OK`: Attendance marked successfully.
  - `400 Bad Request`: Invalid code.

## 3. Other Modules
All other modules (Students, Teachers, Notices, Emergency Notices) have been updated to use ES Modules and follow consistent naming conventions.

- **Students:** `/students`
- **Teachers:** `/teachers`
- **Notices:** `/notices`
- **Emergency Notices:** `/emergencyNotices`

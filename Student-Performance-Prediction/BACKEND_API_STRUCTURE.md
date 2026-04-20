# Backend API Structure and Student Data Model

This document outlines the expected structure for student data from your backend APIs.

## Student Data Structure

All student records should follow this structure with nested `theory` and `practical` objects instead of flat fields:

### Complete Student Object

```json
{
  "_id": "student_id_123",
  "email": "student@example.com",
  "name": "John Doe",
  "rollNo": "CS001",
  "branch": "Computer Science",
  "semester": 4,
  "mobileNo": "+91-9876543210",
  "fathersName": "Father Name",
  
  "theory": {
    "english": 75,
    "mathematics": 85,
    "science": 80,
    "history": 70,
    "total": 85
  },
  
  "practical": {
    "english": 72,
    "mathematics": 88,
    "science": 78,
    "history": 75,
    "total": 80
  },
  
  "attendance": 85,
  "overallScore": 82.5,
  "riskLevel": "Low",
  "predictedGrade": "A",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-05-20T14:45:00Z"
}
```

## API Endpoints Expected

### 1. Fetch All Students
**Endpoint:** `GET /api/students`

**Query Parameters:**
- `search`: Search by name, email, or roll number
- `branch`: Filter by branch
- `semester`: Filter by semester
- `page`: Pagination (default: 1)
- `limit`: Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    { /* student objects as shown above */ }
  ],
  "total": 150,
  "page": 1,
  "limit": 10
}
```

### 2. Get Single Student
**Endpoint:** `GET /api/students/:id`

**Response:**
```json
{
  "success": true,
  "data": { /* complete student object */ }
}
```

### 3. Create Student
**Endpoint:** `POST /api/students`

**Body:**
```json
{
  "email": "student@example.com",
  "name": "John Doe",
  "rollNo": "CS001",
  "branch": "Computer Science",
  "semester": 4,
  "mobileNo": "+91-9876543210",
  "fathersName": "Father Name",
  "theory": {
    "english": 75,
    "mathematics": 85,
    "science": 80,
    "history": 70,
    "total": 85
  },
  "practical": {
    "english": 72,
    "mathematics": 88,
    "science": 78,
    "history": 75,
    "total": 80
  }
}
```

### 4. Update Student
**Endpoint:** `PUT /api/students/:id`

**Body:** Same as Create Student

### 5. Delete Student
**Endpoint:** `DELETE /api/students/:id`

**Response:**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

## Frontend Integration Notes

The Students.jsx page expects:
- `student.theory.total` - Overall theory marks (0-100)
- `student.practical.total` - Overall practical marks (0-100)
- `student.overallScore` - Combined overall score
- `student.riskLevel` - "Low", "Medium", or "High"
- `student.predictedGrade` - Letter grade (A, B, C, etc.)

## Migration from Old Structure

If your backend currently uses the old structure:
- `internalMarks` → `theory.total`
- `assignmentScore` → `practical.total`

Create a transformation layer in your API middleware to convert old format to new format automatically for backward compatibility.

## Validation Rules

- All marks should be 0-100
- Total field should be calculated as average of individual marks
- Risk level should be determined from overall score:
  - Score >= 70: "Low"
  - Score 50-69: "Medium"
  - Score < 50: "High"
- Overall score = (theory.total + practical.total) / 2

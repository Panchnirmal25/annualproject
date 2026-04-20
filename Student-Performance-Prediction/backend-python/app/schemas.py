from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime


# ─── Theory / Practical sub-models ───────────────────────────────────────────

class TheoryMarks(BaseModel):
    midsem: float = 0
    assignment: float = 0
    endSemester: float = 0
    total: float = 0
    grade: str = ""


class PracticalMarks(BaseModel):
    midsem: float = 0
    assignment: float = 0
    endSemester: float = 0
    total: float = 0
    grade: str = ""


# ─── User schemas ────────────────────────────────────────────────────────────

class UserRegister(BaseModel):
    email: str = Field(..., min_length=5)
    password: str = Field(..., min_length=6)
    role: str = Field(default="student", pattern="^(admin|teacher|student)$")


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: str = Field(alias="_id")
    email: str
    role: str
    token: Optional[str] = None

    class Config:
        populate_by_name = True


# ─── Student schemas ─────────────────────────────────────────────────────────

class StudentCreate(BaseModel):
    id: Optional[int] = None
    name: str
    enrollmentId: Optional[str] = None
    branch: str
    semester: int = Field(ge=1, le=8)
    studentType: str = "Regular Student"
    subjects: List[str] = []
    attendance: float = 0

    theory: TheoryMarks = TheoryMarks()
    practical: PracticalMarks = PracticalMarks()

    combinedTotal: Optional[float] = None
    studyHours: float = 0
    discipline: float = 0
    participation: float = 0
    backlogs: int = 0
    consistency: float = 0
    projects: int = 0
    internships: str = "None"
    gender: str = ""
    age: int = 0

    predictionResult: Optional[str] = None
    grade: Optional[str] = None
    riskLevel: Optional[str] = None
    performanceScore: Optional[float] = None
    aiInsights: Optional[List[str]] = None
    avatar: Optional[str] = None


class StudentUpdate(BaseModel):
    name: Optional[str] = None
    enrollmentId: Optional[str] = None
    branch: Optional[str] = None
    semester: Optional[int] = None
    studentType: Optional[str] = None
    subjects: Optional[List[str]] = None
    attendance: Optional[float] = None

    theory: Optional[TheoryMarks] = None
    practical: Optional[PracticalMarks] = None

    combinedTotal: Optional[float] = None
    studyHours: Optional[float] = None
    discipline: Optional[float] = None
    participation: Optional[float] = None
    backlogs: Optional[int] = None
    consistency: Optional[float] = None
    projects: Optional[int] = None
    internships: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[int] = None

    predictionResult: Optional[str] = None
    grade: Optional[str] = None
    riskLevel: Optional[str] = None
    performanceScore: Optional[float] = None
    aiInsights: Optional[List[str]] = None
    avatar: Optional[str] = None


class StudentResponse(BaseModel):
    id: int
    name: str
    enrollmentId: str
    branch: str
    semester: int
    studentType: str = "Regular Student"
    subjects: List[str] = []
    attendance: float = 0

    theory: TheoryMarks = TheoryMarks()
    practical: PracticalMarks = PracticalMarks()

    combinedTotal: float = 0
    studyHours: float = 0
    discipline: float = 0
    participation: float = 0
    backlogs: int = 0
    consistency: float = 0
    projects: int = 0
    internships: str = "None"
    gender: str = ""
    age: int = 0

    predictionResult: str = ""
    grade: str = ""
    riskLevel: str = "Low"
    performanceScore: float = 0
    aiInsights: List[str] = []
    avatar: str = ""

    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

    class Config:
        populate_by_name = True

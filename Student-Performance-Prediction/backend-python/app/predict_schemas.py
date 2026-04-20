from pydantic import BaseModel
from typing import List, Optional


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


class PredictRequest(BaseModel):
    """Full student object sent from Node.js for AI prediction."""
    name: Optional[str] = None
    enrollmentId: Optional[str] = None
    branch: Optional[str] = None
    semester: Optional[int] = None
    studentType: Optional[str] = None
    subjects: Optional[List[str]] = []
    attendance: float = 0

    theory: Optional[TheoryMarks] = TheoryMarks()
    practical: Optional[PracticalMarks] = PracticalMarks()

    combinedTotal: Optional[float] = None
    studyHours: float = 0
    discipline: float = 0
    participation: float = 0
    backlogs: int = 0
    consistency: float = 0
    projects: int = 0
    internships: Optional[str] = "None"
    gender: Optional[str] = None
    age: Optional[int] = None


class PredictResponse(BaseModel):
    predictionResult: str
    riskLevel: str
    performanceScore: float
    aiInsights: List[str]

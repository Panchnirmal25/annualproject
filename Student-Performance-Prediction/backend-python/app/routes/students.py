import math
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.database import student_collection
from app.schemas import StudentCreate, StudentUpdate
from app.auth import get_current_user, require_roles

router = APIRouter(prefix="/api/students", tags=["Students"])


def student_helper(student: dict) -> dict:
    """Convert MongoDB document to a serializable dict."""
    student["_id"] = str(student["_id"])
    return student


def auto_compute_fields(data: dict) -> dict:
    """Auto-compute derived fields when not provided (mirrors frontend logic)."""
    # combinedTotal
    theory = data.get("theory", {})
    practical = data.get("practical", {})
    if data.get("combinedTotal") is None and theory and practical:
        data["combinedTotal"] = (theory.get("total", 0) + practical.get("total", 0)) / 2

    # performanceScore
    if data.get("performanceScore") is None:
        data["performanceScore"] = data.get("combinedTotal", 0)

    score = data.get("performanceScore", 0)

    # predictionResult
    if not data.get("predictionResult"):
        data["predictionResult"] = "PASS" if score >= 60 else "FAIL"

    # grade
    if not data.get("grade"):
        if score >= 90:
            data["grade"] = "A+"
        elif score >= 80:
            data["grade"] = "A"
        elif score >= 70:
            data["grade"] = "B+"
        elif score >= 60:
            data["grade"] = "B"
        elif score >= 50:
            data["grade"] = "C"
        else:
            data["grade"] = "F"

    # riskLevel
    if not data.get("riskLevel"):
        attendance = data.get("attendance", 0)
        backlogs = data.get("backlogs", 0)
        if attendance < 75 or score < 50 or backlogs > 1:
            data["riskLevel"] = "High"
        elif attendance < 85 or score < 70:
            data["riskLevel"] = "Medium"
        else:
            data["riskLevel"] = "Low"

    # avatar
    if not data.get("avatar") and data.get("name"):
        data["avatar"] = "".join(
            word[0] for word in data["name"].split() if word
        ).upper()

    # aiInsights
    if not data.get("aiInsights"):
        insights = []
        attendance = data.get("attendance", 0)
        discipline = data.get("discipline", 0)
        participation = data.get("participation", 0)
        consistency = data.get("consistency", 0)
        backlogs = data.get("backlogs", 0)
        projects = data.get("projects", 0)
        internships = data.get("internships", "None")

        if attendance >= 90:
            insights.append("Excellent attendance record")
        elif attendance < 75:
            insights.append("Low attendance risk")
        if score >= 80:
            insights.append("Strong academic performance")
        elif score < 60:
            insights.append("Needs academic support")
        if discipline >= 8:
            insights.append("High discipline level")
        if participation >= 8:
            insights.append("Active class participation")
        if consistency >= 8:
            insights.append("Consistent performance")
        if backlogs == 0:
            insights.append("No backlog history")
        if projects >= 2:
            insights.append("Good project experience")
        if internships and internships != "None":
            insights.append("Internship experience beneficial")

        data["aiInsights"] = insights if insights else ["Average performance across all metrics"]

    return data


@router.get("/")
async def get_all_students(
    search: Optional[str] = None,
    branch: Optional[str] = None,
    semester: Optional[int] = None,
    riskLevel: Optional[str] = None,
    predictionResult: Optional[str] = None,
    sortBy: str = "name",
    sortOrder: str = "asc",
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=50, ge=1, le=200),
    current_user: dict = Depends(get_current_user),
):
    """Get all students with filtering, sorting, and pagination."""
    query_filter = {}

    if search:
        query_filter["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"enrollmentId": {"$regex": search, "$options": "i"}},
        ]

    if branch:
        query_filter["branch"] = branch
    if semester:
        query_filter["semester"] = semester
    if riskLevel:
        query_filter["riskLevel"] = riskLevel
    if predictionResult:
        query_filter["predictionResult"] = predictionResult

    # Sort direction
    sort_dir = 1 if sortOrder == "asc" else -1

    # Count total
    total = await student_collection.count_documents(query_filter)

    # Pagination
    skip = (page - 1) * limit

    cursor = student_collection.find(query_filter).sort(sortBy, sort_dir).skip(skip).limit(limit)
    students = []
    async for doc in cursor:
        students.append(student_helper(doc))

    return {
        "success": True,
        "data": students,
        "total": total,
        "page": page,
        "limit": limit,
        "totalPages": math.ceil(total / limit) if limit > 0 else 0,
    }


@router.get("/{student_id}")
async def get_student_by_id(
    student_id: int,
    current_user: dict = Depends(get_current_user),
):
    """Get a single student by their id field."""
    student = await student_collection.find_one({"id": student_id})

    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found",
        )

    return {
        "success": True,
        "data": student_helper(student),
    }


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_student(
    student_data: StudentCreate,
    current_user: dict = Depends(require_roles("admin", "teacher")),
):
    """Create a new student. Only admin and teacher can create."""
    data = student_data.model_dump()

    # Auto-generate id
    if data.get("id") is None:
        last_student = await student_collection.find_one(sort=[("id", -1)])
        data["id"] = (last_student["id"] + 1) if last_student else 1

    # Auto-generate enrollmentId
    if not data.get("enrollmentId"):
        data["enrollmentId"] = f"EN{datetime.now().year}{str(data['id']).zfill(4)}"

    # Convert nested models to dicts
    if hasattr(data.get("theory"), "model_dump"):
        data["theory"] = data["theory"].model_dump()
    if hasattr(data.get("practical"), "model_dump"):
        data["practical"] = data["practical"].model_dump()

    # Auto-compute derived fields
    data = auto_compute_fields(data)

    # Add timestamps
    now = datetime.now(timezone.utc)
    data["createdAt"] = now
    data["updatedAt"] = now

    result = await student_collection.insert_one(data)
    created = await student_collection.find_one({"_id": result.inserted_id})

    return {
        "success": True,
        "data": student_helper(created),
    }


@router.put("/{student_id}")
async def update_student(
    student_id: int,
    student_data: StudentUpdate,
    current_user: dict = Depends(require_roles("admin", "teacher")),
):
    """Update a student. Only admin and teacher can update."""
    existing = await student_collection.find_one({"id": student_id})
    if not existing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found",
        )

    # Only update fields that were provided (not None)
    update_data = {k: v for k, v in student_data.model_dump().items() if v is not None}

    # Convert nested Pydantic models to dicts
    if "theory" in update_data and hasattr(update_data["theory"], "model_dump"):
        update_data["theory"] = update_data["theory"].model_dump()
    if "practical" in update_data and hasattr(update_data["practical"], "model_dump"):
        update_data["practical"] = update_data["practical"].model_dump()

    update_data["updatedAt"] = datetime.now(timezone.utc)

    if update_data:
        await student_collection.update_one(
            {"id": student_id}, {"$set": update_data}
        )

    updated = await student_collection.find_one({"id": student_id})

    return {
        "success": True,
        "data": student_helper(updated),
    }


@router.delete("/{student_id}")
async def delete_student(
    student_id: int,
    current_user: dict = Depends(require_roles("admin", "teacher")),
):
    """Delete a student. Only admin and teacher can delete."""
    result = await student_collection.delete_one({"id": student_id})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found",
        )

    return {
        "success": True,
        "message": "Student deleted successfully",
    }

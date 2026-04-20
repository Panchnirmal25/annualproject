"""
POST /api/predict

Receives a full student object from Node.js, runs the AI prediction
logic, and returns predictionResult, riskLevel, performanceScore, aiInsights.
"""

from fastapi import APIRouter
from app.predict_schemas import PredictRequest, PredictResponse

router = APIRouter(prefix="/api", tags=["Prediction"])


def run_prediction(data: PredictRequest) -> dict:
    """
    Core prediction engine.

    Performance score formula (weighted):
        attendance      → 30%
        studyHours      → 20%   (scaled to /10 then ×100)
        discipline      → 15%   (scaled /10 ×100)
        consistency     → 15%   (scaled /10 ×100)
        combinedTotal   → 20%   (already 0-100)
    """
    # ── 1. Derive combinedTotal if missing ────────────────────────────────
    combined_total = data.combinedTotal
    if combined_total is None:
        theo_total = data.theory.total if data.theory else 0
        prac_total = data.practical.total if data.practical else 0
        combined_total = (theo_total + prac_total) / 2

    # ── 2. Weighted performance score ─────────────────────────────────────
    attendance_score   = min(data.attendance, 100)
    study_score        = min(data.studyHours / 10 * 100, 100)
    discipline_score   = min(data.discipline / 10 * 100, 100)
    consistency_score  = min(data.consistency / 10 * 100, 100)
    academic_score     = min(combined_total, 100)

    performance_score = round(
        attendance_score   * 0.30
        + study_score      * 0.20
        + discipline_score * 0.15
        + consistency_score* 0.15
        + academic_score   * 0.20,
        2,
    )

    # ── 3. Risk level ─────────────────────────────────────────────────────
    if (
        data.attendance < 75
        or performance_score < 50
        or data.backlogs > 1
    ):
        risk_level = "High"
    elif data.attendance < 85 or performance_score < 70:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    # ── 4. Prediction result ──────────────────────────────────────────────
    if performance_score >= 70:
        prediction_result = "PASS"
    elif performance_score >= 50:
        prediction_result = "Average"
    else:
        prediction_result = "FAIL"

    # ── 5. AI Insights ────────────────────────────────────────────────────
    insights: list[str] = []

    # Attendance
    if data.attendance >= 90:
        insights.append("Excellent attendance record — keep it up!")
    elif data.attendance >= 75:
        insights.append("Good attendance, aim for 90%+ for better results.")
    else:
        insights.append("⚠️ Low attendance — this is directly impacting your grades.")

    # Academic performance
    if combined_total >= 85:
        insights.append("Strong academic performance across theory and practical.")
    elif combined_total >= 60:
        insights.append("Average academic scores — focus on weak subjects.")
    else:
        insights.append("⚠️ Academic scores are below passing threshold — seek help.")

    # Study habits
    if data.studyHours >= 7:
        insights.append("Excellent study discipline with high daily hours.")
    elif data.studyHours >= 4:
        insights.append("Moderate study hours — increase daily study time.")
    else:
        insights.append("⚠️ Very low study hours — a structured schedule is needed.")

    # Discipline
    if data.discipline >= 8:
        insights.append("High discipline level — setting a great example.")
    elif data.discipline < 5:
        insights.append("Low discipline score — consider mentorship or counseling.")

    # Participation
    if data.participation >= 8:
        insights.append("Active class participation — shows strong engagement.")
    elif data.participation < 5:
        insights.append("Low class participation — try engaging more actively.")

    # Backlogs
    if data.backlogs == 0:
        insights.append("No backlogs — excellent academic record.")
    elif data.backlogs == 1:
        insights.append("One backlog — clear it as soon as possible.")
    else:
        insights.append(f"⚠️ {data.backlogs} backlogs detected — immediate action required.")

    # Consistency
    if data.consistency >= 8:
        insights.append("Consistent performance throughout the semester.")
    elif data.consistency < 5:
        insights.append("Inconsistent performance — work on maintaining regularity.")

    # Projects & internships
    if data.projects >= 2:
        insights.append(f"Good project experience ({data.projects} projects) — strengthens employability.")
    if data.internships and data.internships.lower() != "none":
        insights.append("Internship experience will be a significant advantage.")

    # Risk summary
    if risk_level == "High":
        insights.append("🔴 HIGH RISK: Immediate academic intervention recommended.")
    elif risk_level == "Medium":
        insights.append("🟡 MEDIUM RISK: Monitor closely and provide timely support.")
    else:
        insights.append("🟢 LOW RISK: Student is performing well — encourage further excellence.")

    return {
        "predictionResult": prediction_result,
        "riskLevel": risk_level,
        "performanceScore": performance_score,
        "aiInsights": insights,
    }


@router.post("/predict", response_model=PredictResponse)
async def predict_student_performance(student: PredictRequest):
    """
    AI prediction endpoint.
    Called by Node.js on every student create/update.
    No auth required (internal service call).
    """
    result = run_prediction(student)
    return result

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import connect_db, close_db
from app.routes.auth import router as auth_router
from app.routes.students import router as student_router
from app.routes.predict import router as predict_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    await connect_db()
    yield
    await close_db()


app = FastAPI(
    title="Student Performance Prediction API",
    description="Python FastAPI backend for Student Performance Prediction system",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(student_router)
app.include_router(predict_router)   # ← AI prediction endpoint


@app.get("/")
async def root():
    return {"message": "Student Performance Prediction API is running 🚀"}

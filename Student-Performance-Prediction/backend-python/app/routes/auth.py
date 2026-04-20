from fastapi import APIRouter, HTTPException, status

from app.database import user_collection
from app.schemas import UserRegister, UserLogin
from app.auth import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user_data: UserRegister):
    """Register a new user."""
    # Check if user exists
    existing_user = await user_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists with this email",
        )

    # Hash password and create user
    hashed_pw = hash_password(user_data.password)
    user_doc = {
        "email": user_data.email,
        "password": hashed_pw,
        "role": user_data.role,
    }

    result = await user_collection.insert_one(user_doc)
    user_id = str(result.inserted_id)

    # Generate token
    token = create_access_token(data={"sub": user_id})

    return {
        "success": True,
        "data": {
            "_id": user_id,
            "email": user_data.email,
            "role": user_data.role,
            "token": token,
        },
    }


@router.post("/login")
async def login(user_data: UserLogin):
    """Login and get JWT token."""
    # Find user
    user = await user_collection.find_one({"email": user_data.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Verify password
    if not verify_password(user_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    user_id = str(user["_id"])
    token = create_access_token(data={"sub": user_id})

    return {
        "success": True,
        "data": {
            "_id": user_id,
            "email": user["email"],
            "role": user["role"],
            "token": token,
        },
    }

import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    PORT: int = int(os.getenv("PORT", "8000"))
    MONGO_URI: str = os.getenv("MONGO_URI", "mongodb://localhost:27017/student_performance")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "your_jwt_secret_key_change_this_in_production")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "10080"))

    class Config:
        env_file = ".env"


settings = Settings()

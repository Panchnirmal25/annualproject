import sys
import motor.motor_asyncio
from app.config import settings

# Force UTF-8 output on Windows consoles
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGO_URI)
database = client.get_default_database()

# Collections
user_collection = database.get_collection("users")
student_collection = database.get_collection("students")


async def connect_db():
    """Test the database connection."""
    try:
        await client.admin.command("ping")
        print("[OK] Connected to MongoDB")
    except Exception as e:
        print(f"[ERROR] MongoDB connection error: {e}")
        raise e


async def close_db():
    """Close the database connection."""
    client.close()
    print("[INFO] MongoDB connection closed")

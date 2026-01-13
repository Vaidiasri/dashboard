from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not found in environment variable")

# Convert postgresql:// to postgresql+asyncpg:// for async support
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Remove incompatible query parameters for asyncpg
# asyncpg doesn't support sslmode or channel_binding in URL
if "?" in DATABASE_URL:
    base_url, params = DATABASE_URL.split("?", 1)
    # Keep only ssl parameter, remove sslmode and channel_binding
    if "ssl=" in params or "sslmode=" in params:
        DATABASE_URL = base_url

# Create engine with SSL configuration
engine = create_async_engine(
    DATABASE_URL,
    echo=True,
    connect_args={"ssl": "require"},  # SSL configuration for asyncpg
)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
        await session.commit()

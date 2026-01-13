from fastapi import FastAPI
import uvicorn
from app.config.database import engine, Base

app = FastAPI(
    title="Self Visualization",
    description="FastAPI Self Visualization application with MVC structure",
    version="1.0.0",
)


@app.on_event("startup")
async def startup():
    """Create database tables on startup"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Database tables created successfully!")


@app.get("/")
async def root():
    return {"message": "Welcome to Self Visualization API"}


@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=9000, reload=True)

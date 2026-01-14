from fastapi import FastAPI
import uvicorn
from app.config.database import engine, Base
from app.routes.user import router as user_router
from app.routes.trck import router as track_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Self Visualization",
    description="FastAPI Self Visualization application with MVC structure",
    version="1.0.0",
)

# CORS Configuration
origins = [
    "http://localhost:5173",  # Vite default port
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "https://dashboard-production-e3b2.up.railway.app",  # Production frontend if applicable
    "*",  # Allow all for development convenience, can be restricted later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(user_router)
app.include_router(track_router)


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

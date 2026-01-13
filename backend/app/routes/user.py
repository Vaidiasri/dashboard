from fastapi import APIRouter, status, HTTPException, Depends
from ..schema.user import (
    UserCreate,
    UserResponse,
    UserLogin,
    FeatureClickCreate,
    FeatureClickResponse,
)
from ..config.database import get_db
from ..model.user import User
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def create_user(db: AsyncSession = Depends(get_db)):
    q

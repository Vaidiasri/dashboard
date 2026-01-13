from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


# Feature tracking ke liye schema
class ClickCreate(BaseModel):
    feature_name: str  # e.g. "date_filter", "age_filter"


# Response ke liye (Optional, but good practice)
class ClickOut(ClickCreate):
    id: UUID
    user_id: UUID
    timestamp: datetime

    class Config:
        from_attributes = True

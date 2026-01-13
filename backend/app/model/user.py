from ..config.database import Base
from datetime import datetime, timezone
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Uuid
import uuid


# yaha m user table bana raha hu
class User(Base):
    __tablename__ = "user"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    # Relationship with clicks
    clicks = relationship("FeatureClick", back_populates="user")

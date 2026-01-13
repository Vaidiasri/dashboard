from ..config.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Uuid
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid


class FeatureClick(Base):
    __tablename__ = "feature_clicks"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("user.id"), nullable=False)
    feature_name = Column(String, nullable=False)  # e.g. "date_filter"
    timestamp = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    # Relationship back to user
    user = relationship("User", back_populates="clicks")

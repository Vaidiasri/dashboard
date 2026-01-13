from ..config.database import Base
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime, timezone
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
import uuid


class FeatureClick(Base):
    __tablename__ = "feature_clicks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id"), nullable=False)
    feature_name = Column(String, nullable=False)  # e.g. "date_filter"
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationship back to user
    user = relationship("User", back_populates="clicks")

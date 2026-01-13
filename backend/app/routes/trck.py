from fastapi import APIRouter, HTTPException, status, Depends, Query
from datetime import datetime
from sqlalchemy import func, cast, Date, select
from ..config.database import get_db, AsyncSession
from ..model.featureclick import FeatureClick
from ..model.user import User as UserModel
from ..schema.featureclick import ClickCreate, ClickOut
from ..untils.auth import get_current_user

router = APIRouter(prefix="/track", tags=["tracks"])


@router.get("/analytics")
async def get_analytics(
    start_date: datetime = Query(...),
    end_date: datetime = Query(...),
    age_group: str = Query(None),
    gender: str = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    """Get analytics data for feature clicks."""
    # Build filters
    filters = [FeatureClick.timestamp.between(start_date, end_date)]

    if age_group == "<18":
        filters.append(UserModel.age < 18)
    elif age_group == "18-40":
        filters.append(UserModel.age.between(18, 40))
    elif age_group == ">40":
        filters.append(UserModel.age > 40)

    if gender:
        filters.append(UserModel.gender == gender)

    # Bar chart: clicks per feature
    bar_query = (
        select(FeatureClick.feature_name, func.count(FeatureClick.id))
        .join(UserModel)
        .where(*filters)
        .group_by(FeatureClick.feature_name)
    )

    # Line chart: clicks per day
    line_query = (
        select(cast(FeatureClick.timestamp, Date), func.count(FeatureClick.id))
        .join(UserModel)
        .where(*filters)
        .group_by(cast(FeatureClick.timestamp, Date))
    )

    bar_result = await db.execute(bar_query)
    line_result = await db.execute(line_query)

    return {
        "bar_data": [{"feature": row[0], "clicks": row[1]} for row in bar_result.all()],
        "line_data": [
            {"date": str(row[0]), "clicks": row[1]} for row in line_result.all()
        ],
    }


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=ClickOut)
async def create_track(
    request: ClickCreate,
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    """Create a new feature click tracking event."""
    new_click = FeatureClick(user_id=current_user.id, feature_name=request.feature_name)

    db.add(new_click)
    await db.commit()
    await db.refresh(new_click)

    return new_click

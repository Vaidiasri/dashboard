import sys
import os
import asyncio
from datetime import datetime, timezone, date
from sqlalchemy import select, func, cast, Date

# Add current directory to path so we can import app modules
sys.path.append(os.getcwd())

# Import your actual valid modules
from app.config.database import AsyncSessionLocal
from app.model.featureclick import FeatureClick
from app.model.user import User


async def test_persistence():
    async with AsyncSessionLocal() as db:
        print("--- STARTING PERSISTENCE TEST ---")

        # 1. Simulate frontend inputs (e.g. "2026-01-15")
        today_str = datetime.now().strftime("%Y-%m-%d")
        print(f"Frontend sends Date: {today_str}")

        s_date = datetime.strptime(today_str, "%Y-%m-%d").date()
        e_date = datetime.strptime(today_str, "%Y-%m-%d").date()

        # 2. Replicate trck.py logic EXACTLY
        start_dt = datetime.combine(s_date, datetime.min.time())
        end_dt = datetime.combine(e_date, datetime.max.time())

        print(f"Backend Filter Start: {start_dt}")
        print(f"Backend Filter End:   {end_dt}")

        # 3. Create a dummy user if needed (assuming user exists or we hack it)
        # For this test we just need a valid user_id. Let's pick the first one or create.
        result = await db.execute(select(User).limit(1))
        user = result.scalars().first()
        if not user:
            print("No user found! Creating dummy user...")
            user = User(
                email="debug@test.com",
                hashed_password="pw",
                name="Debug",
                age=25,
                gender="Male",
            )
            db.add(user)
            await db.commit()
            await db.refresh(user)

        print(f"Using User ID: {user.id}")

        # 4. Insert a new Click (Simulate POST /track)
        new_click = FeatureClick(user_id=user.id, feature_name="debug_test_feature")
        db.add(new_click)
        await db.commit()
        await db.refresh(new_click)

        print(f"Inserted Click Timestamp: {new_click.timestamp}")
        print(f"Is Timestamp Aware? {new_click.timestamp.tzinfo}")

        # 5. Run the Query (Simulate GET /track/analytics)
        filters = [FeatureClick.timestamp >= start_dt, FeatureClick.timestamp <= end_dt]

        query = (
            select(func.count(FeatureClick.id))
            .where(*filters)
            .where(FeatureClick.feature_name == "debug_test_feature")
        )

        count_result = await db.execute(query)
        count = count_result.scalar()

        print(f"Query Result Count: {count}")

        if count > 0:
            print("✅ TEST PASSED: Record found within filter range.")
        else:
            print(
                "❌ TEST FAILED: Record NOT found. Timezone/Filter mismatch suspected."
            )

        print("-------------------------------")


if __name__ == "__main__":
    if sys.platform == "win32":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(test_persistence())

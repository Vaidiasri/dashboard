"""
Complete Reset and Seed Script.
1. Drops all tables
2. Recreates all tables
3. Populates dummy data
ALL IN ONE GO!
"""

import asyncio
import random
from datetime import datetime, timedelta, timezone
from app.config.database import engine, Base, AsyncSessionLocal
from app.model.user import User
from app.model.featureclick import FeatureClick
import uuid
from app.utils.auth import get_password_hash

# Dummy data
USERNAMES = [
    "alice_smith",
    "bob_jones",
    "charlie_brown",
    "diana_prince",
    "eve_adams",
    "frank_miller",
    "grace_lee",
    "henry_ford",
    "iris_west",
    "jack_ryan",
    "kate_bishop",
    "leo_king",
    "maya_lopez",
    "noah_patel",
    "olivia_chen",
    "peter_parker",
    "quinn_taylor",
    "rose_wilson",
    "sam_fisher",
    "tina_turner",
]

FEATURE_NAMES = [
    "date_filter",
    "age_filter",
    "gender_filter",
    "bar_chart_click",
    "line_chart_click",
    "export_data",
    "refresh_button",
]

GENDERS = ["Male", "Female", "Other"]


async def reset_and_seed():
    print("🔄 Starting Full Reset & Seed Process...")

    # 1. Reset Database Structure
    print("\n🗑️  Step 1: Resetting Tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        print("   ✅ Tables dropped")
        await conn.run_sync(Base.metadata.create_all)
        print("   ✅ Tables recreated")

    # 2. Seed Data
    print("\n🌱 Step 2: Seeding Data...")
    async with AsyncSessionLocal() as db:

        # Create Users
        print("   👤 Creating 20 users...")
        users = []
        for username in USERNAMES:
            user = User(
                id=str(uuid.uuid4()),
                username=username,
                email=f"{username}@example.com",
                password=get_password_hash("password123"),
                age=random.randint(15, 60),
                gender=random.choice(GENDERS),
            )
            db.add(user)
            users.append(user)

        await db.commit()

        # Refresh users to get UUIDs
        for user in users:
            await db.refresh(user)
        print(f"   ✅ Created {len(users)} users")

        # Create Clicks
        print("   📊 Creating 150 clicks...")
        clicks = []
        end_date = datetime.now(timezone.utc)
        start_date = end_date - timedelta(days=30)

        for _ in range(150):
            user = random.choice(users)
            feature = random.choice(FEATURE_NAMES)

            # Random time
            random_days = random.randint(0, 30)
            random_hours = random.randint(0, 23)
            click_time = start_date + timedelta(days=random_days, hours=random_hours)

            click = FeatureClick(
                id=str(uuid.uuid4()),  # EXPLICIT STRING ID
                user_id=user.id,
                feature_name=feature,
                timestamp=click_time,
            )
            db.add(click)
            clicks.append(click)

        await db.commit()
        print(f"   ✅ Created {len(clicks)} clicks")

    print("\n" + "=" * 50)
    print("🎉 SUCCESS! Database is fresh and populated!")
    print("=" * 50)
    print("👉 Now RESTART your server (python main.py)")
    print("   to pick up the new database state.")


if __name__ == "__main__":
    asyncio.run(reset_and_seed())

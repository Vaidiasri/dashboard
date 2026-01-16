from fastapi import APIRouter, HTTPException, status, Depends
from ..utils.auth import (
    get_password_hash,
    verify_password,
    verify_access_token,
    create_access_token,
)
from ..config.database import get_db, AsyncSession
from ..schema.user import User, UserCreate, UserLogin, UserOut
from sqlalchemy import select
from ..model.user import User as UserModel

router = APIRouter(prefix="/users", tags=["users"])


# register
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=UserOut)
async def create_user(request: UserCreate, db: AsyncSession = Depends(get_db)):
    try:
        # Check if email or username already exists
        query = select(UserModel).where(
            (UserModel.email == request.email)
            | (UserModel.username == request.username)
        )
        result = await db.execute(query)
        existing_user = result.scalars().first()

        if existing_user:
            if existing_user.email == request.email:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered",
                )
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username already taken",
                )

        # Hash password and create new user
        hashed_pwd = get_password_hash(request.password)
        new_user = UserModel(
            username=request.username,
            email=request.email,
            password=hashed_pwd,
            age=request.age,
            gender=request.gender,
        )

        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)

        return new_user

    except HTTPException:
        raise
    except Exception as e:
        await db.rollback()
        print(f"❌ Error creating user: {e}")  # DEBUG LOG
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create user: {str(e)}",  # Return error to client for visibility
        )


@router.post("/login")
async def login(request: UserLogin, db: AsyncSession = Depends(get_db)):
    try:
        # Find user by username
        query = select(UserModel).where(UserModel.username == request.username)
        result = await db.execute(query)
        user = result.scalars().first()

        # Verify user exists and password is correct
        if not user or not verify_password(request.password, user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password",
            )

        # Create JWT token
        access_token = create_access_token(data={"sub": str(user.id)})

        return {"access_token": access_token, "token_type": "bearer"}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Login failed"
        )

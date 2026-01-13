from pydantic import BaseModel , EmailStr
from uuid import UUID
from datetime import datetime
from typing import Optional

class User(BaseModel):
    username:str
    email:EmailStr
    age:int
    gender:str
# Register model means thigs  require  for  resgistration
class UserCreate(User):
    password:str
# data respond model
class UserOut(User):
    id:UUID
    create_at:datetime
    class Config:
        from_attributes=True
# Login
class UserLogin(BaseModel):
    username:str
    password:str
# For Track the click
class ClickCreate(BaseModel):
    feature_name:str

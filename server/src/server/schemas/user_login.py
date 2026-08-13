from pydantic import BaseModel

class UserLogin(BaseModel):
    public_key: str
    singlet: str 
    commitment: str


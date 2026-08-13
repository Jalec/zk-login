from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.schemas.user_login import UserLogin
from server.schnorr import check_user_proof 

app = FastAPI()

origins = ["http://localhost:8001"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to zkLogin!"}

@app.post("/userLogin")
async def check_user_login(user_login: UserLogin):
    login_status = check_user_proof(user_login)
    return login_status

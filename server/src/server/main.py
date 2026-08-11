from fastapi import FastAPI
from pydantic import BaseModel
import base64
import hashlib
from ecdsa import NIST256p, ellipticcurve
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:8001"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserLogin(BaseModel):
    public_key: str
    singlet: str 
    commitment: str


@app.get("/")
async def root():
    return {"message": "Welcome to zkLogin!"}

@app.post("/userLogin")
async def check_user_login(user_login: UserLogin):
    public_key_bytes = base64.b64decode(user_login.public_key)
    commitment_bytes = base64.b64decode(user_login.commitment) 
    
    # generate challenge
    digest_commitment = hashlib.sha256(commitment_bytes).digest()
    c = int.from_bytes(digest_commitment, byteorder="big")  

    s = int(user_login.singlet,16)

    curve = NIST256p
    
    public_key = ellipticcurve.Point.from_bytes(
        curve.curve,
        public_key_bytes,
        curve.order
    ) 
    commitment = ellipticcurve.Point.from_bytes(
        curve.curve,
        commitment_bytes,
        curve.order
    ) 
    
    
    G = curve.generator

    sG = s * G

    cP = c * public_key

    right_side = cP + commitment

    return {
        "login": sG == right_side
    }

import base64
import hashlib
from ecdsa import NIST256p, ellipticcurve
from server.schemas.user_login import UserLogin

def check_user_proof(user_login: UserLogin) -> bool:
    """
    Verify the proof sent by the user with the schnorr protocol wether the user is the
    owner of the public key sent to the service.  sG == cP+R
    
    Args:
        user_login: disctionary containing the proof ( Public key, singlet and commitment ).
    
    Return:
        Boolean indicating wether the proof sent was valid (True) or not (False) after applying
        schnorr formula.
    """
    
    public_key_bytes = base64.b64decode(user_login.public_key)
    commitment_bytes = base64.b64decode(user_login.commitment) 
    
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

    return sG == right_side

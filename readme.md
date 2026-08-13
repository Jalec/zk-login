Steps required to verify the proof sent by the user:
    1. Decode base64 public key (P) and commitment (R) into raw bytes
    2. Generate challenge (c) by hashing the commitment (R)
    3. Reverse the hex value from the singlet (s) to its original int value. We dont have
       loss of precision because python has arbitrary-precision integers so it adapts to
       the original BigInt JavaScript value
    4. Convert the public key (P) and commitment (R) bytes to actual points in the curve 
       to be able to make those special multiplications** in the schnorr protocol

Annotations:
    - Both in the client and the server we use  NIST256P Elliptic curve

Sources:
    EC explanation - https://www.youtube.com/watch?v=NF1pwjL9-DE
    Schnorr protocol - https://www.youtube.com/watch?v=r9hJiDrtukI

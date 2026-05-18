from ecdsa import SECP256k1
import secrets

def serialize_private_key(d):
    """
    Return serialized private key by turning the scalar(d) into 32-byte big endian and then to hex
    """
    return d.to_bytes(32, "big").hex()

def serialize_public_key(Y):
    """
    Return serialized compressed public key by calculating prefix to later recover y from x and then
    turning the x into a 32-byte big endian to later add the prefix and transform to hex
    """
    x = Y.x()
    y = Y.y()
    
    prefix = b"\x02" if y % 2 == 0 else b"\x03"

    compressed = prefix + x.to_bytes(32, "big")

    return compressed.hex()

def generate_keys():
    """
    Return the private and public key as a result of generating a scalar (d) and then
    calculate: Y = d * G  Where Y is the public key and G the curve generator
    """ 
    G = SECP256k1.generator # Get our Generator point (G)

    order = SECP256k1.order
    d = secrets.randbelow(order - 1) + 1 # Generate a very large random number below order that 1 <= d < order 

    Y = d * G
    
    private_key = serialize_private_key(d)
    public_key = serialize_public_key(Y) 

    return private_key, public_key

if __name__ == "__main__":
    private_key, public_key = generate_keys()
    print(f"This is the private key: {private_key}") 
    print(f"This is the public key: {public_key}")

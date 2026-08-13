import { base64urlToBytes, bytesToBigInt, bytesToHex, hexToBytes } from './utils.js'

const EcKeyGenParams = {
  name: "ECDSA",
  namedCurve: "P-256"
};

async function generateKeys() {
  const keyPair = await crypto.subtle.generateKey(EcKeyGenParams, true, ["sign", "verify"]);

  return keyPair;
}

export async function generateUserKeys() {
  const keyPair = await generateKeys();
  const jwkPrivKey = await crypto.subtle.exportKey("jwk", keyPair.privateKey);
  const base64PrivKey = jwkPrivKey.d;

  const bytesPrivKey = base64urlToBytes(base64PrivKey);
  const rawPubKey = await crypto.subtle.exportKey("raw", keyPair.publicKey);
  
  const hexPublicKey = bytesToHex(rawPubKey);
  const hexPrivateKey = bytesToHex(bytesPrivKey);
  return [hexPublicKey, hexPrivateKey];
}

export async function login(hexPublicKey, hexPrivateKey) {
  //console.log("User's public key: ", hexToBytes(hexPublicKey).buffer);
  //console.log("Back again: ", bytesToHex(hexToBytes(hexPublicKey)));
  //console.log("User's private key: ", hexToBytes(hexPrivateKey));
 
  const bigIntPrivKey = bytesToBigInt(hexToBytes(hexPrivateKey));
  const publicKey = hexToBytes(hexPublicKey);

  const schnorrKeyPair = await generateKeys();
  const [nonce, commitment] = await extractKeys(schnorrKeyPair);

  const singlet = await generateSinglet(bigIntPrivKey, nonce, commitment);

  const publicKeyBase64 = btoa(
    String.fromCharCode(...publicKey)
  );

  const commitmentBytes = new Uint8Array(commitment);
  const commitmentBase64 = btoa(
    String.fromCharCode(...commitmentBytes)
  );


  const response = await fetch("http://127.0.0.1:8000/userLogin", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ 
      "public_key": publicKeyBase64,
      "singlet": singlet.toString(16),
      "commitment": commitmentBase64 
    })
  })

  const data = await response.json();
}


async function extractKeys(keyPair) {
  const jwkPrivKey = await crypto.subtle.exportKey("jwk", keyPair.privateKey);
  const base64PrivKey = jwkPrivKey.d;

  const bytesPrivKey = base64urlToBytes(base64PrivKey);
  const bigIntPrivKey = bytesToBigInt(bytesPrivKey);

  const rawPubKey = await crypto.subtle.exportKey("raw", keyPair.publicKey);

  return [bigIntPrivKey, rawPubKey]; 
}

async function generateChallenge(commitmentPoint) {
  const hash = await crypto.subtle.digest("SHA-256", commitmentPoint);
  const challenge = bytesToBigInt(new Uint8Array(hash));
  
  return challenge;
}

async function generateSinglet(privateKey, nonce, commitment) {
  const challenge = await generateChallenge(commitment);
  const n = BigInt("0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551");

  // s = c * x + r
  const s = (nonce + challenge * privateKey) % n;

  return s;
}

const userKeyPair = await generateKeys();
const schnorrKeyPair = await generateKeys();
const [privKey, pubKey] = await extractKeys(userKeyPair);
const [nonce, commitment] = await extractKeys(schnorrKeyPair);

const singlet = await generateSinglet(privKey, nonce, commitment);

const publicKeyBytes = new Uint8Array(pubKey);
const publicKeyBase64 = btoa(
    String.fromCharCode(...publicKeyBytes)
);

const commitmentBytes = new Uint8Array(commitment);
const commitmentBase64 = btoa(
    String.fromCharCode(...commitmentBytes)
);

//const response = await fetch("http://127.0.0.1:8000/userLogin", {
//  method: "POST",
//  headers: {"Content-Type": "application/json"},
//  body: JSON.stringify({ 
//    "public_key": publicKeyBase64,
//    "singlet": singlet.toString(16),
//    "commitment": commitmentBase64 
//  })
//})

//const data = await response.json();
//console.log(data);

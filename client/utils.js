export function base64urlToBytes(base64Url) {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4,"=");
  
  const binary = atob(padded);

  return Uint8Array.from(binary, c => c.charCodeAt(0));
}

export function bytesToBigInt(bytes) {
    return BigInt(
        "0x" +
        Array.from(bytes)
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("")
    );
}

export function bytesToHex(bytes) {
  const arr = bytes instanceof ArrayBuffer ? new Uint8Array(bytes) : bytes; // Uint8Array ok
  return Array.from(arr, b => b.toString(16).padStart(2, "0")).join("");
}

export function hexToBytes(hex) {
  if (hex.length % 2 !== 0) {
    throw new Error("Hex string must have an even length");
  }

  const bytes = new Uint8Array(hex.length / 2);

  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }

  return bytes;
}


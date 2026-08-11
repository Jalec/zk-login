import { generateUserKeys, login } from "./crypto.js";

const btnGetKeys = document.getElementById("btnGetKeys");
const btnUserLogin= document.getElementById("btnUserLogin");

btnGetKeys.addEventListener("click", async function() {
  const [publicKey, privateKey] = await generateUserKeys();
  document.getElementById("publicKeyInput").value = publicKey; 
  document.getElementById("privateKeyInput").value = privateKey; 
});

btnUserLogin.addEventListener("click", async function() {
  const userPublicKey = document.getElementById("publicKeyInput").value; 
  const userPrivateKey = document.getElementById("privateKeyInput").value; 
  await login(userPublicKey, userPrivateKey);
});





import { generateUserKeys, login } from "./crypto.js";

const btnGetKeys = document.getElementById("btnGetKeys");
const btnUserLogin= document.getElementById("btnUserLogin");
const modalKeys = document.getElementById("modalKeys");
const spanClose = document.getElementById("closeModal");

btnGetKeys.addEventListener("click", async function() {
  modalKeys.style.display = "block";
  const [publicKey, privateKey] = await generateUserKeys();
  document.getElementById("publicKeyInput").value = publicKey; 
  document.getElementById("privateKeyInput").value = privateKey; 
});

btnUserLogin.addEventListener("click", async function() {
  const userPublicKey = document.getElementById("publicKeyInput").value; 
  const userPrivateKey = document.getElementById("privateKeyInput").value; 
  await login(userPublicKey, userPrivateKey);
});

spanClose.onclick = function() {
  modalKeys.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalKeys) {
    modalKeys.style.display = "none";
  }
}


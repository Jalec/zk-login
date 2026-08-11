const testEl = document.getElementsByClassName("test");
console.log(testEl);

testEl.addEventListener("click", () => {
  console.log("I got clicked!")
  alert("I got clicked!");
});

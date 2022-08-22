console.log("Successfully imported script (index.js)");

console.log("Adding click listeners");
document.addEventListener("click", (event) => {
  // the click is the signup button
  if (event.target.matches(".signup")) {
    console.log("signup has been pressed")
  }

  // the click is the login button
  if (event.target.matches(".login")) {
    console.log("login has been pressed")
  }
});

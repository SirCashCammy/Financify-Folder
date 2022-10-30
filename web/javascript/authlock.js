const isLoggedIn = !!localStorage.getItem("fapi_key");

if (!isLoggedIn) {
  alert("Not logged in");
  window.location.replace("http://localhost:5500/web/html/index.html");
} else console.log("confirmed auth");

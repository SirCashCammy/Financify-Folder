console.log("Successfully imported script (index.js)");

const BACKEND_URL = "http://localhost:5050";

/**
 * login to application (returns apiKey|error)
 *
 * @example
 * // returns { status: 400, message: "failed to login" }
 * login("invalid_email", "invalid_password");
 *
 * @example
 * // returns { status: 200, message: "success", apiKey: "some_api_key"}
 * login("valid_email", "valid_password")
 *
 * @param { string } email email to login with
 * @param { string } password password to login with
 * @param { (status, code) => void } cb callback function
 */
async function login(_email, _password, cb) {
  const response = await axios
    .post(`${BACKEND_URL}/api/v1/auth/login`, {
      email: _email,
      password: _password,
    })
    .catch((_failed) => cb(false));

  if (response.data.status == 200) return cb(true, response.data.apiKey);

  cb(false);
}

/**
 * register an account to backend (returns message|error)
 *
 * @example
 * // returns { status: 200, message: "Created user" }
 * login("valid_email", "valid_password")
 *
 * @example
 * // returns { status: 500, message: "Something went wrong" }
 * login("invalid_email", "invalid_password");
 *
 * @param { string } email email to register with
 * @param { string } password password to register with
 * @param { (status, code) => void } cb callback function
 */
async function register(_email, _password, cb) {
  const response = await axios
    .post(`${BACKEND_URL}/api/v1/auth/register`, {
      email: _email,
      password: _password,
    })
    .catch((_failed) => cb(false));

  if (response.data.status == 200) return cb(true, response.data.apiKey);

  cb(false);
}

/**
 * This is an override function to prevent the default behaviour of the
 * browser (refresh / relocating) to another webpage
 */
function handleLogin() {
  // grab form details
  const email = document.getElementById("email").value;
  const password = document.getElementById("pwd").value;
  const statusMessage = document.getElementById("status-text");

  // make sure user has inputted values
  let f = false;
  if (!email || email.trim() === "") f = true;
  if (!password || password.trim() === "") f = true;

  statusMessage.innerText = "Logging in";
  statusMessage.classList.add("show");

  if (f) {
    statusMessage.innerText = "Failed to login (Invalid password/email)";
    setTimeout(() => {
      statusMessage.classList.remove("show");
    }, 3000);
    return;
  }

  // run login function
  login(email, password, (s, code) => {
    if (!s) {
      statusMessage.innerText = "Failed to login (Invalid password/email)";

      setTimeout(() => {
        statusMessage.classList.remove("show");
      }, 3000);
    } else {
      window.localStorage.setItem("fapi_key", code);
      window.location.replace('http://localhost:5500/web/html/dashboard.html');
    }
  });
}

/**
 * This is an override function to prevent the default behaviour of the
 * browser (refresh / relocating) to another webpage
 */
function handleRegister() {
  // grab form details
  const email = document.getElementById("email").value;
  const password = document.getElementById("pwd").value;
  const statusMessage = document.getElementById("status-text");

  // make sure user has inputted values
  let f = false;
  if (!email || email.trim() === "") f = true;
  if (!password || password.trim() === "") f = true;

  statusMessage.innerText = "Registering";
  statusMessage.classList.add("show");

  if (f) {
    statusMessage.innerText = "Failed to register (Invalid fields)";
    setTimeout(() => {
      statusMessage.classList.remove("show");
    }, 3000);
    return;
  }

  // run register function
  register(email, password, (s, code) => {
    if (!s) {
      statusMessage.innerText = "Failed to register (Invalid fields)";

      setTimeout(() => {
        statusMessage.classList.remove("show");
      }, 3000);
    } else {
      window.localStorage.setItem("fapi_key", code);
      window.location.replace('http://localhost:5500/web/html/dashboard.html');
    }
  });
}

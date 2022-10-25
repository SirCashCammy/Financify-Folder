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
 */
async function login(_email, _password) {
  const response = await fetch(`${BACKEND_URL}/login`, {
    method: "POST",
    mode: "default",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: {
      email: _email,
      password: _password,
    },
  });

  console.log(response);
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
 */
async function register(_email, _password) {
  const response = await fetch(`${BACKEND_URL}/register`, {
    method: "POST",
    mode: "default",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: {
      email: _email,
      password: _password,
    },
  });
}

//Express is the extension I'm using for the server (node.js runtime)
const express = require("express");
const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");
const router = express.Router();

// get auth instance from firebase
const { auth } = require("../firebase.js");

router.get("/login", async (req, res) => {
  // because we're using body-parser we can access Request.body (this is a json object with maximum size defined in index.js)
  const { email, password } = req.body;

  // if user hasn't provided email or password return's 400 bad request "error"
  if (!email || !password)
    return res
      .status(400)
      .send({ status: 400, message: "Please provide both email + password" });

  try {
    // attempt to login with credentials provided
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (userCredentials.user) {
      // User is logged in now. (Wouldn't work large scale though.)

      res.status(200).send({
        status: 200,
        message: "success",
        apiKey: process.env.API_KEY,
      });
    } else {
      // user failed to login
      res.status(400).send({ status: 400, message: "failed to login" });
    }
  } catch (err) {
    if (err.code == "auth/user-not-found") {
      // user failed to login
      res.status(400).send({ status: 400, message: "failed to login" });
      return;
    }

    if (err.code == "auth/wrong-password") {
      res.status(400).send({ status: 400, message: "failed to login"})
      return;
    }

    // something went wrong (server-side);
    console.log(err);
    res.status(500).send({ status: 500, message: "Something went wrong" });
  }
});

router.get("/register", async (req, res) => {
  // because we're using body-parser we can access Request.body (this is a json object with maximum size defined in index.js)
  const { email, password } = req.body;

  // if user hasn't provided email or password return's 400 bad request "error"
  if ((!email, !password))
    return res.status(400).send({ status: 400, message: "Missing Field(s)" });

  try {
    // create a user with the provided credentials.
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // if the user item exists in userCredentials then a user has been created and can return 200
    if (userCredentials.user) {
      return res.status(200).send({ status: 200, message: "Created user" });
    } else {
      // else it would've failed and can return 400
      return res.status(400).send({
        status: 200,
        message: "Failed to create user (possibly invalid input)",
      });
    }
  } catch (err) {
    console.log(err);

    // if something went wrong (such as an error not getting handled above) return 500; (server error)
    res.status(500).send({ status: 500, message: "Something went wrong" });
  }
});

module.exports = router;

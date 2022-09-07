// import third party things (npm)
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// import route handlers
const authHandler = require("./routes/auth");

// create server
const app = express();

// middleware
// allow json to be passed in body (limiting size to 10mb)
app.use(bodyParser.json({ limit: "10mb" }));

// allow parameters to be passed into the url
app.use(
  bodyParser.urlencoded({
    limit: "10mb", // limit the max amount of information
    extended: true, // false = querystring library | true = qs library (we want qs in this instance)
    parameterLimit: 5000, // set max amount of url parameters
  })
);

// cors, security (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
// * = "wildcard", allows any domain | 200 on success (http status convention of 200 for success)
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

// bind routes to server
app.get("/api/v1", function (_req, res) {
  res.status(200).send({ status: 200, routes: ["/auth"] });
});

app.use("/api/v1/auth", authHandler);

// handle 404
app.use((_req, res) => {
  res.status(404).send({ status: 404 });
});

// bind server to port 5050
app.listen(5050, function () {
  console.log("App listening on port 5050");
});

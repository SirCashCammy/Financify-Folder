// import express 
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

// create server
const app = express();

// middleware
// allow json to be passed in body (limiting size to 10mb)
app.use(bodyParser.json({ limit: "10mb "}))

// allow parameters to be passed into the url
app.use(
    bodyParser.urlencoded({
        limit: "10mb", // limit the max amount of information
        extended: true, // false = querystring library | true = qs library (we want qs in this instance)
        parameterLimit: 5000, // set max amount of url parameters
    })
)

app.use()

// bind routes to server
app.get("/api/v1", function (_req, res) {
    res.status(200).send({})
})



// bind server to port 5050
function onReady() {
    console.log("App listening on port 5050")
}

app.listen(5050, onReady)
var express = require("express");
var app = express();	// invoke the function that is returned from require
// app is also a function, with some properties and methods on it, because function is an object

// place the connection, could also do it in a seperate file
// require mongoose and config, beacuse the app.js is sitting at the root
// the config will mean the config folder and get the index.js
var mongoose = require("mongoose");
var config = require("./config");


// set up the port, if there is an environment variable then set up to it, otherwise 3000
var port = process.env.PORT || 3000;

// set up a public asset folder for front-end, it'll just be delivered to the browser 
app.use("/assets", express.static(__dirname + "/public"));

// set the view engine, using server side templating
app.set("view engine", "ejs");

// connect to mongodb
mongoose.connect(config.getDbConnectionString());

// listen on the port
app.listen(port);
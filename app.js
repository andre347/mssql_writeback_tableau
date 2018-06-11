/**
 * Tableau Write Back Extension // MSSQL
 *
 * @version 1.0
 * @author Andre de Vries, https://github.com/andre347/
 * @link    https://theinformationlab.co.uk
 *
 */

// set up server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sql = require("mssql");
const port = 3000;
let pool;

//get helper files
let helpersPost = require("./helpers/indexPost");
let helpersGet = require("./helpers/indexGet");

//set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.engine("html", require("ejs").renderFile);
app.use(bodyParser.json());

//first route to notify user to go to login page
app.get("/", helpersGet.root);

//extension
app.get("/extension", helpersGet.extension);

//about page
app.get("/about", helpersGet.about);

// get and post login page
app.get("/login", helpersGet.login);

//tableau data
app.get("/tableau", helpersGet.tableauData);
app.post("/tableau", helpersPost.tableauData);

//get write back form and post data
app.get("/writeData", helpersGet.renderData);
app.post("/writeData", helpersPost.writeData);
app.post("/getData", helpersPost.getData);

//start the server
app.listen(port, function() {
  console.log("Our server is running on " + port);
});

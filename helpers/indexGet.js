const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sql = require("mssql");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.engine("html", require("ejs").renderFile);
app.use(bodyParser.json());

exports.root = function(req, res) {
  res.send("Go to /login");
};

exports.login = function(req, res) {
  res.render("login.html");
};

exports.extension = function(req, res) {
  res.render("extension.html");
};

exports.about = function(req, res) {
  res.render("about.html");
};

exports.renderData = function(req, res) {
  res.render("index.html");
};

exports.tableauData = function(req, res) {
  res.send(req.body);
};

module.exports = exports;

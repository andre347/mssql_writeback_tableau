const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sql = require("mssql");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.engine("html", require("ejs").renderFile);
app.use(bodyParser.json());

exports.writeData = function(req, res) {
  let column = [];
  let values = [];
  //insert data into SQL
  let data = JSON.stringify(req.body);

  JSON.parse(data, (key, value) => {
    //push into an array so we can use it the query
    column.push(key.trim());
    values.push(value);
  });

  arr = column.filter(function(n) {
    return n != "";
  });

  arr2 = values.filter(function(n) {
    if (Object.keys(n).length !== 0) {
      return `'${n}'`;
    }
  });

  arr3 = addQuote(arr2);
};

exports.tableauData = function(req, res) {
  let auth = {
    user: req.body.username,
    password: req.body.password,
    server: req.body.server,
    database: req.body.database,
    table: req.body.table
  };

  let query = `select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='${
    auth.table
  }'`;
  console.log(query);

  new sql.ConnectionPool(auth)
    .connect()
    .then(function(pool) {
      return pool.request().query(query);
    })
    .then(function(result) {
      res.send(result.recordset);
      sql.close();
    })
    .catch(function(err) {
      res.status(500).send({ message: `${err}` });
      sql.close();
    });
};

exports.getData = function(req, res) {
  let authData = JSON.parse(req.body.authentication);
  let auth = {
    user: authData.username,
    password: authData.password,
    server: authData.server,
    database: authData.database,
    table: authData.table
  };
  console.log(auth);

  let column = [];
  let values = [];
  //insert data into SQL
  let data = req.body.data;

  JSON.parse(data, (key, value) => {
    //push into an array so we can use it the query
    column.push(key.trim());
    values.push(value);
  });

  arr = column.filter(function(n) {
    return n != "";
  });

  arr2 = values.filter(function(n) {
    if (Object.keys(n).length !== 0) {
      return `'${n}'`;
    }
  });

  arr3 = addQuote(arr2);

  let newArr = arr.toString().replace(/,[0-9]/g, "");

  let insertQuery = `INSERT INTO ${
    authData.table
  } (${newArr}) VALUES (${arr3});`;

  console.log(insertQuery);

  //send the insertQuery
  new sql.ConnectionPool(auth)
    .connect()
    .then(function(pool) {
      return pool.request().query(insertQuery);
    })
    .then(function(result) {
      console.log(result);
      sql.close();
    })
    .catch(function(err) {
      if (err) throw err;
      sql.close();
    });
  res.end();
};

function addQuote(val) {
  return val.length ? "'" + val.join("','") + "'" : "";
}

module.exports = exports;

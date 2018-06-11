"use strict";
const authentication = "authentication";
let server = document.getElementById("server");
let database = document.getElementById("database");
let table = document.getElementById("table");
let username = document.getElementById("user");
let password = document.getElementById("password");
let object;

//when dom has loaded
document.addEventListener("DOMContentLoaded", load);

function load() {
  //pop up info tooltip
  $(function() {
    $('[data-toggle="popover"]').popover();
  });

  tableau.extensions.initializeDialogAsync().then(function(openPayload) {
    console.log(tableau.extensions.settings.getAll());
    saveCredentials;
    if (!tableau.extensions.settings.get(authentication)) {
      console.log("Auth needs to be added");
    } else {
      console.log("Auth is still there");
    }
  });
}

let btn = document.getElementById("btn").addEventListener("click", getData);

function getData(e) {
  saveCredentials();
  e.preventDefault();
}

function saveCredentials() {
  object = {
    server: server.value,
    database: database.value,
    table: table.value,
    username: username.value,
    password: password.value
  };

  if (
    server.value == "" ||
    database.value == "" ||
    table.value == "" ||
    username.value == "" ||
    password.value == ""
  ) {
    document.getElementById("error").style.display = "block";
  } else {
    document.getElementById("success").style.display = "block";
    tableau.extensions.settings.set(authentication, JSON.stringify(object));
    tableau.extensions.settings.saveAsync().then(newSavedSettings => {
      console.log("Data Saved!");
      console.log(tableau.extensions.settings.getAll());
    });
  }
}

let dataSource = document.getElementById("checkDS");
dataSource.addEventListener("change", function() {
  if (this.checked) {
    database.disabled = true;
    table.disabled = true;
  } else {
    database.disabled = false;
    table.disabled = false;
  }
});

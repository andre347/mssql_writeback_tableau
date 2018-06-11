"use strict";
// load runs when body loads

let object;
let array = [];
let dashboardDataSources = [];

//FETCH DATA
function load() {
  //load tableau extension
  tableau.extensions.initializeDialogAsync().then(function(payLoad) {
    let authentication = "authentication";
    console.log("Tableau Loaded");
    let object = tableau.extensions.settings.get(authentication);
    console.log(object);
    //fetch column data
    fetchPost(object);
    sendData();
    document.getElementById("refresh").addEventListener("click", refreshDS);
  });

  //close load
}

//tick or untick the select boxes
function show(id) {
  let input = document.getElementById(id);
  input.disabled = input.disabled
    ? (input.disabled = false)
    : (input.disabled = true);
}

// function to get the column names
function fetchPost(object) {
  fetch("/tableau", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: object
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      if (myJson.hasOwnProperty("message")) {
        let error = myJson.message;
        loginError(error);
      } else {
        myJson.forEach(function(column) {
          let name = column.COLUMN_NAME;
          console.log(name);
          dataInput(name);
        });
      }
    })
    .catch(function(err) {
      if (err) {
        throw err;
      }
    });
}

// create an input for each form
function dataInput(name) {
  let form = document.getElementById("formPost");
  form.innerHTML += `<div class="form-group row">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" aria-label="Checkbox for following text input" class="filled-in" data-value=${name} onclick="show(this.dataset.value) ">
                                </div>
                            </div>
                            <input type="text" class="form-control" id=${name} placeholder=${name} name=${name} disabled> </div>
                        <div class="invalid-feedback">
                            ${name} must be specified
                        </div>
                    </div>`;

  //close loop
}

//if error message display
function loginError(err) {
  let form = document.getElementById("errorMessage");
  form.innerHTML = `<p>${err}</p>`;
}

function sendData() {
  document.getElementById("btn").addEventListener("click", function() {
    // get the input values
    let input = document.querySelectorAll(".form-control");
    // test input data
    console.log(input);
    Array.from(input).forEach(function(e) {
      if (e.value !== "") {
        console.log(e.value);
        array.push({ [e.id]: e.value });
      }
    });
    let data = JSON.stringify(array);
    let object = tableau.extensions.settings.getAll();
    console.log(object);

    object.data = data;

    fetchData(object);

    //add note and reset the form
    let rowData = document.getElementById("rowAdd");
    removeNote(rowData);
    let reset = document.querySelectorAll(".form-control");
    Array.from(reset).forEach(function(r) {
      r.disabled = true;
    });
    document.getElementById("postData").reset();
  });
}

function fetchData(object) {
  fetch("/getData", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(object)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
    })
    .catch(function(err) {
      if (err) {
        throw err;
      }
    });
}

// tableau extension
function refreshDS() {
  const dashboard = tableau.extensions.dashboardContent.dashboard;
  //refresh all datasources in the workbook
  dashboard.worksheets.forEach(worksheet => {
    dashboardDataSources.push(worksheet.getDataSourcesAsync());
  });
  console.log(dashboardDataSources);
  Promise.all(dashboardDataSources).then(function(fetchResults) {
    fetchResults.forEach(function(dataSourceWorksheet) {
      dataSourceWorksheet.forEach(function(dataSources) {
        dataSources.refreshAsync().then(function() {
          console.log("All Data Sources Refreshed");
          let dataSourceRefresh = document.getElementById("refreshDS");
          //remove the notification after 4 seconds
          removeNote(dataSourceRefresh);
        });
      });
    });
  });
}

//remove notification
function removeNote(element) {
  element.style.display = "block";
  //reload page to clear forms
  location.reload();
  setTimeout(function() {
    element.style.display = "none";
  }, 4000);
}

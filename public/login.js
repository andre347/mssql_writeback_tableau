//get db button
let btn = document.getElementById("btn");

const authSettings = "authentication";

document.addEventListener("DOMContentLoaded", function() {
  tableau.extensions.initializeAsync({ configure: configure }).then(function() {
    let settings = tableau.extensions.settings;
    console.log(settings);
    if (!tableau.extensions.settings.get(authSettings)) {
      console.log("Auth needs to be added");
      document.getElementById("loadImage").src = "img/new_db.png";
    } else {
      console.log("Auth still persists");
      document.getElementById("loadImage").src = "img/db.png";
    }
  });
});

function configure() {
  const configMenu = `${window.location.origin}/login`;
  tableau.extensions.ui
    .displayDialogAsync(configMenu, "Payload Message", {
      height: 550,
      width: 550
    })
    .then(closePayload => {
      if (!tableau.extensions.settings.get(authSettings)) {
        console.log("Auth needs to be added");
      } else {
        console.log("Auth still persists");
      }
    })
    .catch(error => {
      switch (error.errorCode) {
        case tableau.ErrorCodes.DialogClosedByUser:
          console.log("Dialog was closed by user");
          break;
        default:
          console.error(error.message);
      }
    });
}

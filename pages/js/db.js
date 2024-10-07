let db;
const dbName = "fpDatabase";
const dbVersion = 1;
var nsnackbarmessage;
var spinner;
var noptions = {
  content: nsnackbarmessage, // text of the snackbar
  style: "toast", // add a custom class to your snackbar
  timeout: 0, // time in milliseconds after the snackbar autohides, 0 is disabled
  htmlAllowed: true, // allows HTML as content value
  onClose: function () {}, // callback called when the snackbar gets closed.
};
var snackbarmessage;
var options = {
  content: snackbarmessage, // text of the snackbar
  style: "toast", // add a custom class to your snackbar
  timeout: 0, // time in milliseconds after the snackbar autohides, 0 is disabled
  htmlAllowed: true, // allows HTML as content value
  onClose: function () {}, // callback called when the snackbar gets closed.
};
const storeName = 'sessionData';
var  role, loggedInStatus;
 const openDB =  () => {

 
  const request = indexedDB.open(dbName, dbVersion);
  


  request.onerror = function (event) {
    console.error("Database error: ", event.target.error.name);
  };

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains(storeName)) {
      // console.log(storeName + ": does not exist");
      const objectStore = db.createObjectStore(storeName, { keyPath: 'id' });
      objectStore.createIndex("generalrole", "generalrole", { unique: false });
      objectStore.createIndex("username", "username", { unique: false });
      objectStore.createIndex("password", "password", { unique: false });
      objectStore.createIndex("pin", "pin", { unique: false });
      objectStore.createIndex("image", "image", { unique: false });
      objectStore.createIndex("last_logged_in_at", "last_logged_in_at", { unique: false });
      objectStore.createIndex("userid", "userid", { unique: true });
      objectStore.createIndex("logged_in", "logged_in", { unique: false });
      objectStore.createIndex("current_lockscreen", "current_lockscreen", { unique: false });
      objectStore.createIndex("plen", "plen", { unique: false });
      // Log a message when the object store is created
  
    } else {
      db.deleteObjectStore(storeName); 
      const objectStore = db.createObjectStore(storeName, { keyPath: 'id' });
      objectStore.createIndex("generalrole", "generalrole", { unique: false });
      objectStore.createIndex("username", "username", { unique: false });
      objectStore.createIndex("password", "password", { unique: false });
      objectStore.createIndex("pin", "pin", { unique: false });
      objectStore.createIndex("image", "image", { unique: false });
      objectStore.createIndex("last_logged_in_at", "last_logged_in_at", { unique: false });
      objectStore.createIndex("userid", "userid", { unique: true });
      objectStore.createIndex("logged_in", "logged_in", { unique: false });
      objectStore.createIndex("current_lockscreen", "current_lockscreen", { unique: false });
      objectStore.createIndex("plen", "plen", { unique: false });
    }
    
  };

  request.onsuccess = function (event) {
    console.log("Database opened successfully!");
    // use the db object to interact with the database

    db = event.target.result;
    const transaction = db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const index = objectStore.index('generalrole');
    const nrequest = index.openCursor();

 
    nrequest.addEventListener('error', function (event) {
      console.log("Error: " + event.target.errorCode);
    });

    nrequest.onsuccess = function (event) {
      const cursor = event.target.result;
     // console.log("Cursor", cursor);
      if (cursor) {
        // Check if the "name" field contains a value
        if (cursor.value.generalrole !== '') {
          role = cursor.value.generalrole;
          loggedInStatus = cursor.value.logged_in;
          //console.log("grole : ", grole);
          //console.log("mrole : ", mrole);
          //console.log(name); // log the value of the "name" field
        }
        cursor.continue(); // continue iterating over the records
      } else {
        role = "";
      }
    };


    nrequest.onerror = function (event) {
      console.log("request : ", event);
    }

  

    transaction.oncomplete = (event) => {
      // The object store is available here
     // console.log(objectStore.name, " exists");
    

    };

    transaction.onerror = (event) => {
      console.error("Transaction error:", event.target.error);
    };

 
  };
}
function showAlertDialog(message, title, confirmCallback) {
  var dialog = $('<div>').html(message).dialog({
    title: title || 'Confirmation',
    modal: true,
    buttons: {
      'OK': function() {
        $(this).dialog('close');
      }
    }
  });
  return dialog;
}
function popSnackBar(msg) {
  snackbarmessage = msg;
  options.content = snackbarmessage;
  if ($(".snackbar").length) {
    // Remove the existing snackbar
      $("#snackbar-container").empty();
      $(".snackbar.toast").hide();
  }
      $.snackbar(options);
}
function showConfirmationDialog(message, title, confirmCallback) {
  var dialog = $("<div>")
    .html(message)
    .dialog({
      title: title || "Confirmation",
      modal: true,
      buttons: {
        Cancel: function () {
          $(this).dialog("close");
        },
        OK: function () {
          confirmCallback();
          $(this).dialog("close");
        },
      },
    });
  return dialog;
}


function showSpinner(el) {
  // Initialize the spinner if it doesn't exist
  if (!spinner) {
    spinner = new Spinner().spin();
    var target = document.getElementById(el);
    target.appendChild(spinner.el);
  }
  // Show the spinner
  spinner.el.style.display = 'block';
  spinner.el.style.color = 'white !important';
}

function hideSpinner() {
  // Hide the spinner
  if (spinner && spinner.el) {
    spinner.el.style.display = 'none';
  }
} 
openDB();



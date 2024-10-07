
let ndb;
var clickEnabled = true;
const ndbName = "fpDatabase";
const ndbVersion = 1;
const nstoreName = 'sessionData';
var role,  loggedInStatus;
var spinner;
const avatarOptions = document.querySelectorAll(".avatar-option");
const customAvatarInput = document.getElementById("file-ip-1");
const handleSubmit = (e) => {
  e.preventDefault();
  authenticateUser();
};
const now = new Date();
const formattedDateTime = formatDateTime(now);
const myForm = document.getElementById("logform");
if (myForm) {
  myForm.addEventListener("submit", function (event) {
    event.preventDefault();
    authenticateUser();
  });
}

$("#resetBtnClose").on('click', () => {
    $("#resetDiv").fadeOut(500); 
});

$("#authBtnClose").on('click', () => {
    $("#authDiv").fadeOut(500);

});
function formatDateTime(date) {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    const weekday = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    let ampm = "am";
  
    if (hours >= 12) {
      ampm = "pm";
      if (hours > 12) {
        hours -= 12;
      }
    }
  
    const formattedDate = `${weekday}, ${month} ${day}, ${year} @ ${hours}:${minutes
      .toString()
      .padStart(2, "0")}${ampm}`;
    return formattedDate;
  }

const loginText = document.querySelector(".title-text .login");
      const loginForm = document.getElementById("logform");
      const loginBtn = document.getElementById("logformbtn");
      const signupBtn = document.getElementById("regformbtn");
      const signupLink = document.querySelector(".signup-link a");
      const resetLink = document.querySelector(".pass-link a");
      
      var ttElement = document.getElementById("tt");
      const resetText = ttElement.querySelector(".title-text .login");
      const resetPasswordForm = document.getElementById("passform");
      const passBtn = document.getElementById("passformbtn");
      const pinBtn = document.getElementById("pinformbtn");
      
      signupBtn.onclick = (()=>{
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
      });
      loginBtn.onclick = (()=>{
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
      });
      signupLink.onclick = (()=>{
        signupBtn.click();
        return false;
        });
        resetLink.onclick = (()=>{
            $("#resetDiv").fadeIn(500);
        });
  
        pinBtn.onclick = (()=>{
            resetPasswordForm.style.marginLeft = "-50%";
            resetText.style.marginLeft = "-50%";
          });
          passBtn.onclick = (()=>{
            resetPasswordForm.style.marginLeft = "0%";
            resetText.style.marginLeft = "0%";
          });
      


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
  function disableClickEvents(id) {
    const form = document.getElementById(id);
    const formElements = form.elements;
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].disabled = true;
      }
      form.addEventListener("click", disableclickEvents);
}
function disableclickEvents(event) {
    event.preventDefault(); // Prevent the default click behavior
}
  function enableClickEvents(id) {
    const form = document.getElementById(id);
    if(form){
    const formElements = form.elements;
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].disabled = false;
      }
      form.removeEventListener("click", disableclickEvents);
    }
  }
var snackbarmessage;
var options = {
  content: snackbarmessage, // text of the snackbar
  style: "toast", // add a custom class to your snackbar
  timeout: 0, // time in milliseconds after the snackbar autohides, 0 is disabled
  htmlAllowed: true, // allows HTML as content value
  onClose: function () {}, // callback called when the snackbar gets closed.
};

const saveData = async (
    grole,
    uname,
    pword,
    upin,
    dp,
    logindate,
    userid,
    loggedin,
    current_lockscreen,
    plen
  ) => {
    try {
  
      const request = window.indexedDB.open(ndbName);
  
      request.onerror = (event) => {
        console.error('Database error:', event.target.errorCode);
      };
    
      request.onupgradeneeded = (event) => {
      //
      };
    
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(nstoreName, 'readwrite');
        const objectStore = transaction.objectStore(nstoreName);
    
        // Check if a record with the same `userid` already exists
        const request = objectStore.get(userid);
    
        request.onsuccess = async (event) => {
          const existingRow = event.target.result;
    
          if (existingRow) {
            // Update the existing record with the new data
            existingRow.generalrole = grole;
            existingRow.username = uname;
            existingRow.password = pword;
            existingRow.pin = upin;
            existingRow.image = dp;
            existingRow.last_logged_in_at = logindate;
            existingRow.logged_in = loggedin;
            existingRow.plen = plen;
            existingRow.current_lockscreen = "yes";
            const updateRequest = await objectStore.put(existingRow);
            updateRequest.onerror = (event) => {
              console.error('Update error:', event.target.error);
            };
          } else {
            // Insert a new record with the specified data
            const newRow = {
              id:userid,
              userid:userid,
              generalrole: grole,
              username: uname,
              password: pword,
              pin: upin,
              image: dp,
              last_logged_in_at: logindate,
              logged_in: loggedin,
              current_lockscreen: current_lockscreen,
              plen:plen
            };
            const insertRequest = await objectStore.add(newRow);
            //const insertRequest = objectStore.add(data);
            insertRequest.onerror = (event) => {
              console.error('Insert error:', event.target.error);
            };
          }
          var getAllRequest = objectStore.getAll();
  
          getAllRequest.onsuccess = function(event) {
            var records = event.target.result;
        
            for (var i = 0; i < records.length; i++) {
              var record = records[i];
              
              // Check if the user ID is not equal to the specified user ID
              if (record.userid !== userid) {
                record.current_lockscreen = "no"; // Update the "lockscreen" field
                objectStore.put(record); // Save the updated record back to the object store
              }
            }
          };
        };
    
        transaction.oncomplete = () => {
          console.log('Transaction completed.');
        };
      };
  
  
  
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

const authenticateUser = async () => {
    showSpinner("logform");
    disableClickEvents("logform");
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const payload = { user: email, pass: password };
    try {
      axios
        .post(
          "https://www.emkapp.com/fad_s_portfolio/back-end/login.php",
          {
            payload,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then(async (res) => {
            enableClickEvents("logform");
            hideSpinner();
          //console.log("res", res.data);
  
          const strjson = JSON.stringify(JSON.parse(JSON.stringify(res.data)));
          console.log("json : " + JSON.parse(strjson)[0].message);
          if (JSON.parse(strjson)[0].message == "operation was successful") {
           
              snackbarmessage = "Logged in successfully";
              options.content = snackbarmessage;
  
              const grole = JSON.parse(strjson)[0].generalrole;
              const uname = JSON.parse(strjson)[0].username;
              const pword = JSON.parse(strjson)[0].password;
              const upin = JSON.parse(strjson)[0].pin;
              const upl = JSON.parse(strjson)[0].pl;
              const dp = JSON.parse(strjson)[0].image;
              const logindate = formattedDateTime;
              const userid = JSON.parse(strjson)[0].userid;
              const loggedin = "true";
              const current_lockscreen = "yes";
  
           
                await saveData(
                  grole,
                  uname,
                  pword,
                  upin,
                  dp,
                  logindate,
                  userid,
                  loggedin,
                  current_lockscreen,
                  upl
                );
             
                sessionStorage.setItem('requestParam', 'Operation was successful');
              sessionStorage.setItem('UserID', userid);
              setTimeout(function () {
                window.location.replace("index.html"); 
              },2000);
              
              
             
            
            if ($(".snackbar").length) {
              // Remove the existing snackbar
              $("#snackbar-container").empty();
            }
            $.snackbar(options);
          } else {
            snackbarmessage = "Credentials not found 😢";
            options.content = snackbarmessage;
            if ($(".snackbar").length) {
              // Remove the existing snackbar
              $("#snackbar-container").empty();
            }
            $.snackbar(options);
          }
        })
        .catch((err) => {
          console.log("error in request", err);
  
          snackbarmessage = err;
          options.content = snackbarmessage;
          if ($(".snackbar").length) {
            // Remove the existing snackbar
            $("#snackbar-container").empty();
          }
          $.snackbar(options);
          enableClickEvents("logform");
          hideSpinner();
        });
    } catch (error) {
        enableClickEvents("logform");
            hideSpinner();
      snackbarmessage = error;
      options.content = snackbarmessage;
      if ($(".snackbar").length) {
        // Remove the existing snackbar
        $("#snackbar-container").empty();
      }
      $.snackbar(options);
      console.log(error);
      errmsg = error;
    }
};
  
function showPreview(event){
    if (event.target.files.length > 0) {
      var selectedFile = event.target.files[0];
      processFile(selectedFile, "file-ip-1", "file-ip-1-preview", "regform");


    }

}


function processFile(selectedFile, elID, imgCon, mainCon) {
    var validExtensions = [".jpg", ".png", ".jpeg", ".gif"];
    var fileExtension = selectedFile.type.split("/").pop().toLowerCase();
    var maxSize = 16 * 1024 * 1024; // 16MB
    var snackbarmessage = "";
    var options = {
      content: "",
    };
    //console.log(elID);
    const newELID = elID;
    if (selectedFile.size > maxSize) {
      snackbarmessage = "Error: File size exceeds 16MB.";
      options.content = snackbarmessage;
      if ($(".snackbar").length) {
        // Remove the existing snackbar
        $("#snackbar-container").empty();
      }
      $.snackbar(options);
      clearFileInput(newELID);
      return;
    } else {
      if (!validExtensions.includes("." + fileExtension)) {
        snackbarmessage = "Error: Invalid file. ";
        options.content = snackbarmessage;
        if ($(".snackbar").length) {
          // Remove the existing snackbar
          $("#snackbar-container").empty();
        }
        $.snackbar(options);
        clearFileInput(newELID);
        return;
      } else {
        showSpinner(mainCon);
        handleFileValidation(selectedFile).then((result) => {
          hideSpinner();
          if (result.includes("Invalid")) {
            snackbarmessage = result;
            options.content = snackbarmessage;
            if ($(".snackbar").length) {
              // Remove the existing snackbar
              $("#snackbar-container").empty();
            }
            $.snackbar(options);
            clearFileInput(newELID);
            document.getElementById(imgCon).src = "../images/avatars/avatar-1.png";
          } else {
            var src = URL.createObjectURL(selectedFile);
            var preview = document.getElementById(imgCon);
              preview.src = src;
              document.getElementById("avatarImg").style.display = "block";
            preview.style.display = "block";
            avatarOptions.forEach(option => {
                option.querySelector("input[type='radio']").checked = false;
            });
          }
        });
      }
    }
}
  
function clearFileInput(nelID) {
    ///console.log(nelID);
      var oldInput = document.getElementById(nelID);
      var newInput = document.createElement("input");
      newInput.type = "file";
      newInput.id = nelID;
    newInput.accept = "image/*";
    if (nelID == "passpic") {
      newInput.className = "passpicfile";
    }
      newInput.onchange = function(event) {
        showPreview(event);
      };
      oldInput.parentNode.replaceChild(newInput, oldInput);
}
async function handleFileValidation(file) {
    // Create a FormData object to send the file to PHP
    const formData = new FormData();
    formData.append("file", file);
    //console.log(file);
    // Make a POST request to the PHP file
    try {
      const response = await fetch(
        "https://www.emkapp.com/fad_s_portfolio/back-end/validatefile.php",
        {
          method: "POST",
          body: formData,
        }
      );
      return await response.text();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  avatarOptions.forEach(option => {
    option.addEventListener("click", function() {
        document.getElementById("avatarImg").style.display = "none";
        customAvatarInput.removeAttribute("required"); // Remove required attribute
        clearFileInput("file-ip-1");
    });
});
// showAlertDialog('An unknown error occurred: ' + error.message, "Message");
/**
  showConfirmationDialog("You are about to make " + `${wname} `+" the head of "+`${dname}`, 'Delete Item', function () {

});
 */
$("#pinform").on('submit', async (e) => {
    e.preventDefault();
    showSpinner("pinform");
    disableClickEvents("pinform");
    const formData = new FormData();
    const newpin = $("#upinid").val();
    formData.append("mode","resetpin");
    formData.append("id", $("#upinid").val());
    formData.append("email", $("#upinemail").val());
    formData.append("pin", $("#upin").val());
    try {
        axios
          .post(
            "https://www.emkapp.com/fad_s_portfolio/back-end/updatepassword.php",
  
            formData
            
          )
          .then(async (res) => {
              //console.log(res);
            
              const strjson = JSON.stringify(JSON.parse(JSON.stringify(res.data)));
              if (JSON.parse(strjson)[0].message.includes("successful")) {
                 
                  
                  const user = JSON.parse(strjson)[0].id;
                 await updatePin(user, newpin);
                 const form = document.getElementById('pinform');
                form.reset();
                  $("#resetDiv").fadeOut(400);
                  enableClickEvents("pinform");
                  hideSpinner();
              } else {
                enableClickEvents("pinform");
                hideSpinner();
                popSnackBar(JSON.parse(strjson)[0].message);
              
              }
          })
          .catch((err) => {
            popSnackBar(err);
            enableClickEvents("pinform");
            hideSpinner();
          });
      } catch (error) {
        console.error('Request error:', error);
        popSnackBar(error);
        enableClickEvents("pinform");
        hideSpinner();
      }
    
});
$("#passform").on('submit', async (e) => {
    e.preventDefault();
    showSpinner("passform");
    disableClickEvents("passform");
    const formData = new FormData();
    formData.append("mode", "resetpassword");
    formData.append("id", $("#upassid").val());
    formData.append("email", $("#upassemail").val());
    formData.append("pass", $("#upass").val());
    try {
        axios
          .post(
            "https://www.emkapp.com/fad_s_portfolio/back-end/updatepassword.php",
  
            formData
            
          )
          .then(async (res) => {
              console.log(res);
              enableClickEvents("passform");
              hideSpinner();
              const strjson = JSON.stringify(JSON.parse(JSON.stringify(res.data)));
              if (JSON.parse(strjson)[0].message.includes("successful")) {
                 
                  const form = document.getElementById('passform');
                form.reset();
                  $("#resetDiv").fadeOut(400);
                  if (!$("#authDiv").is(":visible")) {
                      $("#authDiv").fadeIn(400);
                      loginBtn.click();
                  }
                  popSnackBar("Password successfully updated"); 
              } else {
                popSnackBar(JSON.parse(strjson)[0].message);
              
              }
          })
          .catch((err) => {
            popSnackBar(err);
            enableClickEvents("passform");
            hideSpinner();
          });
      } catch (error) {
        console.error('Request error:', error);
        popSnackBar(error);
        enableClickEvents("passform");
        hideSpinner();
      }
});

$("#regform").on('submit', async (e) => {
    e.preventDefault();
    const selectedAvatarRadio = document.querySelector("input[name='avatar']:checked");
        const customAvatarFile = customAvatarInput.files[0];
        let selectedAvatarBlob = null;
        let selectedAvatarFilename = null;
        let filetype = null;
    
        if (!selectedAvatarRadio && !customAvatarFile) {
            popSnackBar("Please select an avatar or upload image");
            return;
        } else {
            showSpinner("regform");
            disableClickEvents("regform");
            if (selectedAvatarRadio) {
             
                filetype = "avatar";
                selectedAvatarBlob = selectedAvatarRadio.value;
            } else if (customAvatarFile) {
                filetype = "image";
                selectedAvatarBlob = customAvatarFile;
            }

            const formData = new FormData();
            formData.append("dp", selectedAvatarBlob);
            formData.append("dpType", filetype);
            formData.append("request", "user");
            formData.append("firstname", $("#sfname").val());
            formData.append("lastname", $("#slname").val());
            formData.append("pin", $("#spin").val());
            formData.append("emailAddr", $("#semail").val());
            formData.append("pass", $("#spass").val());
            formData.append("contact", $("#scontact").val());

            try {
                axios
                  .post(
                    "https://www.emkapp.com/fad_s_portfolio/back-end/registration.php",
          
                    formData
                    
                  )
                  .then(async (res) => {
                      //console.log(res);
                      enableClickEvents("regform");
                      hideSpinner();
                      const strjson = JSON.stringify(JSON.parse(JSON.stringify(res.data)));
                      if (JSON.parse(strjson)[0].message.includes("successful")) {
                          var message = "Account successfully created, your ID is : \n" + JSON.parse(strjson)[0].id + "\n keep it safe for future use";
                          showAlertDialog(message, "Message");
                          const form = document.getElementById('regform');
                        form.reset();
                        var preview = document.getElementById("file-ip-1-preview");
                        preview.src = "";
                          preview.style.display = "none";
                          loginBtn.click();
                      } else {
                        popSnackBar(JSON.parse(strjson)[0].message);
                      
                      }
                  })
                  .catch((err) => {
                    popSnackBar(err);
                    enableClickEvents("regform");
                    hideSpinner();
                  });
              } catch (error) {
                console.error('Request error:', error);
                popSnackBar(error);
                enableClickEvents("regform");
                hideSpinner();
              }
            
        }

});

$("#logbutton").on('click', () => {
    showConfirmationDialog("Sure about logging out?", 'Message',  function () {
      if (clickEnabled) {
        logoutUser();
      }
    });    
});

$("#regbutton").on('click', () => {
    $("#authDiv").fadeIn(500);
    loginBtn.click();
});

async function logoutUser(){
    try {
  
        const request = window.indexedDB.open(ndbName);
    
        request.onerror = (event) => {
          console.error('Database error:', event.target.errorCode);
        };
      
        request.onupgradeneeded = (event) => {
        //
        };
      
        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction(nstoreName, 'readwrite');
          const objectStore = transaction.objectStore(nstoreName);
      
          // Check if a record with the same `userid` already exists
          const request = objectStore.get(userid);
      
          request.onsuccess = async (event) => {
            const existingRow = event.target.result;
      
            if (existingRow) {
            
              existingRow.logged_in = "false";
              existingRow.current_lockscreen = "yes";
              const updateRequest = await objectStore.put(existingRow);
              updateRequest.onerror = (event) => {
                  console.error('Update error:', event.target.error);
                  popSnackBar('Error: '+ event.target.error);
                  return;
                };
                sessionStorage.setItem('UserID', '');
        setTimeout(function () {
          window.location.replace("index.html"); 
        },1000); 
            } else {
                popSnackBar("User not found");
            }
           
          };
      
          transaction.oncomplete = () => {
            console.log('Transaction completed.');
          };
        };
    
    
    
      } catch (error) {
        console.error("Error saving data:", error);
        popSnackBar("Error saving data:"+ error);
      }  
}

async function updatePin(user, newpin) {
    try {
  
        const request = window.indexedDB.open(ndbName);
    
        request.onerror = (event) => {
          console.error('Database error:', event.target.errorCode);
        };
      
        request.onupgradeneeded = (event) => {
        //
        };
      
        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction(nstoreName, 'readwrite');
          const objectStore = transaction.objectStore(nstoreName);
      
          // Check if a record with the same `userid` already exists
          const request = objectStore.get(user);
      
          request.onsuccess = async (event) => {
            const existingRow = event.target.result;
      
            if (existingRow) {
            
              existingRow.pin = newpin;
           
              const updateRequest = await objectStore.put(existingRow);
              updateRequest.onerror = (event) => {
                  console.error('Update error:', event.target.error);
                  popSnackBar('Error: '+ event.target.error);
                  return;
                };
                popSnackBar("Pin successfully updated!");
            } else {
                popSnackBar("User not found");
            }
           
          };
      
          transaction.oncomplete = () => {
            console.log('Transaction completed.');
          };
        };
    
    
    
      } catch (error) {
        console.error("Error saving data:", error);
        popSnackBar("Error saving data:"+ error);
      }  
}


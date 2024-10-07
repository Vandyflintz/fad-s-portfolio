const loggedinUser = sessionStorage.getItem("UserID");
let userRole, accessMode;


if (!loggedinUser) {
    $("#regbutton").show();
} else {
    queryObjectStore().then(role => {
        userRole = role;
        
        $("#logbutton").show();
        if (userRole !== "user") {
          $("#msgli").show();
          $("#adminli").show();
        } else {
            $("#msgli").show();
            $("#allchatsdivcover").hide();
            $("#allchatsdiv").hide();
        }
    });
}

$("#adminDropdown").on('click', (e) => { 
  e.preventDefault();
  if (userRole.toString().includes("admin")) {
    var Url = "https://www.emkapp.com/fad_s_portfolio/back-end/fetchadmin.php?req=checkadmin&id="+encodeURIComponent(userid);
  
    $.getJSON(Url)
      .done(function(data) {
        if (!data.includes("negative")) {
          window.location.href = 'dashboard.html';
        }
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
       console.error(errorThrown,jqXHR, textStatus);
      });
  }
    //
  
});


$("#revealAnchor").on('click', (e) => {
  e.preventDefault();
  clickEnabled = false;
  if (window.innerWidth <= 768) {
    $("#allchatsdiv").css("z-index", "4");
  }
  $("#mc").fadeIn(500);
  $("#allchatsdivcover").show();
  $("#cover").show();
});
$("#messagesDropdown").on('click', function () {
    if (userRole !== "user") {
        $("#mespanel").show();  
        
    } else {
      $("#mc").fadeIn(500);
      updateUserServerMessages(userid);
        var id = "";
        var sUrl = 'https://www.emkapp.com/fad_s_portfolio/back-end/ssechats.php?rec=' + encodeURIComponent(userid) + '&id=' + encodeURIComponent(id) + "&role=" + userRole+"&req=all";
       
           let pUrl = "https://www.emkapp.com/fad_s_portfolio/back-end/fetchadminimages.php?id="+ encodeURIComponent(userid);
  
          const profDiv = document.getElementById("mpic");
        
        profDiv.style.backgroundImage = "url('" + pUrl + "')";
        const profNameDiv = document.getElementById("mname");
                  profNameDiv.innerText = "Administrator";
        openSSEConnection(sUrl, "readmessage");
        //console.log(sUrl);
    }
});

function queryObjectStore() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.get(loggedinUser);

        request.onsuccess = async (event) => {
            const existingRow = event.target.result;
            var encodedId = encodeURIComponent(existingRow.userid);
            var url =
              "https://www.emkapp.com/fad_s_portfolio/back-end/fetchimages.php?id=" + encodedId;
            var imageElement = document.getElementById("pp");
            imageElement.src = url;
            var profileName = document.getElementById("pn");
            profileName.innerHTML = existingRow.username;
              uid = existingRow.userid;

            const role = existingRow.generalrole;
            resolve(role); // Resolve the promise with the userRole value
        };

        request.onerror = (event) => {
            reject(new Error("Error fetching user role")); // Reject the promise on error
        };

        transaction.oncomplete = () => {
            // console.log('Transaction completed.');
        };
    });
}



const inputs = document.querySelectorAll('.pinInput');
    

inputs.forEach((input, index) => {
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default behavior (like form submission)
        handleInput(index, input);
      }
    });
  });
    function handleInput(index, input) {
      const value = input.value;
      
      if (!isNaN(value) && value !== '') {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else {
          inputs[index].blur();
          logValues();
        }
      } else {
        input.value = '';
      }
    }
    
    function logValues() {
      const allFilled = Array.from(inputs).every(input => input.value !== '');
      
      if (allFilled) {
        const values = Array.from(inputs).map(input => input.value).join('');
          submitPinForm(values);
      } else {
        $("#pinmess").text("Please fill all boxes");
      }
    }

    function disableInputs() {
        inputs.forEach(input => {
          input.disabled = true;
        });
        document.getElementById("nav-back").classList.add("cdisabled");
      }
  
      function enableInputs() {
        inputs.forEach(input => {
          input.disabled = false;
        });
        document.getElementById("nav-back").classList.remove("cdisabled");
      }

      function clearInputs() {
        inputs.forEach(input => {
          input.value = '';
        });
      }

function submitPinForm(val) {
    disableInputs();
    showSpinner("cover");
    const formData = new FormData();
    formData.append("operation", "checkpin");
    formData.append("userid", userid);
    formData.append("userinput", val);
    try {
        axios
          .post(
            "https://www.emkapp.com/fad_s_portfolio/back-end/decryptstring.php",
  
            formData
            
          )
          .then(async (res) => {
             // console.log(res);
              enableInputs();
              hideSpinner();
              const strjson = JSON.stringify(JSON.parse(JSON.stringify(res.data)));
              if (JSON.parse(strjson)[0].message.includes("match found")) {
                 
                  clearInputs();
                  $("#pinmess").text("");
                  if (userRole.includes("user")) {
                      $("#cover").hide();
                      $("#cover-two").hide();
                  } else {
                      $("#cover").hide();
                      $("#allchatsdivcover").fadeOut(400);
                }
                if (window.innerWidth <= 768) {
                  $("#allchatsdiv").css("z-index","10");
                }
                clickEnabled = false;
              } else {
                $("#pinmess").text("Incorrect Pin!");
              
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
}
if (document.referrer==="https://www.emkapp.com/fad_s_portfolio/pages/js/dashboard.js" || window.location.protocol === "file:") {
    window.location.href = 'https://localhost/access-denied.html';
    
}
let currID, currItemID;
let player;
let imgArrayPencil  = [], imgArrayPs = [], imgArrayAe = [], imgArray3d = [], imgArrayVids = [];
const userid = sessionStorage.getItem('UserID');
let art, userTapped = 0, apiKey;
$('.macaw-tabs').macawTabs();
const avatarOptions = document.querySelectorAll(".avatar-option");
const customAvatarInput = document.getElementById("file-ip-1");
const pencilcontainer = document.getElementById("pencil-works-tab");
const pscontainer = document.getElementById("photoshop-tab");
const aecontainer = document.getElementById("ae-tab");
const threedcontainer = document.getElementById("threedee-tab");
const videocontainer = document.getElementById("vids-tab");
var spinner;
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
function onYouTubeIframeAPIReady() {
    player = new YT.Player('full-player-video-iframe', {
      events: {
        'onReady': onPlayerReady
      }
    });
} 

function onPlayerReady(event) {
    // Player is now ready to respond to commands
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
    const formElements = form.elements;
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].disabled = false;
      }
      form.removeEventListener("click", disableclickEvents);
  }
var snackbarmessage;
var options = {
  content: snackbarmessage, // text of the snackbar
  style: "toast", // add a custom class to your snackbar
  timeout: 0, // time in milliseconds after the snackbar autohides, 0 is disabled
  htmlAllowed: true, // allows HTML as content value
  onClose: function () {}, // callback called when the snackbar gets closed.
};
$("#publicPageDropdown").on('click', function (e) {
    e.preventDefault();
    window.location.replace('index.html');
});

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
    var listItems = document.querySelectorAll(".sidebar-item");

    listItems.forEach(function (item) {
      item.addEventListener("click", function (event) {
        event.preventDefault();
  
      
        if (!item.classList.contains("active")) {
          listItems.forEach(function (li) {
            li.classList.remove("active");
          });
  
          
          item.classList.add("active");
  
          
          var clickedItemId = item.getAttribute("id");
          //console.log("Clicked item ID:", clickedItemId);
            if (clickedItemId.includes("accountli")) {
                $("#users-cards").hide();
                $("#profileTab").hide();
                $("#accountTab").fadeIn(400);
                $("#mediaTab").hide();
            } 
            if (clickedItemId.includes("usersli")) {
                $("#accountTab").hide();
                $("#profileTab").hide();
                $("#users-cards").fadeIn(400);
                $("#mediaTab").hide();
            }
            if (clickedItemId.includes("profileli")) {
                $("#accountTab").hide();
                $("#profileTab").fadeIn(400);
                $("#users-cards").hide();
                $("#mediaTab").hide();
            }
            if (clickedItemId.includes("datali")) {
                $("#accountTab").hide();
                $("#mediaTab").fadeIn(400);
                $("#users-cards").hide();
                $("#profileTab").hide();
            }
        }
      });
    });

function verifyAdmin() {
    var Url = "https://www.emkapp.com/fad_s_portfolio/back-end/fetchadmin.php?req=checkadmin&id="+encodeURIComponent(userid);
  
    $.getJSON(Url)
      .done(function(data) {
        if (data.includes("negative")) {
          window.location.href = 'index.html';
        }
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
       console.error(errorThrown,jqXHR, textStatus);
      });
}

function showPreview(event, displayID) {
 
        if (event.target.files.length > 0) {
            var selectedFile = event.target.files[0];
            var id = event.target.id;
            var form = event.target.form;
            var formid = form.id;
            var conName = id + "-preview";
          processFile(selectedFile, id, conName, formid, displayID);
         
        }
    
    }
    function showFilePreview(event, displayCon, displayID) {
 
        if (event.target.files.length > 0) {
            var selectedFile = event.target.files[0];
            var id = event.target.id;
            var form = event.target.form;
            var formid = form.id;
            var validExtensions = [".pdf"];
            var fileExtension = selectedFile.type.split("/").pop().toLowerCase(); 
            var maxSize = 16 * 1024 * 1024; // 16MB
      if (selectedFile.size > maxSize) {
          showAlertDialog("Error: File size exceeds 16MB.", "Message");
          clearFileInput(id, displayCon, displayID);
        return;
            } 
            
            if (!validExtensions.includes("." + fileExtension)) {
                showAlertDialog("Error: Invalid file. " + fileExtension, "Message");
                clearFileInput(id, displayCon, displayID);
                return;
            }
            showSpinner(formid);
            handleFileValidation(selectedFile).then((result) => {
              hideSpinner();
              if (result.includes("Invalid")) {
                  showAlertDialog("Error: Invalid file.", "Message");
                  clearFileInput(id, displayCon, displayID);
              } else {
                  const reader = new FileReader();
                  reader.onload = function (e) {
                      const arraybuffer = e.target.result;
                      displayPDF(displayCon, arraybuffer, displayID); 
                  }
                  reader.readAsArrayBuffer(selectedFile);
              }
            });
      
         
        }
    
} 
function displayPDF(displayCon, arraybuffer, displayID) {
    document.getElementById(displayID).style.display = "block";
    const pdfBlob = new Blob([arraybuffer], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    document.getElementById(displayCon).src = pdfUrl;  
    }
  
    function clearFileInput(nelID,displayCon, displayID) {
        ///console.log(nelID);
        document.getElementById(displayID).style.display = "none";
          var oldInput = document.getElementById(nelID);
          var newInput = document.createElement("input");
          newInput.type = "file";
          newInput.id = nelID;
        newInput.accept = ".pdf";
       
          newInput.onchange = function(event) {
            showFilePreview(event, displayCon, displayID);
          };
          oldInput.parentNode.replaceChild(newInput, oldInput);
    }

    function processFile(selectedFile, elID, imgCon, mainCon, displayID) {
        var validExtensions = [".jpg", ".png", ".jpeg", ".gif"];
        var fileExtension = selectedFile.type.split("/").pop().toLowerCase();
        var maxSize = 16 * 1024 * 1024; // 16MB
        var snackbarmessage = "";
        var options = {
          content: "",
        };
        console.log(displayID);
        const newELID = elID;
        if (selectedFile.size > maxSize) {
          snackbarmessage = "Error: File size exceeds 16MB.";
          options.content = snackbarmessage;
          if ($(".snackbar").length) {
            // Remove the existing snackbar
            $("#snackbar-container").empty();
          }
          $.snackbar(options);
          clearFileInput(newELID, displayID);
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
            clearFileInput(newELID, displayID);
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
                clearFileInput(newELID, displayID);
                document.getElementById(imgCon).src = "../images/avatars/avatar-1.png";
              } else {
                var src = URL.createObjectURL(selectedFile);
                var preview = document.getElementById(imgCon);
                  preview.src = src;
                  document.getElementById(displayID).style.display = "block";
                preview.style.display = "block";
                avatarOptions.forEach(option => {
                    option.querySelector("input[type='radio']").checked = false;
                });
              }
            });
          }
        }
    }
      
    function clearFileInput(nelID, did) {
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
            showPreview(event, did);
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
            clearFileInput("file-ip-1","avatarImg");
        });
    });
$("#cvform").on('submit', (e) => {
    e.preventDefault();
    const cvFile = document.getElementById("file-cv-1").files[0];
    if (!cvFile) {
        popSnackBar("Please  select your cv!");
        return;
    } 

    showSpinner("cvform");
    disableClickEvents("cvform");
    const formData = new FormData();
    formData.append("request", "updatecv");
    formData.append('file', cvFile);
    try {
        axios
          .post(
            "https://www.emkapp.com/fad_s_portfolio/back-end/portfolio.php",
  
            formData
            
          )
          .then(async (res) => {
             // console.log(res);
              enableClickEvents("dpform");
              hideSpinner();
              const strjson = JSON.stringify(JSON.parse(JSON.stringify(res.data)));
              if (JSON.parse(strjson)[0].message.includes("successful")) {
                popSnackBar("Operation was successful");
                  const form = document.getElementById('cvform');
                form.reset();
                var preview = document.getElementById("main-update-pdf-iframe");
                  preview.src = "";
                  var previewtwo = document.getElementById("cvPreview-1");
                  previewtwo.style.display = "none";
                  fetchgeneralbiodata();
                  
              } else {
                popSnackBar(JSON.parse(strjson)[0].message);
              
              }
          })
          .catch((err) => {
            popSnackBar(err);
            enableClickEvents("cvform");
            hideSpinner();
          });
      } catch (error) {
        console.error('Request error:', error);
        popSnackBar(error);
        enableClickEvents("cvform");
        hideSpinner();
      }
});

$("#dpform").on('submit', (e) => {
    e.preventDefault();
    const dpFile = document.getElementById("file-dp-1").files[0];
    if (!dpFile) {
        popSnackBar("Please select your image!");
        return;
    } 

    showSpinner("dpform");
    disableClickEvents("dpform");
    const formData = new FormData();
    formData.append("request", "updatepic");
    formData.append('file', dpFile);
    try {
        axios
          .post(
            "https://www.emkapp.com/fad_s_portfolio/back-end/portfolio.php",
  
            formData
            
          )
          .then(async (res) => {
             console.log(res);
              enableClickEvents("dpform");
              hideSpinner();
              const strjson = JSON.stringify(JSON.parse(JSON.stringify(res.data)));
              if (JSON.parse(strjson)[0].message.includes("successful")) {
                popSnackBar("Operation was successful");
                  const form = document.getElementById('dpform');
                form.reset();
                var preview = document.getElementById("file-dp-1-preview");
                preview.src = "";
                  preview.style.display = "none";
                  $("#dpImg").hide();
                  fetchgeneralbiodata();
                  
              } else {
                popSnackBar(JSON.parse(strjson)[0].message);
              
              }
          })
          .catch((err) => {
            popSnackBar(err);
            enableClickEvents("dpform");
            hideSpinner();
          });
      } catch (error) {
        console.error('Request error:', error);
        popSnackBar(error);
        enableClickEvents("dpform");
        hideSpinner();
      }
});

$("#bioform").on('submit', (e) => {
    e.preventDefault();
    const dpFile = document.getElementById("file-ip-2").files[0];
    const cvFile = document.getElementById("file-ip-3").files[0];
    if (!dpFile && !cvFile) {
        popSnackBar("Please make sure to select your image and cv!");
        return;
    } 
  
    showSpinner("bioform");
    disableClickEvents("bioform");
    const formData = new FormData();
    formData.append('uploaded_files[]', dpFile);
    formData.append('uploaded_files[]', cvFile);
    formData.append("request", "newdata");
    formData.append("fb_handle", $("#fbname-main").val());
    formData.append("ig_handle", $("#igname-main").val());
    formData.append("fb_link", $("#fblink-main").val());
    formData.append("ig_link", $("#iglink-main").val());
    formData.append("whatsapp_handle", $("#whatsapp-main").val());
    formData.append("yt_handle", $("#ytname-main").val());
    formData.append("yt_link", $("#ytlink-main").val());
    formData.append("emailAddr", $("#email-main").val());
    formData.append("contact", $("#phone-main").val());
    formData.append("intro", $("#txt-bio-main").val());

    try {
        axios
          .post(
            "https://www.emkapp.com/fad_s_portfolio/back-end/portfolio.php",
  
            formData
            
          )
          .then(async (res) => {
             // console.log(res);
              enableClickEvents("bioform");
              hideSpinner();
              const strjson = JSON.stringify(JSON.parse(JSON.stringify(res.data)));
              if (JSON.parse(strjson)[0].message.includes("successful")) {
                popSnackBar("Operation was successful");
                  const form = document.getElementById('bioform');
                form.reset();
                var preview = document.getElementById("file-ip-2-preview");
                preview.src = "";
                  preview.style.display = "none";
                  var previewtwo = document.getElementById("cvPreview");
                  previewtwo.src = "";
                    previewtwo.style.display = "none";
                  $("#txt-bio-main").get(0).scrollIntoView({ behavior: 'smooth' });
                  fetchgeneralbiodata();
              } else {
                popSnackBar(JSON.parse(strjson)[0].message);
              
              }
          })
          .catch((err) => {
            popSnackBar(err);
            enableClickEvents("bioform");
            hideSpinner();
          });
      } catch (error) {
        console.error('Request error:', error);
        popSnackBar(error);
        enableClickEvents("bioform");
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
            formData.append("request", "admin");
            formData.append("firstname", $("#sfname").val());
            formData.append("lastname", $("#slname").val());
            formData.append("pin", $("#spin").val());
            formData.append("emailAddr", $("#semail").val());
            formData.append("pass", $("#spass").val());

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
                        popSnackBar("Operation was successful");
                          const form = document.getElementById('regform');
                        form.reset();
                        var preview = document.getElementById("file-ip-1-preview");
                        preview.src = "";
                          preview.style.display = "none";
                          $("#sfname").get(0).scrollIntoView({behavior: 'smooth'});
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

$("#bioupdateform").on('submit', (e) => { 
    e.preventDefault();
    showConfirmationDialog("Sure about updating your bio?", 'Message', function () {
        showSpinner("bioupdateform");
        disableClickEvents("bioupdateform");
        const formData = new FormData();
        formData.append("request", "updatebio");
        formData.append("intro", $("#txt-bio-update").val());
        try {
            axios
              .post(
                "https://www.emkapp.com/fad_s_portfolio/back-end/portfolio.php",
      
                formData
                
              )
              .then(async (res) => {
                 // console.log(res);
                  enableClickEvents("bioupdateform");
                  hideSpinner();
                  const strjson = JSON.stringify(JSON.parse(JSON.stringify(res.data)));
                  if (JSON.parse(strjson)[0].message.includes("successful")) {
                    popSnackBar("Operation was successful");
                    fetchgeneralbiodata();
                  } else {
                    popSnackBar(JSON.parse(strjson)[0].message);
                  
                  }
              })
              .catch((err) => {
                popSnackBar(err);
                enableClickEvents("bioupdateform");
                hideSpinner();
              });
          } catch (error) {
            console.error('Request error:', error);
            popSnackBar(error);
            enableClickEvents("bioupdateform");
            hideSpinner();
          }
    });   
});

$("#handlesform").on('submit', (e) => {
    e.preventDefault();
    showConfirmationDialog("Are you sure you want to update your handles?", 'Message', function () {
        showSpinner("handlesform");
    disableClickEvents("handlesform");
    const formData = new FormData();
    formData.append("request", "updatehandles");
    formData.append("fb_handle", $("#fbname-update").val());
    formData.append("ig_handle", $("#igname-update").val());
    formData.append("fb_link", $("#fblink-update").val());
    formData.append("ig_link", $("#iglink-update").val());
    formData.append("whatsapp_handle", $("#whatsapp-update").val());
    formData.append("yt_handle", $("#ytname-update").val());
    formData.append("yt_link", $("#ytlink-update").val());
    formData.append("emailAddr", $("#email-update").val());
    formData.append("contact", $("#phone-update").val());

    try {
        axios
          .post(
            "https://www.emkapp.com/fad_s_portfolio/back-end/portfolio.php",
  
            formData
            
          )
          .then(async (res) => {
             // console.log(res);
              enableClickEvents("handlesform");
              hideSpinner();
              const strjson = JSON.stringify(JSON.parse(JSON.stringify(res.data)));
              if (JSON.parse(strjson)[0].message.includes("successful")) {
                popSnackBar("Operation was successful");
                fetchgeneralbiodata();
              } else {
                popSnackBar(JSON.parse(strjson)[0].message);
              
              }
          })
          .catch((err) => {
            popSnackBar(err);
            enableClickEvents("handlesform");
            hideSpinner();
          });
      } catch (error) {
        console.error('Request error:', error);
        popSnackBar(error);
        enableClickEvents("handlesform");
        hideSpinner();
      }

     });
});

    const adminCardsContainer = document.getElementById("admin-cards");
    const usersCardsContainer = document.getElementById("users-cards"); 
    function checkData(data, container, opr) {
        container.innerHTML = "";
        if (data.length < 1) {
          container.innerHTML = "<h3 align='center'>No Data Available</h3>";
        } else {
          ContactCards(data, container, container.id, opr);
        }
      }

      function ContactCards(data, container, conid, opr) {
  
        //console.log(conid);
      
        data.forEach(contact => {
          const contactCard = document.createElement("div");
          contactCard.classList.add("property-card-two");
        
          const contactCardSub = document.createElement("div");
          contactCardSub.classList.add("property-image-two");
      
          const img = document.createElement("img");
          img.src = "https://www.emkapp.com/fad_s_portfolio/back-end/images/dp/" + contact.image;
          img.classList.add("img");
          contactCardSub.appendChild(img);
          contactCard.appendChild(contactCardSub);
      
          const contactCardProps = document.createElement("div");
          contactCardProps.classList.add("property-description-two");
          contactCard.appendChild(contactCardProps);
      
      
          const name = document.createElement("div");
          const heading = document.createElement("h4");
          heading.innerHTML = contact.firstname + " " + contact.lastname;
          name.appendChild(heading);
          contactCardProps.appendChild(name);
        
          const email = document.createElement("div");
          email.innerHTML = "<i class='fas fa-envelope'></i> "+contact.email_address;
          contactCardProps.appendChild(email);
      
          const fileid = document.createElement("div");
          fileid.innerHTML = "<i class='fas fa-id-card'></i> "+contact.userid;
          contactCardProps.appendChild(fileid);
          
          if (opr=="admin") {
            const pin = document.createElement("div");
            pin.innerHTML = "<i class='fas fa-lock'></i> "+contact.pin;
              contactCardProps.appendChild(pin);
              
              const password = document.createElement("div");
              password.innerHTML =  "<i class='fas fa-lock'></i> "+contact.password ;
            contactCardProps.appendChild(password);
            }
            if (opr == "user") {
                const contactdiv = document.createElement("div");
              contactdiv.innerHTML =  "<i class='fas fa-mobile'></i> "+contact.contact_num ;
                contactCardProps.appendChild(contactdiv);
                fileid.style.marginTop = "15px";
                fileid.style.marginBottom = "15px";
            }
          var menuDiv = document.createElement('div');
          
          
          // Create icon elements and add classes
          var infoIcon = document.createElement('i');
          infoIcon.className = 'fas fa-info';
        
          
          var transferIcon = document.createElement('i');
          transferIcon.className = 'fas fa-exchange-alt';
         
          var editIcon = document.createElement('i');
          editIcon.className = 'fas fa-edit';
          
          var delIcon = document.createElement('i');
          delIcon.className = 'fas fa-trash';
        
          
          var decIcon = document.createElement('i');
          decIcon.className = 'fas fa-user-alt-slash';
         
          
          // Append icon elements to the div
          
          const deleteButton = document.createElement("i");
          if (opr == "admin") {
            menuDiv.className = 'botmenu-two';
          
          menuDiv.appendChild(delIcon);
          } 
          contactCardProps.appendChild(menuDiv);
          delIcon.addEventListener("click", () => {
            // TODO: Implement delete functionality
            
            
              showConfirmationDialog("Are you sure you want to delete the record of : \n"+`${contact.firstname} ${contact.lastname} `, 'Delete Record', function() {
                const userid = contact.userid;
            const formData = new FormData();
            formData.append("mode", "deleteadmin");
            formData.append("id", userid);
            axios.post('https://www.emkapp.com/fad_s_portfolio/back-end/fetchadmin.php', formData)
              .then(response => {
                const responseData = response.data;
                const strjson = JSON.stringify(JSON.parse(JSON.stringify(responseData)));
                if (JSON.parse(strjson)[0].message.includes("successful")) {
                  popSnackBar("Operation was successful");
                  fetchadmins();
                } else {
                  popSnackBar(JSON.parse(strjson)[0].message);
                
                }
              })
              .catch(error => {
                popSnackBar("Error: " + error);
                console.error(error);
              });
              });
            
           
          });
          
          
      
         
      
      
       
          
            container.appendChild(contactCard);
          
         
        });
        }


    function fetchadmins() {
        const formData = new FormData();
        formData.append("mode", "fetchadmins");
        axios.post('https://www.emkapp.com/fad_s_portfolio/back-end/fetchadmin.php', formData)
          .then(response => {
            const responseData = response.data;
              //console.log(responseData);
            checkData(responseData, adminCardsContainer, "admin")  
          })
          .catch(error => {
            popSnackBar("Error: " + error);
            console.error(error);
          });
}   

function fetchusers() {
    const formData = new FormData();
    formData.append("mode", "fetchusers");
    axios.post('https://www.emkapp.com/fad_s_portfolio/back-end/fetchadmin.php', formData)
      .then(response => {
        const responseData = response.data;
          //console.log(responseData);
        checkData(responseData, usersCardsContainer, "user")  
      })
      .catch(error => {
        popSnackBar("Error: " + error);
        console.error(error);
      });
}

function fetchgeneralbiodata() {
    const formData = new FormData();
    formData.append("request", "fetchbio");
    try {
        axios
          .post(
            "https://www.emkapp.com/fad_s_portfolio/back-end/portfolio.php",
            formData,
            
          )
            .then(async (res) => {
                //console.log(res);
                const responseData = res.data;
                const bData = responseData.bioData; 
                populateForms(bData);
          })
          .catch((err) => {
            popSnackBar(err);
          
          });
      } catch (error) {
        console.error('Request error:', error);
       
      }
}

function populateForms(data) {
   // console.log(data);
    const imgUrl = "https://www.emkapp.com/fad_s_portfolio/back-end/images/cv/";
    data.forEach(bio => { 
        $("#fbname-update").val(bio.facebook_handle);   
        $("#fblink-update").val(bio.fb_link);
        $("#igname-update").val(bio.ig_handle);
        $("#iglink-update").val(bio.ig_link);   
        $("#ytname-update").val(bio.youtube_handle);
        $("#ytlink-update").val(bio.youtube_link);
        $("#whatsapp-update").val(bio.whatsapp_handle);   
        $("#email-update").val(bio.email_address);
        $("#phone-update").val(bio.contact);
        $("#txt-bio-update").val(bio.short_self_intro);
        $("#file-dp-2-preview").attr('src', imgUrl + bio.display_profile);
        $("#file-dp-2-preview").show();

        fetch(imgUrl + bio.cv_file)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.arrayBuffer();
  })
  .then(arrayBuffer => {
    const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
      $("#update-pdf-iframe").attr("src", pdfUrl);
    
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });




    });
}


function resetMediaForm() {
    const linkInput = document.getElementById('media-link-main');
    const linkInputCon = document.getElementById('media-link-main-div');
    const fileInput = document.getElementById('file-ip-media');
    const fileInputCon = document.getElementById('mediaImgMain-div');
    const descInput = document.getElementById('txt-media-main');
    const descInputCon = document.getElementById('txt-media-main-div');
    const labelInput = document.getElementById('media-name-main');
    const labelInputCon = document.getElementById('media-name-main-div');

    const inputs = [linkInput, fileInput, descInput, labelInput];
    inputs.forEach(input => input.removeAttribute('required'));
    const inputsCon = [linkInputCon, fileInputCon, descInputCon, labelInputCon];
    inputsCon.forEach((incon)=>{
        if (!incon.classList.contains("mediahidden")) {
            incon.classList.add('media-hidden');
           
        } 
        if ($("#mediaImgMain-div").is(":visible")) {
            $("#mediaImgMain-div").hide();
            $("#mediaImgMain").hide();
        }
    });
    descInput.value = "";
    labelInput.value = "";
    linkInput.value = "";

}

$("#media-label-main").on('change', (e) => {
   // console.log(e.target.value); 
    const selectedValue = e.target.value;
    const linkInput = document.getElementById('media-link-main');
    const linkInputCon = document.getElementById('media-link-main-div');
    const fileInput = document.getElementById('file-ip-media');
    const fileInputCon = document.getElementById('mediaImgMain-div');
    const descInput = document.getElementById('txt-media-main');
    const descInputCon = document.getElementById('txt-media-main-div');
    const labelInput = document.getElementById('media-name-main');
    const labelInputCon = document.getElementById('media-name-main-div');

    const inputs = [linkInput, fileInput, descInput, labelInput];
    inputs.forEach(input => input.removeAttribute('required'));
    const inputsCon = [linkInputCon, fileInputCon, descInputCon, labelInputCon];
    inputsCon.forEach((incon)=>{
        if (!incon.classList.contains("mediahidden")) {
            incon.classList.add('media-hidden');
           
        } 
        if ($("#mediaImgMain-div").is(":visible")) {
            $("#mediaImgMain-div").hide();
            $("#mediaImgMain").hide();
        }
    });

    if (selectedValue === 'ae' || selectedValue === 'generalvideos') {
        linkInputCon.classList.remove('media-hidden');
        linkInput.required = true;
        descInput.value = "";
        labelInput.value = "";
        clearFileInput('file-ip-media', 'mediaImgMain');
    } else if (selectedValue) {
        linkInput.value = "";
        fileInputCon.classList.remove('media-hidden');
        labelInputCon.classList.remove('media-hidden');
        descInputCon.classList.remove('media-hidden');
        descInput.required = true;
        labelInput.required = true;
        $("#mediaImgMain-div").show();
      }

});



$("#mediaform").on('submit', (e) => {
    e.preventDefault();
    const dpFile = document.getElementById("file-ip-media").files[0];
    if (!dpFile && $("#mediaImgMain-div").is(":visible")) {
        popSnackBar("Please attach image!");
        return;
    } 
    showSpinner("mediaform");
    disableClickEvents("mediaform");
    const formData = new FormData();
    formData.append("category", $("#media-label-main").val()); 
    formData.append("request", "add_file");
    if ($("#mediaImgMain-div").is(":visible")) {
        formData.append("operation", "file"); 
        formData.append("file", dpFile);
        formData.append("file-title", $("#media-name-main").val());
        formData.append("description", $("#txt-media-main").val());
    } else {
        formData.append("operation", "link"); 
        formData.append("link",$("#media-link-main").val());
    }
    try {
        axios
          .post(
            "https://www.emkapp.com/fad_s_portfolio/back-end/mediafiles.php",
  
            formData
            
          )
          .then(async (res) => {
            // console.log(res);
              enableClickEvents("mediaform");
              hideSpinner();
              const strjson = JSON.stringify(JSON.parse(JSON.stringify(res.data)));
              if (JSON.parse(strjson)[0].message.includes("successful")) {
                popSnackBar("Operation was successful");
                  const form = document.getElementById('mediaform');
                form.reset();
                  resetMediaForm();
                  fetchMediaData();
              } else {
                popSnackBar(JSON.parse(strjson)[0].message);
              
              }
          })
          .catch((err) => {
            popSnackBar(err);
            enableClickEvents("mediaform");
            hideSpinner();
          });
      } catch (error) {
        console.error('Request error:', error);
        popSnackBar(error);
        enableClickEvents("mediaform");
        hideSpinner();
      }
    

});



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


$("#picBoxClose").on('click', () => {
    $("#pictureBox").fadeOut(200);  
});

$("#picCommentBoxClose").on('click', () => {
    $("#pictureCommentBox").fadeOut(200);  
});

$("#vidBoxClose").on('click', () => {
    $("#videoBox").fadeOut(200); 
    if (player) {
        $("#full-player-video-iframe").attr("src", "");
        //player.pauseVideo();
      }
});

function start_player(src) {
    let nsrc;
    if (src.toString().length < 1) {
        nsrc = {
            type: 'video/mp4',
            src: 'images/logo revealing.mp4'
        };
    } else {
        nsrc = src;
    }
    videojs('#full-player').muted(false);
    videojs('#full-player',{"techOrder": ["html5","youtube"]});
    videojs('#full-player').src(nsrc);
    videojs('#full-player').currentTime(0);
    videojs('#full-player').play();
}

function loadVideo(vidsrc) {
    const filesrc ={
        type: 'video/youtube',
        src: `${vidsrc}`
    };
   
        start_player(filesrc);  
  
    
    
}


// Given data


// Function to fetch the YouTube API key from a URL
async function fetchApiKey() {
  try {
    const response = await fetch("https://www.emkapp.com/fad_s_portfolio/back-end/apikey.php");
    const data = await response.json();
      apiKey = data.key;
      fetchMediaData();
    return data.key;
  } catch (error) {
    console.error("Error fetching API key:", error);
    return null;
  }
}
function parseDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);
    return hours * 3600 + minutes * 60 + seconds;
  }
// Function to fetch video duration from YouTube link
async function fetchVideoDuration(videoUrl) {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoUrl.split("v=")[1]}&key=${apiKey}`);
    const data = await response.json();
    const duration = data.items[0].contentDetails.duration;
    const durationInSeconds = parseDuration(duration);
    return durationInSeconds;
  } catch (error) {
    console.error("Error fetching video duration:", error);
    return 0;
  }
}

// Function to fetch video details from YouTube API
async function getVideoDetails(videoId, apiKey) {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`);
      const data = await response.json();
      return data.items[0].snippet.title;
    } catch (error) {
      console.error("Error fetching video details:", error);
      return "Video Title Not Available";
    }
  }
  async function getYoutubeDetails(videoId, apiKey) {
    var apiUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&key=' + apiKey;
  
    return new Promise(function(resolve, reject) {
        $.getJSON(apiUrl)
            .done(function(data) {
                if (data.items.length > 0) {
                    var videoTitle = data.items[0].snippet.title;
                    var videoDescription = data.items[0].snippet.description;
                    resolve({ videoTitle, videoDescription });
                } else {
                    console.log("No data available");
                    reject("No data available");
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                //console.log(videoId, apiKey);
                reject(errorThrown);
            });
    });
}



  function getVideoId(url) {
    var videoId = null;
    var pattern = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
    var match = url.match(pattern);
  
    if (match && match[1]) {
      videoId = match[1];
    }
      //console.log(videoId);
    return videoId;
}
  
function populateDivs(container, imgArray) {
    container.innerHTML = "";
    const imgUrl = "https://www.emkapp.com/fad_s_portfolio/back-end/images/graphic_works/";
    imgArray.forEach(item => {
        const mediaRow = document.createElement('div');
        mediaRow.className = 'mediarow';

        const mainFileDiv = document.createElement('div');
        mainFileDiv.className = 'mainfile';
        const img = document.createElement('img');
        img.src = imgUrl+item.imgfile;
        img.onclick = () => {
            $("#picView").attr("src",imgUrl+item.imgfile);
            $("#pictureBox").fadeIn(400);
        };
        mainFileDiv.appendChild(img);

        const middleRowDiv = document.createElement('div');
        middleRowDiv.className = 'middlerow';

        const middleUpperDiv = document.createElement('div');
        middleUpperDiv.className = 'middlerow-upper-child';
        middleUpperDiv.textContent = item.desc;

        const middleLowerDiv = document.createElement('div');
        middleLowerDiv.className = 'middlerow-lower-child';
        const likesItem = document.createElement('div');
        likesItem.className = 'item';
        likesItem.textContent = item.likes_count > 1 ? `${item.likes_count} likes` : `${item.likes_count} like`;
        const commentsItem = document.createElement('div');
        commentsItem.className = 'item';
        commentsItem.textContent = `${item.comment_count} comments`;
        middleLowerDiv.appendChild(likesItem);
        middleLowerDiv.appendChild(commentsItem);

        const lastRowDiv = document.createElement('div');
        lastRowDiv.className = 'lastrow';

        const lastFirstDiv = document.createElement('div');
        lastFirstDiv.className = 'lastrow-firstchild';
        const editIcon = document.createElement('i');
        editIcon.className = 'fa fa-edit';
        editIcon.onclick = () => {
            $("#picComView").attr("src",imgUrl+item.imgfile);
            $("#picComViewTxt").val(item.desc);
            $("#pictureCommentBox").fadeIn(400);
            currItemID = item.id;
        };
        lastFirstDiv.appendChild(editIcon);

        const lastLastDiv = document.createElement('div');
        lastLastDiv.className = 'lastrow-lastchild';
        const trashIcon = document.createElement('i');
        trashIcon.className = 'fa fa-trash';
        trashIcon.onclick = () => {
            showConfirmationDialog("Sure about deleting this work?", 'Warning', function () {
                delItem(item.id);
            });
        };
        lastLastDiv.appendChild(trashIcon);

        lastRowDiv.appendChild(lastFirstDiv);
        lastRowDiv.appendChild(lastLastDiv);

        middleRowDiv.appendChild(middleUpperDiv);
        middleRowDiv.appendChild(middleLowerDiv);

        mediaRow.appendChild(mainFileDiv);
        mediaRow.appendChild(middleRowDiv);
        mediaRow.appendChild(lastRowDiv);

        container.appendChild(mediaRow);
    });
}

function delItem(fileid) {
    const formData = new FormData();
        formData.append("request", "delete_file");
        formData.append("fileid", fileid);
        try {
            axios
                .post(
                    "https://www.emkapp.com/fad_s_portfolio/back-end/mediafiles.php",
                    formData,
                
                )
                .then(async (res) => {
                    const strjson = JSON.stringify(JSON.parse(JSON.stringify(res.data)));
              if (JSON.parse(strjson)[0].message.includes("successful")) {
                        popSnackBar("Work has been successfully deleted");
                        fetchMediaData();
                    } else {
                      popSnackBar(responseData.toString());
                    
                    }
                })
                .catch((err) => {
                    popSnackBar(err);
              
                });
        } catch (error) {
            console.error('Request error:', error);
           
        }
}
$("#picComBtn").on('click', (e) => {
    showConfirmationDialog("Sure about updating the description?", 'Warning', function () {
        
        const formData = new FormData();
        formData.append("request", "update_desc");
        formData.append("fileid", currItemID);
        formData.append("desc", $("#picComViewTxt").val());
        try {
            axios
                .post(
                    "https://www.emkapp.com/fad_s_portfolio/back-end/mediafiles.php",
                    formData,
                
                )
                .then(async (res) => {
                    //console.log(res);
                    
                    const responseData = res.data;

                    if (responseData.toString().includes("successful")) {
                        $("#pictureCommentBox").fadeOut(300);
                        popSnackBar("Description successfully updated");
                        fetchMediaData();
                    } else {
                      popSnackBar(responseData.toString());
                    
                    }
                })
                .catch((err) => {
                    popSnackBar(err);
              
                });
        } catch (error) {
            console.error('Request error:', error);
           
        }
    });   
});

function populateVidDivs(container, imgArray) {
    container.innerHTML = "";
    imgArray.forEach(async item => {
        const videoId = getVideoId(item.imgfile);
        const details = await getYoutubeDetails(videoId, apiKey);
        const videoTitle = details.videoTitle;
        const videoDescription = details.videoDescription;
        const mediaRow = document.createElement('div');
        mediaRow.className = 'mediarow';

        const mainFileDiv = document.createElement('div');
        mainFileDiv.className = 'mainfile';
        const img = document.createElement('img');
        const mediaSrc = 'https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=1&enablejsapi=1';
        img.src = `https://img.youtube.com/vi/${item.imgfile.split("v=")[1]}/0.jpg`;
        img.onclick = () => {
            $("#full-player-video-iframe").attr("src", mediaSrc);
            $("#videoBox").fadeIn(400);
        };
        mainFileDiv.appendChild(img);

        const middleRowDiv = document.createElement('div');
        middleRowDiv.className = 'middlerow';

        const middleUpperDiv = document.createElement('div');
        middleUpperDiv.className = 'middlerow-upper-child';
        middleUpperDiv.textContent = videoDescription;

        const middleLowerDiv = document.createElement('div');
        middleLowerDiv.className = 'middlerow-lower-child';
        const likesItem = document.createElement('div');
        likesItem.className = 'item';
        likesItem.textContent = item.likes_count > 1 ? `${item.likes_count} likes` : `${item.likes_count} like`;
        const commentsItem = document.createElement('div');
        commentsItem.className = 'item';
        commentsItem.textContent = `${item.comment_count} comments`;
        middleLowerDiv.appendChild(likesItem);
        middleLowerDiv.appendChild(commentsItem);

        const lastRowDiv = document.createElement('div');
        lastRowDiv.className = 'lastrow';

        const lastLastDiv = document.createElement('div');
        lastLastDiv.className = 'lastrow-lastchild';
        const trashIcon = document.createElement('i');
        trashIcon.className = 'fa fa-trash';
        trashIcon.onclick = () => {
            showConfirmationDialog("Sure about deleting this work?", 'Warning', function () {
                delItem(item.id);
            });
        };
        lastLastDiv.appendChild(trashIcon);

        lastRowDiv.appendChild(lastLastDiv);

        middleRowDiv.appendChild(middleUpperDiv);
        middleRowDiv.appendChild(middleLowerDiv);

        mediaRow.appendChild(mainFileDiv);
        mediaRow.appendChild(middleRowDiv);
        mediaRow.appendChild(lastRowDiv);

        container.appendChild(mediaRow);
    });
}


 async function fetchMediaData() {
    const formData = new FormData();
    formData.append("request", "fetch_files");
    try {
        axios
            .post(
                "https://www.emkapp.com/fad_s_portfolio/back-end/mediafiles.php",
                formData,
            
            )
            .then(async (res) => {
                //console.log(res);
                const responseData = res.data;
                const pencilData = responseData.pencilData;
                const psData = responseData.psData;
                const aeData = responseData.aeData;
                const threedData = responseData.threedData;
                const vidsData = responseData.generalVideosData;
                imgArrayPencil = pencilData;
                imgArrayPs = psData;
                imgArrayAe = aeData;
                imgArray3d = threedData;
                imgArrayVids = vidsData;
             
                //console.log(vidsData);
                populateVidDivs(aecontainer, imgArrayAe);
                populateVidDivs(videocontainer, imgArrayVids);
                populateDivs(pencilcontainer, imgArrayPencil);
                populateDivs(pscontainer, imgArrayPs);
                populateDivs(threedcontainer, imgArray3d);
                //updateImages();
            })
            .catch((err) => {
                popSnackBar(err);
          
            });
    } catch (error) {
        console.error('Request error:', error);
       
    }
}

  //start_player("");
fetchApiKey(); 
fetchgeneralbiodata();

  fetchusers();
fetchadmins();
verifyAdmin();
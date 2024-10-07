let shouldExecuteFunction = true;
let msgId, mdivId, sName, rName, responseMessage;
let recip_id, rec_div, videokey;
const isDesktopQuery = window.matchMedia("(min-width: 1024px)");
let groupedMessages = {};
const isDesktopBrowser = isDesktopQuery.matches;
//let userid = sessionStorage.getItem("UserID");
let recipient, parentID = "";
const message = sessionStorage.getItem("requestParam");
let  uid;
var myDiv = document.getElementById("cinput");
const canvas = document.getElementById("canvas-preview");
const ctx = canvas.getContext("2d");
let newarr = [];
const usedNames = JSON.parse(localStorage.getItem('usedNames')) || [];

let capturedImages = [], fileArray = [];
var myApp = {
  currentposition: 0,
};
var menu = document.getElementById("mcon");
menu.style.height = "0px";
document.getElementById("mconbtn").addEventListener("click", function () {
  toggleMenuVisibility();
});

document.addEventListener("click", (event) => {
  if (event.target.id !== "mconbtn") {
    toggleMenuVisibilityTwo();
  }
});
document.getElementById("cambtn").addEventListener("click", () => {
  
  toggleMenuVisibility();
  if (fileArray.length === 20) {
    showAlertDialog("Maximum number of files reached", "Message");
  } else {
    startStreaming();
  }
});

document.getElementById("musicbtn").addEventListener("click", () => {
  toggleMenuVisibility();
  if (fileArray.length === 20) {
    showAlertDialog("Maximum number of files reached", "Message");
  } else {
    var fileInput = document.createElement("input");
    fileInput.type = "file";

    // Specify the accepted file extensions
    fileInput.accept = ".mp3, .wav, .mp4";

    // Specify the maximum file size limit (16MB)
    fileInput.setAttribute("maxlength", 16 * 1024 * 1024);

    // Trigger the file picker dialog
    fileInput.click();

    // Handle selected file
    fileInput.addEventListener("change", function (event) {
      var selectedFile = event.target.files[0];

      // Check file extension
      var validExtensions = [".mp3", ".wav", ".mpeg"];
      var fileExtension = selectedFile.type.split("/").pop().toLowerCase();
      if (!validExtensions.includes("." + fileExtension)) {
        showAlertDialog("Error: Invalid file." + fileExtension, "Message");
        console.log("Error: Invalid file.");
        return;
      }

      // Check file size
      var maxSize = 16 * 1024 * 1024; // 16MB
      if (selectedFile.size > maxSize) {
        showAlertDialog("Error: File size exceeds 16MB.", "Message");
        //console.log('Error: File size exceeds the maximum limit.');
        return;
      } else {
        if (!validExtensions.includes("." + fileExtension)) {
          showAlertDialog("Error: Invalid file.", "Message");
          console.log("Error: Invalid file.");
          return;
        } else {
          showUploadPanel();
          showSpinner("sfilesdiv");
          handleFileValidation(selectedFile).then((result) => {
            hideSpinner();
            if (result.includes("Invalid")) {
              showAlertDialog(result, "Message");
            } else {
              const fileObject = {
                file: selectedFile,
                comment: ""
              };
          
              fileArray.push(fileObject);

              populateFileDisplay(selectedFile, selectedFile.size, "audio", fileExtension);
              populateThumbFileDisplay(selectedFile, selectedFile.size, "audio", selectedFile.name);
              //console.log("file is valid : ", result);
            }
          });
        }
      }

    
    });
  }
});

document.getElementById("vidbtn").addEventListener("click", () => {
  toggleMenuVisibility();
  if (fileArray.length === 20) {
    showAlertDialog("Maximum number of files reached", "Message");
  } else {
    var fileInput = document.createElement("input");
    fileInput.type = "file";

    // Specify the accepted file extensions
    fileInput.accept = ".webm, .mp4";

    // Specify the maximum file size limit (16MB)
    fileInput.setAttribute("maxlength", 16 * 1024 * 1024);

    // Trigger the file picker dialog
    fileInput.click();

    // Handle selected file
    fileInput.addEventListener("change", function (event) {
      var selectedFile = event.target.files[0];

      // Check file extension
      var validExtensions = [".webm", ".mp4"];
      var fileExtension = selectedFile.type.split("/").pop().toLowerCase();
   

      // Check file size
      var maxSize = 16 * 1024 * 1024; // 16MB
      if (selectedFile.size > maxSize) {
        showAlertDialog("Error: File size exceeds 16MB.", "Message");
        console.log("Error: File size exceeds the maximum limit.");
        return;
      } else {
        if (!validExtensions.includes("." + fileExtension)) {
          showAlertDialog("Error: Invalid file.", "Message");
          console.log("Error: Invalid file.");
          return;
        } else {
          showUploadPanel();
          showSpinner("sfilesdiv");
          handleFileValidation(selectedFile).then((result) => {
            hideSpinner();
            if (result.includes("Invalid")) {
              showAlertDialog(result, "Message");
            } else {
              const fileObject = {
                file: selectedFile,
                comment: ""
              };
          
              fileArray.push(fileObject);

              populateFileDisplay(selectedFile, selectedFile.size, "video", selectedFile.name);
              populateThumbFileDisplay(selectedFile, selectedFile.size, "video", selectedFile.name);
              //console.log("file is valid : ", result);
            }
          });
        }
      }

    
    });
  }
});

document.getElementById("picturebtn").addEventListener("click", () => {
  toggleMenuVisibility();
  if (fileArray.length === 20) {
    showAlertDialog("Maximum number of files reached", "Message");
  } else {
    var fileInput = document.createElement("input");
    fileInput.type = "file";

    // Specify the accepted file extensions
    fileInput.accept = ".jpg,.png,.jpeg,.gif";

    // Specify the maximum file size limit (16MB)
    fileInput.setAttribute("maxlength", 16 * 1024 * 1024);

    // Trigger the file picker dialog
    fileInput.click();

    // Handle selected file
    fileInput.addEventListener("change", function (event) {
      var selectedFile = event.target.files[0];

      // Check file extension
      var validExtensions = [".jpg", ".png", ".jpeg", ".gif"];
      var fileExtension = selectedFile.type.split("/").pop().toLowerCase();
    

      // Check file size
      var maxSize = 16 * 1024 * 1024; // 16MB
      if (selectedFile.size > maxSize) {
        showAlertDialog("Error: File size exceeds 16MB.", "Message");
        console.log("Error: File size exceeds the maximum limit.");
        return;
      } else {
        if (!validExtensions.includes("." + fileExtension)) {
          showAlertDialog("Error: Invalid file.", "Message");
          console.log("Error: Invalid file.");
          return;
        } else {
          showUploadPanel();
          showSpinner("sfilesdiv");
          handleFileValidation(selectedFile).then((result) => {
            hideSpinner();
            if (result.includes("Invalid")) {
              showAlertDialog(result, "Message");
            } else {
              const fileObject = {
                file: selectedFile,
                comment: ""
              };
          
              fileArray.push(fileObject);

              populateFileDisplay(selectedFile, selectedFile.size, "picture", selectedFile.name);
              populateThumbFileDisplay(selectedFile, selectedFile.size, "picture", selectedFile.name);
              //console.log("file is valid : ", result);
            }
          });
        }
      }

      //console.log('Selected file:', selectedFile);
    });
  }
});

document.getElementById("filebtn").addEventListener("click", () => {
  toggleMenuVisibility();
  if (fileArray.length === 20) {
    showAlertDialog("Maximum number of files reached", "Message");
  } else {
    var fileInput = document.createElement("input");
    fileInput.type = "file";

    // Specify the accepted file extensions
    fileInput.accept = ".doc,.docx,.xls,.xlsx,.rtf,.txt,.ppt,.pptx,.pdf";

    // Specify the maximum file size limit (16MB)
    fileInput.setAttribute("maxlength", 16 * 1024 * 1024);

    // Trigger the file picker dialog
    fileInput.click();

    // Handle selected file
    fileInput.addEventListener("change", function (event) {
      var selectedFile = event.target.files[0];

      // Check file extension
      var validExtensions = [
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".rtf",
        ".txt",
        ".ppt",
        ".pptx",
        ".pdf",
        ".msword",
        ".vnd.ms-excel",
        ".vnd.ms-powerpoint",
        ".vnd.openxmlformats-officedocument.presentationml.presentation",
        ".plain",
        ".vnd.openxmlformats-officedocument.wordprocessingml.document",
        ".vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ];
      var fileExtension = selectedFile.type.split("/").pop().toLowerCase();
   

      // Check file size
      var maxSize = 16 * 1024 * 1024; // 16MB
      if (selectedFile.size > maxSize) {
        showAlertDialog("Error: File size exceeds 16MB.", "Message");
        console.log("Error: File size exceeds the maximum limit.");
        return;
      } else {
        if (!validExtensions.includes("." + fileExtension)) {
          showAlertDialog("Error: Invalid file. " + fileExtension, "Message");
          console.log("Error: Invalid file." + fileExtension);
          return;
        } else {
          showUploadPanel();
          showSpinner("sfilesdiv");
          handleFileValidation(selectedFile).then((result) => {
            hideSpinner();
            if (result.includes("Invalid")) {
              showAlertDialog("Error: Invalid file.", "Message");
            } else {
              const fileObject = {
                file: selectedFile,
                comment: ""
              };
          
              fileArray.push(fileObject);

              populateFileDisplay(selectedFile, selectedFile.size, "document", selectedFile.name);
              populateThumbFileDisplay(selectedFile, selectedFile.size, "document", selectedFile.name);
            }
          });
        }
      }

      //console.log('Selected file:', selectedFile);
    });
  }
});


function formatFileSize(sizeInBytes) {
    if (sizeInBytes === 0) {
      return '0 Bytes';
    }
  
    var units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    var i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
    var formattedSize = parseFloat((sizeInBytes / Math.pow(1024, i)).toFixed(2));
  
    return formattedSize + ' ' + units[i];
  }
  let currentIndex;
  function populateFileDisplay(file, fsize, ftype, ext) {
    //console.log("files : ", fileArray);
    const docSize = document.getElementById("fdesc");
    const mc = document.getElementById("fmaincontent");
    const filenamediv = document.getElementById("filenametitle");
    const txtbox = document.getElementById("textbox");
    txtbox.value = "";
    const fileIndex = fileArray.findIndex(obj => obj.file === file);
    currentIndex = fileIndex;
    const filecomment = fileArray[currentIndex].comment;
    txtbox.value = filecomment;
  
    txtbox.addEventListener("input", function() {
      const updatedComment = txtbox.value;
      fileArray[currentIndex].comment = updatedComment;
    });
  
    docSize.innerText = formatFileSize(fsize);
    filenamediv.innerText = fileArray[currentIndex].file.name;
    if (ftype == "document") {
      const img = document.createElement("img");
      img.className = "docImg";
      const imgholder = document.createElement("div");
      img.src = getFileExtension(fileArray[currentIndex].file.name);
      mc.innerHTML = "";
      imgholder.appendChild(img);
      mc.appendChild(imgholder);
  
    }   else {
     
  
        var reader = new FileReader();
  
        // Set up the FileReader onload function
        reader.onload = function (e) {
            var mediaElement;
            
            // Check the file type and create the appropriate media element
            if (file.type.startsWith('image/')) {
                // Image
                mediaElement = document.createElement('img');
                mediaElement.src = e.target.result;
            } else if (file.type.startsWith('video/')) {
                // Video
              mediaElement = document.createElement('video');
              mediaElement.src = e.target.result;
            } else if (file.type.startsWith('audio/')) {
                // Audio
              mediaElement = document.createElement('audio');
              mediaElement.src = e.target.result;
             
            } else {
                console.error('Unsupported file type.');
                return;
            }
            
            
           
          
  
            mc.innerHTML = "";
          mc.appendChild(mediaElement);
          if (file.type.startsWith('video/') || file.type.startsWith('audio/')) {
            // Show controls for video and audio elements appended to mc
            mediaElement.controls = true;
            mediaElement.controlsList = "nodownload noplaybackrate";
          }
         
        };
  
        // Read the selected file as a data URL
        reader.readAsDataURL(file);
      
    }
  }
  
  function populateThumbFileDisplay(file, fsize, ftype, ext) {
    const thumbContainer = document.getElementById("fthumb");
    const thumbWrapper = document.createElement("div");
    const thumbDelete = document.createElement("div");
    const mc = document.getElementById("fmaincontent");
    const docSize = document.getElementById("fdesc");
    const filenamediv = document.getElementById("filenametitle");
    const thumbi = document.createElement("i");
    thumbi.className = "fas fa-trash";
   
    const fileIndex = fileArray.findIndex(obj => obj.file === file);
    thumbi.id = `ti${fileIndex}`;
    let index = fileArray.length - 1;
    let finalindex = (index < 1) ? 0 : index;
    thumbWrapper.id = `tw${fileIndex}`;
    thumbWrapper.className = "filechild";
    thumbDelete.className = "icon-background";
   
    thumbi.onclick = function () {
      var thumbWrapperOne = thumbi.parentNode;
      var thumbWrapperId = thumbWrapperOne.id;
      var numIndex = parseInt(this.id.substring(2));
      
      fileArray.splice(numIndex, 1);
      if (fileArray.length === 0) {
        mc.innerHTML = "";
        docSize.innerHTML = "";
        filenamediv.innerHTML = "";
        
        var divToRemove = document.getElementById(`tw${numIndex}`);
        if (divToRemove) {
          divToRemove.parentNode.removeChild(divToRemove);
        }
       
      } else {
        var nextIndex = numIndex < fileArray.length ? numIndex : numIndex - 1;
        var nextObject = fileArray[nextIndex];
        var divToRemove = document.getElementById(`tw${numIndex}`);
        if (divToRemove) {
          divToRemove.parentNode.removeChild(divToRemove);
        }
        populateFileDisplay(nextObject.file, nextObject.file.size, nextObject.ftype, nextObject.file.name);
      
        var divsToAssign = thumbContainer.getElementsByClassName("filechild");
        var delBtn = thumbContainer.getElementsByClassName("fas fa-trash");
        for (var i = 0; i < divsToAssign.length; i++) {
          var divId = "tw" + i;
          divsToAssign[i].id = divId;
          delBtn[i].id = "ti" + i;
        }
      }
    }
  
    if (ftype == "document") {
      const img = document.createElement("img");
      const imgholder = document.createElement("div");
      img.src = getFileExtension(file.name);
      img.onclick = function () {
        populateFileDisplay(fileArray[fileIndex].file, fileArray[fileIndex].file.size, ftype, fileArray[fileIndex].file.name);
        console.log(this.id);
      }
      thumbWrapper.appendChild(img);
      thumbDelete.appendChild(thumbi);
      thumbWrapper.appendChild(thumbDelete);
      thumbContainer.appendChild(thumbWrapper);
  
    } else if (ftype == "audio") { 
      const img = document.createElement("img");
      const imgholder = document.createElement("div");
      img.src = "images/audio.png";
      img.onclick = function () {
        populateFileDisplay(fileArray[fileIndex].file, fileArray[fileIndex].file.size, ftype, fileArray[fileIndex].file.name);
        //console.log(this.id);
      }
      thumbWrapper.appendChild(img);
      thumbDelete.appendChild(thumbi);
      thumbWrapper.appendChild(thumbDelete);
      thumbContainer.appendChild(thumbWrapper);
    } else {
      var reader = new FileReader();
  
      // Set up the FileReader onload function
      reader.onload = function (e) {
          var mediaElement;
          
          // Check the file type and create the appropriate media element
          if (file.type.startsWith('image/')) {
              // Image
              mediaElement = document.createElement('img');
            mediaElement.src = e.target.result;
            mediaElement.onclick = function () {
              populateFileDisplay(fileArray[fileIndex].file, fileArray[fileIndex].file.size, ftype, fileArray[fileIndex].file.name);
             
            }
            thumbWrapper.appendChild(mediaElement);
            thumbDelete.appendChild(thumbi);
            thumbWrapper.appendChild(thumbDelete);
            thumbContainer.appendChild(thumbWrapper);
          } else if (file.type.startsWith('video/')) {
              // Video
            mediaElement = document.createElement('video');
            mediaElement.src = e.target.result;
            mediaElement.onclick = function () {
              populateFileDisplay(fileArray[fileIndex].file, fileArray[fileIndex].file.size, ftype, fileArray[fileIndex].file.name);
              
            }
            thumbWrapper.appendChild(mediaElement);
            thumbDelete.appendChild(thumbi);
            thumbWrapper.appendChild(thumbDelete);
            thumbContainer.appendChild(thumbWrapper);
          } 
          
       
      };
  
      // Read the selected file as a data URL
      reader.readAsDataURL(file);
    }
  }
  
  function getAdjacentIndexes(fileArray, index) {
    const adjacentIndexes = {
      left: -1,
      right: -1
    };
  
    if (index > 0) {
      adjacentIndexes.left = index - 1;
    }
  
    if (index < fileArray.length - 1) {
      adjacentIndexes.right = index + 1;
    }
  
    return adjacentIndexes;
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
  
  const toggleMenuVisibility = () => {
    var menu = document.getElementById("mcon");
    var icons = menu.getElementsByTagName("i");
  
    if (menu.style.height === "0px") {
      menu.style.height = "180px"; // Change the desired height value
      menu.style.paddingBottom = "10px";
      menu.style.paddingLeft = "10px";
      menu.style.paddingRight = "4px";
      menu.style.paddingTop = "10px";
      // Fade in the icons
      for (var i = 0; i < icons.length; i++) {
        icons[i].style.opacity = "1";
        icons[i].style.display = "block";
      }
    } else {
      menu.style.height = "0px";
      menu.style.paddingBottom = "0px";
      menu.style.paddingLeft = "0px";
      menu.style.paddingRight = "0px";
      menu.style.paddingTop = "0px";
  
      // Fade out the icons
      for (var i = 0; i < icons.length; i++) {
        icons[i].style.opacity = "0";
        icons[i].style.display = "none";
      }
    }
  };
  const toggleMenuVisibilityTwo = () => {
    var menu = document.getElementById("mcon");
    var icons = menu.getElementsByTagName("i");
  
    if (menu.style.height == "180px") {
      menu.style.height = "0px";
      menu.style.paddingBottom = "0px";
      menu.style.paddingLeft = "0px";
      menu.style.paddingRight = "0px";
      menu.style.paddingTop = "0px";
  
      // Fade out the icons
      for (var i = 0; i < icons.length; i++) {
        icons[i].style.opacity = "0";
        icons[i].style.display = "none";
      }
    }
  };
  
$(".cropper-container").hide();
  
const convertTime = (time) => {
    return new Date(time).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
};
  
var startX, currentX;
let touchStartX;
let touchStartY;
let tapThreshold = 10;
var longTapTimer;
var touchMoved = false;
function attachDragHandlers(divElement, message) {
  responseMessage = message;
  //console.log("id : ",ndivElement);
  // var divId = ndivElement.id;
  // if (ndivElement) {
  //  var divElement = document.getElementById(ndivElement);
  if (divElement) {
    divElement.draggable = true;

    divElement.addEventListener("mousedown", (event) => {
      event.preventDefault();
      console.log("id : ", event.target.id);
      // Store the initial X position of the mouse or touch event
      startX = event.clientX || event.touches[0].clientX;

      document.addEventListener("mousemove", mousedrag, { passive: false });
    });

    divElement.addEventListener("touchstart", (event) => {
      event.preventDefault();
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      // Store the initial X position of the mouse or touch event
      startX = event.touches[0].clientX;
      longTapTimer = setTimeout(function () {
        if (!touchMoved) {
          // Long tap detected, attach touchmove and touchend events
          document.addEventListener("touchmove", touchdrag, { passive: false });
        }
      }, 1000);
    });
  }
}

function stopDragging(event) {
  event.preventDefault();

  document.removeEventListener("mousemove", drag, { passive: false });
  document.removeEventListener("mouseup", stopDragging, { passive: false });
  var messageId = responseMessage.sender;
  var divId = "mdiv-" + responseMessage.rowid;
  var sname = responseMessage.sender_name;
  rec_div = responseMessage.rowid;
  showReplyPanel(messageId, divId, sname);

  // Reset the position of the div
  document.getElementById(event.target.id).style.left = 0;
}

function stopTouchDragging(event) {
  event.preventDefault();
  var divElement = document.getElementById(event.target.id);
  if (divElement) {
    if (parseInt(divElement.style.left) >= 30) {
      document.removeEventListener("touchmove", drag, { passive: false });
      document.removeEventListener("touchend", stopDragging, {
        passive: false,
      });

      // Reset the position of the div
      document.getElementById(event.target.id).style.left = 0;
      var messageId = responseMessage.sender;
      var divId = "mdiv-" + responseMessage.rowid;
      var sname = responseMessage.sender_name;
      showReplyPanel(messageId, divId, sname);

      //divElement.style.left = 0;
    }
  }
}

function toggleFullscreen(video) {
    video.play();
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { // Firefox
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { // IE/Edge
      video.msRequestFullscreen();
    }
    video.removeEventListener('click', toggleFullscreen);
  }
  
  
  const showReplyPanel = (mid, did, sn) => {
    //console.log("message id : "+recip_id+"\nuserid : "+userid+"\ndiv id : "+rec_div);
    $("#userSpan").html("");
    $("#userDiv").html("");
    $("#userMedia").html("");
    let result = null;
    const parts = did.split("-");
    const desiredString = parts[1];
    rec_div = desiredString;
  
    for (const date in groupedMessages) {
      const dateMessages = groupedMessages[date];
  
      for (const time in dateMessages) {
        const senderMessages = dateMessages[time];
  
        for (const senderId in senderMessages) {
          const array = senderMessages[senderId];
          const foundObject = array.find((obj) => obj.rowid === desiredString);
  
          if (foundObject) {
            result = {
              message: foundObject.message,
              sender: foundObject.sender,
              sender_name: foundObject.sender_name,
              rowid: foundObject.rowid,
              message_type: foundObject.message_type,
              mainfile: foundObject.mainfile,
              fsize: foundObject.fsize,
              sfsize: foundObject.sfsize,
              subfile: foundObject.subfile,
              submessage: foundObject.submessage,
            };
  
            break;
          }
        }
  
        if (result) {
          break;
        }
      }
  
      if (result) {
        break;
      }
    }
  
    /*
  for (const date in groupedMessages) {
    const array = groupedMessages[date];
    const foundObject = array.find(obj => obj.rowid === desiredString);
  
    if (foundObject) {
      result = {
        message: foundObject.message,
        sender: foundObject.sender,
        sender_name: foundObject.sender_name,
        rowid: foundObject.rowid,
        message_type: foundObject.message_type,
        mainfile: foundObject.mainfile,
        fsize: foundObject.fsize,
        sfsize: foundObject.sfsize,
        subfile: foundObject.subfile,
        submessage: foundObject.submessage
      };
      break;
    }
    }*/
    //console.log("result : ", result);
  
    const rmessage = result.message;
    const rsender = result.sender;
    const rsender_name = result.sender_name;
    const rrowid = result.rowid;
    const rmessage_type = result.message_type;
    const rmainfile = result.mainfile;
    const ocontainer = document.getElementById("msg-area");
    const repcontainer = document.getElementById("userMedia");
  
    if (rsender == userid) {
      $("#userSpan").text("You");
    } else {
      $("#userSpan").text(rsender_name);
    }
    if (rmessage_type != "txtmsg") {
      const parts = rmainfile.split("/");
      // $("#userDiv").text(parts.pop());
      $("#userDiv").text(rmessage);
    } else {
      $("#userDiv").text(rmessage);
    }
    if (rmessage_type == "video") {
      const rvideo = document.createElement("video");
      rvideo.src = rmainfile;
      rvideo.className = "repvideo";
      rvideo.controls = false;
      repcontainer.appendChild(rvideo);
    }
  
    ocontainer.addEventListener("click", function () {
      const divElement = document.getElementById("mdiv-" + rrowid);
      divElement.scrollIntoView({ behavior: "smooth" });
    });
    if ($("#rs").height() < 1) {
      $("#rs").css({
        height: "40px",
        "padding-left": "3px",
        "padding-top": "5px",
        "padding-bottom": "5px",
        "padding-right": "5px",
      });
      $("#userDiv").css({ height: "21px" });
      $("#rs").css("height", "40px");
      $("#ca").fadeIn(500);
    }
  };
  
  function closeRep() {
    parentID = "";
    rec_div = "";
    $("#userSpan").html("");
    $("#userDiv").html("");
    $("#userMedia").html("");
    $("#rs").css({
      height: "0px",
      "padding-left": "0px",
      "padding-top": "0px",
      "padding-bottom": "0px",
      "padding-right": "0px",
    });
    $("#userDiv").css({ height: "0px" });
    $("#rs").css("height", "0px");
    $("#ca").fadeOut();
  }
  
  $(document).on("click", "#ca", function (e) {
    closeRep();
  });
  
  $(document).on("touchstart", "#ca", function (e) {
    closeRep();
  });

  function touchdrag(event) {
    event.preventDefault();
  
    currentX = event.clientX || event.touches[0].clientX;
  
    var deltaX = currentX - startX;
    if (document.getElementById(event.target.id)) {
      if (deltaX > 0) {
        document.getElementById(event.target.id).style.left = deltaX + "px";
      }
      if (deltaX >= 20) {
        document.getElementById(event.target.id).style.left = 0;
        document.removeEventListener("mousemove", mousedrag, { passive: false });
        var messageId = responseMessage.sender;
        var divId = "mdiv-" + responseMessage.rowid;
        var sname = responseMessage.sender_name;
        showReplyPanel(messageId, divId, sname);
      }
    }
  }
  
  function mousedrag(event) {
    event.preventDefault();
  
    currentX = event.clientX || event.touches[0].clientX;
  
    var deltaX = currentX - startX;
    if (document.getElementById(event.target.id)) {
      if (deltaX > 0) {
        document.getElementById(event.target.id).style.left = deltaX + "px";
      }
      if (deltaX >= 20) {
        document.getElementById(event.target.id).style.left = 0;
        document.removeEventListener("mousemove", mousedrag, { passive: false });
        var messageId = responseMessage.sender;
        var divId = "mdiv-" + responseMessage.rowid;
        var sname = responseMessage.sender_name;
        showReplyPanel(messageId, divId, sname);
      }
    }
  }
  
  function truncateText(text, maxWidth) {
    var truncatedText = text;
    while (text.length > maxWidth && truncatedText.length > 0) {
      truncatedText = truncatedText.slice(0, -1);
      text = truncatedText + "..." + extension;
    }
    return truncatedText;
  }
  
  const appendElementToGridDiv = (message, mainMessageDiv) => {
    if (message.message_type === "image") {
      const image = new Image();
      image.src = message.mainfile;
      image.className = "vidthumb";
      image.style.cursor = "pointer";
      image.onclick = function () {
        // console.log("Image clicked! : ", groupedMessages);
        //console.log("nid : ", message.rowid);
        $("#fullimg").fadeIn(500);
        populateSlider(groupedMessages, message.rowid);
      };
      mainMessageDiv.appendChild(image);
    } else if (message.message_type === "video") {
      var video = document.createElement("video");
      video.className = "vidthumb";
      video.src = message.mainfile;
      // Hide the default controls
      video.controls = false;
      var container = document.createElement("div");
      container.className = "vidcon";
      // Create a custom play button
      var playButton = document.createElement("button");
      playButton.innerHTML = '<i class="fas fa-play"></i>';
      playButton.className = "pB";
      var durationdiv = document.createElement("div");
      durationdiv.className = "dDiv";
      video.addEventListener("loadedmetadata", function () {
        // Get the duration of the video in seconds
        const duration = video.duration;
  
        // Convert the duration to a human-readable format (e.g., HH:MM:SS)
        const formattedDuration = formatMediaTime(duration);
        durationdiv.textContent = formattedDuration;
        //console.log("Video duration:", formattedDuration);
      });
      // Add an event listener to the play button
      playButton.addEventListener("click", function () {
        $("#fullimg").fadeIn(500);
        populateSlider(groupedMessages, message.rowid);
      });
  
      container.appendChild(playButton);
      container.appendChild(durationdiv);
      // Append the container div to the video element's parent
      if (video.parentNode) {
        video.parentNode.insertBefore(container, video);
      }
      container.appendChild(video);
  
      mainMessageDiv.appendChild(container);
    } else if (message.message_type === "audio") {
      const audio = document.createElement("audio");
      audio.src = message.mainfile;
      audio.className = "audthumb";
      // Hide the default controls
      audio.controls = false;
      var audiocontainer = document.createElement("div");
      audiocontainer.className = "audcon";
      // Create a custom play button
      var audioplayButton = document.createElement("button");
      audioplayButton.innerHTML = '<i class="fas fa-play"></i>';
      audioplayButton.className = "pB extracol";
      var audiodurationdiv = document.createElement("div");
      audio.addEventListener("loadedmetadata", function () {
        // Get the duration of the video in seconds
        const duration = audio.duration;
  
        // Convert the duration to a human-readable format (e.g., HH:MM:SS)
        const formattedDuration = formatMediaTime(duration);
        audiodurationdiv.textContent = formattedDuration;
        //console.log("Video duration:", formattedDuration);
      });
      audiodurationdiv.className = "dDiv extracol";
      // Add an event listener to the play button
      audioplayButton.addEventListener("click", function () {
        $("#fullimg").fadeIn(500);
        populateSlider(groupedMessages, message.rowid);
      });
  
      audiocontainer.appendChild(audioplayButton);
      audiocontainer.appendChild(audiodurationdiv);
      // Append the container div to the video element's parent
      if (audio.parentNode) {
        audio.parentNode.insertBefore(audiocontainer, audio);
      }
      audiocontainer.appendChild(audio);
      mainMessageDiv.appendChild(audiocontainer);
    } else if (message.message_type === "document") {
      // Create the main container div
      const thumbdocContainer = document.createElement("div");
      thumbdocContainer.classList.add("thumbdocContainer");
  
      // Create the thumbiconContainer div
      const thumbiconContainer = document.createElement("div");
      thumbiconContainer.classList.add("thumbiconContainer");
  
      // Create the thumbleftIcon div and its child image element
      const thumbleftIcon = document.createElement("div");
      thumbleftIcon.classList.add("thumbleftIcon");
      const img = document.createElement("img");
      img.src = getFileExtension(message.message);
      thumbleftIcon.appendChild(img);
  
      // Create the thumbrightIcon div and its child icon element
      const thumbrightIcon = document.createElement("div");
      thumbrightIcon.classList.add("thumbrightIcon");
      const icon = document.createElement("i");
      icon.classList.add("fas", "fa-download");
      thumbrightIcon.onclick = function () {
        // Specify the file URL
        const fileURL =
          "https://www.emkapp.com/fad_s_portfolio/back-end/checkfile.php?original_file=" +
          encodeURIComponent(message.mainfile.split("/").pop()) +
          "&media=document&";
  
        // Specify the custom file name
        const fileName = message.message;
  
        // Create a temporary anchor element
        const downloadLink = document.createElement("a");
  
        // Set the file URL and file name as query parameters
        downloadLink.href = fileURL + "filename=" + encodeURIComponent(fileName);
  
        // Trigger the download
        downloadLink.click();
  
        // Clean up the temporary link element
        downloadLink.remove();
      };
      thumbrightIcon.appendChild(icon);
  
      // Append thumbleftIcon and thumbrightIcon to thumbiconContainer
      thumbiconContainer.appendChild(thumbleftIcon);
      thumbiconContainer.appendChild(thumbrightIcon);
  
      // Create the thumbfileDetails div
      const thumbfileDetails = document.createElement("div");
      thumbfileDetails.classList.add("thumbfileDetails");
  
      // Create the thumbfileName div
      const thumbfileName = document.createElement("div");
      thumbfileName.classList.add("thumbfileName");
      thumbfileName.textContent = message.message;
  
      var thumbfilename = thumbfileName.innerText;
      var extension = thumbfilename.substring(thumbfilename.lastIndexOf("."));
      var truncatedthumbfileName = thumbfilename.substring(
        0,
        thumbfilename.length - extension.length
      );
  
      var maxWidth = 20; // Maximum width in pixels
      var availableWidth = thumbfileName.offsetWidth;
      var extensionWidth =
        thumbfileName.getBoundingClientRect().width - availableWidth;
  
      while (availableWidth > maxWidth && truncatedthumbfileName.length > 0) {
        truncatedthumbfileName = truncatedthumbfileName.slice(0, -1);
        thumbfileName.innerText = truncatedthumbfileName + "..." + extension;
        availableWidth = thumbfileName.offsetWidth + extensionWidth;
      }
  
      // Create the thumbfileSizeAndPages div
      const thumbfileSizeAndPages = document.createElement("div");
      thumbfileSizeAndPages.classList.add("thumbfileSizeAndPages");
  
      // Create the thumbfileSize div
      const thumbfileSize = document.createElement("div");
      thumbfileSize.classList.add("thumbfileSize");
      thumbfileSize.textContent = message.fsize;
  
      // Create the thumbfilePages div
      const thumbfilePages = document.createElement("div");
      thumbfilePages.classList.add("thumbfilePages");
      getFilePageCount(message.mainfile)
        .then((result) => {
          //console.log(result); // Output: "10 pages"
          thumbfilePages.textContent = result;
        })
        .catch((error) => {
          console.error(error);
        });
  
      // Append thumbfileSize and thumbfilePages to thumbfileSizeAndPages
      thumbfileSizeAndPages.appendChild(thumbfileSize);
      thumbfileSizeAndPages.appendChild(thumbfilePages);
  
      // Append thumbfileName and thumbfileSizeAndPages to thumbfileDetails
      thumbfileDetails.appendChild(thumbfileName);
      thumbfileDetails.appendChild(thumbfileSizeAndPages);
  
      // Append thumbiconContainer and thumbfileDetails to thumbdocContainer
      thumbdocContainer.appendChild(thumbiconContainer);
      thumbdocContainer.appendChild(thumbfileDetails);
  
      mainMessageDiv.appendChild(thumbdocContainer);
    } else {
      // mainMessageDiv.textContent = message.message;
      var text = message.message;
      var urlRegex = /(https?:\/\/[^\s]+)/g;
  
      // Split the text into URL and non-URL parts
      var parts = text.split(urlRegex);
  
      // Iterate over the parts and create appropriate HTML elements
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
  
        // Check if the part is a URL
        if (urlRegex.test(part)) {
          // Create an anchor element
          var link = document.createElement("a");
          link.href = part;
          link.target = "_blank"; // Open the link in a new tab
          link.textContent = part;
  
          // Append the link to the div
          mainMessageDiv.appendChild(link);
        } else {
          // If it's not a URL, simply append the text as is
          mainMessageDiv.appendChild(document.createTextNode(part));
        }
      }
    }
  };
  
  const appendElementToMainDiv = (message, mainMessageDiv) => {
    if (message.message_type === "image") {
      const image = new Image();
      image.src = message.mainfile;
      image.className = "chatimg";
      image.onclick = function () {
        // console.log("Image clicked! : ", groupedMessages);
        $("#fullimg").fadeIn(500);
        populateSlider(groupedMessages, message.rowid);
      };
  
      const commentDiv = document.createElement("div");
      commentDiv.className = "chatcomment";
      var text = message.submessage;
      var urlRegex = /(https?:\/\/[^\s]+)/g;
  
      // Split the text into URL and non-URL parts
      var parts = text.split(urlRegex);
  
      // Iterate over the parts and create appropriate HTML elements
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
  
        // Check if the part is a URL
        if (urlRegex.test(part)) {
          // Create an anchor element
          var link = document.createElement("a");
          link.href = part;
          link.target = "_blank"; // Open the link in a new tab
          link.textContent = part;
          var videoId = getVideoIdMessages(part);
          if (videoId) {
            getYoutubeDetailsMessages(videoId, function(videoTitle, videoDescription, videoThumbnail, videoId) {
              const ydiv = document.createElement("div");
              ydiv.className = "myVideoOne";
              youtubeContainer(videoTitle, videoDescription, videoThumbnail, videoId, ydiv);
             
             
              mainMessageDiv.appendChild(ydiv);
            }, function(error) {
              mainMessageDiv.appendChild(link);
            });
          } 
          // Append the link to the div
          else{ commentDiv.appendChild(link); }
        } else {
          // If it's not a URL, simply append the text as is
          commentDiv.appendChild(document.createTextNode(part));
        }
      }
  
      mainMessageDiv.appendChild(image);
      mainMessageDiv.appendChild(commentDiv);
    } else if (message.message_type === "video") {
      if (isDesktopBrowser) {
        const video = document.createElement("div");
        video.className = "myVideo";
        //container.appendChild(video);
  
        // Initialize Artplayer for each video player
        var art = new Artplayer({
          container: video,
          url: message.mainfile,
          poster: "",
          type: "",
          theme: "#f00",
          volume: 0.7,
          autoMini: true, // Disable Auto Mini Mode
          responsive: true,
          playbackRate: true,
          miniProgressBar: true,
          screenshot: true,
          setting: true,
          hotkey: true,
          pip: true,
          mutex: true,
          backdrop: true,
          fullscreen: true,
          playsInline: true,
          aspectRatio: true,
          autoOrientation: true,
          airplay: true,
        });
        art.contextmenu.show = false;
        video.addEventListener(
          "contextmenu",
          function (event) {
            // Prevent the default right-click behavior
            event.preventDefault();
          },
          false
        );
  
        mainMessageDiv.appendChild(video);
      } else {
        const video = document.createElement("div");
        video.className = "myVideo";
        //container.appendChild(video);
  
        // Initialize Artplayer for each video player
        var art = new Artplayer({
          container: video,
          url: message.mainfile,
          poster: "",
          type: "",
          theme: "#f00",
          volume: 0.7,
          autoMini: false, // Disable Auto Mini Mode
          responsive: true,
          playbackRate: true,
          miniProgressBar: false,
          screenshot: false,
          setting: true,
          hotkey: true,
          pip: true,
          mutex: true,
          backdrop: true,
          fullscreen: true,
          playsInline: true,
          aspectRatio: true,
          autoOrientation: true,
          airplay: true,
        });
        art.contextmenu.show = false;
        video.addEventListener(
          "contextmenu",
          function (event) {
            // Prevent the default right-click behavior
            event.preventDefault();
          },
          false
        );
  
        mainMessageDiv.appendChild(video);
  
  
        /*const videotime = document.createElement("div");
        videotime.className = "mtimeone";
  
        const playIcon = document.createElement("div");
        playIcon.id = "pi-" + message.rowid;
        playIcon.classList.add("play-icon");
        const video = document.createElement("video");
        video.src = message.mainfile;
        video.className = "chatimg";
  
        playIcon.onclick = playIcon.ontouchstart = function () {
          video.controls = true;
          toggleFullscreen(video);
          //video.play();
        };
  
        video.addEventListener("play", function () {
          video.controls = true;
        });
  
        video.addEventListener("pause", function () {
          video.controls = true;
        });
  
        video.addEventListener("fullscreenchange", function (e) {
          console.log("change : ", e);
          if (document.webkitFullscreenElement === video) {
            video.controls = true;
            playIcon.style.display = "none";
            videotime.style.display = "none";
          } else {
            video.controls = false;
            video.currentTime = 0;
            playIcon.style.display = "block";
            videotime.style.display = "block";
          }
        });
  
        video.addEventListener("loadedmetadata", function () {
          // Get the duration of the video in seconds
          const duration = video.duration;
  
          // Convert the duration to a human-readable format (e.g., HH:MM:SS)
          const formattedDuration = formatMediaTime(duration);
          videotime.textContent = formattedDuration;
          //console.log("Video duration:", formattedDuration);
        });
        mainMessageDiv.appendChild(videotime);
        mainMessageDiv.appendChild(video);
        mainMessageDiv.appendChild(playIcon);*/
      }
  
      const commentDiv = document.createElement("div");
      commentDiv.className = "chatcomment";
      var text = message.submessage;
      var urlRegex = /(https?:\/\/[^\s]+)/g;
  
      // Split the text into URL and non-URL parts
      var parts = text.split(urlRegex);
  
      // Iterate over the parts and create appropriate HTML elements
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
  
        // Check if the part is a URL
        if (urlRegex.test(part)) {
          // Create an anchor element
          var link = document.createElement("a");
          link.href = part;
          link.target = "_blank"; // Open the link in a new tab
          link.textContent = part;
          var videoId = getVideoIdMessages(part);
          if (videoId) {
            getYoutubeDetailsMessages(videoId, function(videoTitle, videoDescription, videoThumbnail, videoId) {
              const ydiv = document.createElement("div");
              ydiv.className = "myVideoOne";
              youtubeContainer(videoTitle, videoDescription, videoThumbnail, videoId, ydiv);
             
             
              mainMessageDiv.appendChild(ydiv);
            }, function(error) {
              mainMessageDiv.appendChild(link);
            });
          } 
          // Append the link to the div
          else{ commentDiv.appendChild(link); }
        } else {
          // If it's not a URL, simply append the text as is
          commentDiv.appendChild(document.createTextNode(part));
        }
      }
      //commentDiv.textContent = message.submessage;
  
      mainMessageDiv.appendChild(commentDiv);
    } else if (message.message_type === "audio") {
      const audio = document.createElement("audio");
      audio.src = message.mainfile;
      audio.className = "myAudioClass";
      audio.controls = true;
  
      const commentDiv = document.createElement("div");
      commentDiv.className = "chatcomment";
      var text = message.submessage;
      var urlRegex = /(https?:\/\/[^\s]+)/g;
  
      // Split the text into URL and non-URL parts
      var parts = text.split(urlRegex);
  
      // Iterate over the parts and create appropriate HTML elements
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
  
        // Check if the part is a URL
        if (urlRegex.test(part)) {
          // Create an anchor element
          var link = document.createElement("a");
          link.href = part;
          link.target = "_blank"; // Open the link in a new tab
          link.textContent = part;
          var videoId = getVideoIdMessages(part);
          if (videoId) {
            getYoutubeDetailsMessages(videoId, function(videoTitle, videoDescription, videoThumbnail, videoId) {
              const ydiv = document.createElement("div");
              ydiv.className = "myVideoOne";
              youtubeContainer(videoTitle, videoDescription, videoThumbnail, videoId, ydiv);
             
             
              mainMessageDiv.appendChild(ydiv);
            }, function(error) {
              mainMessageDiv.appendChild(link);
            });
          } 
          // Append the link to the div
          else{ commentDiv.appendChild(link); }
        } else {
          // If it's not a URL, simply append the text as is
          commentDiv.appendChild(document.createTextNode(part));
        }
      }
      // commentDiv.textContent = message.submessage;
  
      mainMessageDiv.appendChild(audio);
      mainMessageDiv.appendChild(commentDiv);
    } else if (message.message_type === "document") {
      var docContainer = document.createElement("div");
      docContainer.className = "docContainer";
  
      // Create the leftIcon div and add the image
      var leftIcon = document.createElement("div");
      leftIcon.className = "leftIcon";
      var image = document.createElement("img");
      image.src = getFileExtension(message.message);
      leftIcon.appendChild(image);
  
      // Create the fileDetails div
      var fileDetails = document.createElement("div");
      fileDetails.className = "fileDetails";
  
      // Create the fileName div and set its text content
      var fileName = document.createElement("div");
      fileName.className = "fileName";
      fileName.textContent = message.message;
      fileDetails.appendChild(fileName);
  
      // Create the fileSizeAndPages div
      var fileSizeAndPages = document.createElement("div");
      fileSizeAndPages.className = "fileSizeAndPages";
  
      // Create the fileSize div and set its text content
      var fileSize = document.createElement("div");
      fileSize.className = "fileSize";
      fileSize.textContent = message.fsize;
      fileSizeAndPages.appendChild(fileSize);
  
      // Create the filePages div and set its text content
      var filePages = document.createElement("div");
      filePages.className = "filePages";
      getFilePageCount(message.mainfile)
        .then((result) => {
          //console.log("result : ",result); // Output: "10 pages"
          filePages.textContent = result;
        })
        .catch((error) => {
          console.error(error);
        });
      // filePages.textContent = '99 pages';
     
        fileSizeAndPages.appendChild(filePages);
      
      // Append the fileSizeAndPages div to the fileDetails div
      fileDetails.appendChild(fileSizeAndPages);
  
      // Create the rightIcon div and add the icon
      var rightIcon = document.createElement("div");
      rightIcon.className = "rightIcon";
      var icon = document.createElement("i");
      icon.className = "fas fa-download";
      rightIcon.onclick = function () {
        // Specify the file URL
        const fileURL =
          "https://www.emkapp.com/fad_s_portfolio/back-end/checkfile.php?original_file=" +
          encodeURIComponent(message.mainfile.split("/").pop()) +
          "&media=document&";
  
        // Specify the custom file name
        const fileName = message.message;
  
        // Create a temporary anchor element
        const downloadLink = document.createElement("a");
  
        // Set the file URL and file name as query parameters
        downloadLink.href = fileURL + "filename=" + encodeURIComponent(fileName);
  
        // Trigger the download
        downloadLink.click();
  
        // Clean up the temporary link element
        downloadLink.remove();
      };
      rightIcon.appendChild(icon);
  
      // Append all the elements to the main container div
      docContainer.appendChild(leftIcon);
      docContainer.appendChild(fileDetails);
      docContainer.appendChild(rightIcon);
  
      const commentDiv = document.createElement("div");
      commentDiv.className = "chatcomment";
      var text = message.submessage;
      var urlRegex = /(https?:\/\/[^\s]+)/g;
  
      // Split the text into URL and non-URL parts
      var parts = text.split(urlRegex);
  
      // Iterate over the parts and create appropriate HTML elements
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
  
        // Check if the part is a URL
        if (urlRegex.test(part)) {
          // Create an anchor element
          var link = document.createElement("a");
          link.href = part;
          link.target = "_blank"; // Open the link in a new tab
          link.textContent = part;
          var videoId = getVideoIdMessages(part);
          if (videoId) {
            getYoutubeDetailsMessages(videoId, function(videoTitle, videoDescription, videoThumbnail, videoId) {
              const ydiv = document.createElement("div");
              ydiv.className = "myVideoOne";
              youtubeContainer(videoTitle, videoDescription, videoThumbnail, videoId, ydiv);
             
             
              mainMessageDiv.appendChild(ydiv);
            }, function(error) {
              mainMessageDiv.appendChild(link);
            });
          } 
          // Append the link to the div
          else{ commentDiv.appendChild(link); }
        } else {
          // If it's not a URL, simply append the text as is
          commentDiv.appendChild(document.createTextNode(part));
        }
      }
  
      mainMessageDiv.appendChild(docContainer);
      mainMessageDiv.appendChild(commentDiv);
    } else {
      var text = message.message;
      var urlRegex = /(https?:\/\/[^\s]+)/g;
  
      // Split the text into URL and non-URL parts
      var parts = text.split(urlRegex);
  
      // Iterate over the parts and create appropriate HTML elements
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
  
        // Check if the part is a URL
        if (urlRegex.test(part)) {
          // Create an anchor element
          var link = document.createElement("a");
          link.href = part;
          link.target = "_blank"; // Open the link in a new tab
          link.textContent = part;
          var videoId = getVideoIdMessages(part);
          if (videoId) {
            getYoutubeDetailsMessages(videoId, function (videoTitle, videoDescription, videoThumbnail, videoId) {
              const ydiv = document.createElement("div");
              ydiv.className = "myVideoOne";
              youtubeContainer(videoTitle, videoDescription, videoThumbnail, videoId, ydiv);
             
             
              mainMessageDiv.appendChild(ydiv);
            }, function(error) {
              mainMessageDiv.appendChild(link);
            });
          } else {
            // Append the link to the div
            mainMessageDiv.appendChild(link);
          }
        } else {
          // If it's not a URL, simply append the text as is
          mainMessageDiv.appendChild(document.createTextNode(part));
        }
      }
      // mainMessageDiv.textContent = message.message;
    }
  };
  
  function youtubeContainer(videoTitle, videoDescription, videoThumbnail, videoId, ydiv) {
    var youtubeDetailsDiv = document.createElement('div');
  youtubeDetailsDiv.className = 'youtube-details';
  
  // Create the video player div
    var videoPlayerDiv = document.createElement('div');
    videoPlayerDiv.className = 'videoPlayer';
  var playerHtml = '<iframe class="iframeClass" src="https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    videoPlayerDiv.innerHTML = playerHtml;
  
    
  // Create the video info div
    var videoInfoDiv = document.createElement('div');
    videoInfoDiv.className = 'videoInfo';
  
  // Create the video title heading
    var videoTitleHeading = document.createElement('h3');
    videoTitleHeading.className = 'videoTitle';
  videoTitleHeading.textContent = videoTitle;
  
  // Create the video description paragraph
    var videoDescriptionParagraph = document.createElement('p');
    videoDescriptionParagraph.className = 'videoDescription';
  videoDescriptionParagraph.textContent = videoDescription;
  
  // Append the video title and description to the video info div
  videoInfoDiv.appendChild(videoTitleHeading);
  videoInfoDiv.appendChild(videoDescriptionParagraph);
  
  // Append the video player and video info to the parent div
  youtubeDetailsDiv.appendChild(videoPlayerDiv);
    youtubeDetailsDiv.appendChild(videoInfoDiv);
    ydiv.appendChild(youtubeDetailsDiv);
    return ydiv;
}
  


function getYoutubeDetailsMessages(videoId, callback, errorCallback) {
    var apiUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&key=' + videokey;
  
    $.getJSON(apiUrl)
      .done(function(data) {
        if (data.items.length > 0) {
          var videoTitle = data.items[0].snippet.title;
          var videoDescription = data.items[0].snippet.description;
          var videoThumbnail = data.items[0].snippet.thumbnails.default.url;
  
          var content = '<h3>' + videoTitle + '</h3>';
          content += '<p>' + videoDescription + '</p>';
          content += '<img src="' + videoThumbnail + '">';
          const div = document.createElement("div");
          div.className = "myVideo";
          div.innerHTML = content;
          callback(videoTitle, videoDescription, videoThumbnail, videoId);
        } else {
          console.log("No data available");
        }
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        errorCallback(errorThrown);
      });
  }
  
  function getVideoIdMessages(url) {
    var videoId = null;
    var pattern = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
    var match = url.match(pattern);
  
    if (match && match[1]) {
      videoId = match[1];
    }
  
    return videoId;
  }
  
  function populateSlider(data, rId) {
    const slidescontainer = document.getElementById("slidescreen");
    const thumbscontainer = document.getElementById("slidethumbnail");
    const captioncontainer = document.getElementById("crsbar");
    newarr = [];
    slidescontainer.innerHTML = "";
    thumbscontainer.innerHTML = "";
  
    //console.log("new data : ", data);
  
    for (const date in data) {
      if (data.hasOwnProperty(date)) {
        const messagesByDate = data[date];
        for (const time in messagesByDate) {
          if (messagesByDate.hasOwnProperty(time)) {
            const messagesByTime = messagesByDate[time];
            for (const senderId in messagesByTime) {
              if (messagesByTime.hasOwnProperty(senderId)) {
                const messages = messagesByTime[senderId];
                messages.forEach((message) => {
                  if (
                    message.message_type !== "txtmsg" &&
                    message.message_type !== "document"
                  ) {
                    // Create a new object with desired properties and push it to the new array
                    newarr.push({
                      message_type: message.message_type,
                      mainfile: message.mainfile || "",
                      rowid: message.rowid || "",
                      sender_name: message.sender_name,
                      sender: message.sender,
                      message: message.message,
                      modified_message: message.modified_message,
                      submessage: message.submessage,
                    });
                  }
                });
              }
            }
          }
        }
      }
    }
  
    //console.log("newarr : ", newarr,"id : ",rId);
  
    // Generate and append HTML elements based on message_type
    newarr.forEach((message) => {
      const element = document.createElement("div");
      element.className = "crs-screen-item";
      const thumbelement = document.createElement("div");
      thumbelement.className = "crs-bar-roll-item";
      thumbelement.id = "thumbnail_" + message.rowid;
      if (message.submessage !== "" || message.submessage != null) {
        const elem = document.createElement("div");
        elem.className = "elem-caption";
        var text = message.submessage;
        var urlRegex = /(https?:\/\/[^\s]+)/g;
  
        // Split the text into URL and non-URL parts
        var parts = text.split(urlRegex);
  
        // Iterate over the parts and create appropriate HTML elements
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
  
          // Check if the part is a URL
          if (urlRegex.test(part)) {
            // Create an anchor element
            var link = document.createElement("a");
            link.href = part;
            link.target = "_blank"; // Open the link in a new tab
            link.textContent = part;
  
            // Append the link to the div
            elem.appendChild(link);
          } else {
            // If it's not a URL, simply append the text as is
            elem.appendChild(document.createTextNode(part));
          }
        }
        //elem.textContent = message.submessage;
        element.appendChild(elem);
      }
  
      if (message.message_type === "image") {
        const image = document.createElement("img");
        image.src = message.mainfile;
        image.className = "schildtwo";
        image.onclick = () => {
          // Add onclick function logic for image
        };
        const thumbimage = document.createElement("img");
        thumbimage.src = message.mainfile;
        thumbimage.className = "innermedia";
        element.appendChild(image);
        slidescontainer.appendChild(element);
        thumbelement.appendChild(thumbimage);
        thumbscontainer.appendChild(thumbelement);
      } else if (message.message_type === "video") {
        const video = document.createElement("video");
        video.src = message.mainfile;
        video.className = "schild";
        video.controls = true;
        video.onclick = () => {
          // Add onclick function logic for video
        };
        const thumbvideo = document.createElement("video");
        thumbvideo.className = "innermedia";
        thumbvideo.src = message.mainfile;
        element.appendChild(video);
        slidescontainer.appendChild(element);
        thumbelement.appendChild(thumbvideo);
        thumbscontainer.appendChild(thumbelement);
      } else if (message.message_type === "audio") {
        const audio = document.createElement("audio");
        audio.src = message.mainfile;
        audio.className = "schildthree";
        audio.controls = true;
  
        const thumbimage = document.createElement("img");
        
        thumbimage.src = "images/audio.png";
        thumbimage.className = "innermedia";
        element.appendChild(audio);
        slidescontainer.appendChild(element);
        thumbelement.appendChild(thumbimage);
        thumbscontainer.appendChild(thumbelement);
      } /*else if (message.message_type === 'document') {
      const mainBody = document.createElement("div");
      mainBody.className = "picMain";
      const mainHeader = document.createElement("div");
      mainHeader.className = "picHeader";
      const mainDocBody = document.createElement("div");
      mainDocBody.className = "picBody";
  
      mainHeader.innerHTML = message.message;
      const docDiv = document.createElement("div");
      docDiv.className = "schildfour";
      docDiv.id = "doc_" + message.rowid;
      const extension = message.modified_message.split('.').pop().toLowerCase();
      //renderFile(message.mainfile, extension, docDiv);
      //renderFiles(message.mainfile, docDiv);
      renderPdf(message.mainfile, docDiv);
      mainDocBody.appendChild(docDiv);
      mainBody.appendChild(mainHeader);
      mainBody.appendChild(mainDocBody);
      element.appendChild(mainBody);
      slidescontainer.appendChild(element);
  
      const thumbimage = document.createElement('img');
      thumbimage.src = getFileExtension(message.message);
      thumbimage.className = "innermedia";
      thumbelement.appendChild(thumbimage);
      thumbscontainer.appendChild(thumbelement);
    }*/
  
      // Append the element to the container
      //slidescontainer.appendChild(element);
    });
    const index = newarr.findIndex((item) => item.rowid === rId);
    //console.log("index : ", index);
    camRollSlider(index);
    $("#my-slider").camRollSlider(index);
   // slider.camRollSlider("moveToItem", index);
  }
  
  async function getFilePageCount(url) {
    const fileExtension = url.split(".").pop().toLowerCase();
  
    if (fileExtension === "pdf") {
      try {
        const response = await fetch(
          "https://www.emkapp.com/fad_s_portfolio/back-end/get_page_count.php?url=" +
            encodeURIComponent(url)
        );
        const pageCount = parseInt(await response.text());
        const pageString = pageCount === 1 ? "page" : "pages";
        return `${pageCount} ${pageString}`;
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    } else if (
      fileExtension === "doc" ||
      fileExtension === "docx" ||
      fileExtension === "rtf"
    ) {
      try {
        const response = await fetch(
          "https://www.emkapp.com/fad_s_portfolio/back-end/get_page_count.php?url=" +
            encodeURIComponent(url)
        );
       // console.log("count : ", response.text());
        const pageCount = parseInt(await response.text());
        const pageString = pageCount === 1 ? "page" : "pages";
        return `${pageCount} ${pageString}`;
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    } else if (fileExtension === "txt") {
      const text = new TextDecoder().decode(data);
      const lineCount = text.split("\n").length;
      const lineString = lineCount === 1 ? "line" : "lines";
      return `${lineCount} ${lineString}`;
    } else if (fileExtension === "xls" || fileExtension === "xlsx") {
      try {
        const response = await fetch(
          "https://www.emkapp.com/fad_s_portfolio/back-end/get_page_count.php?url=" +
            encodeURIComponent(url)
        );
        const pageCount = parseInt(await response.text());
        const pageString = pageCount === 1 ? "sheet" : "sheets";
        return `${pageCount} ${pageString}`;
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    } else if (fileExtension === "ppt" || fileExtension === "pptx") {
      try {
        const response = await fetch(
          "https://www.emkapp.com/fad_s_portfolio/back-end/get_page_count.php?url=" +
            encodeURIComponent(url)
        );
        const pptpageCount = parseInt(await response.text());
        //console.log("count : ", pageCount);
        const pptpageString = pptpageCount === 1 ? "slide" : "slides";
        return `${pptpageCount} ${pptpageString}`;
      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    }
  }
  
  function fetchFile(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.setRequestHeader(
        "User-Agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36"
      );
  
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(Error(xhr.statusText));
        }
      };
      xhr.onerror = function () {
        reject(Error("Network Error"));
      };
      xhr.send();
    });
}
  
function renderPdf(url, container) {
    //var container = document.getElementById(containerId);
  
    // Fetch the file from URL
    fetchFile(url)
      .then(function (blob) {
        // Read the file as an array buffer
        var reader = new FileReader();
        reader.onloadend = function () {
          var arrayBuffer = reader.result;
  
          // Load the PDF document
          pdfjsLib
            .getDocument(arrayBuffer)
            .promise.then(function (pdfDoc) {
              // Render the first page of the PDF
              pdfDoc.getPage(1).then(function (page) {
                var canvas = document.createElement("canvas");
                var context = canvas.getContext("2d");
                var viewport = page.getViewport({ scale: 1 });
  
                // Set canvas dimensions
                canvas.width = viewport.width;
                canvas.height = viewport.height;
  
                // Render the page on the canvas
                var renderTask = page.render({
                  canvasContext: context,
                  viewport: viewport,
                });
  
                // Wait for rendering to finish
                renderTask.promise.then(function () {
                  // Append the canvas to the container
                  container.appendChild(canvas);
                });
              });
            })
            .catch(function (error) {
              console.error("Error loading PDF:", error);
            });
        };
        reader.readAsArrayBuffer(blob);
      })
      .catch(function (error) {
        console.error("Error fetching file:", error);
      });
  }
  
  function renderFile(fileUrl, extension, contentElement) {
    //console.log("divID: " + docID);
    //var contentElement = document.createElement("div");
  
    // Clear previous content
    contentElement.innerHTML = "";
  
    // Process each file type
    if (extension === "pdf") {
      fetch(fileUrl)
        .then(function (response) {
          return response.arrayBuffer();
        })
        .then(function (data) {
          renderPDF(data, contentElement);
        })
        .catch(function (error) {
          console.error("Error loading PDF:", error);
        });
    } else if (extension === "docx" || extension === "rtf") {
      fetch(fileUrl)
        .then(function (response) {
          return response.arrayBuffer();
        })
        .then(function (data) {
          renderDocxRtf(data, contentElement);
        })
        .catch(function (error) {
          console.error("Error loading DOCX/RTF:", error);
        });
    } else if (extension === "txt") {
      fetch(fileUrl)
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          renderTxt(data, contentElement);
        })
        .catch(function (error) {
          console.error("Error loading TXT:", error);
        });
    } else if (extension === "xlsx" || extension === "xls") {
      fetch(fileUrl)
        .then(function (response) {
          return response.arrayBuffer();
        })
        .then(function (data) {
          renderXLS(data, contentElement);
        })
        .catch(function (error) {
          console.error("Error loading XLS/XLSX:", error);
        });
    } else if (extension === "ppt" || extension === "pptx") {
      fetch(fileUrl)
        .then(function (response) {
          return response.arrayBuffer();
        })
        .then(function (data) {
          //console.log(data);
          renderPPT(data, contentElement);
        })
        .catch(function (error) {
          console.error("Error loading PPT/PPTX:", error);
        });
    } else {
      contentElement.innerHTML =
        "<p>Unsupported file extension: " + extension + "</p>";
    }
  
    return contentElement;
  }
  
  const getFileExtension = (filename) => {
    const extension = filename.split(".").pop().toLowerCase();
  
    if (extension === "pdf") {
      return "images/PDF.png";
    }
    if (extension === "doc" || extension === "docx" || extension === "rtf") {
      return "images/DOC.png";
    }
    if (extension === "xls" || extension === "xlsx") {
      return "images/XLS.png";
    }
    if (extension === "ppt" || extension === "pptx") {
      return "images/PPT.png";
    }
    if (extension === "txt") {
      return "images/TXT.png";
    }
    //console.log(filename);
  };
  
  $("#closeSliderBtn").on("click", function () {
    $("#fullimg").fadeOut(500);
    const mediaElements = document.querySelectorAll("audio, video");
    mediaElements.forEach((media) => {
      if (!media.paused) {
        media.pause();
        media.currentTime = 0;
      }
    });
  });
  
  $("#simBtn").on("click", function () {
    $("#fullimg").fadeOut(500);
    const mediaElements = document.querySelectorAll("audio, video");
    mediaElements.forEach((media) => {
      if (!media.paused) {
        media.pause();
        media.currentTime = 0;
      }
    });
    const divElement = document.getElementById("mdiv-" + currentposition);
    divElement.scrollIntoView({ behavior: "smooth" });
  });
  
  $("#replyBtn").on("click", function () {
    $("#fullimg").fadeOut(500);
    const mediaElements = document.querySelectorAll("audio, video");
    mediaElements.forEach((media) => {
      if (!media.paused) {
        media.pause();
        media.currentTime = 0;
      }
    });
    const foundItem = newarr.find((item) => item.rowid === currentposition);
    var messageId = foundItem.sender;
    var divId = "mdiv-" + foundItem.rowid;
    var sname = foundItem.sender_name;
    parentID = foundItem.rowid;
    showReplyPanel(messageId, divId, sname);
  });
  
  $("#picDownloadBtn").on("click", function () {
    const foundItem = newarr.find((item) => item.rowid === currentposition);
    const itemtobedownloaded = foundItem.mainfile;
    const link = document.createElement("a");
    link.href = itemtobedownloaded;
    //link.setAttribute("download", "");
    link.setAttribute("download", foundItem.message);
    // Trigger the click event to initiate the download
    link.click();
  
    // Clean up the temporary link element
    link.remove();
    // console.log("file : " + itemtobedownloaded);
  });


  function formatMediaTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
  
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
  
    if (hours < 1) {
      return `${formattedMinutes}:${formattedSeconds}`;
    } else {
      const formattedHours = hours.toString().padStart(2, "0");
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
  }
  const contextMenu = document.getElementById("cusmenu");
  
  function createMainMessageElements(message, userid, chatContainer, opMode) {
    const mainMessageDiv = document.createElement("div");
    if (message.parent_id != null && message.parent_id !== "") {
      const messagesArray = Object.values(groupedMessages);
  
      let result = null;
  
      for (const date in groupedMessages) {
        const dateMessages = groupedMessages[date];
  
        for (const time in dateMessages) {
          const senderMessages = dateMessages[time];
  
          for (const senderId in senderMessages) {
            const array = senderMessages[senderId];
            const foundObject = array.find(
              (obj) => obj.rowid === message.parent_id
            );
  
            if (foundObject) {
              result = {
                message: foundObject.message,
                sender: foundObject.sender,
                sender_name: foundObject.sender_name,
                rowid: foundObject.rowid,
                message_type: foundObject.message_type,
                mainfile: foundObject.mainfile,
                fsize: foundObject.fsize,
                sfsize: foundObject.sfsize,
                subfile: foundObject.subfile,
                submessage: foundObject.submessage,
              };
  
              break;
            }
          }
  
          if (result) {
            break;
          }
        }
  
        if (result) {
          break;
        }
      }
  
      //console.log("level message : ", message);
      const rmessage = result.message;
      const rsender = result.sender;
      const rsender_name = result.sender_name;
      const rrowid = result.rowid;
      const rmessage_type = result.message_type;
      const rmainfile = result.mainfile;
  
      const repcontainer = document.createElement("div");
      repcontainer.className = "repMessage";
      const lside = document.createElement("div");
      lside.className = "leftone upperone";
      const rside = document.createElement("div");
      rside.className = "rightone";
      const repsender = document.createElement("span");
      repsender.className = "leftone upperone";
      const repmain = document.createElement("div");
      repmain.className = "leftone lowerone";
      const repmedia = document.createElement("div");
      repmedia.className = "rightone";
  
      if (rsender == userid) {
        repsender.textContent = "You";
      } else {
        repsender.textContent = rsender_name;
      }
      lside.appendChild(repsender);
      if (rmessage_type != "txtmsg") {
        const parts = rmainfile.split("/");
        repmain.textContent = parts.pop();
      } else {
        repmain.textContent = rmessage;
      }
      lside.appendChild(repmain);
      if (rmessage_type == "video") {
        const rvideo = document.createElement("video");
        rvideo.src = rmainfile;
        rvideo.className = "repvideo";
        rvideo.controls = false;
        rside.appendChild(rvideo);
      }
      repcontainer.appendChild(lside);
      repcontainer.appendChild(rside);
      repcontainer.addEventListener("click", function () {
        const divElement = document.getElementById("mdiv-" + rrowid);
        divElement.scrollIntoView({ behavior: "smooth" });
      });
      mainMessageDiv.appendChild(repcontainer);
    }
  
    appendElementToMainDiv(message, mainMessageDiv);
  
    const mainMessageTimeDiv = document.createElement("div");
    mainMessageTimeDiv.textContent = convertTime(message.mtime);
    mainMessageTimeDiv.classList.add("mtime");
    mainMessageDiv.id = "mdiv-" + message.rowid;
    mainMessageDiv.appendChild(mainMessageTimeDiv);
  
    if (message.sender == userid) {
      mainMessageDiv.className = "message sender";
    } else {
      mainMessageDiv.classList.add("message");
    }
  
    //attachDragHandlers(mainMessageDiv, message);
  
    mainMessageDiv.addEventListener("contextmenu", (e) => {
      e.preventDefault(); // Prevent the default browser context menu
  
      // Show the custom context menu at the mouse position
  
      positionContextMenu(e.clientX, e.clientY);
      // Attach onclick event handlers to each menu item
      const menuItems = contextMenu.getElementsByTagName("li");
      Array.from(menuItems).forEach((menuItem, index) => {
        // Hide the second li item if conditions are met
        if (
          index === 1 &&
          !(message.message_type === "video" && isDesktopBrowser)
        ) {
          menuItem.style.display = "none";
        }
  
        // Attach onclick event handler for each menu item
        menuItem.addEventListener("click", () => {
          // Handle the click event for each menu item
          const messageId = message.sender;
          const divId = "mdiv-" + message.rowid;
          const sname = message.sender_name;
  
          if (index === 0) {
            // Action for the first child (index 0)
            parentID = message.rowid;
            showReplyPanel(messageId, divId, sname);
          } else if (index === 1) {
            const fileUrl = message.mainfile; // Replace with your file URL
  
            // Create a temporary link element
            const link = document.createElement("a");
            link.href = fileUrl;
            link.setAttribute("download", message.message);
  
            // Trigger the click event to initiate the download
            link.click();
  
            // Clean up the temporary link element
            link.remove();
          }
  
          contextMenu.style.display = "none";
        });
      });
    });
  
    document.addEventListener("click", () => {
      const contextMenu = document.getElementById("cusmenu");
      contextMenu.style.display = "none";
    });
  
    chatContainer.appendChild(mainMessageDiv);
  }
  
  function createGridMessageElements(message, userid, chatContainer, mode) {
    const mainMessageDiv = document.createElement("div");
    if (
      message.parent_id != null &&
      message.parent_id !== "" &&
      mode == "first"
    ) {
      let result = null;
  
      for (const date in groupedMessages) {
        const dateMessages = groupedMessages[date];
  
        for (const time in dateMessages) {
          const senderMessages = dateMessages[time];
  
          for (const senderId in senderMessages) {
            const array = senderMessages[senderId];
            const foundObject = array.find(
              (obj) => obj.rowid === message.parent_id
            );
  
            if (foundObject) {
              result = {
                message: foundObject.message,
                sender: foundObject.sender,
                sender_name: foundObject.sender_name,
                rowid: foundObject.rowid,
                message_type: foundObject.message_type,
                mainfile: foundObject.mainfile,
                fsize: foundObject.fsize,
                sfsize: foundObject.sfsize,
                subfile: foundObject.subfile,
                submessage: foundObject.submessage,
              };
  
              break;
            }
          }
  
          if (result) {
            break;
          }
        }
  
        if (result) {
          break;
        }
      }
  
      const rmessage = result.message;
      const rsender = result.sender;
      const rsender_name = result.sender_name;
      const rrowid = result.rowid;
      const rmessage_type = result.message_type;
      const rmainfile = result.mainfile;
  
      const repcontainer = document.createElement("div");
      repcontainer.className = "repMessage";
      const lside = document.createElement("div");
      lside.className = "leftone upperone";
      const rside = document.createElement("div");
      rside.className = "rightone";
      const repsender = document.createElement("span");
      repsender.className = "leftone upperone";
      const repmain = document.createElement("div");
      repmain.className = "leftone lowerone";
      const repmedia = document.createElement("div");
      repmedia.className = "rightone";
  
      if (rsender == userid) {
        repsender.textContent = "You";
      } else {
        repsender.textContent = rsender_name;
      }
      lside.appendChild(repsender);
      if (rmessage_type != "txtmsg") {
        const parts = rmainfile.split("/");
        repmain.textContent = parts.pop();
      } else {
        repmain.textContent = rmessage;
      }
      lside.appendChild(repmain);
      if (rmessage_type == "video") {
        const rvideo = document.createElement("video");
        rvideo.src = rmainfile;
        rvideo.className = "repvideo";
        rvideo.controls = false;
        rside.appendChild(rvideo);
      }
      repcontainer.appendChild(lside);
      repcontainer.appendChild(rside);
      repcontainer.addEventListener("click", function () {
        const divElement = document.getElementById("mdiv-" + rrowid);
        divElement.scrollIntoView({ behavior: "smooth" });
      });
      chatContainer.appendChild(repcontainer);
    }
  
    appendElementToGridDiv(message, mainMessageDiv);
  
    const mainMessageTimeDiv = document.createElement("div");
    mainMessageTimeDiv.textContent = convertTime(message.mtime);
    mainMessageTimeDiv.classList.add("mtimethumb");
    mainMessageDiv.id = "mdiv-" + message.rowid;
    mainMessageDiv.appendChild(mainMessageTimeDiv);
  
    mainMessageDiv.addEventListener("contextmenu", (e) => {
      e.preventDefault(); // Prevent the default browser context menu
  
      // Show the custom context menu at the mouse position
  
      positionContextMenu(e.clientX, e.clientY);
      // Attach onclick event handlers to each menu item
      const menuItems = contextMenu.getElementsByTagName("li");
      Array.from(menuItems).forEach((menuItem, index) => {
        // Hide the second li item if conditions are met
        if (
          index === 1 &&
          !(message.message_type === "video" && isDesktopBrowser)
        ) {
          menuItem.style.display = "none";
        }
  
        // Attach onclick event handler for each menu item
        menuItem.addEventListener("click", () => {
          // Handle the click event for each menu item
          const messageId = message.sender;
          const divId = "mdiv-" + message.rowid;
          const sname = message.sender_name;
  
          if (index === 0) {
            // Action for the first child (index 0)
            parentID = message.rowid;
            showReplyPanel(messageId, divId, sname);
          } else if (index === 1) {
            const fileUrl = message.mainfile; // Replace with your file URL
  
            // Create a temporary link element
            const link = document.createElement("a");
            link.href = fileUrl;
            link.setAttribute("download", message.message);
  
            // Trigger the click event to initiate the download
            link.click();
  
            // Clean up the temporary link element
            link.remove();
          }
  
          contextMenu.style.display = "none";
        });
      });
    });
  
    document.addEventListener("click", () => {
      const contextMenu = document.getElementById("cusmenu");
      contextMenu.style.display = "none";
    });
  
    chatContainer.appendChild(mainMessageDiv);
  }
  
  function positionContextMenu(x, y) {
    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    contextMenu.style.display = "flex";
  
    // Check if there is enough space on the right
    if (x + menuWidth <= screenWidth) {
      contextMenu.style.left = x + "px";
    } else {
      // Not enough space on the right, position it to the left
      contextMenu.style.left = x - menuWidth + "px";
    }
  
    // Check if there is enough space at the bottom
    if (y + menuHeight <= screenHeight) {
      contextMenu.style.top = y + "px";
    } else {
      // Not enough space at the bottom, position it at the top
      contextMenu.style.top = y - menuHeight + "px";
    }
    if (window.innerWidth <= 768) {
      contextMenu.style.transform = `translate(-20%, -90%)`;
    } else {
      contextMenu.style.transform = `translate(-180%, -150%)`;
    }
  }
  
  function createRepMessageElements(messages, userid, chatContainer) {
    for (const message of messages) {
      const mainMessageDiv = document.createElement("div");
      appendElementToMainDiv(message, mainMessageDiv);
  
      const mainMessageTimeDiv = document.createElement("div");
      mainMessageTimeDiv.textContent = convertTime(message.mtime);
      mainMessageTimeDiv.classList.add("mtime");
      mainMessageDiv.id = "mdiv-" + message.rowid;
      mainMessageDiv.appendChild(mainMessageTimeDiv);
  
      if (message.sender == userid) {
        mainMessageDiv.className = "message sender";
      } else {
        mainMessageDiv.classList.add("message");
      }
  
      //attachDragHandlers(mainMessageDiv.id, message);
      mainMessageDiv.addEventListener("contextmenu", (e) => {
        e.preventDefault(); // Prevent the default browser context menu
  
        // Show the custom context menu at the mouse position
        const contextMenu = document.getElementById("cusmenu");
        contextMenu.style.display = "flex";
        contextMenu.style.left = `${e.pageX}px`;
        contextMenu.style.top = `${e.pageY}px`;
  
        // Attach onclick event handlers to each menu item
        const menuItems = contextMenu.getElementsByTagName("li");
        Array.from(menuItems).forEach((menuItem) => {
          menuItem.addEventListener("click", () => {
            // Handle the click event for each menu item
            const messageId = message.sender;
            const divId = "mdiv-" + message.rowid;
            const sname = message.sender_name;
            parentID = message.rowid;
            showReplyPanel(messageId, divId, sname);
  
            contextMenu.style.display = "none";
          });
        });
      });
  
      document.addEventListener("click", () => {
        const contextMenu = document.getElementById("cusmenu");
        contextMenu.style.display = "none";
      });
  
      chatContainer.appendChild(mainMessageDiv);
    }
}
  
function renderFiles(furl, container) {
    $.ajax({
      url: furl,
      type: "GET",
      dataType: "arraybuffer",
      processData: false,
      success: function (data) {
        // render the PPTX file using SlideJS
        //var slidejs = new SlideJS();
        //slidejs.load(data, container);
        $(container).html(data);
        $(container).slidejs();
      },
    });
  }
  
  // Function to render PDF files
  function renderPDF(data, container) {
    pdfjsLib.getDocument(data).promise.then(function (pdf) {
      for (var pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pdf.getPage(pageNum).then(function (page) {
          var canvas = document.createElement("canvas");
          var context = canvas.getContext("2d");
  
          var viewport = page.getViewport({ scale: 1.5 });
          canvas.width = viewport.width;
          canvas.height = viewport.height;
  
          page.render({
            canvasContext: context,
            viewport: viewport,
          });
  
          container.appendChild(canvas);
        });
      }
    });
  }
  
  // Function to render DOCX and RTF files
  function renderDocxRtf(data, container) {
    var options = {
      includeDefaultStyleMap: true,
    };
  
    mammoth
      .extractRawText({ arrayBuffer: data }, options)
      .then(function (result) {
        var text = result.value;
  
        var docElement = document.createElement("div");
        docElement.innerText = text;
  
        container.appendChild(docElement);
      });
  }
  
  // Function to render TXT files
  function renderTxt(data, container) {
    var txtElement = document.createElement("pre");
    txtElement.innerText = data;
  
    container.appendChild(txtElement);
  }
  
  // Function to render XLS and XLSX files
  function renderXLS(data, container) {
    var workbook = XLSX.read(data, { type: "array" });
  
    var xlsElement = document.createElement("div");
    xlsElement.innerText = JSON.stringify(workbook, null, 2);
  
    container.appendChild(xlsElement);
  }
  
  // Function to render PPT and PPTX files
  function renderPPT(data, container) {
    var zip = new JSZip();
    zip.loadAsync(data).then(function (zip) {
      // Read the content of the XML slide files
      var slidePromises = [];
      zip.forEach(function (relativePath, zipEntry) {
        if (relativePath.startsWith("ppt/slides/slide")) {
          slidePromises.push(zipEntry.async("string"));
        }
      });
  
      // Process each slide
      Promise.all(slidePromises).then(function (slideContents) {
        //var slidesDiv = document.getElementById('slides');
        slideContents.forEach(function (slideContent, index) {
          var slideElement = document.createElement("div");
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(slideContent, "text/xml");
          const htmlString = new XMLSerializer().serializeToString(xmlDoc);
  
          //slideElement.innerText = "Slide " + (index + 1) + " content:\n" + slideContent;
          slideElement.innerHTML = htmlString;
          container.appendChild(slideElement);
        });
      });
    });
    return container;
    //console.log("container content : ", container);
}
  

const captureButton = document.getElementById("capture-btn");
const cropButton = document.getElementById("crop-btn");
const doneButton = document.getElementById("done-btn");
const cancelBtn = document.getElementById("cancel-btn");
const refreshBtn = document.getElementById("refresh-btn");
const picvideo = document.getElementById("video-preview");
const elem = document.getElementsByClassName("myClass");
let capturestream;

let cropper = null;

const startStreaming = () => {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((capturestreamObj) => {
        capturestream = capturestreamObj;
        picvideo.srcObject = capturestream;
        $("#cameraDiv").fadeIn(500);
      })
      .catch((error) => {
        showAlertDialog("Error accessing camera: " + error, "Message");

        console.error("Error accessing camera: ", error);
      });
  }
};

captureButton.addEventListener("click", () => {
    picvideo.pause();
  
    // Draw the current video frame on the canvas
    ctx.drawImage(picvideo, 0, 0, canvas.width, canvas.height);
  
    // Display the canvas with the captured image
    canvas.style.display = "block";
    cropButton.disabled = false;
    doneButton.disabled = false;
    refreshBtn.disabled = false;
    captureButton.disabled = true;
  });
  
  refreshBtn.addEventListener("click", () => {
    if (cropper) {
      cropper.destroy();
      cropper = null;
      const elements = document.getElementsByClassName("cropper-container");
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
      }
    }
    picvideo.play();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    canvas.style.display = "none";
    refreshBtn.disabled = true;
    doneButton.disabled = true;
    cropButton.disabled = true;
    captureButton.disabled = false;
  });
  
  cropButton.addEventListener("click", () => {
    if (cropper) {
      cropper.destroy();
      cropper = null;
      const elements = document.getElementsByClassName("cropper-container");
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
      }
      canvas.style.display = "block";
    } else {
      canvas.style.display = "none";
      cropper = new Cropper(canvas, {
        aspectRatio: NaN, // Adjust the aspect ratio as needed
        viewMode: 0,
        movable: true,
        zoomable: false,
        rotatable: false,
        scalable: false,
      });
      cropper.options.ready = function () {
        // console.log('Cropper is ready');
        const elements = document.getElementsByClassName("cropper-container");
        for (var i = 0; i < elements.length; i++) {
          elements[i].style.display = "block";
        }
      };
    }
  });
  
  doneButton.addEventListener("click", () => {
    //const isCropped = cropper.getCroppedCanvas() !== null;
    showUploadPanel();
    const elements = document.getElementsByClassName("cropper-container");
    if (cropper) {
      // Get the cropped image as a HTMLCanvasElement
      const croppedCanvas = cropper.getCroppedCanvas();
  
      // Convert the canvas to a Blob object (JPEG or PNG format)
      const croppedBlob = new Promise((resolve) => {
        croppedCanvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg"); // Change 'image/jpeg' to 'image/png' for PNG format
      });
  
      // Add the cropped image file to the file array
      croppedBlob.then((blob) => {
        capturedImages.push(blob);
        //displayImage(blob);
        //const imageUrl = URL.createObjectURL(blob);
        //const newTab = window.open();
        //newTab.document.write(`<html><body><img src="${imageUrl}"/></body></html>`);
        generateuniquename()
    .then(fname => {
      const modifiedBlob = new Blob([blob], { type: blob.type});
      const newfile = convertBlobToFile(modifiedBlob, fname+".jpg");
      const fileObject = {
        file: newfile,
        comment: ""
      };
      fileArray.push(fileObject);
      const fileExtension = newfile.type.split("/")[1];
      showSpinner("video-preview");
      populateFileDisplay(newfile, newfile.size, "image", newfile.name); 
      populateThumbFileDisplay(newfile, newfile.size, "image", newfile.name);
      resetCropper();
      hideSpinner();
    })
    .catch(error => {
      // Handle any errors that occur during the name generation
      showAlertDialog('Error generating unique name:', error, "Message");
     // console.error('Error generating unique name:', error);
    });
        
        
      });
     
    } else {
      // Add the uncropped image file to the file array
      var imageURL = canvas.toDataURL("image/jpeg");
      //const newTab = window.open();
      canvas.toBlob(function (blob) {
        generateuniquename()
    .then(fname => {
      const modifiedBlob = new Blob([blob], { type: blob.type});
      const newfile = convertBlobToFile(modifiedBlob, fname+".jpg");
      const fileObject = {
        file: newfile,
        comment: ""
      };
      fileArray.push(fileObject);
      const fileExtension = newfile.type.split("/")[1];
      showSpinner("video-preview");
      populateFileDisplay(newfile, newfile.size, "image", newfile.name); 
      populateThumbFileDisplay(newfile, newfile.size, "image", newfile.name);
      hideSpinner();
    })
    .catch(error => {
      // Handle any errors that occur during the name generation
      showAlertDialog('Error occured :', error, "Message");
    });
        // Append the Blob to the array
       // capturedImages.push(blob);
       // console.log("Blob added to array:", blob);
      }, "image/jpeg");
      //newTab.document.write(`<html><body><img src="${imageURL}"/></body></html>`);
      /* captureImage().then((blob) => {
            capturedImages.push(blob);
            //displayImage(blob);
            const imageUrl = URL.createObjectURL(blob);
            
        });*/
    }
    if (cropper) {
      cropper.destroy();
      cropper = null;
  
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
      }
    }
    if (capturestream) {
      const tracks = capturestream.getTracks(); // Get all tracks from the capturestream
      tracks.forEach((track) => track.stop()); // Stop each track
      picvideo.srcObject = null; // Set the srcObject of picvideo to null
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    canvas.style.display = "none";
  
    resetCropper();
    refreshBtn.disabled = true;
    captureButton.disabled = false;
    $("#cameraDiv").hide(500);
  });
  
  cancelBtn.addEventListener("click", () => {
    if (cropper) {
      cropper.destroy();
      cropper = null;
  
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
      }
    }
    if (capturestream) {
      const tracks = capturestream.getTracks(); // Get all tracks from the capturestream
      tracks.forEach((track) => track.stop()); // Stop each track
      picvideo.srcObject = null; // Set the srcObject of picvideo to null
    }
    cropButton.disabled = true;
    doneButton.disabled = true;
    refreshBtn.disabled = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    canvas.style.display = "none";
    $("#cameraDiv").hide(500);
  });
  
  
  function convertBlobToFile(blob, filename) {
    // Create a File object with the specified filename
    const file = new File([blob], filename, { type: blob.type });
    return file;
}
  

async function fetchkey() {
    try {
      const response = await fetch('https://www.emkapp.com/fad_s_portfolio/back-end/apikey.php');
      const data = await response.json();
      
      videokey = data.key;
      return videokey;
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error fetching key', error);
      //showAlertDialog('Error fetching key : '+ error.message, "Message");
      throw error; // Rethrow the error to be handled by the caller
    }
  }
  fetchkey(); 
  
  async function generateuniquename() {
    try {
      const response = await fetch('https://www.emkapp.com/fad_s_portfolio/back-end/servertime.php');
      const data = await response.json();
      // Retrieve the server's date and time from the response
      const serverDateTime = new Date(data.serverDateTime);
  
      // Generate the unique name using serverDateTime
      const generatedname = generateRandomName(serverDateTime);
      return generatedname;
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error fetching server date and time:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
  
  function generateRandomName(serverDate) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const currentDate = serverDate.toISOString();
    let randomName = '';
  
    // Generate a random name until a unique one is found
    do {
      randomName = currentDate;
  
      // Append a random 5-letter name
      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomName += characters.charAt(randomIndex);
      }
    } while (usedNames.includes(randomName)); // Check if the name is already used
  
    // Store the generated name in local storage
    usedNames.push(randomName.replace(/[^\w\s]/g, ''));
    localStorage.setItem('usedNames', JSON.stringify(usedNames));
  
    return randomName.replace(/[^\w\s]/g, '');
}
  
function captureImage() {
    const captureCanvas = document.createElement("canvas");
    captureCanvas.width = picvideo.videoWidth;
    captureCanvas.height = "288px";
    const ctx = captureCanvas.getContext("2d");
    ctx.drawImage(picvideo, 0, 0, captureCanvas.width, captureCanvas.height);
  
    return new Promise((resolve) => {
      captureCanvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg"); // Change 'image/jpeg' to 'image/png' for PNG format
    });
  }
  
  function displayImage(blob) {
    const image = document.createElement("img");
    image.src = URL.createObjectURL(blob);
    image.style.maxWidth = "200px";
    imageGallery.appendChild(image);
  }
  
  function resetCropper() {
    if (cropper) {
      cropper.reset();
    }
  
    cropButton.disabled = true;
    cropper = null;
    var elements = document.getElementsByClassName("cropper-container");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }
  
  function dataURLToBlob(dataURL) {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
  
//document.addEventListener('DOMContentLoaded', function() {
    $("#uploadMediaButton").on('click', () => {
      const mediaElements = document.querySelectorAll("audio, video");
      mediaElements.forEach((media) => {
        if (!media.paused) {
          media.pause();
          media.currentTime = 0;
        }
      });
      showSpinner("sfilesdiv");
      const formData = new FormData();
  
      fileArray.forEach(fileObject => {
        formData.append('file[]', fileObject.file);
        formData.append('comment[]', fileObject.comment); 
      });
  
      formData.append("sender", userid);
      if (userRole=="user") {
        formData.append("recipient", "");
      } else {
        formData.append("recipient", recipient);
      }
     
      formData.append("parent_id", parentID);
      
      var formDataObject = {};
      formData.forEach(function(value, key) {
          formDataObject[key] = value;
      });
  
      // Log the form data
     //console.log(formDataObject);
  
      axios.post('https://www.emkapp.com/fad_s_portfolio/back-end/message_upload.php', formData)
        .then(response => {
          //console.log(response.data);
          hideSpinner();
          repopulateMessages(recipient);
          const responseData = response.data[0];
          const message = responseData.message;
         
          if (message.includes("successful")) {
            hideUploadPanel();
            closeRep();
          } else {
            // Access the first element of the array
            showAlertDialog(message, "Message");
          }
        })
        .catch(error => {
          hideSpinner();
          showAlertDialog("Error: " + error, "Message");
          console.error(error);
        });
    });
  
$("#sendMessageButton").on('click', () => {
  if (!$("#msginput").val()) {
    popSnackBar("Please enter a message");  
    return;
  }else{
  //console.log("sending");
  showSpinner("chat");
  const formData = new FormData();
  const input = document.getElementById('msginput');
  formData.append("message", input.value);
  formData.append("sender", userid);
  if (userRole.toString().includes("user")) {
    formData.append("recipient", "");
  } else {
    formData.append("recipient", recipient);
  }
      
  formData.append("parent_id", parentID);
  
  axios.post('https://www.emkapp.com/fad_s_portfolio/back-end/message_upload.php', formData)
    .then(response => {
      //console.log(response);
      hideSpinner();
      repopulateMessages(recipient);
      const responseData = response.data[0];
      const message = responseData.message;
         
      if (message.includes("successful")) {
        $("#sendMessageButton").hide();
        closeRep();
        $("#msginput").val('');
        $("#recordButton").show();
        $("#sendMessageButton").hide();
        input.style.height = 'auto';
      } else {
        // Access the first element of the array
        showAlertDialog(message, "Message");
      }
    })
    .catch(error => {
      hideSpinner();
      showAlertDialog("Error: " + error, "Message");
      console.error(error);
    });
}
    });
//});
  
var generalspinner;

// Function to display the loading spinner
function showGeneralSpinner() {
  // Initialize the spinner if it doesn't exist
  if (!generalspinner) {
    generalspinner = new Spinner().spin();
    var target = document.getElementById('comMain');
    target.appendChild(generalspinner.el);
  }
  // Show the spinner
  generalspinner.el.style.display = 'block';
  generalspinner.el.style.color = 'white !important';
  document.getElementsByClassName('generaloverlay')[0].style.display = 'block';
}

// Function to hide the loading spinner
function hideGeneralSpinner() {
  // Hide the spinner
  if (generalspinner && generalspinner.el) {
    generalspinner.el.style.display = 'none';
    document.getElementsByClassName('generaloverlay')[0].style.display = 'none';
  }
}







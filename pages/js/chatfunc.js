$("#emoji-picker").hide();

//$("#").hide();
$("#emoji-picker-two").hide();
$("#sfilesdiv").hide();
$("#uploadMediaButton").hide();
$("#sendMessageButton").hide();
const minput = document.getElementById('msginput');
const memoBtn = document.getElementById("emoji-icon");
const memocon = document.getElementById("emoji-picker");
const minputtwo = document.getElementById('textbox');
const memoBtntwo = document.getElementById("second-emoji-icon");
const memocontwo = document.getElementById("emoji-picker-two");
const mesconBtn = document.getElementById("mconbtn");
const mestextarea = document.getElementById('textbox');
const mesBox = document.getElementById("msginput");
let audioBlob;

mesBox.style.height = 'auto';
mesBox.addEventListener('input', function () {
  mesBox.style.height = 'auto';
  mesBox.style.height = `${mesBox.scrollHeight}px`;
  if (mesBox.value === '') {
    $("#recordButton").show();
    $("#sendMessageButton").hide();
  } else {
    $("#recordButton").hide();
    $("#sendMessageButton").show();
  }
});

//myDiv.style.justifyContent = "";
$("#closeFileDivBtn").on('click', () => {
  hideUploadPanel();
});

function hideUploadPanel() {
  $("#sfilesdiv").hide(500);
  $("#uploadMediaButton").hide(500);
  myDiv.style.justifyContent = "space-evenly";
  $("#msginput").show();
  $("#recordButton").show();
  $("#emoji-icon").show();
  $("#nav-back").show();
  $("#fthumb").html("");
  $("#fmaincontent").html("");
  $("#fdesc").html("");
  fileArray = [];
  parentID = "";
}

function showUploadPanel() {
  if (!$("#sfilesdiv").is(":visible")) {
    $("#sfilesdiv").show(500);
    $("#msginput").hide();
    $("#recordButton").hide();
    $("#emoji-icon").hide();
    myDiv.style.justifyContent = "space-between";
    $("#uploadMediaButton").show(500);
    $("#nav-back").hide();
  }
}

mestextarea.style.height = 'auto';
mestextarea.addEventListener('input', () => {
  mestextarea.style.height = 'auto';
  mestextarea.style.height = `${mestextarea.scrollHeight}px`;
});

mestextarea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});
minput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});
const mpicker = new EmojiMart.Picker({
    autoHide: true,
    showPreview: false,
    onEmojiSelect: (emoji) => {
      // Insert the selected emoji into the input field
        //console.log("emoji : ", emoji.native);  
      minput.value += emoji.native;
    }
});
const pickertwo = new EmojiMart.Picker({
  autoHide: true,
  showPreview: false,
  onEmojiSelect: (emoji) => {
    // Insert the selected emoji into the input field
     // console.log("emoji : ", emoji.native);  
    minputtwo.value += emoji.native;
    fileArray[currentIndex].comment = minputtwo.value;
  }
});
  //picker.showPicker(input);
memoBtn.addEventListener('click', function () {
   // emojiPicker.showPicker();
    if ($("#emoji-picker").is(":visible")) {
        memocon.removeChild(mpicker);
        $("#emoji-picker").hide(500);
    } else {
        $("#emoji-picker").show(500);
        memocon.appendChild(mpicker);
    }
});
memoBtntwo.addEventListener('click', function () {
  // emojiPicker.showPicker();
   if ($("#emoji-picker-two").is(":visible")) {
       memocontwo.removeChild(pickertwo);
       $("#emoji-picker-two").hide(500);
   } else {
       $("#emoji-picker-two").show(500);
       memocontwo.appendChild(pickertwo);
   }
});




function showChat(id) {
    if (window.matchMedia("(max-width: 768px)").matches) {
      $("#allchatsdiv").hide(500);
      $("#allchatsdiv").css("z-index","4");
        fetchChats(id);
    } else {
        fetchChats(id);
    }
}
  
function closeChats() {
    if (window.matchMedia("(max-width: 768px)").matches) {
        
        if (!$("#allchatsdiv").is(":hidden")) {
            //showFab();
            $("#allchatsdiv").hide(500);
        } else {
          $("#allchatsdiv").show(500);
          $("#allchatsdiv").css("z-index","10");
          }
    }
}

function showFab() {
    $("#fabButton").show(500);   
}

function hideFab() {
    $("#fabButton").hide(500);   
}

const fetchDataFromServer = (sender, receiver) => {
    return new Promise((resolve, reject) => {
      axios.get('https://www.emkapp.com/fad_s_portfolio/back-end/readmessages.php?rec='+encodeURIComponent(sender)+'&id='+encodeURIComponent(receiver)+'&som=raw')
        .then(response => {
          // Resolve the promise with the response data
          resolve(response.data);
        })
        .catch(error => {
          // Reject the promise with the error
          reject(error);
        });
    });
  };

  const updateServerMessages = (sender, receiver) => {
    return new Promise((resolve, reject) => {
      axios.get('https://www.emkapp.com/fad_s_portfolio/back-end/updatereadstatus.php?rec='+encodeURIComponent(sender)+'&id='+encodeURIComponent(receiver)+'&som=raw')
        .then(response => {
          // Resolve the promise with the response data
          resolve(response.data);
        })
        .catch(error => {
          // Reject the promise with the error
          reject(error);
        });
    });
};
  

const fetchUserDataFromServer = (sender) => {
  return new Promise((resolve, reject) => {
    axios.get('https://www.emkapp.com/fad_s_portfolio/back-end/readmessagestwo.php?rec='+encodeURIComponent(sender)+'&som=raw')
      .then(response => {
        // Resolve the promise with the response data
        resolve(response.data);
      })
      .catch(error => {
        // Reject the promise with the error
        reject(error);
      });
  });
};

const updateUserServerMessages = (sender) => {
  return new Promise((resolve, reject) => {
    axios.get('https://www.emkapp.com/fad_s_portfolio/back-end/updatereadstatustwo.php?rec='+encodeURIComponent(sender)+'&som=raw')
      .then(response => {
        // Resolve the promise with the response data
        resolve(response.data);
      })
      .catch(error => {
        // Reject the promise with the error
        reject(error);
      });
  });
};

  function formatNewDate(dateString, mode) {
    var date = new Date(dateString);
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else if (date < yesterday && date >= new Date(today.setDate(today.getDate() - 7))) {
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[date.getDay()];
    } else {
      if (mode=="outer") {
        var day = date.getDate();
        var month = date.getMonth() + 1; // Months are zero-based
        var year = date.getFullYear();

        // Format day, month, and year
        var formattedDay = (day < 10) ? "0" + day : day;
        var formattedMonth = (month < 10) ? "0" + month : month;
        var formattedYear = year;

        // Concatenate the formatted day, month, and year using the "/" separator
        var formattedDate = formattedDay + "/" + formattedMonth + "/" + formattedYear;
        return formattedDate;

      }else {
        var options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }
    }
  }
  







$('#zoomBtn').click(function () {
    $('.zoom-btn-sm').toggleClass('scale-out');
    if (!$('.zoom-card').hasClass('scale-out')) {
      $('.zoom-card').toggleClass('scale-out');
    }
  });
  
  $('.zoom-btn-sm').click(function() {
    var btn = $(this);
    var card = $('.zoom-card');
  
    if ($('.zoom-card').hasClass('scale-out')) {
      $('.zoom-card').toggleClass('scale-out');
    }
    if (btn.hasClass('zoom-btn-person')) {
      card.css('background-color', '#d32f2f');
    } else if (btn.hasClass('zoom-btn-doc')) {
      card.css('background-color', '#fbc02d');
    } else if (btn.hasClass('zoom-btn-tangram')) {
      card.css('background-color', '#388e3c');
    } else if (btn.hasClass('zoom-btn-report')) {
      card.css('background-color', '#1976d2');
    } else {
      card.css('background-color', '#7b1fa2');
    }
  });

  var chat = document.getElementById('chat');
   chat.scrollTop = chat.scrollHeight - chat.clientHeight;

   let stream;
   let mediaRecorder;
   let recordedChunks = [];
   let startTime = Date.now();
   let durationInterval;

   const recordButton = document.getElementById('recordButton');
   const pauseButton = document.getElementById('pauseButton');
   const playButton = document.getElementById('playButton');
   const cancelButton = document.getElementById('cancelButton');
   const stopButton = document.getElementById('stopButton');
   const durationLabel = document.getElementById('duration');

   recordButton.addEventListener('click', startRecording);
   pauseButton.addEventListener('click', pauseRecording);
   playButton.addEventListener('click', pauseRecording);
   cancelButton.addEventListener('click', cancelRecording);
   stopButton.addEventListener('click', uploadRecording);

   /*function startRecording() {
       if (stream && mediaRecorder && mediaRecorder.state === 'inactive') {
           // Retry recording if user has previously rejected access to microphone
           startMediaStream();
       } else {
           startMediaStream();
       }
   }*/

   function startRecording() {
    if (stream && mediaRecorder && mediaRecorder.state === 'inactive') {
        // Retry recording if user has previously rejected access to microphone
        startMediaStream();
    } else {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                // Microphone access is granted
                startMediaStream(stream);
            })
            .catch(function (err) {
                if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                    showAlertDialog("You have to grant access to the microphone to use this feature", 'Message');
                    // The user has denied access to the microphone
                    console.log('Access to the microphone is denied.');
                } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
                  showAlertDialog('Microphone is in use or unavailable.', 'Message');
                } else {
                  showAlertDialog('Error accessing the microphone: ' + err.name, 'Message');
                }
            });
    } else {
        // The browser doesn't support getUserMedia, so we can't access the microphone
        showAlertDialog('Browser does not support getUserMedia.');
    }
    
    }
}



   function startMediaStream() {
       navigator.mediaDevices.getUserMedia({ audio: true })
           .then(function (userStream) {
               stream = userStream;
               mediaRecorder = new MediaRecorder(stream);
               startTime = Date.now();
               durationInterval = setInterval(updateDuration, 1000);
               $("#recs").fadeIn(500);
             mediaRecorder.addEventListener('dataavailable', function (e) {
              console.log("Received audio data:", e.data);
                   recordedChunks.push(e.data);
               });

               mediaRecorder.addEventListener('stop', function () {
                   clearInterval(durationInterval);
                   audioBlob = new Blob(recordedChunks, { type: 'audio/mpeg' });
                   //const audioUrl = URL.createObjectURL(audioBlob);
                   //const audio = new Audio(audioUrl);
                   //audio.controls = true;
                   //document.body.appendChild(audio);
                   console.log("Recorded audio blob:", audioBlob);
                   playButton.disabled = true;
                   cancelButton.disabled = false;
               });

               mediaRecorder.start();

               recordButton.disabled = true;
               pauseButton.disabled = false;
           })
           .catch(function (err) {
               console.log('Error: ' + err);
           });
   }

   let pausedDuration = 0;
   
function pauseRecording() {
  //console.log("state : ", mediaRecorder.state);
  if (mediaRecorder.state === 'recording') {
    mediaRecorder.pause();
    pauseButton.disabled = true;
    playButton.disabled = false;
    clearInterval(durationInterval);
    pausedDuration = Math.floor((Date.now() - startTime) / 1000);
} else if (mediaRecorder.state === 'paused') {
    mediaRecorder.resume();
    pauseButton.disabled = false;
    playButton.disabled = true;
    startTime = Date.now() - (pausedDuration * 1000);
    pausedDuration = 0;
    durationInterval = setInterval(updateDuration, 1000);
}
   }

   function playRecording() {
       const audioBlob = new Blob(recordedChunks, { type: 'audio/mpeg' });
       const audioUrl = URL.createObjectURL(audioBlob);
       const audio = new Audio(audioUrl);
       audio.controls = true;
       document.body.appendChild(audio);
   }

   function cancelRecording() {
       clearInterval(durationInterval);
       mediaRecorder.stop();
       recordedChunks = [];
       durationLabel.textContent = '0:00';
       if (stream) {
        const tracks = stream.getTracks(); // Get all tracks from the capturestream
        tracks.forEach((track) => track.stop()); // Stop each track
      }
       recordButton.disabled = false;
       pauseButton.disabled = false;
     playButton.disabled = true;
     $("#recs").fadeOut(500);
   }

function uploadRecording() {
  mediaRecorder.onstop = function() {
    //const audioBlob = new Blob(recordedChunks, { type: 'audio/mpeg' });
    const formData = new FormData();
    generateuniquename()
      .then(name => {
        const newfile = convertBlobToFile(audioBlob, name + ".mp3");
        formData.append('file[]', newfile);
        formData.append('comment[]', "");
        formData.append("sender", userid);
        formData.append("recipient", recipient);
        formData.append("parent_id", parentID);

        axios.post('https://www.emkapp.com/fad_s_portfolio/back-end/message_upload.php', formData)
          .then(function(response) {
            cancelRecording()
            audioBlob = "";
            repopulateMessages(recipient);
            const responseData = response.data[0];
            //console.log("response : ", response);
            //console.log("audio file : ", newfile);
            //console.log("response : ", response);
            const message = responseData.message;

            if (message.includes("successful")) {
              closeRep();
            } else {
              // Access the first element of the array
              showAlertDialog(message, "Message");
            }
          })
          .catch(function(error) {
            console.error('Upload error:', error.message);
          });
      })
      .catch(error => {
        showAlertDialog('An unknown error occurred: ' + error.message, "Message");
      });
  };

  mediaRecorder.stop();
}


   function updateDuration() {
       const currentTime = Date.now();
       const elapsedDuration = Math.floor((currentTime - startTime) / 1000);
       const totalDuration = elapsedDuration + pausedDuration;
       const minutes = Math.floor(totalDuration / 60);
       const seconds = totalDuration % 60;
       durationLabel.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
   

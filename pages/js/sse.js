let messageCount = 0;
  
  $("#ca").hide();
  //alert(userid);
  var allmessages = "all";
  var newmessages = "new";
  var encodedId = encodeURIComponent(userid);
  var url1 =
    "https://www.emkapp.com/fad_s_portfolio/back-end/sse.php?req=" +
    newmessages +
    "&id=" +
    encodedId+"&role="+userRole;
  var surl =
    "https://www.emkapp.com/fad_s_portfolio/back-end/sse.php?req=" +
    allmessages +
    "&id=" +
    encodedId+"&role="+userRole;
  // Create two Promises for the two requests
//console.log("role: ", userRole);
  var previousMessage = null;
  var previousChats = null;
  var previousStatus = null;
  var previousRead = null;
 let sseMainConnection, sseMainConnectiontwo;
const request1 = new Promise((resolve, reject) => {
  if (userRole !== null) {
    sseMainConnection = new EventSource(url1);

    sseMainConnection.onmessage = function (event) {
      const message = JSON.parse(event.data);
    
      if (previousMessage === null) {
        displayMessage(message);
        previousMessage = message;
        //console.log("Previous Message : ", message);
      } else {
        if (areArraysEqual(message, previousMessage)) {
          for (var i = 0; i < message.length; i++) {
            var obj = message[i];
            var id = obj.id;
            var tmsg = obj.tmsg;
            // console.log("id : ",id,"time :",tmsg);
            updateTimeField(id, tmsg);
          }
          //console.log("Old Message : ", message);
        } else {
          displayMessage(message);
          previousMessage = message; 
        }
      }
    };

    sseMainConnection.onerror = function (event) {
      if (event.readyState == EventSource.CLOSED) {
        //console.error("SSE connection closed");
      } else {
        //console.error('SSE connection error:', event.target.readyState);
        setTimeout(function () {
          sseMainConnection = new EventSource(url1);
        }, 200);
      }
    };

    sseMainConnection.onopen = function () {
      resolve("Request 1 completed");
    };

    sseMainConnection.onclose = function () {
      console.log("SSE connection closed");
    };
  } else {
    if (sseMainConnection) {
      sseMainConnection.close();
    }
    resolve("Request 1 skipped"); 
  }
  });

const request2 = new Promise((resolve, reject) => {
  if (userRole !== null) { 
    sseMainConnectiontwo = new EventSource(surl);

    sseMainConnectiontwo.onmessage = function (event) {
      const message = JSON.parse(event.data);
      if (previousChats === null) {
        displayAllMessages(message);
        previousChats = message;
        //console.log("Previous Message : ", message);
      } else {
        if (areArraysEqual(message, previousChats)) {
          for (var i = 0; i < message.length; i++) {
            var obj = message[i];
            var id = obj.id;
            var tmsg = obj.tmsg;
            updateAllTimeField(id, tmsg);
          }
        } else {
          displayAllMessages(message);
          previousChats = message;
        }
      }
    };

    sseMainConnectiontwo.onerror = function (event) {
      if (event.readyState == EventSource.CLOSED) {
      } else {
        setTimeout(function () {
          sseMainConnectiontwo = new EventSource(surl);
        }, 200);
      }
    };

    sseMainConnectiontwo.onopen = function () {
      resolve("Request 2 completed");
    };

    sseMainConnectiontwo.onclose = function () {
      console.log("SSE connection closed");
    };
  } else {
    if (sseMainConnectiontwo) {
      sseMainConnectiontwo.close();
    }
    resolve("Request 2 skipped");
  }
  });

  // Execute both requests concurrently
  Promise.allSettled([request1, request2])
    .then((results) => {
      // Separate the responses and errors
      const responses = [];
      const errors = [];

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          responses.push(result.value);
        } else if (result.status === "rejected") {
          errors.push(result.reason);
        }
      });

    })
    .catch((error) => {
    });

  function areArraysEqual(arr1, arr2) {
    // Check if the arrays have the same length
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Iterate over each object in the arrays
    for (let i = 0; i < arr1.length; i++) {
      const obj1 = arr1[i];
      const obj2 = arr2[i];

      // Get the keys of the current objects
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      // Check if the number of keys is the same
      if (keys1.length !== keys2.length) {
        return false;
      }

      // Iterate over each key and compare their values
      for (let key of keys1) {
        // Check if the current key exists in both objects
        if (!obj2.hasOwnProperty(key)) {
          return false;
        }

        // Compare the values for the current key
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
    }

    // All objects in the arrays are equal
    return true;
  }

  function readMessage(message) {
    if (areArraysEqual(message, previousMessage)) {
      // Array of objects is equal to previous message
      // Perform necessary operations
      console.log("Old Message: ", message);
    } else {
      // Array of objects is not equal to previous message
      // Perform necessary operations
      console.log("New Message: ", message);
      console.log("Previous Message: ", previousMessage);
      previousMessage = message; // Update the previous message
    }
  }

  function areObjectsEqual(obj1, obj2) {
    // Get the keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if the number of keys is the same
    if (keys1.length !== keys2.length) {
      return false;
    }

    // Iterate over each key and compare their values
    for (let key of keys1) {
      // Check if the current key exists in both objects
      if (!obj2.hasOwnProperty(key)) {
        return false;
      }

      // Compare the values for the current key
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    // All keys and their values are equal
    return true;
  }

  // Function to check if two message objects are the same
  function isSameMessage(message1, message2) {
    if (message1 === null || message2 === null) {
      return false;
    }

    // Compare the relevant properties to determine if the messages are the same
    return (
      message1.sender === message2.sender &&
      message1.msg === message2.msg &&
      message1.id === message2.id &&
      message1.tmsg === message2.tmsg
    );
  }

  // Send messages
  const sendBtn = document.getElementById("sendButton");
  if (sendBtn) {
    sendBtn.addEventListener("click", function () {
      const messageInput = document.getElementById("messageInput");
      const message = messageInput.value.trim();

      if (message !== "") {
        sendMessage(message);
        messageInput.value = "";
      }
    });
  }
function displayAllMessages(message) {
 // console.log(message);
  const container = document.getElementById("allchatsdiv");
  /*  */
  container.innerHTML = "";
  if (message===null) {
    container.innerHTML = "<h3 align='center'>No messages available</h3>";  
  } else {

    var icon = document.createElement("i");
    icon.className = "fas fa-bars fa-2x";
    var heading = document.createElement("h2");
    heading.textContent = "Chats";

    const parentDiv = document.createElement("div");
    parentDiv.classList.add("backdiv");
    parentDiv.id = "nav-back-one";
    
    // Create the anchor element
    const anchor = document.createElement("a");
    anchor.href = "javascript:void(0);";
    anchor.classList.add("a");
    
    // Create the span element
    const span = document.createElement("span");
    span.classList.add("left");
    
    // Append the span element to the anchor element
    anchor.appendChild(span);
    
    // Append the anchor element to the parent div
    parentDiv.appendChild(anchor);
    parentDiv.onclick = function () {
      $("#mc").fadeOut(500);
      $("#zoomBtn").fadeIn(500);
    }
    if (window.innerWidth <= 768) {
      container.appendChild(parentDiv);
    }
    container.appendChild(icon);
    container.appendChild(heading);
    const newMessageObject = message;
    for (var i = 0; i < newMessageObject.length; i++) {
      (function () {
        var msg = newMessageObject[i];
        var div = document.createElement("div");
        div.className = "contact";
        div.id = msg.id;
        recip_id = msg.id;
        div.onclick = function (event) {
          if ($("#cover").is(":visible")) {
            $("#pinmess").text("Please enter your pin!");
            accessMode = "all";
            return;
          } else {
            popupMessageWindow(div.id, userRole);
          }
          event.preventDefault(); // Prevent default action
        };

        // Create the pic div element
        var picDiv = document.createElement("img");
        picDiv.src =
          "https://www.emkapp.com/fad_s_portfolio/back-end/fetchimages.php?id=" +
          encodeURIComponent(msg.id);
        picDiv.className = "mpic";
        div.appendChild(picDiv);

        // Create the badge div element
        var badgeDiv = document.createElement("div");
        badgeDiv.className = "badge";
        badgeDiv.innerText = msg.msgcount;
        if (msg.msgcount > 0) {
          //console.log("unread : ", msg.msgcount);
          div.appendChild(badgeDiv);
        }
        // Create the name div element
        var nameDiv = document.createElement("div");
        nameDiv.className = "name";
        nameDiv.innerText = msg.sender;
        div.appendChild(nameDiv);

        // Create the message div element
        var messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.innerText = msg.main_msg;
        div.appendChild(messageDiv);

        // Create the timeClass div element
        //console.log("time : ", msg.tmsg);
        var timeDiv = document.createElement("div");
        timeDiv.className = "timeClass";
        timeDiv.innerText = formatNewDate(msg.tmsg, "outer");
        timeDiv.id = "atime-" + msg.id;
        div.appendChild(timeDiv);
        container.appendChild(div);
      })();
    }
  }
}

  function updateTimeField(messageId, newTime) {
    const timeField = document.getElementById("time-" + messageId);
    if (timeField) {
      timeField.textContent = formatTime(newTime);
    }
  }

  function updateAllTimeField(messageId, newTime) {
    const timeField = document.getElementById("atime-" + messageId);
    if (timeField) {
      timeField.textContent = formatNewDate(newTime, "outer");
    }
  }


  function updateStatus(message) {
    const statuscon = document.getElementById("onstat");
  
    const newMessageObject = message;
    for (var i = 0; i < newMessageObject.length; i++) {
      (function () {
        var msg = newMessageObject[i];
        statuscon.innerHTML = msg.status;
      })();
    }
  }



  // Display a new message
  function displayMessage(message) {
    const msgcount = message !== null && message.length > 0 ? message[message.length - 1].totalcount : 0;
    //console.log("Message : ",  message );
    const msgcountdiv = document.getElementById("mcount");
    const msgnotheader = document.getElementById("mcount-two");
    msgcountdiv.innerHTML = msgcount;
    if (msgcount < 1) {
      msgnotheader.innerHTML = "No new messages";
    } else if (msgcount < 2 && msgcount > 0) {
      msgnotheader.innerHTML = msgcount + " new message";
    } else {
      msgnotheader.innerHTML = msgcount + " new messages";
    }
    // Get the reference to the div with id "msgcon"
    var msgconDiv = document.getElementById("nmsgcon");

    if (msgcount < 1 ) {
      msgconDiv.innerHTML = "<h3 align='center'>No messages available<h3>";
    } else {
      msgconDiv.innerHTML = "";
      const newMessageObject = message;
      for (var i = 0; i < newMessageObject.length; i++) {
        (function () {
          var msg = newMessageObject[i];
          //console.log("id : " + msg.id);
          // Create the <a> element
          var aElement = document.createElement("a");
          aElement.href = "javascript:void(0);";
          aElement.className = "list-group-item";
          aElement.onclick = function (event) {
            $("#mc").fadeIn(500);
            if ($("#cover").is(":visible")) {
              $("#pinmess").text("Please enter your pin!");
              accessMode = "all";
              return;
            } else {
              popupMessageWindow(msg.id, userRole);
            }
            //popupMessageWindow(msg.id, msg.sender);
            event.preventDefault(); // Prevent default action
          };
          // Create the inner <div> elements and their contents
          var divRow = document.createElement("div");
          divRow.className = "row g-0 align-items-center";

          var divCol2 = document.createElement("div");
          divCol2.className = "col-2";

          var imgElement = document.createElement("img");
          imgElement.src =
            "https://www.emkapp.com/fad_s_portfolio/back-end/fetchimages.php?id=" +
            encodeURIComponent(msg.id);
          imgElement.className = "avatar img-fluid rounded-circle";
          imgElement.alt = msg.sender;

          var individualmcount = document.createElement("span");
          individualmcount.className = "indicator cusind";
          individualmcount.id = "imc" + msg.id;
          individualmcount.textContent = msg.msgcount;

          var divCol10 = document.createElement("div");
          divCol10.className = "col-10 ps-2";

          var divName = document.createElement("div");
          divName.className = "text-dark";
          divName.textContent = msg.sender;

          var divDesc = document.createElement("div");
          divDesc.className = "text-muted small mt-1";
          divDesc.textContent = msg.main_msg;

          var divTime = document.createElement("div");
          divTime.id = "time-" + msg.id;
          divTime.className = "text-muted small mt-1";
          divTime.textContent = formatTime(msg.tmsg);

          // Append the elements to construct the desired structure
          divCol2.appendChild(imgElement);
          divCol2.appendChild(individualmcount);
          divCol10.appendChild(divName);
          divCol10.appendChild(divDesc);
          divCol10.appendChild(divTime);
          divRow.appendChild(divCol2);
          divRow.appendChild(divCol10);
          aElement.appendChild(divRow);
          msgconDiv.appendChild(aElement);
        })();
      }
    }
  }

  function formatDateTime(datetimeString) {
    var datetime = new Date(datetimeString);
    var now = new Date();

    // Check if the datetime is within the current day
    if (datetime.toDateString() === now.toDateString()) {
      // Return the time in 24-hour format
      var hours = datetime.getHours().toString().padStart(2, "0");
      var minutes = datetime.getMinutes().toString().padStart(2, "0");
      return hours + ":" + minutes;
    }

    // Check if the datetime is beyond the current day by a day
    now.setDate(now.getDate() - 1); // Set now to yesterday
    if (datetime > now) {
      return "Yesterday";
    }

    // Return only the date
    var year = datetime.getFullYear().toString();
    var month = (datetime.getMonth() + 1).toString().padStart(2, "0");
    var day = datetime.getDate().toString().padStart(2, "0");
    return day + "/" + month + "/" + year;
  }

  $("#nav-back").on('click touchstart', function (e) {
    e.preventDefault();
   
    goBackwards();
  
  });
$("#nav-back-one").on('click touchstart', function (e) {
  console.log("event : ", e);
    e.preventDefault();
    $("#mc").fadeOut(500);
    accessMode = "";
  
  });

  /*function isDivVisible(divId) {
    var div = document.getElementById(divId);
    var computedStyle = window.getComputedStyle(div);
    return computedStyle.display !== 'none';
  }
  
  function checkDivVisibility(mutationsList, observer) {
    if (!isDivVisible('mc')) {
      $("#allchatsdiv").css("z-index", "4");
      //console.log("no longer visible");
    } 
  }
  
  var observer = new MutationObserver(checkDivVisibility);
  
  // Start observing the target node for changes in attributes or child elements
  var targetNode = document.getElementById('allchatsdiv');
  var config = { attributes: true, childList: true, subtree: true };
  observer.observe(targetNode, config);
*/
function goBackwards() {
  closeRep();
  accessMode = "";
  if (window.innerWidth <= 768) {
     if ($("#allchatsdiv").is(":visible")) {
      $("#allchatsdiv").css("z-index","4");
      $("#mc").fadeOut(500);
       $("#mc").css("display", "none");
       clickEnabled = true;
      //console.log("invisible");
      } else {
        $("#allchatsdiv").fadeIn(500);
      $("#allchatsdiv").css("z-index", "10");
      //console.log("visible");
      }
    
  } else {
    $("#allchatsdiv").css("z-index","4");
      $("#cover").show();
      $("#cover-two").show();
    $("#mc").fadeOut(500);
    clickEnabled = true;
    }
 
    closeSSEConnection();
    closeSSEStatusConnection();
  }
  
  function toggleFab() {
    $("#mc").fadeIn(500);
    $("#zoomBtn").fadeOut(500);
  }


  $("#zoomBtn").on('click', function (e) {
    if (e.type === "click") {
      toggleFab();
    } else if (e.type === "touchstart") {
      document.removeEventListener("touchmove", drag, { passive: false });
      document.removeEventListener("touchend", stopDragging, { passive: false });
      setTimeout(function () {
        toggleFab();
      }, 300);
    }
  });



const popupMessageWindow = async (id, mrole) => {
 
    previousRead = null;
    recipient = id;
    $("#cover-two").fadeOut(500);
    let pUrl, responseData1, responseData2;

    closeSSEConnection();
    closeSSEStatusConnection();
    if (mrole.toString().includes("user")) {
      pUrl = "https://www.emkapp.com/fad_s_portfolio/back-end/fetchadminimages.php?id="+ encodeURIComponent(userid);
    } else {
      pUrl = "https://www.emkapp.com/fad_s_portfolio/back-end/fetchimages.php?id=" +
      encodeURIComponent(id);
    }
   
    
    
    const profDiv = document.getElementById("mpic");
  
    profDiv.style.backgroundImage = "url('" + pUrl + "')";
    //console.log("Selected Message : ", id);
    var nUrl = 'https://www.emkapp.com/fad_s_portfolio/back-end/sseonlinestatus.php?id=' + encodeURIComponent(id);
    if (!mrole.toString().includes("user")) {
      openSSEStatusConnection(nUrl, "onlinestatus");
    }
    if (window.innerWidth <= 768) {
      $("#allchatsdiv").fadeOut(500);
      $("#allchatsdiv").css("z-index","4");
    }
    try {
      var sUrl = 'https://www.emkapp.com/fad_s_portfolio/back-end/ssechats.php?rec=' + encodeURIComponent(userid) + '&id=' + encodeURIComponent(id)+"&role="+userRole;
      //const responseData = await fetchDataFromServer(id, userid);
      if (mrole.toString().includes("user")) {
        responseData1 = fetchUserDataFromServer(userid);
        responseData2 = updateUserServerMessages(userid);
      } else {
        responseData1 = fetchDataFromServer(id, userid);
        responseData2 = updateServerMessages(id, userid);
      }
      const [response1, response2] = await Promise.all([responseData1, responseData2]);
  
      // Use the responseData as a JavaScript object
      //console.log("chats : ",responseData1);
      messageCount = 0;
      populateChat(response1);
      //console.log("read status : ",response2);
      previousRead = response1;
      
      openSSEConnection(sUrl, "readmessage");
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    }
 
  };

/*
function populateChat(data) {
 // console.log(data);
    const chatContainer = document.getElementById("chat");
    chatContainer.innerHTML = "";
  
    if (data === null || data.length === 0) {
      chatContainer.innerHTML = "<h3 align='center'>You can start a new conversation here.</h3>";
    } else {

      groupedMessages = {};
      //console.log("data : ", data);
      for (const message of data) {
        const dateTime = message.mtime;
        const date = dateTime.split(' ')[0];
        const time = dateTime.split(' ')[1];
        const senderId = message.sender;

        if (!groupedMessages[date]) {
          groupedMessages[date] = {};
        }
        if (!groupedMessages[date][time]) {
          groupedMessages[date][time] = {};
        }
        if (!groupedMessages[date][time][senderId]) {
          groupedMessages[date][time][senderId] = [];
        }
    
        groupedMessages[date][time][senderId].push(message);
        //groupedMessages[date].push(message);
      }
      //console.log("new group : ", groupedMessages);
      let isFirstIteration = true;
   
      for (const date in groupedMessages) {
        const dateMessages = groupedMessages[date];
      
        const dateTimeHeader = document.createElement('div');
        dateTimeHeader.textContent = formatNewDate(date, "inner");
        dateTimeHeader.classList.add('time');
    
        chatContainer.appendChild(dateTimeHeader);

        for (const time in dateMessages) {
          const timeMessages = dateMessages[time];
        
     
        
          for (const senderId in timeMessages) {
            const messages = timeMessages[senderId];
          
            if (messages.length > 2 && messages.filter(message => message.message_type !== "txtmsg").length > 0) {
              const maingridContainer = document.createElement('div');
              const gridContainer = document.createElement('div');
              const lastMessage = messages[messages.length - 1];
              const lastRowid = lastMessage.rowid;
              const uid = lastMessage.sender;
              gridContainer.id = "nmdiv-" + lastRowid;
              let index = 0;
            
              for (const message of messages) {
                if (isFirstIteration) {
                  const profNameDiv = document.getElementById("mname");
                  profNameDiv.innerHTML = message.sender_name;
                  isFirstIteration = false;
                }
              
                if (message.message_type === "txtmsg") {
                  createMainMessageElements(message, senderId, chatContainer, "subtxt");
                } else {
                  if (messages.filter(message => message.message_type !== "txtmsg").length < 3) {
                    createMainMessageElements(message, senderId, chatContainer, "subtxt");
                  } else if (messages.filter(message => message.message_type !== "txtmsg").length > 2) {
                    createGridMessageElements(message, senderId, gridContainer, index === 0 ? "first" : "rest");
                  }
                }
             
                index++;
                messageCount++;
          
              }
        
              if (uid == userid) {
                maingridContainer.className = "message sender";
              } else {
                maingridContainer.className = "message";
              }
            
              gridContainer.className = "nmessage";
              maingridContainer.appendChild(gridContainer);
              chatContainer.appendChild(maingridContainer);
            } else {
              for (const message of messages) {
                if (isFirstIteration) {
                  const profNameDiv = document.getElementById("mname");
                  if (!userRole.toString().includes("user")) {
                    profNameDiv.innerHTML = message.sender_name;
                  }
                  isFirstIteration = false;
                }
                createMainMessageElements(message, userid, chatContainer, "main");
                messageCount++;
              }
            }
          
            // console.log("data : " + data.length + ", mcount : " + messageCount);
          }
        }
      }
    
 
      if (messageCount === data.length) {
       
          chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: "smooth"
          });
  
          setTimeout(() => {
          // Remove empty div elements after scrolling is complete
          var parentDiv = document.getElementById("chat");
          var childDivs = parentDiv.getElementsByTagName("div");
  
          for (var i = childDivs.length - 1; i >= 0; i--) {
            var childDiv = childDivs[i];
            if (childDiv.parentNode === parentDiv && childDiv.innerHTML.trim() === "") {
              parentDiv.removeChild(childDiv);
            }
          }
        }, 500);
      }
    }
  }*/
 
function populateChat(data) {
  //console.log(data);
    const chatContainer = document.getElementById("chat");
    chatContainer.innerHTML = "";

    if (data === null || data.length === 0) {
        chatContainer.innerHTML = "<h3 align='center'>You can start a new conversation here.</h3>";
        return; // No need to proceed if there's no data
    }

    const groupedMessages = groupMessages(data);
    //console.log(groupedMessages);
    // Clear any previous content and reset variables
    const profNameDiv = document.getElementById("mname");
    const userIsSender = userRole.toString().includes("user");
    if (!userIsSender) {
      let firstSenderName = null;
      outerLoop: // Label to break out of all loops
      for (const date in groupedMessages) {
          for (const time in groupedMessages[date]) {
              for (const senderId in groupedMessages[date][time]) {
                  const messages = groupedMessages[date][time][senderId];
                  if (messages.length > 0) {
                      firstSenderName = messages[0].sender_name;
                      break outerLoop; // Break out of all loops
                  }
              }
          }
      }
      if (firstSenderName) {
          profNameDiv.innerHTML = firstSenderName;
      }
    }

    let messageCount = 0;
    for (const date in groupedMessages) {
      const dateMessages = groupedMessages[date];
      const dateTimeHeader = createDateTimeHeader(date);
      chatContainer.appendChild(dateTimeHeader);

      for (const time in dateMessages) {
          const timeMessages = dateMessages[time];

          for (const senderId in timeMessages) {
              const messages = timeMessages[senderId];
              const isMultipleMessages = messages.length > 1;

              if (isMultipleMessages && hasNonTextMessages(messages)) {
                  const maingridContainer = createMaingridContainer(senderId, userIsSender);
                  const gridContainer = createGridContainer();
                  appendMessagesToGrid(messages, gridContainer);
                  maingridContainer.appendChild(gridContainer);
                  chatContainer.appendChild(maingridContainer);
              } else {
                  appendMessagesToContainer(messages, chatContainer, userid);
              }
              messageCount += messages.length;
          }
      }
  }

    if (messageCount === data.length) {
      setTimeout(() => {
        removeEmptyDivs(chatContainer);
        scrollToBottom(chatContainer);
    }, 100);
    }
}






  function groupMessages(data) {
    groupedMessages = {};
    //console.log("data : ", data);
    for (const message of data) {
      const dateTime = message.mtime;
      const date = dateTime.split(' ')[0];
      const time = dateTime.split(' ')[1];
      const senderId = message.sender;

      if (!groupedMessages[date]) {
        groupedMessages[date] = {};
      }
      if (!groupedMessages[date][time]) {
        groupedMessages[date][time] = {};
      }
      if (!groupedMessages[date][time][senderId]) {
        groupedMessages[date][time][senderId] = [];
      }
  
      groupedMessages[date][time][senderId].push(message);
      //groupedMessages[date].push(message);
    }
    return groupedMessages;
}

function createDateTimeHeader(date) {
    const dateTimeHeader = document.createElement('div');
    dateTimeHeader.textContent = formatNewDate(date, "inner");
    dateTimeHeader.classList.add('time');
    return dateTimeHeader;
}

function createMaingridContainer(senderId, userIsSender) {
    const maingridContainer = document.createElement('div');
    maingridContainer.className = userIsSender ? "message sender" : "message";
    return maingridContainer;
}

function createGridContainer() {
    const gridContainer = document.createElement('div');
    gridContainer.className = "nmessage";
    return gridContainer;
}

function appendMessagesToContainer(messages, container, userId) {
    for (const message of messages) {
        createMainMessageElements(message, userId, container, "main");
    }
}

function appendMessagesToGrid(messages, gridContainer) {
    messages.forEach((message, index) => {
        const messageType = message.message_type;
        const position = index === 0 ? "first" : "rest";
        createGridMessageElements(message, message.senderId, gridContainer, messageType, position);
    });
}

function scrollToBottom(container) {
    container.scrollTo({
        top: container.scrollHeight,
    });
}

function removeEmptyDivs() {
    const parentDiv = document.getElementById("chat");
    const childDivs = parentDiv.getElementsByTagName("div");

    for (let i = childDivs.length - 1; i >= 0; i--) {
        const childDiv = childDivs[i];
        if (childDiv.parentNode === parentDiv && childDiv.innerHTML.trim() === "") {
            parentDiv.removeChild(childDiv);
        }
    }
}

function hasNonTextMessages(messages) {
    return messages.some(message => message.message_type !== "txtmsg");
}


  function formatTime(response) {
    // Assuming response.time is in the format "YYYY-MM-DD HH:mm:ss"

    // Convert the PHP date and time to a JavaScript Date object
    var messageTime = new Date(response);

    // Get the current date and time
    var currentTime = new Date();

    // Calculate the difference between the message time and current time
    var timeDiff = currentTime - messageTime;

    // Convert the time difference to a human-readable format using moment.js
    var formattedTime;

    if (timeDiff < 60000) {
      // Less than 1 minute
      formattedTime = "just now";
    } else if (timeDiff < 3600000) {
      // Less than 1 hour
      var mins = moment.duration(timeDiff).minutes();
      if (mins < 2) {
        formattedTime = moment.duration(timeDiff).minutes() + " minute ago";
      } else {
        formattedTime = moment.duration(timeDiff).minutes() + " minutes ago";
      }
    } else if (timeDiff < 86400000) {
      // Less than 1 day
      var hr = moment.duration(timeDiff).hours();
      if (hr < 2) {
        formattedTime = moment.duration(timeDiff).hours() + " hour ago";
      } else {
        formattedTime = moment.duration(timeDiff).hours() + " hours ago";
      }
    } else {
      formattedTime = moment(messageTime).fromNow();
    }

    return formattedTime;
  }


  let sseConnection, sseConnectiontwo;
  function openSSEStatusConnection(url, req) {
    // Check if there's an existing SSE connection
    if (sseConnectiontwo) {
      console.log("There's already an SSE connection open.");
      return;
    }
  
    // Create a new EventSource object with the specified URL
    sseConnectiontwo = new EventSource(url);
  
    // Event listener for receiving SSE messages
    sseConnectiontwo.onmessage = function (event) {
      const message = JSON.parse(event.data);
     // console.log("Status Message : ", message);
 
      if (req == "onlinestatus") {
        //console.log(req);
        if (previousStatus === null) {
          updateStatus(message);
          previousStatus = message;
          //console.log("Previous Message : ", message);
        } else {
          if (areArraysEqual(message, previousStatus)) {
            //do nothing
          } else {
            updateStatus(message);
            previousStatus = message; // Update the previous message
            //console.log("New Message : ", message);
            //console.log("Previous Message : ", previousMessage);
          }
        }
      }


 
    };
  
    // Event listener for SSE connection errors
    sseConnectiontwo.onerror = function (error) {
      //console.error('SSE connection error:', error);
      // Handle the error condition appropriately
    };
  }
  function openSSEConnection(url, req) {
    // Check if there's an existing SSE connection
    if (sseConnection) {
      console.log("There's already an SSE connection open.");
      return;
    }
  
    // Create a new EventSource object with the specified URL
    sseConnection = new EventSource(url);
  
    // Event listener for receiving SSE messages
    sseConnection.onmessage = function (event) {
      const message = JSON.parse(event.data);
      //console.log("Original Message : ", message);
 
      if (req == "readmessage") {
        if (previousRead === null) {
          populateChat(message);
          previousRead = message;
          //console.log("Previous Message : ", message);
        } else {
          if (areArraysEqual(message, previousRead)) {
            //do nothing
          } else {
            populateChat(message);
            previousRead = message; // Update the previous message
            //console.log("New Message : ", message);
            //console.log("Previous Message : ", previousMessage);
          }
        }
      }

 
    };
  
    // Event listener for SSE connection errors
    sseConnection.onerror = function (error) {
      //console.error('SSE connection error:', error);
      // Handle the error condition appropriately
    };
  }

  function closeSSEConnection() {
    // Check if there's an existing SSE connection
    if (!sseConnection) {
      //console.log("There's no open SSE connection to close.");
      return;
    }
  
    // Close the SSE connection
    sseConnection.close();
  
    // Reset the connection variable
    sseConnection = null;
  }

  function closeSSEStatusConnection() {
    // Check if there's an existing SSE connection
    if (!sseConnectiontwo) {
      //console.log("There's no open SSE connection to close.");
      return;
    }
  
    // Close the SSE connection
    sseConnectiontwo.close();
  
    // Reset the connection variable
    sseConnectiontwo = null;
  }

  async function repopulateMessages(id) {
    previousRead = null;
    recipient = id;
    let responseData;
    closeSSEConnection();
    closeSSEStatusConnection();
   
    var nUrl = 'https://www.emkapp.com/fad_s_portfolio/back-end/sseonlinestatus.php?id=' + encodeURIComponent(id);
    if (!userRole.toString().includes("user")) {
      openSSEStatusConnection(nUrl, "onlinestatus");
    }
    try {
      var sUrl = 'https://www.emkapp.com/fad_s_portfolio/back-end/ssechats.php?rec=' + encodeURIComponent(userid) + '&id=' + encodeURIComponent(id)+"&role="+userRole;
      if (userRole.toString().includes("user")) {
        responseData = fetchUserDataFromServer(userid);
      } else {
        responseData = fetchDataFromServer(id, userid);
      }
     // console.log(responseData);
     responseData
     .then(resolvedData => {
      populateChat(resolvedData);
     })
     .catch(error => {
       console.error("An error occurred:", error);
     });
      
      previousRead = responseData;
      openSSEConnection(sUrl, "readmessage");
    } catch (error) {
      // Handle any errors that occurred during the request
      //console.error(error);
    }
 
  };

  // Send a new message to the server
  function sendMessage(message) {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      if (xhr.status === 200) {
        // Message sent successfully
      } else {
        //console.error("Message sending failed:", xhr.status, xhr.statusText);
        // Handle the error, such as displaying an error message or retrying the message
      }
    };

    xhr.onerror = function () {
      //console.error("Message sending failed: network error");
      // Handle the error, such as displaying an error message or retrying the message
    };

    xhr.open("POST", "send_message.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("message=" + encodeURIComponent(message));
  }

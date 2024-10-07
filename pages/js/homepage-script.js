const socialMediaHandlesDiv = document.querySelector('.social-media-handles');
const leftDiv = document.querySelector('.leftdiv');
const mainDiv = document.querySelector('.homemain');
const padDiv = document.querySelector('.padDiv');
let art, userTapped = 0, apiKey;
let aevideo;
let newsrc;

var spinner;
let itemIndex;
//let resultArray = [];
$("#emoji-picker-com").hide();
const input = document.getElementById('cominput');
const emoBtn = document.getElementById("comment-emoji-icon");
const emocon = document.getElementById("emoji-picker-com");

const inputAe = document.getElementById('aecominput');
const emoBtnAe = document.getElementById("ae-comment-emoji-icon");
const emoconAe = document.getElementById("emoji-picker-ae");


const inputVid = document.getElementById('vidcominput');
const emoBtnVid = document.getElementById("vid-comment-emoji-icon");
const emoconVid = document.getElementById("emoji-picker-vid");


var snackbarmessage;
var options = {
  content: snackbarmessage, // text of the snackbar
  style: "toast", // add a custom class to your snackbar
  timeout: 0, // time in milliseconds after the snackbar autohides, 0 is disabled
  htmlAllowed: true, // allows HTML as content value
    onClose: function () {
        $("#snackbar-container").hide(); 
        $(".snackbar.toast").hide();
  }, // callback called when the snackbar gets closed.
};




  
function positionFirstDiv() {
    const firstDiv = document.getElementById('emoji-picker-com');
    const secondDiv = document.querySelector('.cmPanel');
    const secondDivPosition = secondDiv.getBoundingClientRect();
    //firstDiv.style.left = secondDivPosition.left + 'px';
    const desiredTop = secondDivPosition.top;
    firstDiv.style.top = `${desiredTop}px !important`;
  }

const picker = new EmojiMart.Picker({
    autoHide: true,
    showPreview: false,
    onEmojiSelect: (emoji) => {
      // Insert the selected emoji into the input field
        //console.log("emoji : ", emoji.native);  
      input.value += emoji.native;
    }
});

emoBtn.addEventListener('click', function () {
    // emojiPicker.showPicker();
     if ($(emocon).is(":visible")) {
         emocon.removeChild(picker);
         $(emocon).hide(500);
     } else {
         $(emocon).show(500);
         positionFirstDiv();
         emocon.appendChild(picker);
     }
 });

 const pickerVid = new EmojiMart.Picker({
    autoHide: true,
    showPreview: false,
    onEmojiSelect: (emoji) => {
      // Insert the selected emoji into the input field
        //console.log("emoji : ", emoji.native);  
      inputVid.value += emoji.native;
    }
});

emoBtnVid.addEventListener('click', function () {
    // emojiPicker.showPicker();
     if ($(emoconVid).is(":visible")) {
         emoconVid.removeChild(pickerVid);
         $(emoconVid).hide(500);
     } else {
         $(emoconVid).show(500);
         positionFirstDiv();
         emoconVid.appendChild(pickerVid);
     }
});
 
const pickerAe = new EmojiMart.Picker({
    autoHide: true,
    showPreview: false,
    onEmojiSelect: (emoji) => {
      // Insert the selected emoji into the input field
        //console.log("emoji : ", emoji.native);  
      inputAe.value += emoji.native;
    }
});

emoBtnAe.addEventListener('click', function () {
    // emojiPicker.showPicker();
     if ($(emoconAe).is(":visible")) {
         emoconAe.removeChild(pickerAe);
         $(emoconAe).hide(500);
     } else {
         $(emoconAe).show(500);
         positionFirstDiv();
         emoconAe.appendChild(pickerAe);
     }
 });

function moveSocialMediaHandles() {
  if (window.innerWidth <= 768) {
      mainDiv.appendChild(socialMediaHandlesDiv);
      mainDiv.appendChild(padDiv);
  } else {
      leftDiv.appendChild(socialMediaHandlesDiv);
      leftDiv.appendChild(padDiv);
  }
}
function adjustBackground() {
    var body = document.querySelector('body');
    var windowHeight = window.innerHeight;
    body.style.height = windowHeight + 'px';
}

window.addEventListener('resize', adjustBackground);
window.addEventListener('load', adjustBackground);



$("#sendCommentButton").on('click', function () {
    if ($("#cominput").val().length < 1) {
        popSnackBar("Please enter a comment");
    } else {
        if (!userid) {
            showConfirmationDialog("Please log in to like or post a comment", 'Message', function () {
                $("#authDiv").fadeIn(500);
            });  
        } else {
            if ($(emocon).is(":visible")) {
                emocon.removeChild(picker);
                $(emocon).hide(500);
            }
            showSpinner("cmR");
            disableClickEvents("comform");
            $("#comform").submit();
        }
  }  
});

$("#vid-sendCommentButton").on('click', function () {
    if ($("#vidcominput").val().length < 1) {
        popSnackBar("Please enter a comment");
    } else {
        if (!userid) {
            showConfirmationDialog("Please log in to like or post a comment", 'Message', function () {
                $("#authDiv").fadeIn(500);
            });  
        } else {
        if ($(emoconVid).is(":visible")) {
            emoconVid.removeChild(pickerVid);
            $(emoconVid).hide(500);
        }
        showSpinner("vidform");
        disableClickEvents("vidform");
        $("#vidform").submit();
    }
  }  
});

$("#ae-sendCommentButton").on('click', function () {
    if ($("#aecominput").val().length < 1) {
        popSnackBar("Please enter a comment");
    } else {
        if (!userid) {
            showConfirmationDialog("Please log in to like or post a comment", 'Message', function () {
                $("#authDiv").fadeIn(500);
            });  
        } else {
        if ($(emoconAe).is(":visible")) {
            emoconAe.removeChild(pickerAe);
            $(emoconAe).hide(500);
        }
        showSpinner("aeform");
        disableClickEvents("aeform");
        $("#aeform").submit();
    }
  }  
});
//vid-sendCommentButton vidcominput vidform

//ae-sendCommentButton aecominput aeform

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
    var container = document.getElementById(id);
    var formElements = container.querySelectorAll('*');
    container.classList.add('disabled');
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = true;
    }
  }
  function enableClickEvents(id) {
    var container = document.getElementById(id);
      var formElements = container.querySelectorAll('*');
      container.classList.remove('disabled');
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].disabled = false;
    }
  }



$(".tab").on('click', function(e) {
    const $clickedTab = $(this);
    if (!$clickedTab.find("a").hasClass("currentTab")) {
        $(".tab a").removeClass("currentTab");
        $clickedTab.find("a").addClass("currentTab");
        const tabindex = $(this).index();
        if (tabindex === 0) {
            hideItems("ps-works", "ae-works", "3d-works", "vid-works");
            showItemContent("pencil-works");
            
           
            videojs('#my-player').pause();
            videojs('#my-player-two').pause();
            var pencilwall = new Freewall("#pencil-works-child");
  pencilwall.reset({
    selector: ".brick",
    animate: true,
    cellW: 150,
    cellH: "auto",
    onResize: function () {
      pencilwall.fitWidth();
    },
  });

  var pencilimages = pencilwall.container.find(".brick");
  pencilimages.find("img").on("load", function () {
    pencilwall.fitWidth();
  });
            
        }
        if (tabindex === 1) {
            hideItems("pencil-works", "ae-works", "3d-works", "vid-works");
            fadeInItemContent("ps-works");
            
            videojs('#my-player').pause();
            videojs('#my-player-two').pause();
            var pswall = new Freewall("#ps-works-child");
            pswall.reset({
              selector: ".brick",
              animate: true,
              cellW: 150,
              cellH: "auto",
              onResize: function () {
                pswall.fitWidth();
              },
            });
          
            var psimages = pswall.container.find(".brick");
            psimages.find("img").on("load", function () {
              pswall.fitWidth();
            });

            
        }
        if (tabindex === 2) {
            hideItems("ps-works", "pencil-works", "3d-works", "vid-works");
            showItemContent("ae-works");
            if (userTapped === 0) {
                //aevideo.play();
                //console.log("play");
                start_player("");
                videojs('#my-player-two').pause();
            }
        }
        if (tabindex === 3) {
            hideItems("ps-works", "pencil-works", "ae-works", "vid-works");
            fadeInItemContent("3d-works");
          
            videojs('#my-player').pause();
            videojs('#my-player-two').pause();
            var threedwall = new Freewall("#3d-works-child");
            threedwall.reset({
              selector: ".brick",
              animate: true,
              cellW: 150,
              cellH: "auto",
              onResize: function () {
                threedwall.fitWidth();
              },
            });
          
            var threedimages = threedwall.container.find(".brick");
            threedimages.find("img").on("load", function () {
              threedwall.fitWidth();
            });
        }
        if (tabindex === 4) {
            hideItems("ps-works", "pencil-works", "ae-works", "3d-works");
            showItemContent("vid-works");
         
            
            if (userTapped === 0) {
                //aevideo.play();
                //console.log("play");
                start_second_player("");
                videojs('#my-player').pause();
            }
        }
    }
});

function loadVideo(vidsrc, el) {
    const filesrc ={
        type: 'video/youtube',
        src: `${vidsrc}`
    };
    userTapped = 1;
    if (el=="ae") {
        start_player(filesrc);  
    } else {
        start_second_player(filesrc);
    }
    
    
}

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
    videojs('#my-player').muted(false);
    videojs('#my-player',{"techOrder": ["html5","youtube"]});
    videojs('#my-player').src(nsrc);
    videojs('#my-player').currentTime(0);
    videojs('#my-player').play();
}

function loadsecondVideo(vidsrc) {
    const filesrc ={
        type: 'video/youtube',
        src: `${vidsrc}`
    };
    userTapped = 1;
    start_second_player(filesrc);
    
}

function start_second_player(src) {
    let nsrc;
    if (src.toString().length < 1) {
        nsrc = {
            type: 'video/mp4',
            src: 'images/logo revealing.mp4'
        };
    } else {
        nsrc = src;
    }
    videojs('#my-player-two').muted(false);
    videojs('#my-player-two',{"techOrder": ["html5","youtube"]});
    videojs('#my-player-two').src(nsrc);
    videojs('#my-player-two').currentTime(0);
    videojs('#my-player-two').play();
}

// Given data


// Function to fetch the YouTube API key from a URL
async function fetchApiKey() {
  try {
    const response = await fetch("https://www.emkapp.com/fad_s_portfolio/back-end/apikey.php");
    const data = await response.json();
      apiKey = data.key;
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
  
    return videoId;
  }
// Function to create and populate the playlist div
async function populatePlaylist(elID, arrayList, el) {
    const playlistDiv = document.getElementById(elID);
    playlistDiv.innerHTML = "";


    if (arrayList.length === 0) {
        var divElement = document.createElement('div');
divElement.className = 'empty-con';

// Create the inner HTML content
divElement.innerHTML = `
  <div class="empty-text"><i>Coming<br>Soon</i></div>
  <div class='spiralwrapper'>
    ${Array.from({ length: 32 }, () => '<i></i>').join('\n')}
  </div>
`;
        playlistDiv.appendChild(divElement);
        playlistDiv.style.overflow = 'hidden';
    } else {

        const apiKey = await fetchApiKey();

        if (!apiKey) {
            console.error("API key not available.");
            return;
        }

        for (const item of arrayList) {
      
            const videoId = getVideoId(item.imgfile);
            const details = await getYoutubeDetails(videoId, apiKey);
            const videoTitle = details.videoTitle;
            const videoDescription = details.videoDescription;

            const listConDiv = document.createElement("div");
            listConDiv.className = "list-con";

            const vidAndDurationDiv = document.createElement("div");
            vidAndDurationDiv.className = "vid-and-duration";

            const vidPosterDiv = document.createElement("div");
            vidPosterDiv.className = "vid-poster";
            const img = document.createElement("img");
            img.src = `https://img.youtube.com/vi/${item.imgfile.split("v=")[1]}/0.jpg`;
            vidPosterDiv.appendChild(img);

            img.addEventListener('click', function () {
                loadVideo(item.imgfile, el);
                if (el == "ae") {
                    showDetails(videoDescription, videoTitle, item.likes_count, item.comment_count, item.id,videoId);
                } else {
                    showDetailsTwo(videoDescription, videoTitle, item.likes_count, item.comment_count, item.id,videoId);
                }
          
            });
      
            const vidDurationDiv = document.createElement("div");
            vidDurationDiv.className = "vid-duration";
            const videoDuration = await fetchVideoDuration(item.imgfile);
            vidDurationDiv.textContent = formatVidTime(videoDuration);

            vidAndDurationDiv.appendChild(vidPosterDiv);
            vidAndDurationDiv.appendChild(vidDurationDiv);

            const vidDetailsDiv = document.createElement("div");
            vidDetailsDiv.className = "vid-details";

            const vidNameDiv = document.createElement("div");
            vidNameDiv.className = "vid-name";
    
            //console.log(videoTitle);
            vidNameDiv.textContent = videoTitle;

            const lacDiv = document.createElement("div");
            lacDiv.className = "lac";

            const likesDiv = document.createElement("div");
            likesDiv.className = "lac-likes-comments";
            likesDiv.textContent = `${item.likes_count} Likes`;

            const commentsDiv = document.createElement("div");
            commentsDiv.className = "lac-likes-comments";
            commentsDiv.textContent = `${item.comment_count} Comments`;

            lacDiv.appendChild(likesDiv);
            lacDiv.appendChild(commentsDiv);

            vidDetailsDiv.appendChild(vidNameDiv);
            vidDetailsDiv.appendChild(lacDiv);

            listConDiv.appendChild(vidAndDurationDiv);
            listConDiv.appendChild(vidDetailsDiv);

            playlistDiv.appendChild(listConDiv);
        }
    
    }

}


function isMobileBrowser() {
    return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
 
  

function showDetails(videoDescription, videoTitle, likes_count, comment_count, itemId, vidID) {
    $("#desc-div").fadeIn(300);  
    $("#header-div").fadeIn(300); 
    // Create and append the description and title elements
    $("#desc-div").text(videoDescription);
    $("#header-span").text(videoTitle);
    
    initmarquee();
    if (isMobileBrowser()) {
        const mediaSrc = 'https://www.youtube.com/embed/' + vidID + '?rel=0&autoplay=1';
        if (!$("#my-player-video-iframe").is(":visible")) {
            $("#my-player-video-iframe").fadeIn();  
        }
        $("#my-player-video-iframe").attr("src", mediaSrc);

        } 
    const index = imgArrayAe.findIndex(obj => obj.id === itemId);
    // Create the thumbs-up section
    const thumbsUpDiv = $("<div>").addClass("ltab");
    const thumbsUpIcon = $("<i>")
        .attr("id", "aelbtn" + itemId)
        .addClass(imgArrayAe[index].id_liked.includes(userid) ? "fas fa-thumbs-up liked" : "fas fa-thumbs-up unliked")
        .on("click", function () {
            if (userid){
                const isLiked = $(this).hasClass("liked");
            const likesCountSpan = $("#aesl" + itemId);
            const likesTextSpan = $("#aenl" + itemId);
        
            if (!isLiked) {
                $(this).removeClass("unliked").addClass("liked");
                likesCountSpan.text(Number(likesCountSpan.text()) + 1);
                likesTextSpan.text(Number(likesCountSpan.text()) === 1 ? " Like" : " Likes");
            
                // Update the likes count in the array and add userId to id_liked
                imgArrayAe[itemId - 1].likes_count = Number(likesCountSpan.text());
                imgArrayAe[itemId - 1].id_liked.push(userid);
            } else {
                $(this).removeClass("liked").addClass("unliked");
                likesCountSpan.text(Number(likesCountSpan.text()) - 1);
                likesTextSpan.text(Number(likesCountSpan.text()) === 1 ? " Like" : " Likes");
            
                // Update the likes count in the array and remove userId from id_liked
                imgArrayAe[itemId - 1].likes_count = Number(likesCountSpan.text());
                const userIdIndex = imgArrayAe[itemId - 1].id_liked.indexOf(userid);
                if (userIdIndex !== -1) {
                    imgArrayAe[itemId - 1].id_liked.splice(userIdIndex, 1);
                }
                }
                submitLike(userid, itemId);
            } else {
                showConfirmationDialog("Please log in to like or post a comment", 'Message', function () {
                    $("#authDiv").fadeIn(500);
                });  
        }
    });
    const thumbsUpCountSpan = $("<span>").attr("id", "aesl" + itemId).text(likes_count);
    const likesTextSpan = $("<span>").attr("id", "aenl" + itemId);
    likesTextSpan.text(likes_count === 1 ? " Like" : " Likes");
    thumbsUpDiv.append(thumbsUpIcon, "&nbsp;", thumbsUpCountSpan, likesTextSpan);


    // Create the comments section
    const commentsDiv = $("<div>").addClass("ltab");
    const commentsIcon = $("<i>").attr("id", "aecs" + itemId).addClass("fas fa-comment");
    const commentsCountSpan = $("<span>").attr("id", "aesc" + itemId).text(comment_count);
    const commentsTextSpan = $("<span>").attr("id", "aenc" + itemId);
    commentsTextSpan.text(comment_count === 1 ? " Comment" : " Comments");
    commentsDiv.append(commentsIcon, "&nbsp;", commentsCountSpan, commentsTextSpan);

    commentsIcon.on('click', function () {
       // $("#main-ae-comments").text(itemId);
        //$("#ae-com-div").fadeIn(500);
        let objSpanID = "aesc" + itemId;
        openCommentsDivTwo(objSpanID, imgArrayAe, "main-ae-comments", "ae-com-div", "aeform");
    });
    

    // Create and append the roomstatdiv containing thumbs-up and comments sections
    const roomStatDiv = $("<div>").addClass("roomstatdivtwo");
    roomStatDiv.append(thumbsUpDiv, commentsDiv);
    
    // Append the dynamically created content to the "cal" div
    $("#cal").empty().append(roomStatDiv);
}

function showDetailsTwo(videoDescription, videoTitle, likes_count, comment_count, itemId, vidID) {
    $("#desc-div-two").fadeIn(300);  
    $("#header-div-two").fadeIn(300); 
    $("#desc-div-two").text(videoDescription);
    $("#header-span-two").text(videoTitle);
    const index = imgArrayVids.findIndex(obj => obj.id === itemId);
    initmarqueetwo();

    if (isMobileBrowser()) {
        const mediaSrc = 'https://www.youtube.com/embed/' + vidID + '?rel=0&autoplay=1';
        if (!$("#my-player-two-video-iframe").is(":visible")) {
            $("#my-player-two-video-iframe").fadeIn();  
        }
        $("#my-player-two-video-iframe").attr("src", mediaSrc);

        } 


    const thumbsUpDiv = $("<div>").addClass("ltab");
    const thumbsUpIcon = $("<i>")
        .attr("id", "vidlbtn" + itemId)
        .addClass(imgArrayVids[index].id_liked.includes(userid) ? "fas fa-thumbs-up liked" : "fas fa-thumbs-up unliked")
        .on("click", function () {
            if (userid){
                const isLiked = $(this).hasClass("liked");
            const likesCountSpan = $("#vidsl" + itemId);
            const likesTextSpan = $("#vidnl" + itemId);
        
            if (!isLiked) {
                $(this).removeClass("unliked").addClass("liked");
                likesCountSpan.text(Number(likesCountSpan.text()) + 1);
                likesTextSpan.text(Number(likesCountSpan.text()) === 1 ? " Like" : " Likes");
            
                // Update the likes count in the array and add userId to id_liked
                imgArrayVids[itemId - 1].likes_count = Number(likesCountSpan.text());
                imgArrayVids[itemId - 1].id_liked.push(userid);
            } else {
                $(this).removeClass("liked").addClass("unliked");
                likesCountSpan.text(Number(likesCountSpan.text()) - 1);
                likesTextSpan.text(Number(likesCountSpan.text()) === 1 ? " Like" : " Likes");
            
                // Update the likes count in the array and remove userId from id_liked
                imgArrayVids[itemId - 1].likes_count = Number(likesCountSpan.text());
                const userIdIndex = imgArrayVids[itemId - 1].id_liked.indexOf(userid);
                if (userIdIndex !== -1) {
                    imgArrayVids[itemId - 1].id_liked.splice(userIdIndex, 1);
                }
                }
                submitLike(userid, itemId);
            } else {
                showConfirmationDialog("Please log in to like or post a comment", 'Message', function () {
                    $("#authDiv").fadeIn(500);
                });  
        }
    });
    const thumbsUpCountSpan = $("<span>").attr("id", "vidsl" + itemId).text(likes_count);
    const likesTextSpan = $("<span>").attr("id", "vidnl" + itemId);
    likesTextSpan.text(likes_count === 1 ? " Like" : " Likes");
    thumbsUpDiv.append(thumbsUpIcon, "&nbsp;", thumbsUpCountSpan, likesTextSpan);


    // Create the comments section
    const commentsDiv = $("<div>").addClass("ltab");
    const commentsIcon = $("<i>").attr("id", "vidcs" + itemId).addClass("fas fa-comment");
    const commentsCountSpan = $("<span>").attr("id", "vidsc" + itemId).text(comment_count);
    const commentsTextSpan = $("<span>").attr("id", "vidnc" + itemId);
    commentsTextSpan.text(comment_count === 1 ? " Comment" : " Comments");
    commentsDiv.append(commentsIcon, "&nbsp;", commentsCountSpan, commentsTextSpan);

    commentsIcon.on('click', function () {
        //$("#main-vid-comments").text(itemId);
        //$("#vid-com-div").fadeIn(500);
        let objSpanID = "vidsc" + itemId;
        openCommentsDivTwo(objSpanID, imgArrayVids, "main-vid-comments", "vid-com-div", "vidform");
    });
    

    // Create and append the roomstatdiv containing thumbs-up and comments sections
    const roomStatDiv = $("<div>").addClass("roomstatdivtwo");
    roomStatDiv.append(thumbsUpDiv, commentsDiv);
    
    // Append the dynamically created content to the "cal" div
    $("#cal-two").empty().append(roomStatDiv);
}


function submitLike(userid, itemId) {
    const formData = new FormData();
    formData.append("request", "like");
    formData.append("id", itemId.replace(/[a-zA-Z]/g, ""));
    formData.append("user", userid);
    try {
        axios
          .post(
            "https://www.emkapp.com/fad_s_portfolio/back-end/likes_and_comments.php",
            formData,
            
          )
            .then(async (res) => {
                
          })
          .catch((err) => {
            popSnackBar(err);
          
          });
      } catch (error) {
        console.error('Request error:', error);
       
      }
}


$("#closevidcombtn").on('click', () => {
    $("#vid-com-div").fadeOut(500);
});

$("#closeaecombtn").on('click', () => {
    $("#ae-com-div").fadeOut(500);
});



function formatVidTime(seconds) {
    if (seconds < 60) {
        return `${Math.floor(seconds)} ${seconds < 2 ? 'sec' : 'secs'}`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes} ${minutes < 2 ? 'min' : 'mins'} ${remainingSeconds} ${remainingSeconds < 2 ? 'sec' : 'secs'}`;
    } else {
        const hours = Math.floor(seconds / 3600);
        const remainingMinutes = Math.floor((seconds % 3600) / 60);
        return `${hours} ${hours < 2 ? 'hr' : 'hrs'} ${remainingMinutes} ${remainingMinutes < 2 ? 'min' : 'mins'}`;
    }
}
// JavaScript to add and remove class when hovering over .threed




function hideItems(id1,id2,id3,id4) {
    $("#"+id1).hide();
    $("#"+id2).hide();
    $("#"+id3).hide();
    $("#"+id4).hide();
}

function showItemContent(id) {
    $("#" + id).show(500);
    $("#" + id).css('display', 'block');
    $("#" + id+"-child").css('display', 'block');
}

function fadeInItemContent(id) {
    $("#" + id).fadeIn(500);
    $("#" + id).css('display', 'block');
    $("#" + id+"-child").css('display', 'block');
}


$("#comBtnClose").on("click", () => {
    $("#comments-div").fadeOut(500);
})
function getRandomCellWidth() {
    var minWidth = 30;
    var maxWidth = 40;
    var randomWidth = Math.random() * (maxWidth - minWidth) + minWidth;
    return randomWidth + 'vw';
}

$('#pencil-works-child').on('click', '.brick img', function() {
    var index = $('#pencil-works-child .brick img').index(this);
    //console.log(index);
    displayWallGallery(imgArrayPencil, index);
   
});

$('#ps-works-child .brick img').on('click', function() {
  	
});
lc_lightbox('#ps-works-child .brick', {
    wrap_class: 'lcl_fade_oc',
    gallery : true,	
    thumb_attr: 'data-lcl-thumb', 
    
    skin: 'minimal',
    radius: 0,
    padding	: 0,
    border_w: 0,
});

 function divideArrayIntoGroups(array) {
    const resultArray = [];
    const totalItems = array.length;
  
    let remainingItems = totalItems;
    while (remainingItems > 0) {
        const groupSize = Math.min(remainingItems, 4);
        resultArray.push(groupSize);
        remainingItems -= groupSize;
    }
  
    return resultArray;
}
function splitNumber(num) {
    if (num <= 4) {
      return [1, 1, 1, 1].slice(0, num);
    } else {
      let result = [];
      let remainder = num % 4;
      let quotient = Math.floor(num / 4);
      
      for (let i = 0; i < 4; i++) {
        result.push(quotient + (i < remainder ? 1 : 0));
      }
      
      return result;
    }
  }
  



function displayWallGallery(fileArray, index) {
    $resultArray = splitNumber(imgArrayPencil.length);
    const wallparentContainer = document.getElementById("gr-main");
    wallparentContainer.innerHTML = "";
    
    $("#wc").show(300);
    let adjustedIndex = index;

  
    let i = 0;
    const lastIndex = $resultArray.length - 1;
    while (adjustedIndex >= 0 && i < $resultArray.length) {
        adjustedIndex -= $resultArray[i];
        i++;
    }
    
    // If there's a remainder, adjust the adjustedIndex to the current index
    if (adjustedIndex < 0) {
        adjustedIndex = i - 1;
    }
    if (adjustedIndex > lastIndex) {
        adjustedIndex = lastIndex;  
    }
   
   const observer = new MutationObserver((mutationsList, observer) => {
        const populatedDivs = wallparentContainer.querySelectorAll("div.roomstatdiv");
        if (populatedDivs.length === fileArray.length) {
            observer.disconnect();
            $gallery = $('#gr-gallery');
            $itemsContainer = $gallery.children('div.gr-main').hide();
            $items = $itemsContainer.find('figure');
            //console.log("items : ", $items);
            //console.log(index, adjustedIndex, $resultArray);
            setTimeout(function () { 
                Gallery.init({
                    layout: $resultArray
                }, adjustedIndex);
            }, 500);

            
        }
    });

    observer.observe(wallparentContainer, { childList: true, subtree: true });

    
   
    //console.log(resultArray);

    fileArray.forEach(item => {
        //console.log(item.id_liked);
        const figure = document.createElement("figure");
      
        const imgDiv = document.createElement("div");
        const img = document.createElement("img");
        const imgUrl = "https://www.emkapp.com/fad_s_portfolio/back-end/images/graphic_works/";
        img.src = imgUrl+item.imgfile;
        img.alt = `img${item.id}`;
        imgDiv.appendChild(img);
      
        
        const figcaption = document.createElement("figcaption");
        const h2 = document.createElement("h2");
        const h2Span = document.createElement("span");
        h2Span.textContent = item.title;
        h2.appendChild(h2Span);
      
        const p = document.createElement("p");
        p.textContent = item.desc;
      
        figcaption.appendChild(h2);
        figcaption.appendChild(p);
      
        const roomstatdiv = document.createElement("div");
        roomstatdiv.className = "roomstatdiv";
        const spaceTextNode = document.createTextNode("\u00A0");
        const ltabLikes = document.createElement("div");
    ltabLikes.className = "ltab";
    const thumbsUpIcon = document.createElement("i");
    thumbsUpIcon.id = "lbtn" + item.id;
    thumbsUpIcon.className = item.id_liked.includes(userid) ? "fas fa-thumbs-up liked" : "fas fa-thumbs-up unliked"; 
    const likesCountSpan = document.createElement("span");
    likesCountSpan.id = "sl" + item.id;
    
    likesCountSpan.textContent = item.likes_count;
    const likesLabelSpan = document.createElement("span");
    likesLabelSpan.id = "nl" + item.id;
    likesLabelSpan.textContent = item.likes_count < 2 ? "Like" : "Likes";
    ltabLikes.appendChild(thumbsUpIcon);
    ltabLikes.appendChild(document.createTextNode("\u00A0")); // Add space
    ltabLikes.appendChild(likesCountSpan);
    ltabLikes.appendChild(likesLabelSpan);

        thumbsUpIcon.onclick = function () {
            //console.log("clicked");
            if(userid){
        if (thumbsUpIcon.classList.contains("unliked")) {
            thumbsUpIcon.classList.remove("unliked");
            thumbsUpIcon.classList.add("liked");
            likesCountSpan.textContent = parseInt(likesCountSpan.textContent) + 1;
        } else {
            thumbsUpIcon.classList.remove("liked");
            thumbsUpIcon.classList.add("unliked");
            likesCountSpan.textContent = parseInt(likesCountSpan.textContent) - 1;
        }
            likesLabelSpan.textContent = parseInt(likesCountSpan.textContent) < 2 ? "Like" : "Likes";
        } else {
            showConfirmationDialog("Please log in to like or post a comment", 'Message', function () {
                $("#authDiv").fadeIn(500);
            });  
    }
    };

    // Comments
    const ltabComments = document.createElement("div");
    ltabComments.className = "ltab";
    const commentIcon = document.createElement("i");
    commentIcon.id = "cs" + item.id;
    commentIcon.className = "fas fa-comment";
    const commentsCountSpan = document.createElement("span");
    commentsCountSpan.id = "sc" + item.id;
    commentsCountSpan.textContent = item.comment_count;
    const commentsLabelSpan = document.createElement("span");
    commentsLabelSpan.id = "nc" + item.id;
    commentsLabelSpan.textContent = " Comments";
    ltabComments.appendChild(commentIcon);
    ltabComments.appendChild(document.createTextNode("\u00A0")); // Add space
    ltabComments.appendChild(commentsCountSpan);
    ltabComments.appendChild(commentsLabelSpan);

    ltabComments.onclick = function () {
       // openCommentsDiv(commentsCountSpan.id); // Replace with your actual function
        console.log(commentsCountSpan.id);
    };
        roomstatdiv.appendChild(ltabLikes);
        roomstatdiv.appendChild(ltabComments);
        
      
        figure.appendChild(imgDiv);
        figure.appendChild(figcaption);
        figure.appendChild(roomstatdiv);
      
       
        wallparentContainer.appendChild(figure);
    });
    if (index < 1) {
        itemIndex = index;  
    } else {
        itemIndex = index - 1; 
     }
    
}

function handleImageClick(event) {
    const imgElement = event.target.closest('.brick[data-id]'); 
    if (!imgElement) return; 
    
    const dataId = imgElement.getAttribute('data-id'); 
    
    const ulElement = document.getElementById('sb-slider');
    ulElement.innerHTML = '';
    const imgUrl = "https://www.emkapp.com/fad_s_portfolio/back-end/images/graphic_works/";
    ulElement.innerHTML = imgArray3d.map(imgData => {
        return `
        <li>
          <img id="${imgData.id}" src="${imgUrl}${imgData.imgfile}" alt="image"/>
          <div class="sb-description">
            <h3>${imgData.desc}</h3>
          </div>
          <div class="slicestatdiv">
            <div class="ltab">
              <i id="slbtn${imgData.id}" class="${imgData.id_liked.includes(userid) ? "fas fa-thumbs-up liked" : "fas fa-thumbs-up unliked"}"></i>
              &nbsp;
              <span id="ssl${imgData.id}">${imgData.likes_count}</span>
              <span id="snl${imgData.id}">Likes</span>
            </div>
            <div class="ltab">
              <i id="scs${imgData.id}" class="fas fa-comment"></i>
              &nbsp;
              <span id="ssc${imgData.id}">${imgData.comment_count}</span>
              <span id="snc${imgData.id}">Comments</span>
            </div>
          </div>
        </li>
      `;
      
    }).join('');
      $("#slicediv").fadeIn(500);
      
      setTimeout(function () {
        const clickedLi = document.querySelector(`#sb-slider li img[id="${dataId}"]`); 
    
        const allLiElements = document.querySelectorAll('#sb-slider li');
        const index = Array.from(allLiElements).findIndex(li => li === clickedLi.parentElement);
   
        Page.init(index + 1);
       
    
      },100);
      imgArray3d.forEach(imgData => {
        const parent = document.getElementById('sb-slider');
    
        if (!parent) {
            // Handle the case where the parent element is not found.
            return;
        }
    
          const thumbsUpIcon = parent.querySelector(`#slbtn${imgData.id}`);
          
          const thumbsUpIconParent = thumbsUpIcon.parentElement; // Get the parent element

          var likesCountSpan = parent.querySelector(`#ssl${imgData.id}`);
          var likesLabelSpan = parent.querySelector(`#snl${imgData.id}`);
          if (thumbsUpIcon) {
           
            thumbsUpIcon.addEventListener('click', function (event) {
               // event.stopPropagation();
                if(userid){
                if (thumbsUpIcon.classList.contains("unliked")) {
                    thumbsUpIcon.classList.remove("unliked");
                    thumbsUpIcon.classList.add("liked");
                    likesCountSpan.textContent = parseInt(likesCountSpan.textContent) + 1;
                } else {
                    thumbsUpIcon.classList.remove("liked");
                    thumbsUpIcon.classList.add("unliked");
                    likesCountSpan.textContent = parseInt(likesCountSpan.textContent) - 1;
                }
                likesLabelSpan.textContent = parseInt(likesCountSpan.textContent) < 2 ? "Like" : "Likes";
                updateLike(imgData.id, imgArray3d, likesCountSpan);
            } else {
                showConfirmationDialog("Please log in to like or post a comment", 'Message', function () {
                    $("#authDiv").fadeIn(500);
                });  
        }
            });
        }
    
        const ltabComments = parent.querySelector(`#scs${imgData.id}`);
        if (ltabComments) {
            ltabComments.onclick = function () {
                openCommentsDiv($(this).attr('id'), imgArray3d);
            };
        }
    
        
    });
    
}



function initializePlayer() {
    const vidDiv = document.getElementById("mvd");
     art = new Artplayer({
        container: vidDiv,
        url: "",
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
    
    art.url = 'https://youtu.be/jBzwzrDvZ18';
    art.on('ready', () => {
        art.muted = true;
    });
}

const images = document.getElementById("3d-works-child").querySelectorAll('.brick .threed img');
    if (images) {
        images.forEach(image => {
            image.addEventListener('click', function (e) {
                handleImageClick(e);
                //console.log(e);
            });
            
        });
    }

    
const parentElement = document.getElementById("3d-works-child");

parentElement.addEventListener('click', function (e) {
    
    if (e.target.matches('.brick .threed img')) {
        handleImageClick(e);
    }
});


function updateLike(picID, arr, likesCountSpan) {
    const actualID = picID.replace(/[a-zA-Z]/g, "");

    // Find the index of the object with the given ID
    const index = arr.findIndex(item => item.id === actualID);

    if (index !== -1) {
        const likedIndex = arr[index].id_liked.indexOf(userid);

        if (likedIndex !== -1) {
            // If user has already liked, remove the like
            arr[index].id_liked.splice(likedIndex, 1);
        } else {
            // If user has not liked, add the like
            arr[index].id_liked.push(userid);
        }
        arr[index].likes_count = Number($(likesCountSpan).text());
        //console.log(likedIndex, index, actualID ,arr);
    }
    submitLike(userid, picID);
}


function openCommentsDiv(spanID, arr) {
    // Remove "sc" prefix from spanID
    const actualID = spanID.replace(/[a-zA-Z]/g, "");
    const imageObject = arr.find(obj => obj.id === actualID);
    // Show the div with the given spanID
    $("#comments-div").fadeIn(500);
    fetchcomments("imgComments", actualID);
    const imgUrl = "https://www.emkapp.com/fad_s_portfolio/back-end/images/graphic_works/";
        $("#focusedImage").attr("src", imgUrl+imageObject.imgfile);
    
    // Attach a submit event handler to the form
    $("#comform").on('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally
  
        
    const formData = new FormData();
    formData.append("request", "new_comment");
    formData.append("id", actualID);
    formData.append("user", userid);
    formData.append("comment", $("#cominput").val());
    try {
        axios
          .post(
            "https://www.emkapp.com/fad_s_portfolio/back-end/likes_and_comments.php",
  
            formData
            
          )
          .then(async (res) => {
              console.log(res);
              enableClickEvents("comform");
              hideSpinner();
              const strjson = JSON.stringify(JSON.parse(JSON.stringify(res.data)));
              if (JSON.parse(strjson)[0].message.includes("successful")) {
                fetchcomments("imgComments", actualID);  
                $("#comform")[0].reset();  
                const span = $(spanID);
                const currentText = span.text();
                const newText = parseInt(currentText) + 1;
                span.text(newText);
                imageObject.comment_count = String(parseInt(imageObject.comment_count) + 1); 
              } else {
                popSnackBar(JSON.parse(strjson)[0].message);
              
              }
          })
          .catch((err) => {
            popSnackBar(err);
            enableClickEvents("comform");
            hideSpinner();
          });
      } catch (error) {
        console.error('Request error:', error);
        popSnackBar(error);
        enableClickEvents("comform");
        hideSpinner();
      }


    });
  }
  function openCommentsDivTwo(spanID, arr, mainCommCon, motherCommCon, formID) {
    // Remove "sc" prefix from spanID
    const actualID = spanID.replace(/[a-zA-Z]/g, "");
    const imageObject = arr.find(obj => obj.id === actualID);
    // Show the div with the given spanID
    $("#"+motherCommCon).fadeIn(500);
    fetchcomments(mainCommCon, actualID);
      
    
    $("#"+formID).on('submit', function(event) {
      event.preventDefault(); 
      var textareaValue = $(this).find("textarea").val();
      const formData = new FormData();
    formData.append("request", "new_comment");
    formData.append("id", actualID);
    formData.append("user", userid);
    formData.append("comment", textareaValue);
    try {
        axios
          .post(
            "https://www.emkapp.com/fad_s_portfolio/back-end/likes_and_comments.php",
  
            formData
            
          )
          .then(async (res) => {
              //console.log(res);
              enableClickEvents(formID);
              hideSpinner();
              const strjson = JSON.stringify(JSON.parse(JSON.stringify(res.data)));
              if (JSON.parse(strjson)[0].message.includes("successful")) {
                fetchcomments(mainCommCon, actualID);  
                $("#"+formID)[0].reset();  
                const span = $("#"+spanID);
                const currentText = span.text();
                const newText = parseInt(currentText) + 1;
                  span.text(newText);
                  //console.log(spanID); 
                imageObject.comment_count = String(parseInt(imageObject.comment_count) + 1); 
              } else {
                popSnackBar(JSON.parse(strjson)[0].message);
              
              }
          })
          .catch((err) => {
            popSnackBar(err);
            enableClickEvents(formID);
            hideSpinner();
          });
      } catch (error) {
        console.error('Request error:', error);
        popSnackBar(error);
        enableClickEvents(formID);
        hideSpinner();
      }  
        
        
    });
  } 
function fetchcomments(containerID, itemID) {
    const formData = new FormData();
    formData.append("request", "fetch_comments");
    formData.append("id", itemID);
    try {
        axios
          .post(
            "https://www.emkapp.com/fad_s_portfolio/back-end/likes_and_comments.php",
            formData,
            
          )
            .then(async (res) => {
                const responseData = res.data;
                const cData = responseData.commentData; 
                populateComments(containerID, cData);
          })
          .catch((err) => {
            popSnackBar(err);
          
          });
      } catch (error) {
        console.error('Request error:', error);
       
      }
}

function populateComments(containerID, cData){
    const container = document.getElementById(containerID);
    container.innerHTML = "";
    if (cData.length < 1) {
        if (containerID.toString().includes("ae") || containerID.toString().includes("vid")) {
            container.innerHTML = "<h3 align='center' style='color:white !important;'>Your feedback is appreciated, let us know in the comment section, thank you 😊 </h3>"; 
        } else {
            container.innerHTML = "<h3 align='center'>Your feedback is appreciated, let us know in the comment section, thank you 😊 </h3>";
        }
        
      } else {
        cData.forEach(comment => {
            const msgDiv = document.createElement("div");
            msgDiv.className = comment.user_id === userid ? "msg right-msg" : "msg left-msg";

            const msgImgDiv = document.createElement("div");
            msgImgDiv.className = "msg-img";
            const imgUrl = "https://www.emkapp.com/fad_s_portfolio/back-end/images/dp/";
            msgImgDiv.style.backgroundImage = `url('${imgUrl}${comment.image}')`;

            const msgBubbleDiv = document.createElement("div");
            msgBubbleDiv.className = "msg-bubble";

            const msgInfoDiv = document.createElement("div");
            msgInfoDiv.className = "msg-info";

            const msgInfoNameDiv = document.createElement("div");
            msgInfoNameDiv.className = "msg-info-name";
            msgInfoNameDiv.textContent = comment.firstname + " " + comment.lastname;

            const msgTextDiv = document.createElement("div");
            msgTextDiv.className = "msg-text";
            msgTextDiv.textContent = comment.comment;

            const msgInfoTimeDiv = document.createElement("div");
            msgInfoTimeDiv.className = "msg-info txtsmall";
            const commentDate = new Date(comment.comment_date);
            msgInfoTimeDiv.innerHTML = commentDate.toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            });

            msgInfoDiv.appendChild(msgInfoNameDiv);
            msgBubbleDiv.appendChild(msgInfoDiv);
            msgBubbleDiv.appendChild(msgTextDiv);
            msgBubbleDiv.appendChild(msgInfoTimeDiv);

            msgDiv.appendChild(msgImgDiv);
            msgDiv.appendChild(msgBubbleDiv);

            container.appendChild(msgDiv);
        });
        container.scrollTop = container.scrollHeight;
      }
}


$("#cg").on('click', function () {
    $("#wc").fadeOut(500); 
    $("#gr-gallery").html('<div class="gr-main" id="gr-main"></div>');
});

moveSocialMediaHandles();

//initializePlayer();
// Listen for window resize events and adjust the position of social-media-handles div
window.addEventListener('resize', () => {
  moveSocialMediaHandles();
});

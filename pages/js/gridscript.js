let imgArrayPencil  = [], imgArrayPs = [], imgArrayAe = [], imgArray3d = [], imgArrayVids = [];

const pencilcontainer = document.getElementById("pencil-works-child");
const pscontainer = document.getElementById("ps-works-child");
const aecontainer = document.getElementById("ae-works-child");
const threedcontainer = document.getElementById("3d-works-child");
var snackbarmessage;
var options = {
  content: snackbarmessage, // text of the snackbar
  style: "toast", // add a custom class to your snackbar
  timeout: 0, // time in milliseconds after the snackbar autohides, 0 is disabled
  htmlAllowed: true, // allows HTML as content value
  onClose: function () {}, // callback called when the snackbar gets closed.
};
const idsArray = ["pic1", "pic2", "pic3", "pic4", "pic5", "pic6"];
const numIds = idsArray.length;
function getRandomSpan(maxSpan) {
  const minSpan = 1; // Minimum span value
  return Math.floor(Math.random() * (maxSpan - minSpan + 1)) + minSpan;
}

const positions = [];

function isCollision(
  gridColumnStart,
  gridColumnEnd,
  gridRowStart,
  gridRowEnd,
  positions
) {
  for (const position of positions) {
    if (
      gridColumnStart < position.gridColumnEnd &&
      gridColumnEnd > position.gridColumnStart &&
      gridRowStart < position.gridRowEnd &&
      gridRowEnd > position.gridRowStart
    ) {
      return true; // Collision detected
    }
  }
  return false; // No collision
}



function hideOtherDivs() {
  const psDivs = document
    .getElementById("tabBody")
    .querySelectorAll(`div[id^="ps"], div[id^="3d"], div[id^="ae"]`);
  psDivs.forEach((psDiv) => {
    //psDiv.style.display = 'none';
    //$(psDiv).hide();
  });
}

function preloadImages(images) {
  images.forEach((image) => {
    const img = new Image();
    img.src = image.imgfile;
  });
}

function updateImages() {
  populateDivs(pencilcontainer, imgArrayPencil);
  populateDivs(pscontainer, imgArrayPs);
  populateSecDivs(threedcontainer, imgArray3d);

  //requestAnimationFrame(updateImages);
}

// Preload images only if arrays are not empty
if (imgArrayPencil.length > 0) {
  preloadImages(imgArrayPencil);
}
if (imgArrayPs.length > 0) {
  preloadImages(imgArrayPs);
}
if (imgArrayAe.length > 0) {
  preloadImages(imgArrayAe);
}
if (imgArray3d.length > 0) {
  preloadImages(imgArray3d);
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

function fetchMediaData() {
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
                populatePlaylist("ae-list", imgArrayAe, "ae");
                populatePlaylist("vid-list", imgArrayVids, "vid");
                populateDivs(pencilcontainer, imgArrayPencil, "pencil");
                populateDivs(pscontainer, imgArrayPs, "ps");
                populateSecDivs(threedcontainer, imgArray3d, "threed");
                //updateImages();
            })
            .catch((err) => {
                popSnackBar(err);
          
            });
    } catch (error) {
        console.error('Request error:', error);
       
    }
}

function populateDivs(selCon, imgArray, arrayName) {
  // console.log(imgArray);
 selCon.innerHTML = "";

 if (imgArray.length < 1) {
   var divElement = document.createElement("div");
   divElement.className = "empty-con";

   // Create the inner HTML content
   divElement.innerHTML = `
 <div class="empty-text"><i>Coming<br>Soon</i></div>
 <div class='spiralwrapper'>
   ${Array.from({ length: 32 }, () => "<i></i>").join("\n")}
 </div>
`;
   selCon.appendChild(divElement);
   selCon.style.overflow = "hidden";
   return;
 }
 const imgUrl = "https://www.emkapp.com/fad_s_portfolio/back-end/images/graphic_works/";
 var temp =
   "<div class='brick ' style='width:{width}px;' title='{src}' data-lcl-txt='{src}'  href='{src}' data-lcl-thumb='{src}' data-id='{src}'><img src='{src}' width='100%'></div>";
 var w = 1,
   h = 1,
   html = "",
   limitItem = imgArray.length;

 for (var i = 0; i < limitItem; ++i) {
   w = (1 + 3 * Math.random()) << 0;
   const imageObj = imgArray[i]; // Get the image object from the imgArray
   const imageSrc = imgUrl+imageObj.imgfile; // Get the image source from the image object
   const imageTitle = imageObj.title;
   const imageDesc = imageObj.desc;
   const imageID = imageObj.id;
   html += temp
     .replace(/\{width\}/g, w * 150)
     .replace("{src}", imageTitle)
     .replace("{src}", imageDesc)
     .replace("{src}", imageSrc)
     .replace("{src}", imageSrc)
     .replace("{src}", imageID)
     .replace("{src}", imageSrc);
 }

 // Append the child divs to the selCon (motherdiv)
 selCon.innerHTML = html;

 // Rest of your code

  if (arrayName.includes("pencil")) {
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
}


function populateSecDivs(selCon, imgArray,arrayName) {
  // console.log(imgArray);
 selCon.innerHTML = "";

 if (imgArray.length < 1) {
   var divElement = document.createElement("div");
   divElement.className = "empty-con";

   // Create the inner HTML content
   divElement.innerHTML = `
 <div class="empty-text"><i>Coming<br>Soon</i></div>
 <div class='spiralwrapper'>
   ${Array.from({ length: 32 }, () => "<i></i>").join("\n")}
 </div>
`;
   selCon.appendChild(divElement);
   selCon.style.overflow = "hidden";
   return;
 }
 const imgUrl = "https://www.emkapp.com/fad_s_portfolio/back-end/images/graphic_works/";
 var temp =
   "<div class='brick ' style='width:{width}px;' title='{src}' data-lcl-txt='{src}'  href='{src}' data-lcl-thumb='{src}' data-id='{src}'><div class='threed'><img src='{src}' width='100%'></div></div>";
 var w = 1,
   h = 1,
   html = "",
   limitItem = imgArray.length;

 for (var i = 0; i < limitItem; ++i) {
   w = (1 + 3 * Math.random()) << 0;
   const imageObj = imgArray[i]; // Get the image object from the imgArray
   const imageSrc = imgUrl+imageObj.imgfile; // Get the image source from the image object
   const imageTitle = imageObj.title;
   const imageDesc = imageObj.desc;
   const imageID = imageObj.id;
   html += temp
     .replace(/\{width\}/g, w * 150)
     .replace("{src}", imageTitle)
     .replace("{src}", imageDesc)
     .replace("{src}", imageSrc)
     .replace("{src}", imageSrc)
     .replace("{src}", imageID)
     .replace("{src}", imageSrc);
 }

 // Append the child divs to the selCon (motherdiv)
 selCon.innerHTML = html;

 // Rest of your code

 
 
 var imgElements = selCon.querySelectorAll("div.threed img");
 imgElements.forEach((img) => {
   // Set background image for the img element
   img.style.backgroundImage = `url(${img.getAttribute("src")})`;
 
  
   img.parentElement.style.backgroundImage = `url(${img.getAttribute("src")})`;
 });
 
 const threedElements = document.querySelectorAll('.threed');

threedElements.forEach((threed) => {
    threed.addEventListener('mouseenter', () => {
        threed.closest('.brick').classList.add('bhovered');
    });

    threed.addEventListener('mouseleave', () => {
        threed.closest('.brick').classList.remove('bhovered');
    });
}); 
  
}



// Start the animation loop


function initmarquee() {
  $("#title-marquee").AcmeTicker({
    type: "marquee",
    direction: "left",
    speed: 0.05,
    controls: {
      toggle: $("#pause-marquee-btn"),
    },
  });
}

function initmarqueetwo() {
  $("#title-marquee-two").AcmeTicker({
    type: "marquee",
    direction: "left",
    speed: 0.05,
    controls: {
      toggle: $("#pause-marquee-btn-two"),
    },
  });
}

function toggleIconClass(elID) {
  var icon = document.getElementById(elID);

  if (icon.classList.contains("fa-pause")) {
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
  } else if (icon.classList.contains("fa-play")) {
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  }
}

function hidebodyoverflow() {
  document.body.style.overflow = "hidden";
}

function showbodyoverflow() {
  document.body.style.overflow = "hidden";
}

function adjustImageSizes() {
  const screenWidth = window.innerWidth;
  const numColumns = Math.floor(screenWidth / 150); // Adjust image size based on screen width
  const imageSize = Math.floor(screenWidth / numColumns) - 5;

  container.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
  container.style.gridRowGap = "5px";

  const images = document.querySelectorAll(".container img");
  images.forEach((img) => {
    img.style.width = `${imageSize}px`;
    img.style.height = `${imageSize}px`;
  });
}
fetchMediaData();
// Call the function on page load and whenever the window is resized
//window.addEventListener('load', adjustImageSizes);
//window.addEventListener('resize', adjustImageSizes);

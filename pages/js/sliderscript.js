console.clear();

const { gsap, imagesLoaded } = window;
let imgWrapper = document.querySelector("#imgWrapper");
let currentIndex = 0;
let imgcard;
let images = [...imgWrapper.querySelectorAll("img")];
const buttons = {
	prev: document.querySelector(".btn--left"),
	next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".imgapp__bg");

const cardInfosContainerEl = document.querySelector(".info__wrapper");

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	const previousCardEl = cardsContainerEl.querySelector(".previous--card");
	const nextCardEl = cardsContainerEl.querySelector(".next--card");
    const icards = cardsContainerEl.querySelectorAll(".card");
	const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
	const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
	const nextBgImageEl = appBgContainerEl.querySelector(".next--image");
    


	changeInfo(direction);
	swapCardsClass();

    var statdiv = currentCardEl.querySelector(".statdiv");
	if ($(statdiv).is(":visible")) {
		$(statdiv).fadeOut(300);
	}

	removeCardEvents(currentCardEl);
	removeEventListenersFromCard(currentCardEl);
	disableMouseEvents(currentCardEl);
	function swapCardsClass() {
		currentCardEl.classList.remove("current--card");
		if (previousCardEl) {
			previousCardEl.classList.remove("previous--card");
			previousBgImageEl.classList.remove("previous--image");
		}
		
		

		currentBgImageEl.classList.remove("current--image");
		
		

		currentCardEl.style.zIndex = "50";
		currentBgImageEl.style.zIndex = "-2";
		

		if (nextCardEl) { 
			nextBgImageEl.classList.remove("next--image");
            nextCardEl.classList.remove("next--card");
		}

		if (direction === "right") {
			currentIndex++;
			$("#leftbtn").show();
			if (previousCardEl) {
				previousCardEl.style.zIndex = "20";
				previousCardEl.classList.add("next--card");
				previousBgImageEl.classList.add("next--image");
				removeEventListenersFromCard(previousCardEl);
				disableMouseEvents(previousCardEl);
			}
			
			

			currentCardEl.classList.add("previous--card");
			
			

			currentBgImageEl.classList.add("previous--image");
			
			
			if (nextCardEl) {
				nextCardEl.style.zIndex = "30";
			    nextBgImageEl.style.zIndex = "-1";
				nextCardEl.classList.add("current--card");
				nextBgImageEl.classList.add("current--image");
				setNewListeners(nextCardEl);
				enableMouseEvents(nextCardEl);
				let itemIndex = Array.from(icards).findIndex(card => card.classList.contains("current--card"));
				getItemIndex(itemIndex, icards.length);
				var statdiv = nextCardEl.querySelector(".statdiv");
				if (!$(statdiv).is(":visible")) {
					$(statdiv).fadeIn(300);
				}
			}
		} else if (direction === "left") {
			currentIndex--;
			$("#rightbtn").show();
			if (previousCardEl) {
				previousCardEl.style.zIndex = "30";
				previousBgImageEl.style.zIndex = "-1";
				previousCardEl.classList.add("current--card");
				previousBgImageEl.classList.add("current--image");
				setNewListeners(previousCardEl);
				enableMouseEvents(previousCardEl);
				var statdiv = previousCardEl.querySelector(".statdiv");
				if (!$(statdiv).is(":visible")) {
					$(statdiv).fadeIn(300);
				}
				let itemIndex = Array.from(icards).findIndex(card => card.classList.contains("current--card"));
				getItemIndex(itemIndex, icards.length);
			}
			
			if (nextCardEl) {
				nextCardEl.style.zIndex = "20";
				nextCardEl.classList.add("previous--card");
				nextBgImageEl.classList.add("previous--image");
				removeEventListenersFromCard(nextCardEl);
				disableMouseEvents(nextCardEl);
			} 


			currentCardEl.classList.add("next--card");
			
			currentBgImageEl.classList.add("next--image");
			
			
		}
		currentCardEl.offsetHeight;
	}
}

function getItemIndex(index, len) {
	if (index === 0) {
		$("#leftbtn").fadeOut(400);
	  } else if (index === len - 1) {
		$("#rightbtn").fadeOut(400);
	  }
}

function disableMouseEvents(el) {
    el.style.pointerEvents = 'none';
}

function enableMouseEvents(el) {
    el.style.pointerEvents = 'auto';
}

function changeInfo(direction) {
	let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
	let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");

	gsap.timeline()
		.to([buttons.prev, buttons.next], {
		duration: 0.2,
		opacity: 0.5,
		pointerEvents: "none",
	})
		.to(
		currentInfoEl.querySelectorAll(".text"),
		{
			duration: 0.4,
			stagger: 0.1,
			translateY: "-120px",
			opacity: 0,
		},
		"-="
	)
		.call(() => {
		swapInfosClass(direction);
	})
		.call(() => initCardEvents())
		.fromTo(
		direction === "right"
		? nextInfoEl.querySelectorAll(".text")
		: previousInfoEl.querySelectorAll(".text"),
		{
			opacity: 0,
			translateY: "40px",
		},
		{
			duration: 0.4,
			stagger: 0.1,
			translateY: "0px",
			opacity: 1,
		}
	)
		.to([buttons.prev, buttons.next], {
		duration: 0.2,
		opacity: 1,
		pointerEvents: "all",
	});

	function swapInfosClass() {
		currentInfoEl.classList.remove("current--info");
		
		

		if (previousInfoEl) {
			previousInfoEl.classList.remove("previous--info");
		}
		if (nextInfoEl) {
			nextInfoEl.classList.remove("next--info");
		}

		if (direction === "right") {
			currentInfoEl.classList.add("previous--info");
			if (nextInfoEl) {
				nextInfoEl.classList.add("current--info");
			}
			if (previousInfoEl) {
				previousInfoEl.classList.add("next--info");
			}
		} else if (direction === "left") {
			currentInfoEl.classList.add("next--info");
			if (nextInfoEl) {
				nextInfoEl.classList.add("previous--info");
			}
			if (previousInfoEl) {
				previousInfoEl.classList.add("current--info");
			}		
		}
	}
}

function updateCard(e) {
	const card = e.currentTarget;
	const box = card.getBoundingClientRect();
	const centerPosition = {
		x: box.left + box.width / 2,
		y: box.top + box.height / 2,
	};
	let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
	gsap.set(card, {
		"--current-card-rotation-offset": `${angle}deg`,
	});
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(currentInfoEl, {
		rotateY: `${angle}deg`,
	});
}

function resetCardTransforms(e) {
	const card = e.currentTarget;
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(card, {
		"--current-card-rotation-offset": 0,
	});
	gsap.set(currentInfoEl, {
		rotateY: 0,
	});
}

function initCardEvents() {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	currentCardEl.addEventListener("pointermove", updateCard);
	currentCardEl.addEventListener("pointerout", (e) => {
		resetCardTransforms(e);
	});
}

initCardEvents();

function removeCardEvents(card) {
	card.removeEventListener("pointermove", updateCard);
	//removeEventListenersFromCard(card);
}

function removeEventListenersFromCard(card) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        card.removeEventListener('click', mobileClickListener);
        card.removeEventListener('mouseleave', mobileMouseLeaveListener);
    } else {
        card.removeEventListener('mouseenter', desktopMouseEnterListener);
        card.removeEventListener('mouseleave', desktopMouseLeaveListener);
    }
}

function mobileClickListener() {
    if (!this.classList.contains('hovered')) {
        this.classList.add('hovered');
        $("#infolist").fadeOut(400);
    }
}

function mobileMouseLeaveListener() {
    this.classList.remove('hovered');
    $("#infolist").fadeIn(400);
}

function desktopMouseEnterListener() {
    if (!this.classList.contains('hoverable')) {
        this.classList.add('hoverable');
        $("#infolist").fadeOut(400);
    }
}

function desktopMouseLeaveListener() {
    this.classList.remove('hoverable');
    $("#infolist").fadeIn(400);
}


function init() {

	let tl = gsap.timeline();

	tl.to(cardsContainerEl.children, {
		delay: 0.15,
		duration: 0.5,
		stagger: {
			ease: "power4.inOut",
			from: "right",
			amount: 0.1,
		},
		"--card-translateY-offset": "0%",
	})
		.to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		delay: 0.5,
		duration: 0.4,
		stagger: 0.1,
		opacity: 1,
		translateY: 0,
	})
		.to(
		[buttons.prev, buttons.next],
		{
			duration: 0.4,
			opacity: 1,
			pointerEvents: "all",
		},
		"-=0.4"
	);
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	var statdiv = currentCardEl.querySelector(".statdiv");
	if (!$(statdiv).is(":visible")) {
		$(statdiv).fadeIn(300);
	}
}

const clearFirstSlider = () => {
	document.getElementById("imgWrapper").innerHTML = "";
	document.getElementById("inflist").innerHTML = "";
	document.getElementById("bglist").innerHTML = "";
}



//const card = document.querySelector('.card.current--card');

// Check if the user is on a mobile browser



 /*
const waitForImages = () => {
	
	const totalImages = images.length;
	let loadedImages = 0;
	const loaderEl = document.querySelector(".loader span");

	if (totalImages > 1) {
		$("#leftbtn").show();
		$("#rightbtn").show();
	} else {
		$("#leftbtn").hide();
		$("#rightbtn").hide();
	}

	if (totalImages > 0) {
		card = document.querySelector('.card.current--card');
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
  card.addEventListener('click', function () {
    if (!this.classList.contains('hovered')) {
		this.classList.add('hovered');
		$("#infolist").fadeOut(400);
    }
  });

  card.addEventListener('mouseleave', function () {
	  this.classList.remove('hovered');
	  $("#infolist").fadeIn(400);
  });
} else {
  card.addEventListener('mouseenter', function () {
    if (!this.classList.contains('hoverable')) {
		this.classList.add('hoverable');
		$("#infolist").fadeOut(400);
    }
  });

  card.addEventListener('mouseleave', function () {
	  this.classList.remove('hoverable');
	  $("#infolist").fadeIn(400);
  });
}
	}
	

	gsap.set(cardsContainerEl.children, {
		"--card-translateY-offset": "100vh",
	});
	gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		translateY: "40px",
		opacity: 0,
	});
	gsap.set([buttons.prev, buttons.next], {
		pointerEvents: "none",
		opacity: "0",
	});

	images.forEach((image) => {
		imagesLoaded(image, (instance) => {
			if (instance.isComplete) {
				loadedImages++;
				let loadProgress = loadedImages / totalImages;

				gsap.to(loaderEl, {
					duration: 1,
					scaleX: loadProgress,
					backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
				});

				if (totalImages == loadedImages) {
					gsap.timeline()
						.to(".loading__wrapper", {
						duration: 0.8,
						opacity: 0,
						pointerEvents: "none",
					})
						.call(() => init());
				}
			}
		});
	});
};*/
function removeAllMouseEvents(element) {
	element.removeEventListener('click', handleClick);
      element.removeEventListener('mouseover', handleMouseOver);
      element.removeEventListener('mouseout', handleMouseOut);
  }

function setNewListeners(scard) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        scard.addEventListener('click', function () {
            if (!this.classList.contains('hovered')) {
                this.classList.add('hovered');
                $("#infolist").fadeOut(400);
            }
        });

        scard.addEventListener('mouseleave', function () {
            this.classList.remove('hovered');
            $("#infolist").fadeIn(400);
        });
	} else {
		//console.log(scard);
        scard.addEventListener('mouseenter', function () {
            if (!this.classList.contains('hoverable')) {
                this.classList.add('hoverable');
                $("#infolist").fadeOut(400);
            }
        });

        scard.addEventListener('mouseleave', function () {
            this.classList.remove('hoverable');
            $("#infolist").fadeIn(400);
        });
    }
}

function waitForImages() {
    const totalImages = images.length;
    let loadedImages = 0;
    const loaderEl = document.querySelector(".loader span");

    if (totalImages > 2) {
        $("#leftbtn").show();
        $("#rightbtn").show();
	} else if (totalImages > 1 && totalImages < 3) { 
		$("#rightbtn").show();
	}
	else {
        $("#leftbtn").hide();
        $("#rightbtn").hide();
    }

    if (totalImages > 0) {
        imgcard = cardsContainerEl.querySelector('.current--card');
        setNewListeners(imgcard);
    }

    gsap.set(cardsContainerEl.children, {
        "--card-translateY-offset": "100vh",
    });
    gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
        translateY: "40px",
        opacity: 0,
    });
    gsap.set([buttons.prev, buttons.next], {
        pointerEvents: "none",
        opacity: "0",
    });

    images.forEach((image) => {
        imagesLoaded(image, (instance) => {
            if (instance.isComplete) {
                loadedImages++;
                let loadProgress = loadedImages / totalImages;

                gsap.to(loaderEl, {
                    duration: 1,
                    scaleX: loadProgress,
                    backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
                });

                if (totalImages == loadedImages) {
                    gsap.timeline()
                        .to(".loading__wrapper", {
                        duration: 0.8,
                        opacity: 0,
                        pointerEvents: "none",
                    })
                        .call(() => init());
                }
            }
        });
    });
}

const arr = [
	{"title": "Product Packaging 1", "src": "rush.jpg", "description": "A 3D modeled product 1"},
	// ... (other array items)
	{"title": "Product Packaging 20", "src": "rush.jpg", "description": "A 3D modeled product 20"}
  ];
  
  // Function to generate and append elements based on the array
  function generateElements() {
	const imgWrapper = document.getElementById("imgWrapper");
	const infoWrapper = document.getElementById("inflist");
	const bgWrapper = document.getElementById("bglist");
	
	arr.forEach((item, index) => {
	  const imgDiv = document.createElement("div");
	  imgDiv.className = index === 0 ? "card current--card" : "card next--card";
	  imgDiv.innerHTML = `
		<div class="card__image">
		  <img src="${item.src}" alt="" />
		</div>
	  `;
	  imgWrapper.appendChild(imgDiv);
	  
	  const infoDiv = document.createElement("div");
	  infoDiv.className = index === 0 ? "info current--info" : "info next--info";
	  infoDiv.innerHTML = `
		<h1 class="text name">${item.title}</h1>
		<p class="text description">${item.description}</p>
	  `;
	  infoWrapper.appendChild(infoDiv);
	  
	  const bgDiv = document.createElement("div");
	  bgDiv.className = index === 0 ? "imgapp__bg__image current--image" : "imgapp__bg__image next--image";
	  bgDiv.innerHTML = `
		<img src="${item.src}" alt="" />
	  `;
	  bgWrapper.appendChild(bgDiv);
	});
  }
  
  //generateElements();
  
  
function generateImageGrid() {
	document.getElementById("imgGrid").innerHTML = "";
	const imgGridDiv = document.getElementById("imgGrid");
  
	arr.forEach((item, index) => {
	  const img = document.createElement("img");
	  img.src = item.src;
	  img.alt = item.title;
	  img.id = `image-${index}`;
	  img.addEventListener("click", () => handleImageClick(index));
	  
	  imgGridDiv.appendChild(img);
	});
  }
  
  function handleImageClick(clickedIndex) {
	const imgWrapperDivs = document.querySelectorAll(".card");
	const infoWrapperDivs = document.querySelectorAll(".info");
	const bgWrapperDivs = document.querySelectorAll(".imgapp__bg__image");
	
	imgWrapperDivs.forEach((div, index) => {
	  div.className = "";
	  if (index < clickedIndex) {
		div.classList.add("card", "previous--card");
	  } else if (index === clickedIndex) {
		div.classList.add("card", "current--card");
	  } else {
		div.classList.add("card", "next--card");
	  }
	});
  
	infoWrapperDivs.forEach((div, index) => {
	  div.className = "";
	  if (index < clickedIndex) {
		div.classList.add("info", "previous--info");
	  } else if (index === clickedIndex) {
		div.classList.add("info", "current--info");
	  } else {
		div.classList.add("info", "next--info");
	  }
	});
  
	bgWrapperDivs.forEach((div, index) => {
	  div.className = "";
	  if (index < clickedIndex) {
		div.classList.add("imgapp__bg__image", "previous--image");
	  } else if (index === clickedIndex) {
		div.classList.add("imgapp__bg__image", "current--image");
	  } else {
		div.classList.add("imgapp__bg__image", "next--image");
	  }
	});
  }
  
 // generateImageGrid();
  

waitForImages();